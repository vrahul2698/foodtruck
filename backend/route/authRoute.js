// This page contains an
/*
signin,signup logics
*/

const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user');
const { validateSignUpData } = require('../utils/validator');


authRouter.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, age, emailId, password, phoneNumber, photoUrl, userStatus } = req?.body;
        validateSignUpData(req);
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName, lastName, age, emailId, photoUrl,
            password: passwordHash, phoneNumber, userStatus

        });
        const savedUser = await newUser.save();
        const token = await savedUser.getJWT();
        res.cookie("token", token)
        res.status(200).json({ message: "User Added Successfully" });
    }
    catch (error) {
        //console.log(error , "error")
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
            message: error?.message
        });
    }
})
authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req?.body;
        console.log(emailId, password)
        if (!emailId) {
            return res.status(400).json({
                success: false,
                message: "Please Enter Email ID..!"
            });
        } if (!password) {
            return res.status(400).json({
                success: false,
                message: "Please Enter Password..!"
            });
        }

        const userdetails = await User.findOne({ emailId });
        if (!userdetails) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }
        const passwordCompare = await userdetails.validatePassword(password);
        if (!passwordCompare) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }
        else {
            const token = await userdetails.getJWT();
            console.log(token, "TOken")
            res.cookie("token", token)
            return res.send(userdetails);

        }


    }
    catch (error) {
        // Generic fallback
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later."
        });
    }
})

module.exports = authRouter;