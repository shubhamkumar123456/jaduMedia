import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title:{
        type:String
    },
    files:[],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
},{timestamps:true});

const posts  = mongoose.model('posts', postSchema);
export default posts