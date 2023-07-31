const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Admin route to get all orders
router.get('/orders', orderController.getAllOrders);

module.exports = router;
