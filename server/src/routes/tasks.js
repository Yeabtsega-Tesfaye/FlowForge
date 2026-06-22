import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

// All task routes require auth
router.use(auth);

router.get("/",       getTasks);
router.post("/",      createTask);
router.put("/:id",    updateTask);
router.delete("/:id", deleteTask);

export default router;
