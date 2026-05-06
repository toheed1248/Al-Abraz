import Gallery from "../models/Gallery.js";
import cloudinary from "../config/cloudinary.js";

/* ================= SIMPLE MEMORY CACHE ================= */

let cache = {
  data: null,
  time: 0,
};

const CACHE_TIME = 30 * 1000; // 30 sec

/* =========================================================
   🔥 UPLOAD PROJECT
========================================================= */

export const uploadImage = async (req, res) => {
  try {
    const {
      title_en,
      title_ar,
      desc_en,
      desc_ar,
      category,
      location,
    } = req.body;

    /* ================= VALIDATION ================= */

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        msg: "At least one image is required",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        msg: "Category is required",
      });
    }

    if (!["masna", "contractor"].includes(category)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid category",
      });
    }

    /* ================= MULTI CLOUDINARY UPLOAD ================= */

    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "alabraz",

              resource_type: "image",

              /*
              🔥 AUTO OPTIMIZATION
              */
              quality: "auto",
              fetch_format: "auto",

              /*
              🔥 SAFE TRANSFORM
              */
              transformation: [
                {
                  width: 2000,
                  crop: "limit",
                },
              ],
            },

            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );

          stream.end(file.buffer);
        });

        return {
          imageUrl: result.secure_url,
          public_id: result.public_id,
        };
      })
    );

    /* ================= CREATE PROJECT ================= */

    const newGallery = await Gallery.create({
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

      images: uploadedImages,
    });

    /* ================= CLEAR CACHE ================= */

    cache.data = null;

    /* ================= RESPONSE ================= */

    res.status(201).json({
      success: true,
      msg: "Project uploaded successfully",
      data: newGallery,
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);

    res.status(500).json({
      success: false,
      msg: "Upload failed",
      error:
        process.env.NODE_ENV === "development"
          ? err.message
          : undefined,
    });
  }
};

/* =========================================================
   🔥 GET PROJECTS
========================================================= */

export const getImages = async (req, res) => {
  try {
    const now = Date.now();

    const { category } = req.query;

    /* ================= CACHE HIT ================= */

    if (
      cache.data &&
      now - cache.time < CACHE_TIME &&
      !category
    ) {
      return res.json({
        success: true,
        cached: true,
        data: cache.data,
      });
    }

    /* ================= QUERY ================= */

    const filter = category
      ? { category }
      : {};

    const images = await Gallery.find(filter)
      .select("-__v")
      .lean()
      .sort({ createdAt: -1 });

    /* ================= SAVE CACHE ================= */

    if (!category) {
      cache = {
        data: images,
        time: now,
      };
    }

    /* ================= RESPONSE ================= */

    res.json({
      success: true,
      count: images.length,
      data: images,
    });

  } catch (err) {
    console.error("FETCH ERROR:", err);

    res.status(500).json({
      success: false,
      msg: "Fetch failed",
    });
  }
};

/* =========================================================
   🔥 DELETE PROJECT
========================================================= */

export const deleteImage = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        msg: "Project not found",
      });
    }

    /* ================= DELETE CLOUDINARY IMAGES ================= */

    await Promise.all(
      gallery.images.map((img) =>
        cloudinary.uploader.destroy(img.public_id)
      )
    );

    /* ================= DELETE DATABASE ================= */

    await gallery.deleteOne();

    /* ================= CLEAR CACHE ================= */

    cache.data = null;

    /* ================= RESPONSE ================= */

    res.json({
      success: true,
      msg: "Project deleted successfully",
    });

  } catch (err) {
    console.error("DELETE ERROR:", err);

    res.status(500).json({
      success: false,
      msg: "Delete failed",
    });
  }
};

/* =========================================================
   🔥 UPDATE PROJECT
========================================================= */

export const updateImage = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        msg: "Project not found",
      });
    }

    /* ================= TEXT UPDATE ================= */

    gallery.title.en =
      req.body.title_en || gallery.title.en;

    gallery.title.ar =
      req.body.title_ar || gallery.title.ar;

    gallery.description.en =
      req.body.desc_en || gallery.description.en;

    gallery.description.ar =
      req.body.desc_ar || gallery.description.ar;

    gallery.location =
      req.body.location || gallery.location;

    gallery.category =
      req.body.category || gallery.category;

    /* ================= NEW IMAGES ================= */

    if (req.files && req.files.length > 0) {

      /*
      🔥 DELETE OLD IMAGES
      */
      await Promise.all(
        gallery.images.map((img) =>
          cloudinary.uploader.destroy(img.public_id)
        )
      );

      /*
      🔥 UPLOAD NEW IMAGES
      */
      const uploadedImages = await Promise.all(
        req.files.map(async (file) => {
          const result = await new Promise(
            (resolve, reject) => {
              const stream =
                cloudinary.uploader.upload_stream(
                  {
                    folder: "alabraz",

                    quality: "auto",

                    fetch_format: "auto",
                  },

                  (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                  }
                );

              stream.end(file.buffer);
            }
          );

          return {
            imageUrl: result.secure_url,
            public_id: result.public_id,
          };
        })
      );

      gallery.images = uploadedImages;
    }

    /* ================= SAVE ================= */

    await gallery.save();

    /* ================= CLEAR CACHE ================= */

    cache.data = null;

    /* ================= RESPONSE ================= */

    res.json({
      success: true,
      msg: "Project updated successfully",
      data: gallery,
    });

  } catch (err) {
    console.error("UPDATE ERROR:", err);

    res.status(500).json({
      success: false,
      msg: "Update failed",
      error:
        process.env.NODE_ENV === "development"
          ? err.message
          : undefined,
    });
  }
};