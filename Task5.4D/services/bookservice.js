const mongoose = require('mongoose');
const Book = require('../models/Book');

function formatBook(book) {
  if (!book) return null;

  return {
    id: book.id,
    title: book.title,
    author: book.author,
    year: book.year,
    genre: book.genre,
    summary: book.summary,
    price: book.price ? book.price.toString() : null,
    developedBy: 's225710055'
  };
}

async function getAllBooks() {
  const books = await Book.find({}, { _id: 0, __v: 0 }).lean();
  return books.map(formatBook);
}

async function getBookById(id) {
  const book = await Book.findOne({ id }, { _id: 0, __v: 0 }).lean();
  return formatBook(book);
}

async function createBook(bookData) {
  if (bookData.price !== undefined) {
    bookData.price = mongoose.Types.Decimal128.fromString(bookData.price.toString());
  }

  const book = new Book(bookData);
  const savedBook = await book.save();
  return formatBook(savedBook);
}

async function updateBook(id, updateData) {
  if (updateData.price !== undefined) {
    updateData.price = mongoose.Types.Decimal128.fromString(updateData.price.toString());
  }

  const updatedBook = await Book.findOneAndUpdate(
    { id },
    updateData,
    { new: true, runValidators: true, context: 'query' }
  );

  return formatBook(updatedBook);
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook
};