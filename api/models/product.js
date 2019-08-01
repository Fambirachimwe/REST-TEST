const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, require: true},
    price: {type: Number, require: true},
    productImage: {type: String, required: true}

});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;