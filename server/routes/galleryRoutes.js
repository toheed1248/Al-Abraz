import express from "express";
import rateLimit from "express-rate-limit";

import {
  uploadImage,
  getImages,
  deleteImage,
  updateImage,
  deleteSingleImage
} from "../controllers/galleryController.js";

import { uploadMultiple } from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const writeLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 40,
});

router.get("/", getImages);

router.post("/upload", protect, writeLimiter, uploadMultiple, uploadImage);

router.put("/:id", protect, writeLimiter, uploadMultiple, updateImage);

router.delete("/:id", protect, deleteImage);

router.delete("/:projectId/image/:imageId", protect, deleteSingleImage);

export default router;