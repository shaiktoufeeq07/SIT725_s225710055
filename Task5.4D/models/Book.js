const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'ID is required'],
    unique: true,
    minlength: [1, 'ID must be at least 1 character'],
    maxlength: [50, 'ID must be at most 50 characters'],
    match: [/^[a-zA-Z0-9-]+$/, 'ID must contain only alphanumeric characters and hyphens']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [1, 'Title must be at least 1 character'],
    maxlength: [200, 'Title must be at most 200 characters']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    minlength: [1, 'Author must be at least 1 character'],
    maxlength: [100, 'Author must be at most 100 characters']
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [1000, 'Year must be at least 1000'],
    validate: {
      validator: function (v) {
        return Number.isInteger(v) && v <= new Date().getFullYear() + 1;
      },
      message: 'Year must be an integer and not in the future'
    }
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    minlength: [1, 'Genre must be at least 1 character'],
    maxlength: [50, 'Genre must be at most 50 characters']
  },
  summary: {
    type: String,
    required: [true, 'Summary is required'],
    minlength: [10, 'Summary must be at least 10 characters'],
    maxlength: [1000, 'Summary must be at most 1000 characters']
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: [true, 'Price is required'],
    validate: {
      validator: function (v) {
        return parseFloat(v.toString()) >= 0;
      },
      message: 'Price must be non-negative'
    }
  }
}, {
  strict: 'throw' 
});

module.exports = mongoose.model('Book', BookSchema);