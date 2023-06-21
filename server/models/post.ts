import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPost extends Document {
  author: Schema.Types.ObjectId;
  name: string;
  prompt?: string;
  photo: string;
  photo_id?: string;
  likes: number;
  model?: string;
  guidance_scale?: number;
  size?: string;
  steps?: number;
}

const Post = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    prompt: { type: String },
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

const PostSchema: Model<IPost> = mongoose.model<IPost>("Post", Post);

export default PostSchema;
