const Order = require('../models/Order');

exports.createOrder = (order) => Order.create(order);

exports.getAll = () => Order.find().sort({ createdAt: -1 }).populate('buyer');

exports.getSpecificUserOrders = (userId) => Order.find({ buyer: userId }).sort({ createdAt: -1 });

exports.changeOrderStatus = async (orderId) => {
    const order = await Order.findById(orderId);

    order.status = 'Sent';

    await order.save();

    return order.status;
}

