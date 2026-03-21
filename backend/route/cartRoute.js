const express = require("express");
const { AuthSignin } = require("../middleware/AuthSignin");
const Cart = require("../model/cart");
const cartRoute = express.Router();
const MenuItem = require("../model/menuItem");

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
        const cart = await Cart.findOneAndUpdate({userId, 'items.menuItem': foodItemId },
            {
                $inc: {
                    'items.$.quantity': quantity,
                    totalPrice: menuItem.basePrice * quantity
                }
            }, { new: true }
        )
        if (!cart) {
            const updatedCart = await Cart.findOneAndUpdate({userId }, {
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
                $inc: { totalPrice: menuItem.basePrice * quantity }
            }, { new: true, upsert: true });
            return res.status(200).json(updatedCart);
        }
        return res.status(200).json(cart);

    }
    catch (err) {
        console.log(err , "err")
        res.status(500).send("Error :" + err?.message)
    }
})

module.exports = cartRoute;