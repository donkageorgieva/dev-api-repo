import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./mongodb/connect";

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());
app.use("/", (req, res) => {
  return res.send({ message: "Route reached" });
});

const startServer = async () => {
  try {
    if (process.env.MONGODB_URL) {
      connectDB(process.env.MONGODB_URL);
      app.listen(8080, () => console.log("server has started on port 8080"));
    } else {
      const dbEnvError = new Error();
      dbEnvError.message = "Could not find DB URL env variable";
      throw dbEnvError;
    }
  } catch (error) {
    throw error;
  }
};

startServer();
