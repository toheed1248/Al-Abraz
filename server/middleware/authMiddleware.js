import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    /* 🔐 JWT SECRET CHECK */
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET missing");
    }

    /* 🔹 AUTH HEADER */
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        msg: "Unauthorized",
      });
    }

    /* 🔹 SAFE TOKEN EXTRACTION */
    const parts = authHeader.split(" ");
    const token = parts.length === 2 ? parts[1] : null;

    if (!token) {
      return res.status(401).json({
        success: false,
        msg: "Unauthorized",
      });
    }

    /* 🔹 VERIFY TOKEN */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /* 🔹 ATTACH USER */
    req.admin = decoded;

    next();

  } catch (err) {

    /* 🔍 DEV ONLY LOG */
    if (process.env.NODE_ENV !== "production") {
      console.error("AUTH ERROR:", err.message);
    }

    /* 🔐 GENERIC RESPONSE */
    return res.status(401).json({
      success: false,
      msg: "Unauthorized",
    });
  }
};