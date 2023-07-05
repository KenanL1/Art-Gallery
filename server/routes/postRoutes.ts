import express, { Request, Response, Router } from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post, { IPost } from "../models/post.js";
import Likes, { ILikes } from "../models/likes.js";
import User, { IUser } from "../models/user.js";
import { routeHandler } from "../utils/routeUils.js";

dotenv.config();

const router: Router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

// Return all posts
router.route("/").get(async (req: Request, res: Response) => {
  await routeHandler(res, async () => {
    const posts: IPost[] = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  });
});

// Return all post by user
router.route("/userPost/:userId").get(async (req: Request, res: Response) => {
  await routeHandler(res, async () => {
    const { userId } = req.params;
    const posts: IPost[] = await Post.find({ author: userId });
    res.status(200).json({ success: true, data: posts });
  });
});

// Return post by ID
router.route("/:postID").get(async (req: Request, res: Response) => {
  await routeHandler(res, async () => {
    const { postID } = req.params;
    const post: IPost | null = await Post.findById(postID).populate("author");
    res.json({ success: true, data: post });
  });
});

// Add a new post
router.route("/").post(async (req: Request, res: Response) => {
  await routeHandler(res, async () => {
    const { name, prompt, photo, model } = req.body;
    const cloudinaryRes: any = await cloudinary.uploader.upload(photo);
    const author: IUser | null = await User.findOne({ username: name });
    const newPost: IPost = await Post.create({
      name,
      prompt,
      photo: cloudinaryRes.url,
      photo_id: cloudinaryRes.public_id,
      model,
      author: author?._id,
    });
    res.status(200).json({ success: true, data: newPost });
  });
});

// Delete post
router.route("/").delete(async (req: Request, res: Response) => {
  await routeHandler(res, async () => {
    const { _id, photo_id } = req.body;
    await cloudinary.uploader.destroy(photo_id);
    await Post.deleteOne({ _id: _id });
    await Likes.deleteMany({ post_id: _id });
    res.status(200).json({ success: true });
  });
});

export default router;
