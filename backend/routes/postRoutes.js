import express from "express";
import { allPosts, createPost, deletePost, likePost, yourPosts } from "../controllers/postController.js";
import checkToken from "../middleware/checkToken.js";
const router = express.Router();

router.post("/create",checkToken, createPost);
router.delete("/delete/:postId", deletePost);
router.get("/yourPost",checkToken, yourPosts);
router.get('/allposts', allPosts)
router.put('/likes/:postId',checkToken,likePost)

export default router;
