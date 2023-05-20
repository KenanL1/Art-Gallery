import express from "express";
import User from "../models/user.js";
import { routeHandler } from "../utils/routeUils.js";

const router = express.Router();

// Get the user by userID
router
  .route("/:userID")
  .get(async (req: express.Request, res: express.Response) => {
    await routeHandler(res, async () => {
      const { userID } = req.params;
      const user = await User.findById(userID);
      res.json({ success: true, data: user });
    });
  });

// get the user by username
router
  .route("/username/:username")
  .get(async (req: express.Request, res: express.Response) => {
    await routeHandler(res, async () => {
      const { username } = req.params;
      const user = await User.findOne({ username: username });
      res.json({ success: true, data: user });
    });
  });

export default router;
