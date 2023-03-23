import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "../models/post.js";

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

// Add a new post
router.route("/").post(async (req: express.Request, res: express.Response) => {
  try {
    const { name, prompt, photo } = req.body;
    const cloudinaryRes = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      prompt,
      photo: cloudinaryRes.url,
      photo_id: cloudinaryRes.public_id,
      model: "OpenAI",
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to create a post, please try again",
    });
  }
});

router
  .route("/")
  .delete(async (req: express.Request, res: express.Response) => {
    const { _id, public_id } = req.body;

    try {
      await cloudinary.uploader.destroy(public_id);
      await Post.deleteOne({ _id: _id });
      res.status(200).json({ sucess: true });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Unable to delete img, img may already be deleted",
      });
    }
  });

export default router;
