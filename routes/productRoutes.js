const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define product routes
router.get('/', productController.getAllProducts);
//router.get('/:productId', productController.getProductById);
// Create a new product
router.post('/create', productController.createProduct);

// Update a product by ID
router.put('/update/:id', productController.updateProduct);

// Delete a product by ID
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;
