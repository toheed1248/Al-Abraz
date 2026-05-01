import express from "express";
import rateLimit from "express-rate-limit";

import {
  uploadImage,
  getImages,
  deleteImage,
  updateImage
} from "../controllers/galleryController.js";

import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= SMART RATE LIMIT ================= */

/* 🔹 GET (HIGH LIMIT - PUBLIC) */
const getLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 300, // 🔥 high (gallery load safe)
  standardHeaders: true,
  legacyHeaders: false,
});

/* 🔹 WRITE (LOW LIMIT - PROTECTED) */
const writeLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 40, // 🔥 control spam (upload/delete/update)
  standardHeaders: true,
  legacyHeaders: false,
  message: { msg: "Too many actions, slow down" },
});

/* ================= ROUTES ================= */

/* 🔹 GET (PUBLIC + SAFE) */
router.get("/", getLimiter, getImages);

/* 🔹 UPLOAD (PROTECTED) */
router.post(
  "/upload",
  protect,
  writeLimiter,
  upload.single("image"),
  uploadImage
);

/* 🔹 DELETE (PROTECTED) */
router.delete(
  "/:id",
  protect,
  writeLimiter,
  deleteImage
);

/* 🔹 UPDATE (PROTECTED) */
router.put(
  "/:id",
  protect,
  writeLimiter,
  updateImage
);

export default router;