const mongoose = require('mongoose');
const watchSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    salePrice: {
        type: Number
    },
    type: {
        type: String,
        required: true
    },
    movement: {
        type: String,
        required: true
    },
    glass: {
        type: String,
        required: true
    },
    waterResistance: {
        type: String,
        required: true
    },
    diameter: {
        type: String,
        required: true
    },
    bodyMaterial: {
        type: String,
        required: true
    },
    strapMaterial: {
        type: String,
        required: true
    },
    warrantyInYears: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: Array
    },
    reviews: [{
        owner: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        reting: {
            type: Number
        },
        comment: {
            type: String
        }
    }, { timestamps: true }]
}, { timestamps: true });

const Watch = mongoose.model('Watch', watchSchema);

module.exports = Watch;