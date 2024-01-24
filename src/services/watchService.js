const Watch = require('../models/Watch');

exports.create = (watch) => Watch.create(watch);

exports.getAll = () => Watch.find().sort({ createdAt: -1 });

exports.getWatchesByType = (type) => Watch.find({ type: type }).sort({ createdAt: -1 });