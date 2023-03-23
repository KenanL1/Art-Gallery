import mongoose from "mongoose";

const Post = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
  model: { type: String },
  guidance_scale: { type: Number },
  size: { type: String },
  steps: { Type: Number },
});

const PostSchema = mongoose.model("Post", Post);

export default PostSchema;
