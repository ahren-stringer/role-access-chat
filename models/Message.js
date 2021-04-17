import mongoose from 'mongoose' 

const messageSchema=mongoose.Schema({
    text: {type: String, require :true},
    dialog:{type: mongoose.Schema.Types.ObjectId, require:true},
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'User', require:true},
    unread: {
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});

export default mongoose.model('Message',messageSchema)