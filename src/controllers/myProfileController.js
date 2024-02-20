const router = require('express').Router();
const myProfileService = require('../services/myProfileService');
const watchService = require('../services/watchService');

router.get('/userInfo', async (req, res) => {
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

router.put('/wishlist/update', async (req, res) => {
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

router.put('/wishlist/remove', async (req, res) => {
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

router.put('/cart/add', async (req, res) => {
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



module.exports = router;