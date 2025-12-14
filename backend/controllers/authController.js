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

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("JWT ISSUED 👉", token); // 👈 ADD THIS

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  }

  res.status(401).json({ message: "Invalid credentials" });
};



export const getProfile = async (token) => {
  console.log("FRONTEND TOKEN 👉", token); // 👈 ADD THIS

  const res = await fetch(`${API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};
