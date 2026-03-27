const express = require("express");
const { AuthSignin } = require("../middleware/AuthSignin");
const paymentRoute = express.Router();
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../model/payment");
paymentRoute.post("/payment/create", AuthSignin, async (req, res) => {
    try {
        const { amount, currency = "INR", restaurantId } = req?.body;
        if (!amount) {
            throw new Error("Amount is Required")
        }
        const order = await razorpayInstance.orders.create({
            "amount": amount * 100, //paisa
            "currency": currency,
            "receipt": "receipt#1",
            "notes": {
                firstName: "Rahul",
                lastName: "Str",
                membershipType: "Gold",
                emailId: "rahul.str@example.com"
            }
        });
        let paymentCreate = new Payment({
            userId: req.user._id,
            restaurantId,
            receipt: order.receipt,
            amount: order.amount,
            amountInRupees: order.amount / 100,
            orderId: order.id,
            currency: order.currency,
            status: order.status,
            notes: order.notes
        });
        paymentCreate = await paymentCreate.save();
        console.log(order, "order")
        res.status(200).send({ data :paymentCreate, message: "Order Created Successfully" })

    }
    catch (err) {
        console.log(err, "Payment-Create")
    }

})

module.exports = paymentRoute;