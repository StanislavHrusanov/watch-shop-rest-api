const router = require('express').Router();
const watchService = require('../services/watchService');
const validation = require('../utils/validation');
const { mapErrors } = require('../utils/errorMapper');

router.post('/', async (req, res) => {
    const watch = req.body;

    try {
        validation.validateWatch(watch);
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
        res.status(200).json(watches);

    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

router.get('/men', async (req, res) => {
    try {
        const watches = await watchService.getWatchesByType('Мъжки');
        res.status(200).json(watches);

    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

router.get('/women', async (req, res) => {
    try {
        const watches = await watchService.getWatchesByType('Дамски');
        res.status(200).json(watches);

    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

router.get('/:watchId', async (req, res) => {
    const watchId = req.params.watchId;

    try {
        const watch = await watchService.getOne(watchId);
        res.status(200).json(watch);

    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

router.put('/:watchId', async (req, res) => {
    const watchId = req.params.watchId;
    const watchData = req.body;

    try {
        validation.validateWatch(watchData);
        const editedWatch = await watchService.edit(watchId, watchData);
        res.status(200).json(editedWatch);

    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

router.delete('/:watchId', async (req, res) => {
    const watchId = req.params.watchId;

    try {
        await watchService.delete(watchId);
        res.status(204).end();

    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});


module.exports = router;