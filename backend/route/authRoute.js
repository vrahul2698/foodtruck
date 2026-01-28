// This page contains an
/*
signin,signup logics
*/

const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user');
const { validateSignUpData } = require('../validation/validator');


authRouter.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, age, emailId, password, phoneNumber } = req?.body;
        validateSignUpData(req);
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName, lastName, age, emailId,
            password: passwordHash, phoneNumber

        });
        const savedUser = await newUser.save();
        const token = savedUser.getJWT();
        console.log(token, "token")
        res.cookie("token", token)
        res.status(200).json({ message: "Recieved Successfully" });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Email already registered. Please Use Different MailId."
            });
        }

        // Validation errors
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        // Generic fallback
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later."
        });
    }
})

module.exports = authRouter;