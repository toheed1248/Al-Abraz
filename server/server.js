import dotenv from "dotenv";
dotenv.config();

/* =========================================================
   🔥 IMPORTS
========================================================= */

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

/* =========================================================
   🔥 ROUTES
========================================================= */

import authRoutes from "./routes/authRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";

/* =========================================================
   🔥 APP
========================================================= */

const app = express();

/* =========================================================
   🔥 TRUST PROXY (RENDER FIX)
========================================================= */

app.set("trust proxy", 1);

/* =========================================================
   🔥 SECURITY HEADERS
========================================================= */

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

/* =========================================================
   🔥 CORS
========================================================= */

app.use(
  cors({
    origin: "*",

    methods: ["GET", "POST", "PUT", "DELETE"],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],

    credentials: false,
  })
);

/* =========================================================
   🔥 MANUAL HEADERS
========================================================= */

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "*"
  );

  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE"
  );

  next();
});

/* =========================================================
   🔥 GLOBAL RATE LIMIT
========================================================= */

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 500,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    msg: "Too many requests, try again later",
  },
});

app.use(globalLimiter);

/* =========================================================
   🔥 BODY PARSER
========================================================= */

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

/* =========================================================
   🔥 ROOT ROUTE
========================================================= */

app.get("/", (req, res) => {
  res.status(200).send("API running 🚀");
});

/* =========================================================
   🔥 API ROUTES
========================================================= */

app.use("/api/auth", authRoutes);

app.use("/api/gallery", galleryRoutes);

/* =========================================================
   🔥 404 HANDLER
========================================================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    msg: "Route not found",
  });
});

/* =========================================================
   🔥 GLOBAL ERROR HANDLER
========================================================= */

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  /*
  🔥 MULTER ERROR
  */
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      msg: "File size too large (Max 10MB)",
    });
  }

  /*
  🔥 INVALID FILE TYPE
  */
  if (
    err.message &&
    err.message.includes("Only JPG")
  ) {
    return res.status(400).json({
      success: false,
      msg: err.message,
    });
  }

  /*
  🔥 DEFAULT ERROR
  */
  res.status(500).json({
    success: false,
    msg:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

/* =========================================================
   🔥 DATABASE CONNECTION
========================================================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(
        `🚀 Server running on port ${PORT}`
      );
    });
  })
  .catch((err) => {
    console.error(
      "❌ MongoDB Connection Error:",
      err.message
    );

    process.exit(1);
  });