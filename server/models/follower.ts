import mongoose from "mongoose";

const Follower = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const FollowerSchema = mongoose.model("Follower", Follower);

export default FollowerSchema;
