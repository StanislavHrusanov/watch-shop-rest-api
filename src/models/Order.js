const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    status: {
        type: String,
        default: 'Pending'
    },
    buyer: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    items: [
        {
            title: {
                type: String
            },
            price: {
                type: Number
            },
            quantity: {
                type: Number
            },
            imageUrl: {
                type: String
            }
        }
    ],
    totalPrice: {
        type: Number
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;