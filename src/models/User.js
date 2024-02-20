const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    wishlist: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Watch'
        }
    ],
    cart: [
        {
            watch: {
                type: mongoose.Types.ObjectId,
                ref: 'Watch'
            },
            qty: {
                type: Number
            }
        }
    ],
    myOrders: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Order'
        }
    ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;