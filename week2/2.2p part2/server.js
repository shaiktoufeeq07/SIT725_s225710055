// server.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// POST endpoint to add two numbers
// Example JSON body: { "num1": 5, "num2": 7 }
app.post("/api/add", (req, res) => {
  const { num1, num2 } = req.body;

  if (typeof num1 !== "number" || typeof num2 !== "number") {
    return res.status(400).json({ error: "Please provide valid numbers." });
  }

  const sum = num1 + num2;
  res.json({ num1, num2, sum });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

