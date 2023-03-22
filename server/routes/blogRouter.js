import express from "express";

import {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  upvoteBlog,
  downvoteBlog,
} from "../controllers/BlogHandler.js";

const router = express.Router();


router.get('/',getAllBlogs)
router.post('/',createBlog)
router.put('/:id',updateBlog)
router.delete("/:id",deleteBlog)
router.patch("/:id/upvote",upvoteBlog)
router.patch("/:id/downvote",downvoteBlog)

export default router