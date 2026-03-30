const express = require("express");
const { AuthSignin } = require("../middleware/AuthSignin");
const paymentRoute = express.Router();
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../model/payment");
const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils');
const Cart = require("../model/cart");

paymentRoute.post("/payment/create", AuthSignin, async (req, res) => {
    try {
        const { amount, currency = "INR", restaurantId} = req?.body;
        if (!amount) {
            throw new Error("Amount is Required")
        }
        const cartId = await Cart.findOne({ userId: req.user._id, restaurantId, status: "ACTIVE" }).select("_id");

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
            cartId,
            receipt: order.receipt,
            amount: order.amount,
            amountInRupees: order.amount / 100,
            orderId: order.id,
            currency: order.currency,
            status: order.status,
            notes: order.notes
        });
        paymentCreate = await paymentCreate.save();
        // console.log(order, "order")
        res.status(200).send({ ...paymentCreate.toJSON(), keyId: process.env.RAZORPAY_KEY_ID })

    }
    catch (err) {
        console.log(err, "Payment-Create")
    }

})

paymentRoute.post("/payment/verify", async (req, res) => {
    try {
        const webHookSignature = req.get["X-Razorpay-Signature"];
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
        const isValidSignature = validateWebhookSignature(req.body, webHookSignature, secret);
        if (!isValidSignature) {
            return res.status(400).send("Invalid Signature");
        }
        const paymentDetails = req.body.payload.payment.entity;
        const paymentRecord = await Payment.findOne({ orderId: paymentDetails.order_id });
        paymentRecord.status = paymentDetails.status;
         await Cart.findByIdAndUpdate(paymentRecord.cartId,{status: "ORDER_PLACED"},{new: true});
    }
    catch (err) {
        console.log(err, "Payment-Verify")
    }
})

module.exports = paymentRoute;