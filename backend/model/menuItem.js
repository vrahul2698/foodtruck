const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
        index: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuCategory",
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: String,
    foodType: {
        type: String,
        enum: ["VEG", "NON_VEG", "EGG"],
        required: true,
        index: true
    },
    basePrice: {
        type: Number,
        required: true
    },
    discountPercent: {
        type: Number,
        default: 0,
        min: 0,
        max: 90
    },
    image: {
        type: String // S3 / Cloudinary URL
    },
    rating: {
        avg: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isAvailable: {
        type: Boolean,
        default: false,
        index: true
    },
}, { timestamps: true })

module.exports = mongoose.model("MenuItem", menuItemSchema)