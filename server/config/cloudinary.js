import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";

/* =========================================================
   🔥 REQUIRED ENV CHECK
========================================================= */

const requiredEnv = [
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing ENV Variable: ${key}`);

    throw new Error(
      `Cloudinary ENV missing: ${key}`
    );
  }
});

/* =========================================================
   🔥 CLOUDINARY CONFIG
========================================================= */

cloudinary.config({
  cloud_name:
    process.env.CLOUDINARY_CLOUD_NAME,

  api_key:
    process.env.CLOUDINARY_API_KEY,

  api_secret:
    process.env.CLOUDINARY_API_SECRET,

  secure: true,
});

/* =========================================================
   🔥 EXPORT
========================================================= */

export default cloudinary;