import Gallery from "../models/Gallery.js";
import cloudinary from "../config/cloudinary.js";

/* 🔥 SIMPLE MEMORY CACHE (ANTI-SPAM) */
let cache = {
  data: null,
  time: 0,
};

const CACHE_TIME = 30 * 1000; // 30 sec

/* ================= UPLOAD ================= */
export const uploadImage = async (req, res) => {
  try {
    const { title_en, title_ar, desc_en, desc_ar, category, location } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        msg: "Image file is required",
      });
    }

    if (!category || !["masna", "contractor"].includes(category)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid category",
      });
    }

    /* 🔹 Cloudinary upload */
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "alabraz" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const newImage = await Gallery.create({
      title: {
        en: title_en || "",
        ar: title_ar || "",
      },
      description: {
        en: desc_en || "",
        ar: desc_ar || "",
      },
      category,
      location: location || "Kuwait",
      imageUrl: result.secure_url,
      public_id: result.public_id,
    });

    /* 🔥 CLEAR CACHE AFTER CHANGE */
    cache.data = null;

    res.status(201).json({
      success: true,
      data: newImage,
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({
      success: false,
      msg: "Upload failed",
    });
  }
};

/* ================= GET ================= */
export const getImages = async (req, res) => {
  try {
    const now = Date.now();

    /* 🔥 CACHE HIT */
    if (cache.data && now - cache.time < CACHE_TIME) {
      return res.json({
        success: true,
        data: cache.data,
        cached: true, // debug
      });
    }

    const { category } = req.query;

    const images = await Gallery.find(
      category ? { category } : {}
    ).sort({ createdAt: -1 });

    /* 🔥 SAVE CACHE */
    cache = {
      data: images,
      time: now,
    };

    res.json({
      success: true,
      data: images,
    });

  } catch (err) {
    console.error("FETCH ERROR:", err);
    res.status(500).json({ msg: "Fetch error" });
  }
};

/* ================= DELETE ================= */
export const deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ msg: "Not found" });
    }

    await cloudinary.uploader.destroy(image.public_id);
    await image.deleteOne();

    /* 🔥 CLEAR CACHE */
    cache.data = null;

    res.json({ success: true, msg: "Deleted" });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ msg: "Delete error" });
  }
};

/* ================= UPDATE ================= */
export const updateImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ msg: "Not found" });
    }

    /* 🔥 TEXT UPDATE */
    image.title.en = req.body.title_en || image.title.en;
    image.title.ar = req.body.title_ar || image.title.ar;

    image.description.en = req.body.desc_en || image.description.en;
    image.description.ar = req.body.desc_ar || image.description.ar;

    image.location = req.body.location || image.location;

    /* 🔥 IMAGE REPLACE */
    if (req.file) {
      await cloudinary.uploader.destroy(image.public_id);

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "alabraz" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      image.imageUrl = result.secure_url;
      image.public_id = result.public_id;
    }

    await image.save();

    /* 🔥 CLEAR CACHE */
    cache.data = null;

    res.json({
      success: true,
      data: image,
    });

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};