import express from "express";
import { imagekit } from "../config/imagekit.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const { file } = req.body;

    if (!file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const result = await imagekit.upload({
      file,
      fileName: `journal-${Date.now()}.jpg`,
    });

    res.json({ url: result.url });
  } catch (err) {
    console.error("IMAGE UPLOAD ERROR:", err);
    res.status(500).json({ message: "Image upload failed" });
  }
});

export default router;
