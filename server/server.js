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

/* 🔐 ENV CHECK */
const requiredEnv = ["MONGO_URI", "JWT_SECRET"];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing ENV: ${key}`);
    process.exit(1);
  }
});

/* 🔐 SECURITY */
app.use(helmet());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));

/* 🔥 FINAL CORS (WORKING + CLEAN) */

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
/* 🔐 BODY */
app.use(express.json());

/* 🔍 DEV LOG */
if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

/* 🔗 ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/gallery", galleryRoutes);

/* ❌ NOT FOUND */
app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

/* 🔐 ERROR HANDLER */
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    console.error(err.stack);
  }
  res.status(500).json({ msg: "Server error" });
});

/* 🔌 DB CONNECT */
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