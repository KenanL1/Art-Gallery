import mongoose, { Schema, Document, Model } from "mongoose";
export interface IAuth extends Document {
  _id: string;
  name: string;
  username: string;
  password: string;
  admin?: boolean;
  profile?: Schema.Types.ObjectId;
}
const AuthSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
const AuthModel: Model<IAuth> = mongoose.model<IAuth>("Auth", AuthSchema);
export default AuthModel;
