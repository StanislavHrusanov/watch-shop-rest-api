const router = require('express').Router();
const watchService = require('../services/watchService');
const { mapErrors } = require('../utils/errorMapper');

router.post('/', async (req, res) => {
    const watch = req.body;

    try {
        const createdWatch = await watchService.create(watch);
        res.status(201).json(createdWatch);
    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

router.get('/', async (req, res) => {
    try {
        const watches = await watchService.getAll();
        res.json(watches);

    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.json({ message: error });
    }
});

router.get('/men', async (req, res) => {
    try {
        const watches = await watchService.getWatchesByType('Мъжки');
        res.json(watches);

    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.json({ message: error });
    }
});

router.get('/women', async (req, res) => {
    try {
        const watches = await watchService.getWatchesByType('Дамски');
        res.json(watches);

    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.json({ message: error });
    }
});


module.exports = router;