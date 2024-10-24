const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productCategory: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  productQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
  productDescription: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,  // URL of the image stored in Firebase or a similar service
    required: true,
  },
},{timestamps:true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
