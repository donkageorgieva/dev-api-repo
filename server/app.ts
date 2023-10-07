import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { router as savedApisRouter } from "./routes/savedapi.routes";
import { router as authRouter } from "./routes/user.routes";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/savedapis", savedApisRouter);
app.use("/auth", authRouter);

export default app;
