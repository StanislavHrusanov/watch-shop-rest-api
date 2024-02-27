const router = require('express').Router();
const { isLoggedIn } = require('../middlewares/authMiddleware');
const { isNotAdmin } = require('../middlewares/routGuards');
const myProfileService = require('../services/myProfileService');
const watchService = require('../services/watchService');
const { mapErrors } = require('../utils/errorMapper');

router.get('/userInfo', isLoggedIn, async (req, res) => {
    const userId = req.query.userId;

    try {
        const user = await myProfileService.getUserInfo(userId);
        res.status(200).json(user);

    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

router.put('/userInfo/updateCart', isLoggedIn, isNotAdmin, async (req, res) => {
    const userId = req.query.userId;

    try {
        const updatedUser = await myProfileService.updateUserCart(userId);
        res.json(updatedUser);

    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

router.put('/userInfo/cleanCart', isLoggedIn, isNotAdmin, async (req, res) => {
    const userId = req.query.userId;

    try {
        const updatedUser = await myProfileService.cleanCart(userId);
        res.json(updatedUser);

    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

router.put('/wishlist/update', isLoggedIn, isNotAdmin, async (req, res) => {
    const userId = req.query.userId;
    const watchId = req.query.watchId;

    try {
        const wishlist = await myProfileService.updateWishlist(userId, watchId);
        res.json(wishlist);

    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

router.put('/wishlist/remove', isLoggedIn, isNotAdmin, async (req, res) => {
    const userId = req.query.userId;
    const watchId = req.query.watchId;

    try {
        const wishlist = await myProfileService.removeFromWishlist(userId, watchId);
        res.json(wishlist);

    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

router.put('/cart/add', isLoggedIn, isNotAdmin, async (req, res) => {
    const userId = req.query.userId;
    const watchId = req.query.watchId;
    const qty = Number(req.query.qty);

    try {
        const watch = await watchService.getOne(watchId);
        if (watch.quantity < qty) {
            throw 'Недостатъчна наличност!';
        }
        const cart = await myProfileService.addToCart(userId, watchId, qty);
        res.json(cart);
    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

router.put('/cart/remove', isLoggedIn, isNotAdmin, async (req, res) => {
    const userId = req.query.userId;
    const watchId = req.query.watchId;

    try {

        const cart = await myProfileService.removeFromCart(userId, watchId);
        res.json(cart);
    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

router.put('/cart/decreaseQty', isLoggedIn, isNotAdmin, async (req, res) => {
    const userId = req.query.userId;
    const watchId = req.query.watchId;
    const qty = Number(req.query.qty);

    try {
        const watch = await watchService.getOne(watchId);

        if (watch.quantity == 0) {
            const cart = await myProfileService.decreaseQty(userId, watchId, 0);
            res.json(cart);

        } else {
            const cart = await myProfileService.decreaseQty(userId, watchId, qty);
            res.json(cart);
        }
    } catch (err) {
        console.error(err);
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

module.exports = router;