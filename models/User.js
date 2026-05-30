import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'please enter your name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'please enter your email addresss'],
        unique: true,
        lowercase: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'please enter a vild email'
        ]
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'manager', 'admin']
    }
});

const userModel = mongoose.model('User', userSchema);
export { userModel };