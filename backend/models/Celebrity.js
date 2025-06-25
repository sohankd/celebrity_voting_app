import mongoose from 'mongoose';

const celebritySchema = new mongoose.Schema({
    name: String,
    thumbnail: String,
    profession: String,
    gender: String,
    votes: { type: Number, default: 0 },
});

const Celebrity = mongoose.model('Celebrity', celebritySchema);

export default Celebrity;
