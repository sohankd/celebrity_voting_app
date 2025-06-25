import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		console.log('🔄 Connecting to MongoDB Atlas...');
		
		mongoose.connection.on('connected', () => {
			console.log('🟢 Connected to MongoDB Atlas');
		});

		mongoose.connection.on('error', (err) => {
			console.error('🔴 MongoDB connection error:', err.message);
		});

		mongoose.connection.on('disconnected', () => {
			console.log('🟡 MongoDB disconnected');
		});

		await mongoose.connect(process.env.MONGO_DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			dbName: "CelebrityVoting"
		});

	} catch (error) {
		console.error('❌ MongoDB connection failed:', error.message);
		process.exit(1);
	}
};

export default connectDB;
