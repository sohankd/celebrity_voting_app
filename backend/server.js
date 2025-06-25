// server.js
import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server as SocketIO } from 'socket.io';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import autoSeedDB from './config/seed.js';
import celebrityRoutes from './routes/celebrities.js';
import voteSocketHandler from './sockets/voteSocket.js';
import Celebrity from './models/Celebrity.js';

dotenv.config(); // Load environment variables from .env

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server, { cors: { origin: '*' } });

const PORT = process.env.SERVER_PORT;
const MONGO_URI = process.env.MONGO_DB_URI;

if (!PORT) throw new Error('SERVER_PORT is required.');
if (!MONGO_URI) throw new Error('MONGO_DB_URI is required.');

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
await connectDB();

// Auto-seed the DB if empty
Celebrity.countDocuments().then((count) => {
    if (count === 0) {
        autoSeedDB();
    }
});

// REST API routes
app.use('/api', celebrityRoutes);

// WebSocket events
voteSocketHandler(io);

// Start the server
server.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
