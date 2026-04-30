import express from "express";
import {
  uploadImage,
  getImages,
  deleteImage,
  updateImage
} from "../controllers/galleryController.js";

import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* 🔥 ROUTES */
router.post("/upload", protect, upload.single("image"), uploadImage);
router.get("/", getImages);
router.delete("/:id", protect, deleteImage);
router.put("/:id", protect, updateImage);

export default router;