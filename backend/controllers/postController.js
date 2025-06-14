import postsColelction from "../models/PostCollection.js";

const createPost = async (req, res) => {
  // res.send('create post working')
  try {
    const { title, files } = req.body;
    const { _id } = req.user;

    let posts = await postsColelction.insertOne({
      title,
      files,
      userId: _id
    })
    res.status(201).json({ msg: "post created successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

const deletePost = async (req, res) => {
  res.send("delete post working");
};


const yourPosts = async (req, res) => {
  try {
    const { _id } = req.user;
    console.log("_id = ", _id)

    let posts = await postsColelction.find({ userId:_id }).populate({ path: 'userId', select: 'name profilePic' }) .populate({ 
     path: 'comment',
     populate: {
       path: 'userId',
     } 
  })
    console.log(posts)
    res.status(200).json({ posts })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


const allPosts = async (req, res) => {
  try {
    let posts = await postsColelction.find().populate({ path: 'userId', select: 'name profilePic' }).populate({ 
     path: 'comment',
     populate: {
       path: 'userId',
       select:'name profilePic'
     } 
  })

    res.status(200).json({ posts })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


const likePost = async(req,res)=>{
    try {
       const { _id } = req.user;
      const {postId} = req.params

      let post = await postsColelction.findById(postId);  // {}
      if(post.likes.includes(_id)){
        post.likes.pull(_id);
        await post.save()
        res.status(200).json({msg:"post disliked successfully"})
      }
      else{
       post.likes.push(_id);
      await post.save()
      res.status(200).json({msg:"post liked successfully"})
      }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
 

} 


const commentPost = async(req , res)=>{
     const { _id } = req.user;
     const {postId} = req.params
     const {text} = req.body;

   try {
      let post = await postsColelction.findById(postId);
     post.comment.push({userId:_id , text:text});
     await post.save();
     res.status(200).json({msg:"comment added successfully"})
   } catch (error) {
     res.status(500).json({ error: error.message })
   }
}

export { createPost, deletePost, yourPosts, allPosts , likePost ,commentPost };



