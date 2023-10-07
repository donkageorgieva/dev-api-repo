import mongoose from "mongoose";

const SavedApi = new mongoose.Schema({
  API: { type: String, required: true },
  title: String,
  description: String,
  auth: String,
  https: Boolean,
  cors: String,
  category: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const SavedApiModel = mongoose.model("Savedapi", SavedApi);
export default SavedApiModel;
