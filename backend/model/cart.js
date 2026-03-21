const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    items: [{
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
        name: { type: String },
        price: { type: Number },
        quantity: { type: Number, default: 1 },
        image: String
    }],
    totalPrice: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema)