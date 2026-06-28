import { Router } from "express";
import { chat } from "../controllers/aiController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/chat", auth, chat);

export default router;