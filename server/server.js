import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/authRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";

const app = express();

/* 🔥 CORS (NO app.options — IMPORTANT) */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

/* 🔥 ALWAYS SEND HEADERS (FOR 429 + ERRORS) */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

/* 🔐 SECURITY */
app.use(helmet());

/* 🔥 RATE LIMIT (RELAXED) */
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
}));

/* 🔐 BODY */
app.use(express.json());

/* 🔗 ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/gallery", galleryRoutes);

/* ROOT */
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

/* ❌ NOT FOUND */
app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

/* 🔐 ERROR HANDLER */
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err.message);

  res.status(500).json({
    msg: err.message || "Server error",
  });
});

/* 🔌 DB CONNECT */
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ DB Connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log("🚀 Server running");
    });
  })
  .catch((err) => {
    console.error("❌ DB Error:", err.message);
    process.exit(1);
  });