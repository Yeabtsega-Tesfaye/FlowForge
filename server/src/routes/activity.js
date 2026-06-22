import { Router } from "express";
import { getActivity } from "../controllers/activityController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/", auth, getActivity);

export default router;
