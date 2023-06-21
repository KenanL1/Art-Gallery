import express, { Router, Request, Response } from "express";
import Follower, { IFollower } from "../models/follower.js";
import { routeHandler } from "../utils/routeUils.js";

const router: Router = express.Router();
// Get a list of followers of a user
router.route("/:userId/followers").get(async (req: Request, res: Response) => {
  await routeHandler(res, async () => {
    const { userId } = req.params;
    const followers: IFollower[] = await Follower.find({ following: userId });
    res.status(200).json({ success: true, data: followers });
  });
});
// Get the number of followers of a user
router
  .route("/:userId/followerCount")
  .get(async (req: Request, res: Response) => {
    await routeHandler(res, async () => {
      const { userId } = req.params;
      const followerCount: number = await Follower.countDocuments({
        following: userId,
      });
      res.status(200).json({ success: true, data: followerCount });
    });
  });
// Get the list of users this user is following
router.route("/:userId/following").get(async (req: Request, res: Response) => {
  await routeHandler(res, async () => {
    const { userId } = req.params;
    const following: IFollower[] = await Follower.find({ user: userId });
    res.status(200).json({ success: true, data: following });
  });
});
// Get the number of users this user follows
router
  .route("/:userId/followingCount")
  .get(async (req: Request, res: Response) => {
    await routeHandler(res, async () => {
      const { userId } = req.params;
      const followingCount: number = await Follower.countDocuments({
        user: userId,
      });
      res.status(200).json({ success: true, data: followingCount });
    });
  });
// Check if user is following target
router
  .route("/:userId/following/:target")
  .get(async (req: Request, res: Response) => {
    await routeHandler(res, async () => {
      const { userId, target } = req.params;
      const following: IFollower[] = await Follower.find({
        user: userId,
        following: target,
      });
      res
        .status(200)
        .json({ success: true, data: following.length > 0 ? true : false });
    });
  });
// Follow a user
router
  .route("/:userId/follow/:target")
  .post(async (req: Request, res: Response) => {
    await routeHandler(res, async () => {
      const { userId, target } = req.params;
      const newFollower: IFollower = await Follower.create({
        user: userId,
        following: target,
      });
      res.status(200).json({ success: true, data: newFollower });
    });
  });
// Unfollow a user
router
  .route("/:userId/unfollow/:target")
  .post(async (req: Request, res: Response) => {
    await routeHandler(res, async () => {
      const { userId, target } = req.params;
      await Follower.deleteOne({ user: userId, following: target });
      res.status(200).json({ success: true });
    });
  });
export default router;
