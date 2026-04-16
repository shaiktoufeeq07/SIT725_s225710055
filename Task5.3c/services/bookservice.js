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
    price: book.price ? book.price.toString() : null
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

module.exports = {
  getAllBooks,
  getBookById
};