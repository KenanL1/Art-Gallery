import express from "express";
import Likes from "../models/likes.js";
import Post from "../models/post.js";
import User from "../models/user.js";
import { routeHandler } from "../utils/routeUils.js";

const router = express.Router();

// Get post liked by the user
router.route("/:userId").get(async (req, res) => {
  await routeHandler(res, async () => {
    const { userId } = req.params;
    const likes = await Likes.find({ user: userId }).populate("post");
    res.status(200).json({ success: true, data: likes });
  });
});

// Get number of likes user recieved
router.route("/:userId/likeCount").get(async (req, res) => {
  await routeHandler(res, async () => {
    const { userId } = req.params;
    const results = await User.aggregate([
      {
        $match: {
          _id: userId,
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "author",
          as: "posts",
        },
      },
      {
        $unwind: "$posts",
      },
      {
        $lookup: {
          from: "likes",
          localField: "posts._id",
          foreignField: "post",
          as: "likes",
        },
      },
      {
        $group: {
          _id: "$_id",
          username: { $first: "$username" },
          numLikes: { $sum: { $size: "$likes" } },
        },
      },
    ]);
    res.status(200).json({ success: true, data: results[0].numLikes });
  });
});

// Check if a post is liked by the user
router.route("/:userId/:postId").get(async (req, res) => {
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
router.route("/:userId/:postId").post(async (req, res) => {
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
router.route("/:userId/:postId").delete(async (req, res) => {
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
