const express = require("express");
const { AuthSignin, AllowedRoles } = require("../middleware/AuthSignin");
const { RestaurantCheck, ValidateRestaurantEditFields } = require("../utils/restaurantCheck");
const Restaurant = require("../model/restaurants");
const restaurantRouter = express.Router();

// Need to add Admin Role checks
restaurantRouter.post("/restaurant", AuthSignin, async (req, res) => {
    try {
        RestaurantCheck(req?.body?.query, req?.user?.userStatus)
        const { name, description, cuisines, restaurantImage, contact, address, resOwnerId, isOpened } = req?.body?.query;
        const ownerId = resOwnerId ? resOwnerId : req.user._id;
        const query = { name, description, ownerId, cuisines, restaurantImage, contact, address, isOpened };
        console.log(query, "query")

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
        return res.status(201).send("Restaurant Created Successfully");
    }
    catch (err) {
        console.log(err.message, 'err')
        res.status(400).send(err.message)
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
restaurantRouter.get("/filteredrestaurants", AuthSignin, AllowedRoles, async (req, res) => {
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
            .select("name")
            .populate("ownerId", "firstName lastName")
            .lean();
        return res.status(200).json({
            success: true,
            count: restaurants.length,
            restaurants
        });
    }
    catch (err) {
        res.status(400).send("Error : " + err.message)
    }
})
restaurantRouter.patch("/restaurant/approved/:id", AuthSignin, async (req, res) => {
    try {
        const ALLOWED_ROLE = "ADMIN";
        if (req?.user?.userStatus !== ALLOWED_ROLE) {
            throw new Error("Access denied")
        }
        const AllowedEditFields = ['isApproved'];
        const checkRestaurantDetails = Object.keys(restaurant).every(field => AllowedEditFields.includes(field));

        if (!checkRestaurantDetails) {
            throw new Error("Invalid Fields")
        }
        const restaurantId = req.params.id;
        const restaurant = await Restaurant.findByIdAndUpdate(restaurantId, req.body)
        return res.status(200).send({ success: true, message: "Restaurant Approved successfully" })
    }
    catch (err) {
        return res.status(400).send("Error : " + err.message)
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
restaurantRouter.patch("/restaurant/delete/:id", AuthSignin, AllowedRoles, async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const restaurant = await Restaurant.findByIdAndUpdate(restaurantId, { isDeleted: true })
        return res.status(200).send({ success: true, message: "Restaurant updated successfully" })
    }
    catch (err) {
        return res.status(400).send("Error : " + err.message)
    }
})


module.exports = restaurantRouter

