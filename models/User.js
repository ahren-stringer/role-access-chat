import mongoose from 'mongoose';

const schema=new mongoose.Schema({
    name:{type: String, required:true, unique:true},
    email:{type: String, required:true, unique:true},
    password: {type:String, required:true},
    contacts: [],
    messages: [],
    invites:[],
    groups:[]
});

//module.exports=model('User', schema)
export default mongoose.model('User', schema)