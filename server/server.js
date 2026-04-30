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

/* 🔥 CORS (FIRST — VERY IMPORTANT) */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

/* 🔐 SECURITY */
app.use(helmet());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
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

/* NOT FOUND */
app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

/* DB CONNECT */
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ DB Connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log("🚀 Server running");
    });
  })
  .catch(() => {
    console.error("❌ DB Error");
    process.exit(1);
  });