import mongoose from "mongoose";

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  // followers: [
  //   {
  //     user: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "User",
  //       default: [],
  //     },
  //   },
  // ],
  // following: [
  //   {
  //     user: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "User",
  //       default: [],
  //     },
  //   },
  // ],
  // likes: [
  //   {
  //     post: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Post",
  //       default: [],
  //     },
  //   },
  // ],
});

const UserSchema = mongoose.model("User", User);

export default UserSchema;
