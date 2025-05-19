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

userSchema.add({
    resetPasswordToken:{
        type:String,
        default:null
    },
    profilePic:{
        type:String,
        default:"https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png"
    },

    coverPic:{
        type:String,
        default:"https://wallpapercave.com/wp/wp2657869.jpg"
    },
})

// const users = mongoose.model('collectionName' , structure)
const users = mongoose.model('users' , userSchema);
export default users;