import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./mongodb/connect";
import { router as savedApisRouter } from "./routes/savedapi.routes";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/savedapis", savedApisRouter);

const startServer = async () => {
  try {
    if (process.env.MONGODB_URL) {
      connectDB(process.env.MONGODB_URL);
      app.listen(process.env.PORT, () =>
        console.log(`server has started on port ${process.env.PORT}`)
      );
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
