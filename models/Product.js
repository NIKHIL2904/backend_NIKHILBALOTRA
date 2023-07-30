const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  // Add any other fields specific to the product schema as needed
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
