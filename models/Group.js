import mongoose from 'mongoose'

const dialogSchema = mongoose.Schema({
    name: {type: String, require :true},
    author: {type:mongoose.Schema.Types.ObjectId,ref:"User"},
    partners: {type:Array, default:[]},
    admins:{type:Array, default:[]},
    moderators:{type:Array, default:[]},
    invited:{type:Array, default:[]},
    //[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    // chanels:{
    //     type: Array,
    //     default: [],
    // },
},{
    timestamps:true
});

export default mongoose.model('Group', dialogSchema)