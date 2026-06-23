import { Router } from "express";
import {
  register,
  login,
  me,
  updateMe,
  getPreferences,
  updatePreferences,
  exportData,
  resetWorkspace,
  deleteAccount,
} from "../controllers/authController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

// Public
router.post("/register", register);
router.post("/login",    login);

// Protected — profile
router.get("/me",         auth, me);
router.put("/me",         auth, updateMe);

// Protected — preferences
router.get("/preferences", auth, getPreferences);
router.put("/preferences", auth, updatePreferences);

// Protected — account actions
router.get("/export",          auth, exportData);
router.delete("/reset",        auth, resetWorkspace);
router.delete("/account",      auth, deleteAccount);

export default router;