import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "../models/post.js";
import User from "../models/user.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Return all posts
router.route("/").get(async (req: express.Request, res: express.Response) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Fetching posts failed, please try again",
    });
  }
});

// Return all post by user
router.route("/userPost/:userId").get(async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await Post.find({ author: userId });
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
});

// Return post by ID
router
  .route("/:postID")
  .get(async (req: express.Request, res: express.Response) => {
    try {
      const { postID } = req.params;
      const post = await Post.findById(postID).populate("author");
      res.json({ success: true, data: post });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err,
      });
    }
  });

// Add a new post
router.route("/").post(async (req: express.Request, res: express.Response) => {
  try {
    const { name, prompt, photo, model } = req.body;
    const cloudinaryRes = await cloudinary.uploader.upload(photo);
    const author = await User.findOne({ username: name });
    const newPost = await Post.create({
      name,
      prompt,
      photo: cloudinaryRes.url,
      photo_id: cloudinaryRes.public_id,
      model,
      author: author._id,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
});

// Delete post
router
  .route("/")
  .delete(async (req: express.Request, res: express.Response) => {
    const { _id, photo_id } = req.body;

    try {
      await cloudinary.uploader.destroy(photo_id);
      await Post.deleteOne({ _id: _id });
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err,
      });
    }
  });

export default router;
