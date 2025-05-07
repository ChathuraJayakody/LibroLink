const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authJwt = require('../middlewares/authJwt');

// Get current user's profile
router.get('/', authJwt, userController.getProfile);
// Update current user's profile
router.patch('/', authJwt, userController.updateProfile);

module.exports = router;
