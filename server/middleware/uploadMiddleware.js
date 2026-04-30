import multer from "multer";

// 🔹 Storage (memory for Cloudinary)
const storage = multer.memoryStorage();

// 🔹 File filter (only images allowed)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG, WEBP images are allowed"), false);
  }
};

// 🔹 Multer config
const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },

  fileFilter,
});

export default upload;