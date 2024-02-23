const Order = require('../models/Order');

exports.createOrder = (order) => Order.create(order);

exports.getAll = () => Order.find().sort({ createdAt: -1 });;

