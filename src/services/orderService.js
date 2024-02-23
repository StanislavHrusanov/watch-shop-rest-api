const Order = require('../models/Order');

exports.createOrder = (order) => Order.create(order);

