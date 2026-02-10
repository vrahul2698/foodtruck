const express = require('express');
const foodItemsRoute = express.Router();
const { AuthSignin, AllowedRoles } = require("../middleware/AuthSignin");
const MenuCategory = require("../model/menuCategory");
const MenuItem = require("../model/menuItem");
const MenuVariant = require("../model/menuVariants");
const Restaurant = require("../model/restaurants");
const { validateItemsCreate } = require("../utils/itemsValidator");
// Create food Items 
foodItemsRoute.post("/itemscategory", AuthSignin, AllowedRoles, async (req, res) => {

    try {
        // validate
        validateItemsCreate(req, "CategoryMaster");
        const { category, restaurantId } = req.body;
        const restaurant = await Restaurant.findOne({
            _id: restaurantId,
            ownerId: req.user._id,
            isDeleted: false
        });

        if (!restaurant) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to add category to this restaurant"
            });
        }
        const exists = await MenuCategory.findOne({
            restaurantId,
            name: category,
            isDeleted: false
        });
        if (exists) {
            return res.status(409).json({ success: false, message: "Menu Catgory Already Exists" })
        }
        const menuCatgeory = new MenuCategory({
            restaurantId,
            name: category,
            ownerId: req.user._id
        });
        await menuCatgeory.save();
        return res.status(201).json({ success: true, message: "Food Items Category Created Successfully" })
    }
    catch (err) {
        return res.status(500).json({success:false , message :"Error : " + err.message})
    }
})

module.exports = foodItemsRoute;