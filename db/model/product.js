const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
});

module.exports = mongoose.model('Product', productSchema);
