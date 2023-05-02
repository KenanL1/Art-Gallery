import mongoose from "mongoose";

const Auth = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const AuthSchema = mongoose.model("Auth", Auth);

export default AuthSchema;
