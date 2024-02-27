const router = require('express').Router();
const { isLoggedIn } = require('../middlewares/authMiddleware');
const { isNotAdmin, isAdmin } = require('../middlewares/routGuards');
const orderService = require('../services/orderService');
const watchService = require('../services/watchService');
const { mapErrors } = require('../utils/errorMapper');

router.post('/', isLoggedIn, isNotAdmin, async (req, res) => {
    const order = req.body;

    try {
        await watchService.updateWatchesQty(order.items);
        const createdOrder = await orderService.createOrder(order);
        res.status(201).json(createdOrder);

    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

router.get('/', isLoggedIn, isAdmin, async (req, res) => {
    try {
        const allOrders = await orderService.getAll();
        res.status(200).json(allOrders);

    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

router.get('/specificUserOrders', isLoggedIn, async (req, res) => {
    const userId = req.query.userId;
    try {
        const userOrders = await orderService.getSpecificUserOrders(userId);
        res.status(200).json(userOrders);

    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

router.put('/changeOrderStatus', isLoggedIn, isAdmin, async (req, res) => {
    const orderId = req.query.orderId;
    try {
        const changedStatus = await orderService.changeOrderStatus(orderId);
        res.status(200).json(changedStatus);

    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

module.exports = router;