// const mongoose = require('mongoose');

// const cartSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   product: [{
//     type: mongoose.Schema.Types.ObjectId,

//     ref: 'Product',
//     required: true
//   }],
//   // Add any other fields specific to the cart schema as needed
// });

// const Cart = mongoose.model('Cart', cartSchema);

// module.exports = Cart;

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    }
  }],
  // Add any other fields specific to the cart schema as needed
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
