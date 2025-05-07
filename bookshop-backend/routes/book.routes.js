const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');

router.get('/:id', bookController.getBookById);

router.get('/', bookController.getAllBooks);

module.exports = router;
