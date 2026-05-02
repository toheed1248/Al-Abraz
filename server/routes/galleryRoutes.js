import express from "express";
import rateLimit from "express-rate-limit";

import {
  uploadImage,
  getImages,
  deleteImage,
  updateImage,
  deleteSingleImage
} from "../controllers/galleryController.js";

import {
  uploadMultiple,
  multerErrorHandler
} from "../middleware/uploadMiddleware.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= SMART RATE LIMIT ================= */

/* 🔹 GET (HIGH LIMIT - PUBLIC) */
const getLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});

/* 🔹 WRITE (LOW LIMIT - PROTECTED) */
const writeLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
  message: { msg: "Too many actions, slow down" },
});

/* ================= ROUTES ================= */

/* 🔹 GET (PUBLIC + SAFE) */
router.get("/", getLimiter, getImages);

/* 🔹 UPLOAD PROJECT (MULTI IMAGE) */
router.post(
  "/upload",
  protect,
  writeLimiter,
  uploadMultiple,          // 🔥 changed
  multerErrorHandler,      // 🔥 added
  uploadImage
);

/* 🔹 UPDATE PROJECT (ADD IMAGES + TEXT) */
router.put(
  "/:id",
  protect,
  writeLimiter,
  uploadMultiple,          // 🔥 changed
  multerErrorHandler,      // 🔥 added
  updateImage
);

/* 🔹 DELETE PROJECT */
router.delete(
  "/:id",
  protect,
  writeLimiter,
  deleteImage
);

/* 🔥 DELETE SINGLE IMAGE (NEW FEATURE) */
router.delete(
  "/:projectId/image/:imageId",
  protect,
  writeLimiter,
  deleteSingleImage
);

export default router;