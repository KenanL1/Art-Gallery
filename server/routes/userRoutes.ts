import express from "express";
import User from "../models/user.js";

const router = express.Router();

// Get the user by userID
router
  .route("/:userID")
  .get(async (req: express.Request, res: express.Response) => {
    try {
      const { userID } = req.params;
      const user = await User.findById(userID);
      res.json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Fetching user failed, please try again later",
      });
    }
  });

// get the user by username
router
  .route("/username/:username")
  .get(async (req: express.Request, res: express.Response) => {
    try {
      const { username } = req.params;
      const user = await User.findOne({ username: username });
      res.json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Fetching user failed, please try again later",
      });
    }
  });

export default router;
