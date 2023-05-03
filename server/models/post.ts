import mongoose from "mongoose";

const Post = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    prompt: { type: String, required: true },
    photo: { type: String, required: true },
    photo_id: { type: String },
    likes: { type: Number, default: 0 },
    model: { type: String },
    guidance_scale: { type: Number },
    size: { type: String },
    steps: { Type: Number },
  },
  { timestamps: true }
);

const PostSchema = mongoose.model("Post", Post);

export default PostSchema;
