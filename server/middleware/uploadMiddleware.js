import multer from "multer";

/* ================= STORAGE ================= */

/*
🔥 MEMORY STORAGE
Fast upload for Cloudinary
Best for Render/Vercel
*/
const storage = multer.memoryStorage();

/* ================= ALLOWED FILE TYPES ================= */

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

/* ================= FILE FILTER ================= */

const fileFilter = (req, file, cb) => {
  try {
    /* 🔥 VALIDATE MIME TYPE */
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
        new Error(
          "Only JPG, JPEG, PNG, WEBP images are allowed"
        ),
        false
      );
    }

    /* 🔥 SAFE FILE NAME CHECK */
    if (!file.originalname) {
      return cb(
        new Error("Invalid file name"),
        false
      );
    }

    cb(null, true);

  } catch (err) {
    cb(err, false);
  }
};

/* ================= MULTER CONFIG ================= */

const upload = multer({
  storage,

  fileFilter,

  limits: {
    /*
    🔥 MAX SINGLE FILE SIZE
    10MB
    */
    fileSize: 10 * 1024 * 1024,

    /*
    🔥 MAX FILE COUNT
    */
    files: 15,
  },
});

/* ================= EXPORT ================= */

export default upload;