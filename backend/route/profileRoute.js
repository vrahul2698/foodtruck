const User = require('../model/user');
const express = require('express');
const profileRoute = express.Router();
const { AuthSignin } = require("../middleware/AuthSignin");
const { validateProfileEditData } = require('../utils/validator');

profileRoute.get("/profile", AuthSignin, async (req, res) => {
    try {
        const user = req?.user;
        res.send(user)

    }
    catch (err) {
        res.status(400).send("Error :" + err.message)
    }

})

profileRoute.patch("/profile/edit", AuthSignin, async (req, res) => {
    try {
        validateProfileEditData(req);
        const userId = req.user?._id
        const user = await User.findByIdAndUpdate(userId, req?.body);
        res.send("User Update Successfully")

    }
    catch (err) {
        res.status(400).send("Error :" + err.message)
    }

})

module.exports = profileRoute;
