const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get all products with pagination
router.get('/', productController.getProducts);

// Search products
router.get('/search', productController.searchProducts);

// Get a single product
router.get('/:id', productController.getProductById);

// Add a new product
router.post('/add', productController.addProduct);

module.exports = router;
