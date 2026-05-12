
//  server.js  –  Collaborative To-Do List
//  Uses Express for the web server and
//  Socket.IO for real-time communication


const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// 1. Create the Express app
const app = express();

// 2. Wrap it in a plain HTTP server (Socket.IO needs this)
const server = http.createServer(app);

// 3. Attach Socket.IO to the HTTP server
const io = new Server(server);

// ── Serve the frontend ──────────────────────
// Everything inside /public is served as static files
app.use(express.static('public'));

// ── In-memory task list ─────────────────────
// In a real app this would live in a database,
// but for learning purposes we keep it in RAM.
let tasks = [];
let nextId = 1; // simple auto-increment id

// ── Socket.IO real-time logic ───────────────
io.on('connection', (socket) => {
  // Fires every time a browser tab connects
  console.log(`User connected   → ${socket.id}`);

  // Send the current task list to the NEWLY connected user only
  // (so they don't start with a blank screen)
  socket.emit('task:list', tasks);

  // ── Event: a user added a new task ──
  socket.on('task:add', (taskText) => {
    // Ignore empty submissions
    if (!taskText || taskText.trim() === '') return;

    // Build the task object
    const newTask = {
      id: nextId++,
      text: taskText.trim(),
      completed: false,
    };

    // Save it to our list
    tasks.push(newTask);
    console.log(` Task added: "${newTask.text}"`);

    // Broadcast to ALL connected users (including the sender)
    io.emit('task:added', newTask);
  });

  // ── Event: a user toggled a task's completed state ──
  socket.on('task:toggle', (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    task.completed = !task.completed;
    console.log(`  Task ${taskId} toggled → completed: ${task.completed}`);

    // Tell everyone about the update
    io.emit('task:updated', task);
  });

  // ── Event: a user deleted a task ──
  socket.on('task:delete', (taskId) => {
    tasks = tasks.filter((t) => t.id !== taskId);
    console.log(` Task ${taskId} deleted`);

    // Tell everyone which task was removed
    io.emit('task:deleted', taskId);
  });

  // ── Disconnect ──
  socket.on('disconnect', () => {
    console.log(` User disconnected → ${socket.id}`);
  });
});

//Start the server 
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`\n Server running at http://localhost:${PORT}\n`);
});