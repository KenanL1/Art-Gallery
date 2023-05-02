import express from "express";
import bcrypt from "bcrypt";
import Auth from "../models/auth.js";
import User from "../models/user.js";
import { issueJWT } from "../authentication/utils.js";

const router = express.Router();

// Create a new user
router.route("/register").post(async (req, res) => {
  try {
    const user = await Auth.findOne({ username: req.body.username });
    if (user)
      res.status(400).json({
        message: `Account with username ${user.username} already exist`,
      });
    else {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      const newProfile = await User.create({
        username: req.body.username,
      });
      newProfile.save();
      const newUser = await Auth.create({
        name: req.body.name,
        username: req.body.username,
        password: hashPassword,
        profile: newProfile._id,
      });
      newUser.save();
      res.status(200).json({
        success: true,
        msg: `User ${req.body.username} has been registered successfully!`,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, msg: err });
  }
});

// Authenticate and validate user
router.route("/login").post(async (req, res) => {
  try {
    const user = await Auth.findOne({ username: req.body.username }).populate(
      "profile"
    );
    if (!user)
      return res.status(401).json({
        success: false,
        msg: `The username: ${req.body.username} is not associated with an account`,
      });

    bcrypt.compare(req.body.password, user.password, (err, data) => {
      if (err) throw err;
      if (data) {
        const token = issueJWT(user);
        res.status(200).json({
          success: true,
          user: user.profile._id,
          username: user.username,
          token: token.token,
          expiresIn: token.expires,
        });
      } else {
        res
          .status(401)
          .json({ success: false, msg: "you entered the wrong password" });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

export default router;
