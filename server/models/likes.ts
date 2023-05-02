import mongoose from "mongoose";

const Likes = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

const LikesSchema = mongoose.model("Likes", Likes);

export default LikesSchema;
