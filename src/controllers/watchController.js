const router = require('express').Router();
const watchService = require('../services/watchService');
const validation = require('../utils/validation');
const { mapErrors } = require('../utils/errorMapper');
const { isAdmin } = require('../middlewares/routGuards');
const { sortedBy } = require('../utils/sortedBy');
const { types } = require('../utils/types');
const { brands } = require('../utils/brands');

router.post('/', isAdmin, async (req, res) => {
    const watch = {
        title: req.body.title,
        brand: req.body.brand,
        model: req.body.model,
        imageUrl: req.body.imageUrl,
        price: Number(req.body.price),
        type: req.body.type,
        movement: req.body.movement,
        glass: req.body.glass,
        waterResistance: req.body.waterResistance,
        diameter: req.body.diameter,
        bodyMaterial: req.body.bodyMaterial,
        strapMaterial: req.body.strapMaterial,
        warrantyInYears: req.body.warrantyInYears,
        quantity: Number(req.body.quantity),
        description: req.body.description
    };

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
    let filteredByCriteria = req.query.filteredByCriteria;
    let sortedByCriteria = req.query.sortedByCriteria;
    let page = req.query.page ? Number(req.query.page) : 1;
    let limit = req.query.limit ? Number(req.query.limit) : 12;

    try {
        const watches = await watchService.getAllPaginated(types[filteredByCriteria], sortedBy[sortedByCriteria], page, limit);
        res.status(200).json(watches);

    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
});

router.get('/similarWatches', async (req, res) => {
    const brand = req.query.brand;
    const watchId = req.query.watchId;

    try {
        const similarWatches = await watchService.getSimilarWatches(brand, watchId);
        res.status(200).json(similarWatches);

    } catch (err) {
        const error = mapErrors(err);
        console.error(error);
        res.status(400).json({ message: error });
    }
})

router.get('/count', async (req, res) => {
    const type = req.query.type;
    const brand = req.query.brand;
    try {
        const count = await watchService.getWatchesCount(types[type], brands[brand]);
        res.status(200).json(count);

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

router.get('/brands', async (req, res) => {
    const brand = req.query.brand;
    const type = req.query.type;
    const sortedByCriteria = req.query.sortedByCriteria;
    let page = req.query.page ? Number(req.query.page) : 1;
    let limit = req.query.limit ? Number(req.query.limit) : 12;

    try {
        const watches = await watchService.getWatchesByBrand(brands[brand], types[type], sortedBy[sortedByCriteria], page, limit);
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
    const watchData = {
        title: req.body.title,
        brand: req.body.brand,
        model: req.body.model,
        imageUrl: req.body.imageUrl,
        price: Number(req.body.price),
        oldPrice: Number(req.body.oldPrice),
        type: req.body.type,
        movement: req.body.movement,
        glass: req.body.glass,
        waterResistance: req.body.waterResistance,
        diameter: req.body.diameter,
        bodyMaterial: req.body.bodyMaterial,
        strapMaterial: req.body.strapMaterial,
        warrantyInYears: req.body.warrantyInYears,
        quantity: Number(req.body.quantity),
        description: req.body.description
    };

    try {
        validation.validateWatch(watchData);
        const editedWatch = await watchService.edit(watchId, watchData);
        res.json(editedWatch);

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