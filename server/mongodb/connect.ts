import mongoose from "mongoose";

const connectDB = async (url: string) => {
  // enable strict mode, query the db only with defined in the schema field names
  mongoose.set("strictQuery", true);
  try {
    const connection = await mongoose.connect(url);
    if (connection) {
      console.log("connected to db");
    } else {
      return new Error("Connection to the database failed");
    }
  } catch (error) {
    throw error;
  }
};

export default connectDB;
