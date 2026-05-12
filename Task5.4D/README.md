# Books Catalogue API (Task 5.4D)

## Developed By
Student ID: s225710055  

---

## Project Overview
This project is a Node.js, Express, and MongoDB (Mongoose) application that implements a Books Catalogue system using the MVC architecture.

The main objective of this task is to:
- Implement server-side validation using Mongoose
- Enforce safe write operations for create and update endpoints
- Ensure correct HTTP status handling
- Apply ethical software principles such as data integrity, validation, and accountability

---

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- Vanilla HTML, CSS, JavaScript

---

## Project Structure
├── controllers/
│ └── bookcontroller.js
├── models/
│ └── Book.js
├── routes/
│ └── books.routes.js
├── services/
│ └── bookservice.js
├── public/
│ ├── index.html
│ ├── scripts.js
│ └── styles.css
├── validation-tests.js
├── seed.js
├── server.js

---

## How to Run the Project

### 1. Install dependencies

### 2. Start MongoDB
Ensure MongoDB is running:

### 3. Seed the database

### 4. Start the server

The server will run at:
http://localhost:3000

### 5. Run validation tests
Open a new terminal and run:


---

## API Endpoints

### Read Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/books | Get all books |
| GET | /api/books/:id | Get a book by ID |

---

### Safe Write Endpoints

#### Create Book
POST /api/books

Responses:
- 201 Created – Successful creation
- 400 Bad Request – Validation failure or unknown fields
- 409 Conflict – Duplicate ID

---

#### Update Book
PUT /api/books/:id

Responses:
- 200 OK – Successful update
- 400 Bad Request – Validation failure, missing fields, or unknown fields
- 404 Not Found – Book not found

---

### Integrity Check Endpoint
GET /api/integrity-check42

Response:
- 204 No Content

---

## Validation Rules

| Field | Rules |
|------|------|
| id | Required, unique, alphanumeric with hyphens, 1–50 characters |
| title | Required, 1–200 characters |
| author | Required, 1–100 characters |
| year | Integer, minimum 1000, maximum current year + 1 |
| genre | Required, 1–50 characters |
| summary | Required, 10–1000 characters |
| price | Decimal128, non-negative |

---

## Safe Write Implementation
- Validation enforced at schema level using Mongoose
- Unknown fields are rejected using strict mode
- ID is immutable and cannot be updated
- Validation applied on both create and update operations
- Proper HTTP status codes returned for all scenarios
- No hardcoded data used in application logic

---

## Validation Testing
The validation-tests.js file provides automated testing for:
- Create and update operations
- Required field validation
- Type validation
- Boundary testing
- Length constraints
- Temporal validation (year rules)
- Unknown field rejection
- ID immutability

Expected output format:
TEST|PASS|...
SUMMARY|X|X
COVERAGE|...


---

## Key Features
- MVC architecture with clear separation of concerns
- Robust server-side validation
- Secure API design with safe write enforcement
- Automated validation testing
- Clean and maintainable code structure

---

## Notes
- Only Node.js, Express, and Vanilla JavaScript are used as per requirements
- No frontend frameworks or external UI libraries are included
- Price is stored using Decimal128 in AUD

---

## Conclusion
This project demonstrates strong backend development practices, including:
- Reliable data validation
- Secure and predictable API behavior
- Proper use of HTTP standards
- Application of ethical software principles