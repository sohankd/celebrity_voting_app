import express from 'express';
import Celebrity from '../models/Celebrity.js';

const router = express.Router();

// GET all celebrities
router.get('/celebrities', async (req, res) => {
    const celebs = await Celebrity.find();
    res.json(celebs);
});

// POST vote
router.post('/vote/:id', async (req, res) => {
    try {
        const celeb = await Celebrity.findByIdAndUpdate(
        req.params.id,
        { $inc: { votes: 1 } },
        { new: true }
        );
        res.json(celeb);
    } catch (error) {
        console.warn('MongoDB Error:', error);
        res.status(500).json({ error: 'Voting failed' });
    }
});

export default router;
