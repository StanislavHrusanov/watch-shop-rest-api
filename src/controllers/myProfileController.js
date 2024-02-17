const router = require('express').Router();
const myProfileService = require('../services/myProfileService');

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

router.get('/wishlist', async (req, res) => {
    const userId = req.query.userId;

    try {
        const wishlist = await myProfileService.getUserWishlist(userId);
        res.status(200).json(wishlist);

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



module.exports = router;