import Celebrity from '../models/Celebrity.js';
import dotenv from 'dotenv';

dotenv.config();

const autoSeedDB = async () => {
    try {
        console.info('🌱 Starting auto-seeding...');
        
        const response = await fetch(process.env.DB_SEED_SOURCE_URL)
        .then(res => res.ok ? res.json() : []);

        await Celebrity.deleteMany({});
        await Celebrity.insertMany(response || []);
        
        console.log('✔️ Seeding complete!');
    } catch (error) {
        console.error('❌ Seeding failed:', error);
    }
};

export default autoSeedDB;
