const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },

        lastName: {
            type: String,
            trim: true
        },

        age: {
            type: Number,
            required: true,
            min: 12
        },
        password: {
            type: String,
            required: true,
        },
        photoUrl: {
            type: String,
            default:'https://avatars.githubusercontent.com/u/40992581?v=4'
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Others"]
        },

        phoneNumber: {
            type: String,
            required: true,
            match: /^[0-9]{10}$/
        },

        emailId: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            index: true,
            trim: true
        },

        userStatus: {
            type: String,
            enum: ["USER", "VENDOR", "DELIVERY", "ADMIN"],
            default: "USER"
        },

        isDeleted: {
            type: Boolean,
            default: false
        }

    },
    { timestamps: true }
);
userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordCompare = await bcrypt.compare(passwordInputByUser, user?.password);
    return passwordCompare
}

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "Rahul2698",{expiresIn: "1d" })
    return token;

}
module.exports = mongoose.model("User", userSchema);
