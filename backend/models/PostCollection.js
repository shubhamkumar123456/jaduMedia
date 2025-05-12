import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title:{
        type:String
    },
    files:[],
    userId:{
        type:String
    }
},{timestamps:true});

const posts  = mongoose.model('posts', postSchema);
export default posts