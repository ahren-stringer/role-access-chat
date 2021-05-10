import mongoose from 'mongoose' 

const schema = new mongoose.Schema({
    type: {
        type: String,
        required: false,
        unique: false
    },
    chanel_id: {
        type: { type: mongoose.Schema.Types.ObjectId, ref: 'Chanel' },
    },
    prevelegion: {
        type: Boolean,
        default: false
    },
    whitelisted: {
        type: Boolean,
        default: null
    },
    list:{type:Array},
}, {
    timestamps: true
});

export default mongoose.model('Right', schema)