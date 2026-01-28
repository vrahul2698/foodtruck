const mongoose = require("mongoose");
const jwttoken = require("jsonwebtoken");

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
        }
    },
    { timestamps: true }
);

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwttoken.sign({ _id: user._id }, "Rahul2698")
    return token

}
module.exports = mongoose.model("User", userSchema);
