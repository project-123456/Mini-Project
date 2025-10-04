import User from "../models/User.js";
import jwt from "jsonwebtoken";

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Please include all fields" });

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password });
  return res.status(201).json({
    token: createToken(user._id),
    user: { _id: user._id, name: user.name, email: user.email },
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Please provide email & password" });

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    return res.json({
      token: createToken(user._1d || user._id),
      user: { _id: user._id, name: user.name, email: user.email },
    });
  }
  return res.status(401).json({ message: "Invalid credentials" });
};

export const getProfile = async (req, res) => {
  // req.user set by auth middleware
  if (!req.user) return res.status(401).json({ message: "Not authorized" });
  res.json({ _id: req.user._id, name: req.user.name, email: req.user.email });
};
