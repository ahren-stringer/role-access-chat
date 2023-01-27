import mongoose from 'mongoose'

const user_groupRole = mongoose.Schema({
    role: {type: String, require :true},
    user_name: {type:String},
    group_id: {type:mongoose.Schema.Types.ObjectId,ref:"Group"}
},{
    timestamps:true
});

export default mongoose.model('User_GroupRole', user_groupRole)