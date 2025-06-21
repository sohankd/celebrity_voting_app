import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VoteCategory from './VoteCategory';
import LiveResult from './LiveResult';
import { io } from 'socket.io-client';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const socket = io(SERVER_URL);

function App() {
	const [professions, setProfessions] = useState([]);

	useEffect(() => {
		const fetchCelebs = async () => {
			const res = await axios.get(`${SERVER_URL}/api/celebrities`);
			const nominations = processData(res.data);

			setProfessions(nominations);
		};

		fetchCelebs();

		// Listen for vote updates
		socket.on('votes-updated', (data) => {
			setProfessions(processData(data));
		});

		return () => socket.disconnect();
	}, []);
	
	const processData = (data) => {
		const nominations = {};

		Array.prototype.forEach.call(data || [], (celebrity) => {
			let {profession, gender, votes = 0} = celebrity;
			let title = profession + (gender ? ` (${gender})` : "");

			if(!Object.hasOwn(nominations, title)){
				nominations[title] = { title, celebrities: [], voteCount: 0 };
			}

			nominations[title]['celebrities'].push(celebrity);
			nominations[title]['voteCount'] += votes;
		});

		return Object.values(nominations);
	}

	const handleVoting = async (event) => {
		let id = event.currentTarget.getAttribute('data-id');

		await axios.post(`${SERVER_URL}/api/vote/${id}`);
		// No need to manually refresh, server will emit update
	}

	return (
		<div className='relative flex size-full min-h-screen flex-col bg-[#141a1f] dark group/design-root overflow-x-hidden'>
			<div className="layout-container flex h-full grow flex-col">
				<nav className="w-full mx-auto py-5 text-center">
					<a className="inline-block px-5 h-[70px] lg:h-[150px]" href="/">
						<img className="max-w-full h-full" src="https://www.iifa.com//assets/header-logo-transperent.png" alt="IIFA Award Logo" />
					</a>
				</nav>
				<div className="gap-1 px-6 flex flex-col flex-1 justify-center py-5 relative lg:flex-row">
					<div className='layout-content-container flex flex-col max-w-[920px] flex-1'>
						{
							professions.length > 0 ?
								professions.map((nomination, index) => (
									<VoteCategory key={index} celebrities={nomination['celebrities']} profession={nomination['title']} handleVoting={handleVoting}/>
								))
							:	<h1 className='text-center text-white text-[2rem] font-bold'>Voting session has been closed. Thanks for showing interest.</h1>
						}
					</div>
					{professions.length > 0 && <LiveResult professions={professions} />}
				</div>
			</div>
		</div>
	);
}

export default App;
