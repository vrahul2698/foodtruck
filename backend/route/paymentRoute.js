const express = require("express");
const { AuthSignin } = require("../middleware/AuthSignin");
const paymentRoute = express.Router();
const razorpayInstance = require("../utils/razorpay");
paymentRoute.post("/payment/create", AuthSignin, async (req, res) => {
    try {
        const order = await razorpayInstance.orders.create({
            "amount": 200 * 100, //paisa
            "currency": "INR",
            "receipt": "receipt#1",
            "notes": {
                firstName: "Rahul",
                lastName: "Str",
                membershipType: "Gold",
                emailId: "rahul.str@example.com"
            }
        });
        console.log(order, "order")
        res.status(200).send({ data: order, message: "Order Created Successfully" })

    }
    catch (err) {
        console.log(err, "Payment-Create")
    }

})

module.exports = paymentRoute;