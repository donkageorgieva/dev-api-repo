import mongoose, { Model, Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  _id: { type: mongoose.Schema.Types.ObjectId },
  savedAPIs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Savedapi" }],
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
