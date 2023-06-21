import mongoose, { Document, Model } from "mongoose";
export interface IUser extends Document {
  _id: string;
  username: string;
}
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
});
const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default User;
