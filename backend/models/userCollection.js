import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
    name:{
        type:String,
        minLength:2,
        maxLength:100,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required']
    },

},{timestamps:true})

// const users = mongoose.model('collectionName' , structure)
const users = mongoose.model('users' , userSchema);
export default users;