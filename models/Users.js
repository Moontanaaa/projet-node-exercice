import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    passion: {
        type: String,
        required: true
    }
});

export default mongoose.model('Users', UserSchema);
