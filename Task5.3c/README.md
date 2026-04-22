# Books Catalogue - Task 5.3C

A read-only books catalog application built with Node.js, Express, and MongoDB. This project extends Task 5.2P by integrating a real MongoDB database while maintaining the MVC structure.

## Features

- **MVC Architecture**: Clean separation of concerns with Models, Views, Controllers, and Services.
- **MongoDB Integration**: Books data stored in MongoDB with Decimal128 pricing.
- **RESTful API**: Endpoints for retrieving all books and individual book details.
- **Vanilla Frontend**: Simple HTML/CSS/JavaScript client without frameworks.
- **Seeded Data**: Pre-populated with 5 classic books including AUD prices.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Package Manager**: npm

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally on default port 27017)
- npm

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd Task5.3c
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure MongoDB is running locally.

## Setup

1. Seed the database with sample books:
   ```bash
   node scripts/seed.js
   ```

2. Start the server:
   ```bash
   node server.js
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

- Click the "Get all books" button to load the book list.
- Each book item shows the title and price in AUD.
- Click on any book to view detailed information including author, year, genre, summary, and price.

## API Endpoints

### GET /api/books
Retrieves all books from the database.

**Response:**
```json
{
  "status": 200,
  "data": [
    {
      "id": "b1",
      "title": "The Three-Body Problem",
      "author": "Liu Cixin",
      "year": 2008,
      "genre": "Science Fiction",
      "summary": "The Three-Body Problem is the first novel in the Remembrance of Earth's Past trilogy.",
      "price": "29.99"
    }
  ],
  "message": "Books retrieved successfully"
}
```

### GET /api/books/:id
Retrieves a specific book by ID.

**Parameters:**
- `id`: Book ID (e.g., "b1")

**Response:**
```json
{
  "status": 200,
  "data": {
    "id": "b1",
    "title": "The Three-Body Problem",
    "author": "Liu Cixin",
    "year": 2008,
    "genre": "Science Fiction",
    "summary": "The Three-Body Problem is the first novel in the Remembrance of Earth's Past trilogy.",
    "price": "29.99"
  },
  "message": "Book retrieved successfully"
}
```

### GET /api/integrity-check42
Integrity check endpoint returning 204 No Content.

## Database Schema

The Book model includes:
- `id`: String (unique identifier)
- `title`: String (required)
- `author`: String (required)
- `year`: Number (required)
- `genre`: String (required)
- `summary`: String (required)
- `price`: Decimal128 (required, stored as AUD)

## Project Structure

```
Task5.3c/
├── controllers/
│   └── bookcontroller.js
├── models/
│   └── Book.js
├── routes/
│   └── books.routes.js
├── services/
│   └── bookservice.js
├── scripts/
│   └── seed.js
├── public/
│   ├── index.html
│   ├── scripts.js
│   └── styles.css
├── package.json
├── server.js
└── README.md
```

## Submission Details

**Student ID**: s225710055

**Repository Link**: [Insert your GitHub repository link here]

**Evidence**:
- Screenshots of the running application showing:
  - Book list with prices
  - Individual book details
  - API responses (optional)

**Notes**:
- No hardcoded data in the application code.
- All data is retrieved from MongoDB.
- Client uses only vanilla HTML/CSS/JS.
- Server runs on localhost:3000.

## License

This project is for educational purposes as part of SIT725 coursework.</content>
<parameter name="filePath">c:\Users\umars\Desktop\SIT 725\SIT725_s225710055\Task5.3c\README.md