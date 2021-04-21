import mongoose from 'mongoose'

const chanelSchema = mongoose.Schema({
    name:{type: String, require :true},
    author: {type:mongoose.Schema.Types.ObjectId,ref:"User"},
    group:{type:mongoose.Schema.Types.ObjectId,ref:"Group"},
    rights: {type:Object,require :true},
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
},{
    timestamps:true
});

export default mongoose.model('Chanel', chanelSchema)