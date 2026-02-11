const express = require('express');
const itemsCategoryRoute = express.Router();
const { AuthSignin, AllowedRoles } = require("../middleware/AuthSignin");
const MenuCategory = require("../model/menuCategory");
const MenuVariant = require("../model/menuVariants");
const Restaurant = require("../model/restaurants");
const { validateMenuCategoryCreate, AllowedMenuCategoryFields } = require("../utils/itemsValidator");
// Create food Items 
itemsCategoryRoute.post("/itemscategory", AuthSignin, AllowedRoles, async (req, res) => {

    try {
        // validate
        validateMenuCategoryCreate(req);
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
            ownerId:req.user._id,
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
        return res.status(500).json({ success: false, message: "Error : " + err.message })
    }
})

itemsCategoryRoute.patch("/itemscategory/edit/:id", AuthSignin, AllowedRoles, async (req, res) => {
    try {
        const id = req?.params?.id
        AllowedMenuCategoryFields(req);
        const exists = await MenuCategory.findById(id);
        if (!exists) {
            return res.status(400).json({ success: false, message: "Item master not found" });
        }
        const itemCategory = await MenuCategory.findByIdAndUpdate(id, req?.body);
        return res.status(200).json({ success: true, message: "Updated Successfully" });
    }
    catch (err) {
        return res.status(400).send("Error : " + err.message);
    }
});


itemsCategoryRoute.delete("/itemscategory/delete/:id", AuthSignin, AllowedRoles, async (req, res) => {
    try {
        const id = req?.params?.id
        const exists = await MenuCategory.findById(id);
        if (!exists) {
            return res.status(400).json({ success: false, message: "Item master not found" });
        }
        const itemCategory = await MenuCategory.findByIdAndUpdate(id, { isDeleted: true });
        return res.status(200).json({ success: true, message: "Deleted Successfully" });
    }
    catch (err) {
        return res.status(400).send("Error : " + err.message);
    }
})

module.exports = itemsCategoryRoute;