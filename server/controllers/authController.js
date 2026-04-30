import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* 🔐 BASIC RATE LIMIT MEMORY (LIGHTWEIGHT) */
const loginAttempts = {};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    /* 🔐 INPUT VALIDATION */
    if (!email || !password) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    /* 🔐 RATE LIMIT */
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    if (!loginAttempts[ip]) loginAttempts[ip] = { count: 0, time: Date.now() };

    const attempt = loginAttempts[ip];

    if (attempt.count >= 5 && Date.now() - attempt.time < 15 * 60 * 1000) {
      return res.status(429).json({ msg: "Too many attempts. Try later." });
    }

    /* 🔍 FIND ADMIN */
    const admin = await Admin.findOne({ email });

    if (!admin) {
      attempt.count++;
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      attempt.count++;
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    /* ✅ RESET ATTEMPTS */
    loginAttempts[ip] = { count: 0, time: Date.now() };

    /* 🔐 TOKEN */
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};


/* 🚀 CREATE ADMIN (TEMPORARY) */
export const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "Admin already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      email,
      password: hashed,
    });

    res.status(201).json({
      success: true,
      msg: "Admin created",
    });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};