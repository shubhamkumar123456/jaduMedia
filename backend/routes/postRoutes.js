import express from "express";
import { allPosts, createPost, deletePost, yourPosts } from "../controllers/postController.js";
import checkToken from "../middleware/checkToken.js";
const router = express.Router();

router.post("/create",checkToken, createPost);
router.delete("/delete/:postId", deletePost);
router.get("/yourPost",checkToken, yourPosts);
router.get('/allposts', allPosts)

export default router;
