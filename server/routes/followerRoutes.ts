import express from "express";
import Follower from "../models/follower.js";

const router = express.Router();

// Get a list of followers of a user
router.route("/:userId/followers").get(async (req, res) => {
  const { userId } = req.params;
  try {
    const followers = await Follower.find({ following: userId });
    res.status(200).json({ success: true, data: followers });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

// Get the number of followers of a user
router.route("/:userId/followerCount").get(async (req, res) => {
  const { userId } = req.params;

  try {
    const followerCount = await Follower.count({ following: userId });
    res.status(200).json({ success: true, data: followerCount });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
});

// Get the list of users this user is following
router.route("/:userId/following").get(async (req, res) => {
  const { userId } = req.params;
  try {
    const following = await Follower.find({ user: userId });
    res.status(200).json({ success: true, data: following });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
});

// Get the number of users this user follows
router.route("/:userId/followingCount").get(async (req, res) => {
  const { userId } = req.params;
  try {
    const followingCount = await Follower.count({ user: userId });
    res.status(200).json({ success: true, data: followingCount });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
});

// Check if user is following target
router.route("/:userId/following/:target").get(async (req, res) => {
  const { userId, target } = req.params;
  try {
    const following = await Follower.find({ user: userId, following: target });
    res
      .status(200)
      .json({ success: true, data: following.length > 0 ? true : false });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
});

// Follow a user
router.route("/:userId/follow/:target").post(async (req, res) => {
  const { userId, target } = req.params;
  try {
    const newFollower = await Follower.create({
      user: userId,
      following: target,
    });
    res.status(200).json({ success: true, data: newFollower });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
});

// Unfollow a user
router.route("/:userId/unfollow/:target").post(async (req, res) => {
  const { userId, target } = req.params;
  try {
    await Follower.deleteOne({ user: userId, following: target });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
});

export default router;
