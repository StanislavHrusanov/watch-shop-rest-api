const router = require('express').Router();
const watchService = require('../services/watchService');
const validation = require('../utils/validation');
const { mapErrors } = require('../utils/errorMapper');
const { isAdmin } = require('../middlewares/routGuards');

router.post('/', async (req, res) => {
    const watch = req.body;

    try {
        validation.validateWatch(watch);
        const createdWatch = await watchService.create(watch);
        res.status(201).json(createdWatch);

    } catch (err) {
        console.log(err);
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

router.get('/paginated', async (req, res) => {
    let page = req.query.page ? Number(req.query.page) : 1;
    let limit = req.query.limit ? Number(req.query.limit) : 12;

    try {
        const watches = await watchService.getAllPaginated(page, limit);
        res.status(200).json(watches);

    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

router.get('/count', async (req, res) => {
    try {
        const count = await watchService.getWatchesCount();
        res.status(200).json(count);

    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

router.get('/count/types/:type', async (req, res) => {
    const type = req.params.type;
    try {
        const count = await watchService.getWatchesByTypeCount(type);
        res.status(200).json(count);

    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

router.get('/count/brands/:brand', async (req, res) => {
    const brand = req.params.brand;
    try {
        const count = await watchService.getWatchesByBrandCount(brand);
        res.status(200).json(count);

    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

router.get('/types/:type', async (req, res) => {
    const type = req.params.type;
    let page = req.query.page ? Number(req.query.page) : 1;
    let limit = req.query.limit ? Number(req.query.limit) : 12;

    try {
        const watches = await watchService.getWatchesByType(type, page, limit);
        res.status(200).json(watches);

    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

router.get('/brandsLogo', async (req, res) => {
    try {
        const brands = await watchService.getBrandsLogo();
        res.status(200).json(brands);

    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

router.get('/brands/:brand', async (req, res) => {
    const brand = req.params.brand;
    let page = req.query.page ? Number(req.query.page) : 1;
    let limit = req.query.limit ? Number(req.query.limit) : 12;

    try {
        const watches = await watchService.getWatchesByBrand(brand, page, limit);
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

router.put('/:watchId', isAdmin, async (req, res) => {
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

router.delete('/:watchId', isAdmin, async (req, res) => {
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

router.post('/brandsLogo', async (req, res) => {
    const brand = req.body;
    try {
        const createBrand = await watchService.addBrand(brand);
        res.status(201).json(createBrand);

    } catch (err) {
        console.log(err);
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

module.exports = router;