import express from "express";
import {
  addPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../controllers/postsController";

const router = express.Router();

//get all posts
router.get("/", getPosts);

//get post by id
router.get("/:id", getPostById);

//Add new post
router.post("/", addPost);

//Update post
router.put("/:id", updatePost);

//Delete post
router.delete("/:id", deletePost);

export default router;
