import express from "express";
import rateLimit from "express-rate-limit";

import {
  uploadImage,
  getImages,
  deleteImage,
  updateImage,
} from "../controllers/galleryController.js";

import upload from "../middleware/uploadMiddleware.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================================================
   🔥 PUBLIC GET LIMITER
========================================================= */

const getLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute

  max: 300,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    msg: "Too many requests, please slow down",
  },
});

/* =========================================================
   🔥 WRITE LIMITER
========================================================= */

const writeLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute

  max: 40,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    msg: "Too many actions, slow down",
  },
});

/* =========================================================
   🔥 GET PROJECTS
========================================================= */

/*
PUBLIC ROUTE
*/
router.get(
  "/",
  getLimiter,
  getImages
);

/* =========================================================
   🔥 UPLOAD PROJECT
========================================================= */

/*
PROTECTED ROUTE
MULTIPLE IMAGE UPLOAD
*/
router.post(
  "/upload",

  protect,

  writeLimiter,

  upload.array("images", 15),

  uploadImage
);

/* =========================================================
   🔥 UPDATE PROJECT
========================================================= */

/*
PROTECTED ROUTE
MULTIPLE IMAGE UPDATE
*/
router.put(
  "/:id",

  protect,

  writeLimiter,

  upload.array("images", 15),

  updateImage
);

/* =========================================================
   🔥 DELETE PROJECT
========================================================= */

/*
PROTECTED ROUTE
*/
router.delete(
  "/:id",

  protect,

  writeLimiter,

  deleteImage
);

/* =========================================================
   🔥 EXPORT
========================================================= */

export default router;