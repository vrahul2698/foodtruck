const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
        trim: true
    },
    isOpened: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    cuisines: {
        type: [String],
        index: true
    },
    restaurantImage: {
        logo: String,
        banner: String,
    },
    contact: {
        email: {
            type: String,
            trim: true
        },
        phone: {
            type: String,
            trim: true,
        }
    },
    address: {
        line1: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            index: true
        },
        state: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true,
             // Indian pincode
        }
    },

    rating: {
        avg: { type: Number, default: 0 },
        count: { type: Number, default: 0 },
    },
    isApproved: {
        type: Boolean,
        default: false,
        index: true
    },


}, { timestamps: true });

restaurantSchema.index({ isApproved: 1, isOnline: 1 });

module.exports = mongoose.model('Restaurant', restaurantSchema)