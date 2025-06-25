import Celebrity from '../models/Celebrity.js';

const voteSocketHandler = (io) => {
    const changeStream = Celebrity.watch();

    changeStream.on('change', async () => {
        const celebs = await Celebrity.find();
        io.emit('votes-updated', celebs);
    });

    io.on('connection', (socket) => {
        console.log('🔌 Client connected');
        socket.on('disconnect', () => console.log('❎ Client disconnected'));
    });
};

export default voteSocketHandler;
