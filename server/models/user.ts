import mongoose from "mongoose";

const User = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean },
});

const UserSchema = mongoose.model("User", User);

export default UserSchema;
