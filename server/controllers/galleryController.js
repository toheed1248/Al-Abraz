import Gallery from "../models/Gallery.js";
import cloudinary from "../config/cloudinary.js";

/* 🔥 SIMPLE MEMORY CACHE (ANTI-SPAM) */
let cache = {
  data: null,
  time: 0,
};

const CACHE_TIME = 30 * 1000; // 30 sec

/* 🔧 CLOUDINARY HELPER */
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "alabraz" },
      (error, result) => {
        if (error) reject(error);
        else {
          // 🔥 OPTIMIZED IMAGE URL
          const optimizedUrl = result.secure_url.replace(
            "/upload/",
            "/upload/q_auto,f_auto/"
          );

          resolve({
            url: optimizedUrl,
            public_id: result.public_id,
          });
        }
      }
    );
    stream.end(fileBuffer);
  });
};

/* ================= UPLOAD (MULTI IMAGE) ================= */
export const uploadImage = async (req, res) => {
  try {
    const { title_en, title_ar, desc_en, desc_ar, category, location } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        msg: "At least 1 image is required",
      });
    }

    if (req.files.length > 8) {
      return res.status(400).json({
        success: false,
        msg: "Max 8 images allowed",
      });
    }

    if (!category || !["masna", "contractor"].includes(category)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid category",
      });
    }

    /* 🔹 Upload all images */
    const gallery = [];

    for (const file of req.files) {
      const uploaded = await uploadToCloudinary(file.buffer);
      gallery.push(uploaded);
    }

    const newProject = await Gallery.create({
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

      // 🔥 NEW FIELD
      gallery,
    });

    /* 🔥 CLEAR CACHE AFTER CHANGE */
    cache.data = null;

    res.status(201).json({
      success: true,
      data: newProject,
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
        cached: true,
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

/* ================= DELETE PROJECT ================= */
export const deleteImage = async (req, res) => {
  try {
    const project = await Gallery.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: "Not found" });
    }

    /* 🔥 DELETE ALL IMAGES FROM CLOUDINARY */
    for (const img of project.gallery) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    await project.deleteOne();

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
    const project = await Gallery.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: "Not found" });
    }

    /* 🔥 TEXT UPDATE */
    project.title.en = req.body.title_en || project.title.en;
    project.title.ar = req.body.title_ar || project.title.ar;

    project.description.en = req.body.desc_en || project.description.en;
    project.description.ar = req.body.desc_ar || project.description.ar;

    project.location = req.body.location || project.location;

    /* 🔥 ADD NEW IMAGES (NOT REPLACE) */
    if (req.files && req.files.length > 0) {
      if (project.gallery.length + req.files.length > 8) {
        return res.status(400).json({ msg: "Max 8 images allowed" });
      }

      for (const file of req.files) {
        const uploaded = await uploadToCloudinary(file.buffer);
        project.gallery.push(uploaded);
      }
    }

    await project.save();

    /* 🔥 CLEAR CACHE */
    cache.data = null;

    res.json({
      success: true,
      data: project,
    });

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};

/* ================= DELETE SINGLE IMAGE ================= */
export const deleteSingleImage = async (req, res) => {
  try {
    const { projectId, imageId } = req.params;

    const project = await Gallery.findById(projectId);

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    const image = project.gallery.id(imageId);

    if (!image) {
      return res.status(404).json({ msg: "Image not found" });
    }

    await cloudinary.uploader.destroy(image.public_id);

    project.gallery.pull(imageId);

    await project.save();

    /* 🔥 CLEAR CACHE */
    cache.data = null;

    res.json({
      success: true,
      msg: "Image deleted",
    });

  } catch (err) {
    console.error("DELETE SINGLE ERROR:", err);
    res.status(500).json({ msg: "Delete image failed" });
  }
};