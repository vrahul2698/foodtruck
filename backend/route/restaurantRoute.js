const express = require("express");
const { AuthSignin } = require("../middleware/AuthSignin");
const { RestaurantCheck, AllowedRoles, ValidateRestaurantEditFields } = require("../utils/restaurantCheck");
const Restaurant = require("../model/restaurants");
const restaurantRouter = express.Router();

// Need to add Admin Role checks
restaurantRouter.post("/restaurant", AuthSignin, RestaurantCheck, async (req, res) => {
    try {
        const { name, description, cuisines, restaurantImage, contact, address, rating } = req?.body;
        const ownerId = req.user._id;
        const query = { name, description, ownerId, cuisines, restaurantImage, contact, address, rating };

        const exists = await Restaurant.findOne({
            name,
            ownerId,
            isDeleted: false
        });

        if (exists) {
            return res.status(409).json({
                success: false,
                message: "Restaurant already exists"
            });
        }
        const restaurant = new Restaurant(query);
        await restaurant.save();
        res.status(201).send("Restaurant Created Successfully");
    }
    catch (err) {
        res.status(400).send("Error : " + err.message)
    }
})


restaurantRouter.get("/restaurants", AuthSignin, AllowedRoles, async (req, res) => {
    try {
        const user = req?.user;
        let filter = {
            // isApproved: true,
            isDeleted: false
        }
        if (user?.userStatus !== "ADMIN") {
            filter.ownerId = user?._id;
        }
        const restaurants = await Restaurant.find(filter)
            .select("name cuisines isOpened rating address restaurantImage")
            .populate("ownerId", "firstName lastName")
            .lean();
        return res.status(200).json({
            success: true,
            count: restaurants.length,
            data: restaurants
        });
    }
    catch (err) {
        res.status(400).send("Error : " + err.message)
    }
})

restaurantRouter.patch("/restaurant/edit/:id", AuthSignin, AllowedRoles, async (req, res) => {
    try {
        ValidateRestaurantEditFields(req);
        const restaurantId = req.params.id;
        const restaurant = await Restaurant.findByIdAndUpdate(restaurantId, req.body)
        return res.status(200).send({ success: true, message: "Restaurant updated successfully" })
    }
    catch (err) {
        return res.status(400).send("Error : " + err.message)
    }
})


module.exports = restaurantRouter

