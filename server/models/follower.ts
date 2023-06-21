import mongoose, { Schema, Document, Model } from "mongoose";
export interface IFollower extends Document {
  user: Schema.Types.ObjectId;
  following: Schema.Types.ObjectId;
}
const FollowerSchema: Schema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  following: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
const FollowerModel: Model<IFollower> = mongoose.model<IFollower>("Follower", FollowerSchema);
export default FollowerModel;
