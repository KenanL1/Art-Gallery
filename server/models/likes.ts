import mongoose, { Schema, Document, Model } from "mongoose";
export interface ILikes extends Document {
  user: Schema.Types.ObjectId;
  post: Schema.Types.ObjectId;
}
const LikesSchema: Schema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
});
const LikesModel: Model<ILikes> = mongoose.model<ILikes>("Likes", LikesSchema);
export default LikesModel;
