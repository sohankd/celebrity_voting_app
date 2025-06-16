import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

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
		const res = await axios.get('http://localhost:3000/api/celebrities');
		setCelebrities(res.data);
	};

	const vote = async (id) => {
		await axios.post(`http://localhost:3000/api/vote/${id}`);
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
