import mongoose from 'mongoose' 

const messageSchema=mongoose.Schema({
    text: {type: String, require :true},
    chat:{type: mongoose.Schema.Types.ObjectId,ref: 'Chanel', require:true},
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'User', require:true},
    unread: {
        type:Boolean,
        default:false
    },
    files:[{type: mongoose.Schema.Types.ObjectId, ref: 'File'}]
},{
    timestamps:true
});

export default mongoose.model('Message',messageSchema)