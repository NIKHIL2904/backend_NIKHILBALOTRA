const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Define cart routes
router.post('/add', cartController.addToCart);
router.post('/remove', cartController.removeFromCart);
router.post('/calculate', cartController.calculateTotalBill);
router.post('/clear', cartController.clearCart);
router.post('/confirm', cartController.confirmOrder);

module.exports = router;
