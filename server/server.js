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

/* 🔐 ENV CHECK (SAFE) */
const requiredEnv = ["MONGO_URI", "JWT_SECRET"];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing ENV: ${key}`);
    process.exit(1);
  }
});

/* 🔐 SECURITY MIDDLEWARE */
app.use(helmet());

/* 🔐 RATE LIMIT */
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));

/* 🔐 CORS (LOCKED) */
const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend.vercel.app",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
}));

/* 🔐 BODY */
app.use(express.json());

/* 🔍 DEV LOG ONLY */
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

    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running`)
    );
  })
  .catch(() => {
    console.error("❌ DB Error");
    process.exit(1);
  });