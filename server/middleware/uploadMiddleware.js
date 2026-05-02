import multer from "multer";

/* 🔹 Storage (memory for Cloudinary) */
const storage = multer.memoryStorage();

/* 🔹 File filter (only images allowed) */
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
  }
};

/* 🔹 Base multer config */
const baseUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
    files: 8, // 🔥 max 8 images
  },
  fileFilter,
});

/* ================= SINGLE IMAGE ================= */
export const uploadSingle = baseUpload.single("image");

/* ================= MULTIPLE IMAGES ================= */
export const uploadMultiple = baseUpload.array("images", 8);

/* ================= ERROR HANDLER ================= */
export const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    let message = "Upload error";

    if (err.code === "LIMIT_FILE_SIZE") {
      message = "File size too large (max 5MB)";
    }

    if (err.code === "LIMIT_FILE_COUNT") {
      message = "Too many files (max 8 allowed)";
    }

    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      message = "Invalid file type (only JPG, PNG, WEBP)";
    }

    return res.status(400).json({
      success: false,
      msg: message,
    });
  }

  if (err) {
    return res.status(400).json({
      success: false,
      msg: err.message,
    });
  }

  next();
};

export default baseUpload;