const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb://127.0.0.1:27017/booksDB';

mongoose.connect(MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err.message);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const bookRoutes = require('./routes/books.routes');

app.get('/api/integrity-check42', (_req, res) => {
  res.sendStatus(204);
});

app.use('/api/books', bookRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});