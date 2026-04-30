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

    /* 🔐 RATE LIMIT (5 ATTEMPTS / 15 MIN) */
    const ip = req.ip;
    if (!loginAttempts[ip]) loginAttempts[ip] = { count: 0, time: Date.now() };

    const attempt = loginAttempts[ip];

    if (attempt.count >= 5 && Date.now() - attempt.time < 15 * 60 * 1000) {
      return res.status(429).json({ msg: "Too many attempts. Try later." });
    }

    /* 🔍 FIND ADMIN */
    const admin = await Admin.findOne({ email });

    /* 🔐 GENERIC ERROR (NO INFO LEAK) */
    if (!admin) {
      attempt.count++;
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      attempt.count++;
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    /* ✅ RESET ATTEMPTS ON SUCCESS */
    loginAttempts[ip] = { count: 0, time: Date.now() };

    /* 🔐 JWT SECRET CHECK */
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET missing");
    }

    /* 🔐 TOKEN */
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({ token });

  } catch (err) {
    /* ❌ DON'T LEAK INTERNAL ERROR */
    res.status(500).json({ msg: "Server error" });
  }
};