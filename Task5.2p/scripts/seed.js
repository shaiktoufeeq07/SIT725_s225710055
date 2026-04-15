const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/foodDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

  mongoose.connect('mongodb://127.0.0.1:27017/foodDB');

const foodItems = require('../models/foodModel');

const sampleData = [
  {
    id: "f1",
    name: "Margherita Pizza",
    price: "12.50",
    currency: "AUD"
  },
  {
    id: "f2",
    name: "Beef Burger",
    price: "14.90",
    currency: "AUD"
  },
  {
    id: "f3",
    name: "Chicken Caesar Salad",
    price: "11.20",
    currency: "AUD"
  },
  {
    id: "f4",
    name: "Veggie Wrap",
    price: "9.80",
    currency: "AUD"
  },
  {
    id: "f5",
    name: "Flat White Coffee",
    price: "4.50",
    currency: "AUD"
  }
];

(async () => {
  try {
    // ensure unique on id (good practice)
    await foodItems.collection.createIndex({ id: 1 }, { unique: true });

    // clear and insert
    await foodItems.deleteMany({});
    await foodItems.insertMany(sampleData);

    console.log('Seeded 5 food items.');
  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
})();