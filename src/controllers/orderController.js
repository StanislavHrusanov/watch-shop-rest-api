const router = require('express').Router();
const orderService = require('../services/orderService');
const watchService = require('../services/watchService');
const { mapErrors } = require('../utils/errorMapper');

router.post('/', async (req, res) => {
    const order = req.body;

    try {
        await watchService.updateWatchesQty(order.items);
        const createdOrder = await orderService.createOrder(order);
        res.status(201).json(createdOrder);

    } catch (err) {
        console.error(err);
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

router.get('/', async (req, res) => {
    try {
        const allOrders = await orderService.getAll();
        res.status(200).json(allOrders);

    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

module.exports = router;