import mongoose from 'mongoose'

const dialogSchema = mongoose.Schema({
    name: {type: String, require :true},
    author: {type:mongoose.Schema.Types.ObjectId,ref:"User"},
    partners: {type:Array},
    //[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    // chanels:{
    //     type: Array,
    //     default: [],
    // },
},{
    timestamps:true
});

export default mongoose.model('Group', dialogSchema)