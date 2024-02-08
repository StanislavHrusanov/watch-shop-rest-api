const Watch = require('../models/Watch');
const Brand = require('../models/Brand');

exports.create = (watch) => Watch.create(watch);

exports.getAll = () => Watch.find().sort({ createdAt: -1 });

exports.getWatchesByType = (type) => Watch.find({ type: type }).sort({ createdAt: -1 });

exports.getOne = (watchId) => Watch.findById(watchId);

exports.edit = (watchId, watchData) => Watch.findByIdAndUpdate(watchId, watchData);

exports.delete = (watchId) => Watch.findByIdAndDelete(watchId);

exports.getBrandsLogo = () => Brand.find().sort({ brand: 1 });

exports.addBrand = (brand) => Brand.create(brand);