const Watch = require('../models/Watch');
const Brand = require('../models/Brand');

exports.create = (watch) => Watch.create(watch);

exports.getAll = () => Watch.find().sort({ createdAt: -1 });

exports.getAllPaginated = (filteredBy, sortedBy, page, limit) => Watch.find(filteredBy).sort(sortedBy).limit(limit * 1).skip((page - 1) * limit);

exports.getWatchesCount = (type, brand) => Watch.countDocuments({ ...type, ...brand });

exports.getWatchesByBrand = (brand, page, limit) => Watch.find({ brand: brand }).sort({ createdAt: -1 }).limit(limit * 1).skip((page - 1) * limit);

exports.getWatchesByBrandCount = (brand) => Watch.countDocuments({ brand: brand });

exports.getOne = (watchId) => Watch.findById(watchId);

exports.edit = (watchId, watchData) => Watch.findByIdAndUpdate(watchId, watchData);

exports.delete = (watchId) => Watch.findByIdAndDelete(watchId);

exports.getBrandsLogo = () => Brand.find().sort({ brand: 1 });

exports.addBrand = (brand) => Brand.create(brand);