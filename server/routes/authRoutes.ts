import express, { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import Auth, { IAuth } from "../models/auth.js";
import User, { IUser } from "../models/user.js";
import { issueJWT } from "../authentication/utils.js";
const router: Router = express.Router();
// Create a new user
router.route("/register").post(async (req: Request, res: Response) => {
  try {
    const user: IAuth | null = await Auth.findOne({
      username: req.body.username,
    });
    if (user) {
      res.status(400).json({
        message: `Account with username ${user.username} already exists`,
      });
    } else {
      const hashPassword: string = await bcrypt.hash(req.body.password, 10);
      const newProfile: IUser = await User.create({
        username: req.body.username,
      });
      newProfile.save();
      const newUser: IAuth = await Auth.create({
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
  } catch (err: any) {
    res.status(500).json({ success: false, msg: err.message });
  }
});
// Authenticate and validate user
router.route("/login").post(async (req: Request, res: Response) => {
  try {
    const user: IAuth | null = await Auth.findOne({
      username: req.body.username,
    }).populate("profile");
    if (!user) {
      return res.status(401).json({
        success: false,
        msg: `The username: ${req.body.username} is not associated with an account`,
      });
    }
    bcrypt.compare(
      req.body.password,
      user.password,
      (err: Error, data: boolean) => {
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
      }
    );
  } catch (err: any) {
    console.log(err);
  }
});
export default router;
