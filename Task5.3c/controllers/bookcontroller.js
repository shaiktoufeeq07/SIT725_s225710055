const bookService = require('../services/bookservice');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
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

exports.getBookById = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);

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