const Watch = require('../models/Watch');
const Brand = require('../models/Brand');

exports.create = (watch) => Watch.create(watch);

exports.getAll = () => Watch.find().sort({ createdAt: -1 });

exports.getAllPaginated = (filteredBy, sortedBy, page, limit) => Watch.find(filteredBy).sort(sortedBy).limit(limit * 1).skip((page - 1) * limit);

exports.getWatchesCount = (type, brand, searched) => Watch.countDocuments({ ...type, ...brand, "title": { $regex: searched, $options: "i" } });

exports.getWatchesByBrand = (brand, type, sortedBy, page, limit) => Watch.find({ ...brand, ...type }).sort(sortedBy).limit(limit * 1).skip((page - 1) * limit);

exports.getOne = (watchId) => Watch.findById(watchId);

exports.edit = (watchId, watchData) => Watch.findByIdAndUpdate(watchId, watchData);

exports.delete = (watchId) => Watch.findByIdAndDelete(watchId);

exports.getBrandsLogo = () => Brand.find().sort({ brand: 1 });

exports.addBrand = (brand) => Brand.create(brand);

exports.getSimilarWatches = (brand, watchId) => Watch.find({ brand: brand, _id: { $nin: [watchId] } }).sort({ createdAt: -1 }).limit(4);

exports.updateWatchesQty = async (items) => {
    const ids = items.map(x => x._id);
    const qty = items.map(x => x.quantity);

    for (let i = 0; i < ids.length; i++) {
        const watch = await Watch.findById(ids[i]);
        watch.quantity -= qty[i];

        await watch.save()
    }
    return;
}

exports.search = (searched, filteredBy, sortedBy, page, limit) => Watch
    .find({ "title": { $regex: searched, $options: "i" }, ...filteredBy })
    .sort(sortedBy)
    .limit(limit * 1)
    .skip((page - 1) * limit);