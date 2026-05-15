 // app.js
// Main entry point for the Book Manager API

const express = require("express");
const app = express();

// Middleware: allows Express to read JSON from request bodies
app.use(express.json());

// Import and use the books router
const booksRouter = require("./routes/books");
app.use("/api/books", booksRouter);

// Root route — just a welcome message
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Book Manager API!" });
});

// Start the server (only when run directly, not during tests)
const PORT = 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export app so tests can use it
module.exports = app;