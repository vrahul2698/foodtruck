const express = require("express");
const itemsMasterRoute = express.Router();
const MenuItem = require("../model/menuItem");
const Restaurant = require("../model/restaurants");
const MenuCategory = require("../model/menuCategory");
const { validateMenuItemsCreate, AllowedMenuItemsFields } = require("../utils/itemsValidator");
const { AuthSignin, AllowedRoles } = require("../middleware/AuthSignin");

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

module.exports = itemsMasterRoute;