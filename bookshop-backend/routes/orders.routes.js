const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controller');
const authJwt = require('../middlewares/authJwt');

// Protect all order routes
router.get('/history', authJwt, ordersController.getOrderHistory);

module.exports = router;

