import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mood: { type: String, enum: ["happy", "sad", "anxious", "neutral", "excited"], required: true },
  note: String
}, { timestamps: true });

export default mongoose.model("Mood", moodSchema);
