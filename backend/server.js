const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' },
});
const MONGO_DB_URI = process.env.MONGO_DB_URI || 'mongodb://mongodb/voteApp';

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGO_DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Define Schema
const celebritySchema = new mongoose.Schema({
	name: String,
	thumbnail: String,
	profession: String,
	gender: String,
	votes: { type: Number, default: 0 },
});

const Celebrity = mongoose.model('Celebrity', celebritySchema);

// Seed data (only once)
app.get('/seed', async (req, res) => {
	try {
		// Getting mock data from personal Postman workspce
		const response = await fetch(process.env.DB_SEED_SOURCE_URL).then(res => res.ok ? res.json() : []);
	
		await Celebrity.deleteMany({});
		await Celebrity.insertMany(response || []);
	
		return res.send('Seeding successful!');

	} catch (error) {
		console.warn('Failed to seed', error);
	}

	return res.send('Seeding failed');
});

// Get all celebrities
app.get('/api/celebrities', async (req, res) => {
	const celebs = await Celebrity.find();
	res.json(celebs);
});

// Vote for celebrity
app.post('/api/vote/:id', async (req, res) => {
	try {
		const celeb = await Celebrity.findByIdAndUpdate(
			req.params.id,
			{ $inc: { votes: 1 } },
			{ new: true }
		);

		return res.json(celeb);

	} catch (error) {
		console.warn('Mongo DB Error:', error);
	}

	return res.json({});
});

// Real-time change stream
const changeStream = Celebrity.watch();

changeStream.on('change', async () => {
	const celebs = await Celebrity.find();

	io.emit('votes-updated', celebs);
});

io.on('connection', (socket) => {
	console.log('Client connected');
	socket.on('disconnect', () => console.log('Client disconnected'));
});

server.listen(process.env.SERVER_PORT, () => console.log(`Server running on http://localhost:${process.env.SERVER_PORT}`));
