import express from "express";
import { addMood, getMoods } from "../controllers/moodController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.route("/").post(protect, addMood).get(protect, getMoods);
export default router;
