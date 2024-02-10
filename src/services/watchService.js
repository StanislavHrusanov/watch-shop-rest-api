const Watch = require('../models/Watch');
const Brand = require('../models/Brand');

exports.create = (watch) => Watch.create(watch);

exports.getAll = () => Watch.find().sort({ createdAt: -1 });

exports.getAllPaginated = (page, limit) => Watch.find().sort({ createdAt: -1 }).limit(limit * 1).skip((page - 1) * limit);

exports.getWatchesCount = () => Watch.countDocuments({});

exports.getWatchesByType = (type, page, limit) => Watch.find({ type: type }).sort({ createdAt: -1 }).limit(limit * 1).skip((page - 1) * limit);

exports.getWatchesByTypeCount = (type) => Watch.countDocuments({ type: type });

exports.getOne = (watchId) => Watch.findById(watchId);

exports.edit = (watchId, watchData) => Watch.findByIdAndUpdate(watchId, watchData);

exports.delete = (watchId) => Watch.findByIdAndDelete(watchId);

exports.getBrandsLogo = () => Brand.find().sort({ brand: 1 });

exports.addBrand = (brand) => Brand.create(brand);