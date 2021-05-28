import mongoose from 'mongoose'

const dialogSchema = mongoose.Schema({
    initiator: {type:mongoose.Schema.Types.ObjectId,ref:"User"},
    partner: {type:mongoose.Schema.Types.ObjectId,ref:"User"},
    waiting: {type:Boolean, default:true},
},{
    timestamps:true
});

export default mongoose.model('Frendship', dialogSchema)