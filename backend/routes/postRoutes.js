import express from "express";
import { createPost, deletePost } from "../controllers/postController.js";
import checkToken from "../middleware/checkToken.js";
const router = express.Router();

router.post("/create",checkToken, createPost);
router.delete("/delete/:postId", deletePost);

export default router;
