import express from "express";
import { signUp, signIn } from "../controllers/user.controller";

export const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
