const mongoose = require('mongoose');
const Book = require('../models/Book');

const MONGO_URI = 'mongodb://127.0.0.1:27017/booksDB';

mongoose.connect(MONGO_URI);

const sampleBooks = [
  {
    id: 'b1',
    title: 'The Three-Body Problem',
    author: 'Liu Cixin',
    year: 2008,
    genre: 'Science Fiction',
    summary: 'The Three-Body Problem is the first novel in the Remembrance of Earth\'s Past trilogy.',
    price: mongoose.Types.Decimal128.fromString('29.99')
  },
  {
    id: 'b2',
    title: 'Jane Eyre',
    author: 'Charlotte Brontë',
    year: 1847,
    genre: 'Classic',
    summary: 'An orphaned governess confronts class, morality, and love at Thornfield Hall.',
    price: mongoose.Types.Decimal128.fromString('22.00')
  },
  {
    id: 'b3',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    year: 1813,
    genre: 'Classic',
    summary: 'Elizabeth Bennet and Mr. Darcy navigate pride, misjudgement, and marriage.',
    price: mongoose.Types.Decimal128.fromString('22.00')
  },
  {
    id: 'b4',
    title: 'The English Patient',
    author: 'Michael Ondaatje',
    year: 1992,
    genre: 'Historical Fiction',
    summary: 'In a ruined Italian villa at the end of WWII, a dying man reflects on love and memory.',
    price: mongoose.Types.Decimal128.fromString('25.39')
  },
  {
    id: 'b5',
    title: 'Small Gods',
    author: 'Terry Pratchett',
    year: 1992,
    genre: 'Fantasy',
    summary: 'In Omnia, the god Om returns as a tortoise and questions belief and power.',
    price: mongoose.Types.Decimal128.fromString('31.99')
  }
];

(async () => {
  try {
    await Book.collection.createIndex({ id: 1 }, { unique: true });
    await Book.deleteMany({});
    await Book.insertMany(sampleBooks);
    console.log('Seeded 5 books into MongoDB.');
  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
})();