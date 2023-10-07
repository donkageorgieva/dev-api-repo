import mongoose from "mongoose";

const connectDB = async (URL: string) => {
  // only access db by using defined in schema fields
  mongoose.set("strictQuery", true);

  try {
    const connection = await mongoose.connect(URL);
    if (connection) {
      console.log("Connected to db");
    } else {
      throw new Error("No database connection");
    }
  } catch (error) {
    return error;
  }
};

export default connectDB;
