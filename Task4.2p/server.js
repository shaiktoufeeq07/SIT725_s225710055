const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/proteindb');
mongoose.connection.on('connected', () => {
    console.log("Database connected");
});

// Define Schema & Model
const ProjectSchema = new mongoose.Schema({
    title: String,
    image: String,
    link: String,
    description: String,
});
const Project = mongoose.model('Project', ProjectSchema);

// API route - fetch all products from MongoDB
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find({});
        res.json({ statusCode: 200, data: projects, message: "Success" });
    } catch (err) {
        console.error("Error fetching projects:", err);
        res.status(500).json({ statusCode: 500, data: [], message: "Server error" });
    }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("App listening at: http://localhost:" + port);
});