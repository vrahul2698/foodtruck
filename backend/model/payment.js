const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
        required: true
    },
    orderId: { type: String, required: true },
    paymentId: { type: String },
    currency: { type: String, required: false },
    receipt: { type: String, required: false },
    status: { type: String, required: true },
    amount: { type: Number, required: true },
    amountInRupees: { type: Number, required: false },
    notes:{
        firstName : { type: String, required: false },
        lastName : { type: String, required: false },
        firstName : { type: String, required: false },
        firstName : { type: String, required: false },
    }

}, { timestamps: true })

module.exports = mongoose.model("payments", paymentSchema)