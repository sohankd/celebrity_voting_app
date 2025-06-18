import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

// Direct invocation to localhost or continer URI doesn't work when you're running on docker lab.
// Instead use the lab SSH URL with exposed server port in `http://<SSH_STRING_BEFORE_@>-<SERVER_PORT>.<SSH_STRING_AFTER_@>
// If Docker Lab SSH is ip172-18-0-28-d19gllq91nsg0084ri60@direct.labs.play-with-docker.com AND Exposed Server Port is 4000
// Result: http://ip172-18-0-28-d19gllq91nsg0084ri60-4000.direct.labs.play-with-docker.com
const SERVER_URL = 'http://ip172-18-0-28-d19gllq91nsg0084ri60-4000.direct.labs.play-with-docker.com';
const socket = io(SERVER_URL);

function App() {
	const [celebrities, setCelebrities] = useState([]);

	useEffect(() => {
		fetchCelebs();

		// Listen for vote updates
		socket.on('votes-updated', (data) => {
			setCelebrities(data);
		});

		return () => socket.disconnect();
	}, []);

	const fetchCelebs = async () => {
		const res = await axios.get(`${SERVER_URL}/api/celebrities`);
		setCelebrities(res.data);
	};

	const vote = async (id) => {
		await axios.post(`${SERVER_URL}/api/vote/${id}`);
		// No need to manually refresh, server will emit update
	};

	return (
		<div style={{ textAlign: 'center' }}>
		<h1>Vote for Your Favorite Celebrity</h1>
		{celebrities.map((celeb) => (
			<div key={celeb._id} style={{ marginBottom: '1rem' }}>
			<h2>{celeb.name}</h2>
			<p>Votes: {celeb.votes}</p>
			<button onClick={() => vote(celeb._id)}>Vote</button>
			</div>
		))}
		</div>
	);
}

export default App;
