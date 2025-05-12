import postsColelction from "../models/PostCollection.js";

const createPost = async (req, res) => {
  // res.send('create post working')
 try {
     const { title, files } = req.body;
  const { _id } = req.user;

    let posts = await postsColelction.insertOne({
        title,
        files,
        userId:_id
    })
    res.status(201).json({msg:"post created successfully"})
 } catch (error) {
    res.status(500).json({error:error.message})
 }
};

const deletePost = async (req, res) => {
  res.send("delete post working");
};

export { createPost, deletePost };
