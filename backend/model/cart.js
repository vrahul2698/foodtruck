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
    status: { type: String, enum: ["ACTIVE", "ORDER_PLACED"], default: "ACTIVE" }
}, { timestamps: true });

cartSchema.virtual("totalPrice").get(function () {
    if (!this.items || !Array.isArray(this.items)) return 0;
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

cartSchema.set("toJSON", { virtuals: true })
cartSchema.set("toObject", { virtuals: true })

module.exports = mongoose.model("Cart", cartSchema)