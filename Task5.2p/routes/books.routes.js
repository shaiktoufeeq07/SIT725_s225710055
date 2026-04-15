const express = require('express');
const router = express.Router();

// Import controller
const bookController = require('../controllers/bookcontroller');

// Routes
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

module.exports = router;
