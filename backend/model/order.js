const mongoose = require("mongoose");
const menuItem = require("./menuItem");

const orderItemSchema = new mongoose.Schema({
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number, default: 1 },
    image: String
});

const OrderSchema = new mongoose.Schema({
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "payments",
        required: true
    },
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
    items: [orderItemSchema],
    status: {
        type: String,
        enum: ['PLACED', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'],
        default: 'PLACED',
        index: true
    },
    subtotal: Number,
    tax: Number,
    deliveryFee: Number,
    grandTotal: {
        type: Number,
        required: true
    },
    payment: {
        method: {
            type: String,
            enum: ['COD', 'ONLINE'],
            default: 'COD'
        },
        status: {
            type: String,
            enum: ['PENDING', 'SUCCESS', 'FAILED'],
            default: 'PENDING'
        },
        transactionId: String,

    },
    deliveryAddress: {
        line1: String,
        city: String,
        state: String,
        pincode: String,
        phone: String
    },
    deliveryPersonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    placedAt: {
        type: Date,
        default: Date.now
    },

    deliveredAt: Date,

    isCancelled: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


module.exports = mongoose.model("order", OrderSchema)