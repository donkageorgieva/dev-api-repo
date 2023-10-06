import cors from "cors";
import express from "express";
import { router as savedApisRouter } from "../routes/savedapi.routes";
export function setupApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/savedapis", savedApisRouter);
  return app;
}
