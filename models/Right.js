import mongoose from 'mongoose' 

const schema = new mongoose.Schema({
    type: {
        type: String,
        required: false,
        unique: false
    },
    chanel_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Chanel' },
    group_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    prevelegion: {
        type: Boolean,
        default: false
    },
    whitelisted: {
        type: Boolean,
        default: null
    },
    list:{type:Array,default:[]},
}, {
    timestamps: true
});

export default mongoose.model('Right', schema)