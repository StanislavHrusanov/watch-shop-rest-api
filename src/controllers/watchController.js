const router = require('express').Router();
const watchService = require('../services/watchService');
const { mapErrors } = require('../utils/errorMapper');

router.post('/', async (req, res) => {
    const watch = req.body;

    try {
        const createdWatch = await watchService.create(watch);
        console.log(createdWatch);
        res.status(201).json(createdWatch);
    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});


module.exports = router;