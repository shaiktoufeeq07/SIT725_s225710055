# ⚡ Collaborative To-Do List (Socket.IO)

A real-time collaborative task manager built with **Express** and **Socket.IO**.  
Every connected browser tab sees task changes (add, complete, delete) instantly — no refresh needed.

---

## 🚀 How to run

```bash
# 1. Install dependencies
npm install

# 2. Start the server
node server.js

# 3. Open in your browser
http://localhost:3000
```

Open **two tabs** side by side to see real-time sync in action!

---

## 📁 Project structure

```
todo-app/
├── server.js          ← Express + Socket.IO server (backend)
├── public/
│   └── index.html     ← Frontend UI + Socket.IO client
├── package.json
└── README.md
```

---

## 🔌 Socket.IO Events

| Event | Direction | Description |
|---|---|---|
| `task:list` | Server → Client | Sends full task list on connect |
| `task:add` | Client → Server | User submits a new task |
| `task:added` | Server → All | Broadcasts the new task |
| `task:toggle` | Client → Server | User checks/unchecks a task |
| `task:updated` | Server → All | Broadcasts the updated task |
| `task:delete` | Client → Server | User deletes a task |
| `task:deleted` | Server → All | Broadcasts the deleted task ID |

---

## 🛠 Tech Stack

- **Node.js** – JavaScript runtime
- **Express** – Web server / static file serving
- **Socket.IO** – Real-time WebSocket communication