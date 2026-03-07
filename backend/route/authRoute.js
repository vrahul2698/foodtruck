// This page contains an
/*
signin,signup logics
*/

const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user');
const { validateSignUpData } = require('../utils/validator');
const { AuthSignin } = require('../middleware/AuthSignin');
const jwt = require("jsonwebtoken");

authRouter.post("/signup", async (req, res) => {
    // console.log(req?.body, "Hitted")
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
        res.status(200).json({ data: savedUser, message: "User Added Successfully" });
    }
    catch (error) {
        console.log(error?.message, "error")

        if (error.code === 11000) {
            res.status(409).json({
                success: false,
                message: "Email already registered. Please Use Different MailId."
            });
        }

        // Validation errors
        if (error.name === "ValidationError") {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }

        // Generic fallback
        res.status(400).send("Error :" + error?.message);
    }
})
authRouter.post("/login", async (req, res) => {
    try {
        const { phoneNumber, password } = req?.body;
        // console.log(phoneNumber, password)
        if (!phoneNumber) {
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

        const userdetails = await User.findOne({ phoneNumber });
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
            // console.log(token, "TOken")
            const cookieOptions = {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
            };

            res.cookie("token", token, cookieOptions);
            return res.send({ user: userdetails, token });

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

authRouter.post("/logout", async (req, res) => {
    const cookieOptions = {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
    };
    res.clearCookie("token", cookieOptions);
    res.send("Logged Out Successful")
})

authRouter.get("/requestedroles", AuthSignin, async (req, res) => {
    try {
        const { approvedStatus } = req?.query;
        console.log(req?.query , "req?.query")
        const users = await User.find({ isApproved: approvedStatus, isDeleted: false }).select("_id firstName lastName isApproved userStatus requestedRole");
        res.status(200).send({ success: true, users })
    }
    catch (err) {
        res.status(400).send(err?.message)
    }
})

module.exports = authRouter;