const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

// Get cart
router.get('/', cartController.getCart);
// Update cart item quantity
router.put('/item', cartController.updateCartItem);
// Remove item from cart
router.delete('/item/:bookId', cartController.removeCartItem);

module.exports = router;
