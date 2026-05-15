// routes/books.js
// This file defines all the API routes for books

const express = require("express");
const router = express.Router();

// In-memory list of books (acts like a simple database)
let books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 12.99 },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", price: 10.99 },
  { id: 3, title: "1984", author: "George Orwell", price: 9.99 },
];

// GET /api/books — returns all books
router.get("/", (req, res) => {
  res.status(200).json({ success: true, books });
});

// GET /api/books/:id — returns a single book by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ success: false, message: "Book not found" });
  }

  res.status(200).json({ success: true, book });
});

// POST /api/books — adds a new book
router.post("/", (req, res) => {
  const { title, author, price } = req.body;

  if (!title || !author || price === undefined) {
    return res.status(400).json({ success: false, message: "Title, author, and price are required" });
  }

  if (typeof price !== "number" || price < 0) {
    return res.status(400).json({ success: false, message: "Price must be a non-negative number" });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
    price,
  };

  books.push(newBook);
  res.status(201).json({ success: true, book: newBook });
});

module.exports = router;