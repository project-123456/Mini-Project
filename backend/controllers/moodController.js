import Mood from "../models/Mood.js";

export const addMood = async (req, res) => {
  const { mood } = req.body;
  if (!mood) return res.status(400).json({ message: "Mood required" });
  const doc = await Mood.create({ mood, user: req.user._id });
  res.status(201).json(doc);
};

export const getMoods = async (req, res) => {
  const list = await Mood.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(list);
};
