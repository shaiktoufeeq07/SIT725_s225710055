// server.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// In-memory array of jokes
const jokes = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "Why did the math book look sad? Because it had too many problems.",
  "I told my computer I needed a break, and it said 'No problem, I'll go to sleep.'",
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "Why did the scarecrow win an award? Because he was outstanding in his field!"
];

// GET endpoint to fetch a random joke
app.get("/api/joke", (req, res) => {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  res.json({ joke: jokes[randomIndex] });
});

// POST endpoint to add a new joke
app.use(express.json());
app.post("/api/joke", (req, res) => {
  const { joke } = req.body;
  if (!joke || typeof joke !== "string") {
    return res.status(400).json({ error: "Please provide a valid joke." });
  }
  jokes.push(joke);
  res.json({ message: "Joke added!", jokes });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});