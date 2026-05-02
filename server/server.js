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

/* 🔥 TRUST PROXY (RENDER / VERCEL SAFE) */
app.set("trust proxy", 1);

/* 🔥 CORS */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

/* 🔥 FORCE HEADERS (ERROR CASE SAFE) */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

/* 🔐 SECURITY */
app.use(helmet());

/* 🔥 GLOBAL RATE LIMIT */
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
}));

/* 🔐 BODY PARSER */
app.use(express.json({ limit: "10mb" }));

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

/* 🔐 ERROR HANDLER (IMPROVED) */
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    msg: err.message || "Server error",
  });
});

/* 🔌 DB CONNECT */
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ DB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Error:", err.message);
    process.exit(1);
  });