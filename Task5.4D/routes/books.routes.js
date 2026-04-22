const express = require('express');
const router = express.Router();

// Import controller
const bookController = require('../controllers/bookcontroller');

// Routes
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);

module.exports = router;
