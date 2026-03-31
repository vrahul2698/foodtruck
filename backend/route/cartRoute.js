const express = require("express");
const { AuthSignin } = require("../middleware/AuthSignin");
const Cart = require("../model/cart");
const cartRoute = express.Router();
const MenuItem = require("../model/menuItem");
const mongoose = require("mongoose")

cartRoute.post("/addcart", AuthSignin, async (req, res) => {
    try {
        const userId = req?.user?._id;
        const { foodItemId, quantity = 1 } = req?.body;
        if (!foodItemId) {
            throw new Error("foodItemId Required")
        }
        const menuItem = await MenuItem.findById(foodItemId);
        if (!menuItem) {
            throw new Error("Menu Item not found")
        }
        if (!menuItem?.isAvailable) {
            throw new Error("Item is currenly unAvailable")
        }
        const existingCart = await Cart.findOne({ userId });

        if (existingCart && existingCart.items.length > 0) {

            // ✅ Compare restaurant of cart vs new item
            const cartRestaurant = existingCart.restaurantId.toString();
            const newRestaurant = menuItem.restaurantId.toString();

            if (cartRestaurant !== newRestaurant) {
                // ❌ Different restaurant — block or ask user
                return res.status(400).json({
                    message: 'Your cart has items from another restaurant. Clear cart first?',
                    conflict: true   // frontend uses this flag to show popup
                });
            }
        }
        const cart = await Cart.findOneAndUpdate({ userId, 'items.menuItem': foodItemId },
            {
                $inc: {
                    'items.$.quantity': quantity,
                }
            }, { new: true }
        )
        if (!cart) {
            const updatedCart = await Cart.findOneAndUpdate({ userId }, {
                $push: {
                    items: {
                        menuItem: menuItem?._id,
                        name: menuItem?.name,
                        price: menuItem?.basePrice,
                        image: menuItem.image,
                        quantity
                    }
                },
                $set: { restaurantId: menuItem?.restaurantId },
            }, { new: true, upsert: true });
            return res.status(200).json(updatedCart);
        }
        return res.status(200).json(cart);

    }
    catch (err) {
        console.log(err, "err")
        res.status(500).send("Error :" + err?.message)
    }
})


cartRoute.patch("/removecartitem/:resId/:itemId", AuthSignin, async (req, res) => {
    try {
        const { resId, itemId } = req?.params;
        const userId = req?.user?._id;
        if (!resId || !itemId) {
            throw new Error("Invalid Fields")
        }
        const existingCart = await Cart.findOne({ userId, restaurantId: resId, "items.menuItem": itemId });
        if (!existingCart) {
            throw new Error("Item is not Available in Cart")
        }
        /*
        4 conndtions 
        if length > 1 in items 
            - if quantity is 1 means remove the whole object 
            - if quantity is > 1 means subtract one
        if length 1 in items
            - if quantity is 1 means remove the whole object or else set items = []
            - if quantity is > 1 means subtract one
        */
        const decrementCart = await Cart.findOneAndUpdate({
            userId, restaurantId: resId, items: {
                $elemMatch: {
                    menuItem: itemId,
                    quantity: { $gt: 1 }
                }
            }
        }, {
            $inc: { "items.$.quantity": -1 }
        });
        if (decrementCart) return { cart: decrementCart, emptied: false }
        const pulledCart = await Cart.findOneAndUpdate(
            {
                userId,
                restaurantId: resId,
                "items.menuItem": itemId,
            },
            {
                $pull: { items: { menuItem: new mongoose.Types.ObjectId(itemId) } },
            },
            { new: true }
        );
        if (pulledCart.items.length === 0) {
            await Cart.findByIdAndDelete(pulledCart._id);
            return { cart: null, emptied: true }
        }

    }
    catch (err) {
        console.log(err, 'err - 75 CartRoute');
        res.status(500).send("error" + err?.message)
    }
})

cartRoute.get("/cartitems", AuthSignin, async (req, res) => {
    try {
        const userId = req?.user?._id;
        const cartitems = await Cart.findOne({ userId , status: "ACTIVE" });
        return res.status(200).json(cartitems);

    }
    catch (err) {
        console.log(err, "err")
        res.status(500).send("Error :" + err?.message)
    }
})
module.exports = cartRoute;