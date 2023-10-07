import express from "express";
import { getSavedApis } from "../controllers/savedapi.controller";

export const router = express.Router();

router.get("/", getSavedApis);

// router.post("/", postSavedApi);

// router.delete("/", deleteSavedApi);

// router.put("/", updateSavedApi);

// export default router;
