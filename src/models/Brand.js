const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    brand: {
        type: String
    },
    imageUrl: {
        type: String
    }
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;