import User from "../models/User.js";
import jwt from "jsonwebtoken";

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const normalizedEmail = email?.trim().toLowerCase();
  if (!name || !email || !password) return res.status(400).json({ message: "Please include all fields" });

  const exists = await User.findOne({ email: normalizedEmail, });
  if (exists) return res.status(400).json({ message: "User already exists", });

  const user = await User.create({ name: name.trim(), email: normalizedEmail, password });
  return res.status(201).json({
    token: createToken(user._id),
    user: { _id: user._id, name: user.name, email: user.email },
  });
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "No account found with this email. Please register first.",
      });
    }

    console.log("User found:", Boolean(user));
    console.log("Stored password format:", user.password?.startsWith("$2"));

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password. Please try again.",
      });
    }

    const token = createToken(user._id);

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      message: "Login failed. Please try again.",
    });
  }
};

const API_URL = "http://localhost:5000/api";

export const getProfile = async (req, res) => {
  res.json(req.user);
};

