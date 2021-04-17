import mongoose from 'mongoose' 
import pkg from 'validator';
const { isEmail } = pkg;

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required',
        unique: true
    },
    email: {
        type: String,
        required: 'Email is required',
        unique: true,
        validate: [isEmail, 'Invalid Email']
    },
    password: {
        type: String,
        required: 'password is required'
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    avatar: String,
    confirmHash: String,
    last_seen: {
        type: Date,
        default: new Date(),
    },
    // contacts: [],
    // messages: [],
    // invites:[],
    // groups:[]
}, {
    timestamps: true
});

export default mongoose.model('User', schema)