import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import { issueJWT } from "../authentication/utils.js";

const router = express.Router();

router.route("/register").post(async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user)
      res.status(400).json({
        message: `Account with username ${user.username} already exist`,
      });
    else {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = await User.create({
        name: req.body.name,
        username: req.body.username,
        password: hashPassword,
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

router.route("/login").post(async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return res.status(401).json({
        success: false,
        msg: `The username: ${req.body.username} is not associated with an account`,
      });

    if (bcrypt.compare(req.body.password, user.password)) {
      const token = issueJWT(user);
      res.status(200).json({
        success: true,
        username: user.username,
        token: token.token,
        expiresIn: token.expires,
      });
    } else {
      res
        .status(401)
        .json({ success: false, msg: "you entered the wrong password" });
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
