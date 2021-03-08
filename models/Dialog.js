import mongoose from 'mongoose'

const dialogSchema = mongoose.Schema({
    author: {type:mongoose.Schema.Types.ObjectId,ref:"User"},
    partner: {type:mongoose.Schema.Types.ObjectId,ref:"User"},
},{
    timestamps:true
});

export default mongoose.model('Dialog', dialogSchema)