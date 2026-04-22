const bookService = require('../services/bookservice');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.json({
      status: 200,
      data: books,
      message: 'Books retrieved successfully',
      developedBy: 's225710055'
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
      developedBy: 's225710055'
    });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);

    if (!book) {
      return res.status(404).json({
        status: 404,
        message: 'Book not found',
        developedBy: 's225710055'
      });
    }

    res.json({
      status: 200,
      data: book,
      message: 'Book retrieved successfully',
      developedBy: 's225710055'
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
      developedBy: 's225710055'
    });
  }
};

exports.createBook = async (req, res) => {
  try {
    // Check for extra fields
    const allowedFields = ['id', 'title', 'author', 'year', 'genre', 'summary', 'price'];
    const bodyFields = Object.keys(req.body);
    const extraFields = bodyFields.filter(field => !allowedFields.includes(field));
    if (extraFields.length > 0) {
      return res.status(400).json({
        status: 400,
        message: `Unexpected fields: ${extraFields.join(', ')}`,
        developedBy: 's225710055'
      });
    }

    const book = await bookService.createBook(req.body);
    res.status(201).json({
      status: 201,
      data: book,
      message: 'Book created successfully',
      developedBy: 's225710055'
    });
  } catch (err) {
    if (err.code === 11000) { // Duplicate key
      res.status(409).json({
        status: 409,
        message: 'Book with this ID already exists',
        developedBy: 's225710055'
      });
    } else if (err.name === 'ValidationError' || err.name === 'CastError' || err.message.toLowerCase().includes('validation') || err.message.toLowerCase().includes('cast')) {
      const messages = err.name === 'ValidationError' ? Object.values(err.errors).map(e => e.message) : [err.message];
      res.status(400).json({
        status: 400,
        message: messages.join(', '),
        developedBy: 's225710055'
      });
    } else {
      res.status(500).json({
        status: 500,
        message: err.message,
        developedBy: 's225710055'
      });
    }
  }
};

exports.updateBook = async (req, res) => {
  try {
    // Check for extra fields
    const allowedFields = ['title', 'author', 'year', 'genre', 'summary', 'price'];
    const bodyFields = Object.keys(req.body);
    const extraFields = bodyFields.filter(field => !allowedFields.includes(field));
    if (extraFields.length > 0) {
      return res.status(400).json({
        status: 400,
        message: `Unexpected fields: ${extraFields.join(', ')}`,
        developedBy: 's225710055'
      });
    }

    // Prevent updating id
    if (req.body.id) {
      return res.status(400).json({
        status: 400,
        message: 'ID cannot be updated',
        developedBy: 's225710055'
      });
    }

    // Ensure all required fields are present for PUT semantics
    const requiredFields = ['title', 'author', 'year', 'genre', 'summary', 'price'];
    const missingFields = requiredFields.filter(field => !bodyFields.includes(field));
    if (missingFields.length > 0) {
      return res.status(400).json({
        status: 400,
        message: `Missing required fields: ${missingFields.join(', ')}`,
        developedBy: 's225710055'
      });
    }

    const book = await bookService.updateBook(req.params.id, req.body);
    if (!book) {
      return res.status(404).json({
        status: 404,
        message: 'Book not found',
        developedBy: 's225710055'
      });
    }
    res.json({
      status: 200,
      data: book,
      message: 'Book updated successfully',
      developedBy: 's225710055'
    });
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError' || err.message.toLowerCase().includes('validation') || err.message.toLowerCase().includes('cast')) {
      const messages = err.name === 'ValidationError' ? Object.values(err.errors).map(e => e.message) : [err.message];
      res.status(400).json({
        status: 400,
        message: messages.join(', '),
        developedBy: 's225710055'
      });
    } else {
      res.status(500).json({
        status: 500,
        message: err.message,
        developedBy: 's225710055'
      });
    }
  }
};