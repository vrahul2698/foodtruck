const express = require("express");
const itemsMasterRoute = express.Router();
const MenuItem = require("../model/menuItem");
const Restaurant = require("../model/restaurants");
const MenuCategory = require("../model/menuCategory");
const { validateMenuItemsCreate, AllowedMenuItemsFields } = require("../utils/itemsValidator");
const { AuthSignin, AllowedRoles } = require("../middleware/AuthSignin");
const mongoose = require('mongoose');
itemsMasterRoute.post("/menuitems/create", AuthSignin, AllowedRoles, async (req, res) => {
    try {
        //    console.log(req?.body, "req?.body")
        validateMenuItemsCreate(req);
        const { restaurantId, categoryId, name, description, foodType, basePrice, image } = req.body;
        const restaurant = await Restaurant.findOne({
            isDeleted: false,
            _id: restaurantId,
            ownerId: req.user._id,
        });
        if (!restaurant) {
            throw new Error("You are not allowed to add Items to this restaurant");
        }
        const category = await MenuCategory.findOne({
            isDeleted: false,
            restaurantId: restaurantId,
            _id: categoryId,
            ownerId: req.user._id,
        });
        if (!category) {
            throw new Error("You are not allowed to add Items to this Category");
        }

        const exists = await MenuItem.findOne({
            name, restaurantId,
            categoryId,
        });
        if (exists) {
            throw new Error("Menu Items Already Exists")
        }
        const menuItems = new MenuItem({
            name,
            restaurantId,
            categoryId,
            description,
            foodType,
            basePrice,
            image

        });
        await menuItems.save();
        return res.status(201).json({
            success: true,
            message: "Menu Items Added Successfully"
        });
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
})
itemsMasterRoute.patch("/menuitems/edit/:id", AuthSignin, AllowedRoles, async (req, res) => {
    try {
        const id = req?.params?.id;
        const { itemname, description, foodType, basePrice, image } = req.body;

        AllowedMenuItemsFields(req);
        const exists = await MenuItem.findById(id);
        if (!exists) {
            return res.status(400).json({ success: false, message: "Menu Item not found" });
        }
        const itemCategory = await MenuItem.findByIdAndUpdate(id, {
            name: itemname, description, foodType, basePrice, image
        });
        return res.status(200).json({ success: true, message: "Updated Successfully" });
    }
    catch (err) {
        return res.status(400).send("Error : " + err.message);
    }
});
itemsMasterRoute.delete("/menuitems/delete/:id", AuthSignin, AllowedRoles, async (req, res) => {
    try {
        const id = req?.params?.id
        const exists = await MenuItem.findById(id);
        if (!exists) {
            return res.status(400).json({ success: false, message: "Menu Item not found" });
        }
        const menuItem = await MenuItem.findByIdAndUpdate(id, { isDeleted: true });
        return res.status(200).json({ success: true, message: "Deleted Successfully" });
    }
    catch (err) {
        return res.status(400).send("Error : " + err.message);
    }
})
itemsMasterRoute.get("/restaurantmenu/:id", AuthSignin, AllowedRoles, async (req, res) => {
    try {
        const id = req?.params?.id;
        // console.log(id, "id")
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid restaurantId");
        }
        const result = await MenuItem.aggregate([
            { $match: { restaurantId: new mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: "menucategories",     // check your exact collection name
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "category"
                }
            },
            { $unwind: "$category" },

            // Group by category
            {
                $group: {
                    _id: "$category._id",
                    categoryName: { $first: "$category.name" },
                    items: {
                        $push: {
                            _id: "$_id",
                            name: "$name",
                            foodType: "$foodType",
                            description: "$description",
                            basePrice: "$basePrice",
                            rating: "$rating",
                            image: "$image"
                        }
                    }
                }
            },

            { $sort: { categoryName: 1 } },

            // Group ALL categories into one document
            {
                $group: {
                    _id: null,
                    categories: {
                        $push: {
                            _id: "$_id",
                            name: "$categoryName",
                            items: "$items"
                        }
                    }
                }
            },

            // NOW lookup restaurant (pipeline-only, no localField)
            {
                $lookup: {
                    from: "restaurants",
                    pipeline: [
                        { $match: { _id: new mongoose.Types.ObjectId(id) } },
                        { $project: { name: 1, description: 1, rating: 1, address: 1,isOpened:1, contact: 1, cuisines: 1 } }
                    ],
                    as: "restaurantData"
                }
            },

            { $unwind: "$restaurantData" },

            // Shape the final output
            {
                $project: {
                    _id: 0,
                    restaurant: {
                        _id: "$restaurantData._id",
                        name: "$restaurantData.name",
                        description: "$restaurantData.description",
                        rating: "$restaurantData.rating",
                        address: "$restaurantData.address",
                        contact: "$restaurantData.contact",
                        cuisines: "$restaurantData.cuisines",
                        isOpened: "$restaurantData.isOpened",
                        categories: "$categories"
                    }
                }
            }
        ]);

        return res.status(200).json({
            success: true,
            restaurant: result[0]?.restaurant || null,
            message: "Fetched Successfully"
        });
    }
    catch (err) {
        console.log(err, "err")
        return res.status(400).send("Error : " + err.message);
    }
})

module.exports = itemsMasterRoute;