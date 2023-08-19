import express, { Request, Response, Router } from "express";
import Likes from "../models/likes.js";
import Post from "../models/post.js";
import User from "../models/user.js";
import mongoose, { Schema, Types } from "mongoose";
import { routeHandler, paginatedResult } from "../utils/routeUils.js";

const router: Router = express.Router();

// Get posts liked by the user
router.route("/:userId").get(async (req: Request, res: Response) => {
  await routeHandler(res, async () => {
    const { userId } = req.params;
    const page = Number(req.query.page);
    // const likes = await Likes.find({ user: userId }).populate("post");
    const likes = await paginatedResult(Likes, { user: userId }, page, "post");
    res.status(200).json({ success: true, data: likes });
  });
});

// Get number of likes user recieved
router.route("/:userId/likeCount").get(async (req: Request, res: Response) => {
  await routeHandler(res, async () => {
    const { userId } = req.params;
    // const results = await User.aggregate([
    //   {
    //     $match: {
    //       _id: userId,
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "posts",
    //       localField: "_id",
    //       foreignField: "author._id",
    //       as: "posts",
    //     },
    //   },
    //   {
    //     $unwind: "$posts",
    //   },
    //   {
    //     $lookup: {
    //       from: "likes",
    //       localField: "posts._id",
    //       foreignField: "post",
    //       as: "likes",
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$_id",
    //       username: { $first: "$username" },
    //       numLikes: { $sum: { $size: "$likes" } },
    //     },
    //   },
    // ]);
    // Use the aggregate function to perform the join and aggregation
    const result = await Post.aggregate([
      {
        $match: { author: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "post",
          as: "likes",
        },
      },
      {
        $group: {
          _id: null,
          totalLikes: { $sum: { $size: "$likes" } },
        },
      },
    ]);
    res.status(200).json({ success: true, data: result[0]?.totalLikes || 0 });
  });
});

// Check if a post is liked by the user
router.route("/:userId/:postId").get(async (req: Request, res: Response) => {
  await routeHandler(res, async () => {
    const { userId, postId } = req.params;
    const likes = await Likes.find({
      user: userId,
      post: postId,
    });
    res
      .status(200)
      .json({ success: true, data: likes.length > 0 ? true : false });
  });
});

// Like a post
router.route("/:userId/:postId").post(async (req: Request, res: Response) => {
  await routeHandler(res, async () => {
    const { userId, postId } = req.params;
    const likes = await Likes.create({
      user: userId,
      post: postId,
    });
    await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } });
    res.status(200).json({ success: true, data: likes });
  });
});

// Unlike a post
router.route("/:userId/:postId").delete(async (req: Request, res: Response) => {
  await routeHandler(res, async () => {
    const { userId, postId } = req.params;
    await Likes.deleteOne({
      user: userId,
      post: postId,
    });
    await Post.findByIdAndUpdate(postId, { $inc: { likes: -1 } });
    res.status(200).json({ success: true });
  });
});

export default router;
