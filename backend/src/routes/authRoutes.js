import express from "express";
import { googleLogin } from "../controllers/OauthController.js";

const router = express.Router();

router.post("/google", googleLogin);

export default router;
