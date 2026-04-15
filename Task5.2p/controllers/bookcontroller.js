const bookService = require('../services/bookservice');

// GET all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = bookService.getAllBooks();

    res.json({
      status: 200,
      data: books,
      message: 'Books retrieved successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message
    });
  }
};

// GET one book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = bookService.getBookById(req.params.id);

    if (!book) {
      return res.status(404).json({
        status: 404,
        message: 'Book not found'
      });
    }

    res.json({
      status: 200,
      data: book,
      message: 'Book retrieved successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message
    });
  }
};
