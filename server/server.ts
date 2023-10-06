import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./mongodb/connect";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Hello world" });
});

const startServer = async () => {
  try {
    if (process.env.MONGODB_URL) {
      connectDB(process.env.MONGODB_URL);
    }
    const dbEnvError = new Error();
    dbEnvError.message = "No enviroment variable for Mongodb";
    throw dbEnvError;
  } catch (error) {
    throw error;
  }
};
