# 🌟 Celebrity Voting App

A full-stack web app where users can vote for their favorite celebrities and see live results updated in real-time.

---

## 🛠 Tech Stack

- Frontend: React.js
- Backend: Node.js + Express
- Database: MongoDB (Replica Set for Change Streams)
- Real-Time: MongoDB Change Streams + Socket.IO
- Containerization: Docker + Docker Compose

---

## 📁 Project Structure

celebrity-vote-app/
├── backend/               # Node.js backend
│   ├── server.js
│   └── Dockerfile
├── frontend/              # React frontend
│   ├── src/
│   └── Dockerfile
├── docker-compose.yml     # Docker Compose config
└── README.md              # This file

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- Docker: https://www.docker.com/products/docker-desktop
- Docker Compose: https://docs.docker.com/compose/

---

## 🚀 Running the App

1. Clone the repository (or download the ZIP)
2. Open a terminal in the project root
3. Run the app using Docker Compose:

   docker-compose up --build

4. Access the app:

   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000
   - MongoDB: localhost:27017

---

## 🧑‍💻 Auto Seeding

When the backend server starts, it checks if the database is empty. If so, it seeds the database with default celebrities:

- Taylor Swift
- Tom Holland
- Zendaya

No manual seeding is required. However, you can add more via MongoDB Compass or the API.

---

## 🧠 How It Works

- The backend uses MongoDB Change Streams to watch for vote changes.
- Whenever a vote is cast, a real-time update is pushed to all connected clients using Socket.IO.
- The React frontend listens for updates and refreshes the vote counts live.

---

## 🔒 Notes for Production

- Use environment variables for sensitive data like DB URIs.
- Use NGINX or a reverse proxy to manage frontend/backend domains.
- Secure the WebSocket connection with HTTPS (wss://).
- Use MongoDB Atlas or a managed DB with replica set support.

---

## 📝 License

This project is open-sourced under the MIT license.

---

## 👤 Author

Created by Sohan  
GitHub: https://github.com/your-username
