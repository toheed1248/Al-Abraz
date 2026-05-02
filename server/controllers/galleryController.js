import Gallery from "../models/Gallery.js";
import cloudinary from "../config/cloudinary.js";

/* 🔥 CLOUDINARY SAFE UPLOAD */
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    if (!buffer) {
      return reject(new Error("File buffer missing"));
    }

    const stream = cloudinary.uploader.upload_stream(
      { folder: "alabraz" },
      (error, result) => {
        if (error) return reject(error);

        const optimized = result.secure_url.replace(
          "/upload/",
          "/upload/q_auto,f_auto/"
        );

        resolve({
          url: optimized,
          public_id: result.public_id,
        });
      }
    );

    stream.end(buffer);
  });
};

/* ================= UPLOAD ================= */
export const uploadImage = async (req, res) => {
  try {
    console.log("FILES:", req.files);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        msg: "No images uploaded",
      });
    }

    const {
      title_en,
      title_ar,
      desc_en,
      desc_ar,
      category,
      location,
    } = req.body;

    const gallery = [];

    for (const file of req.files) {
      const uploaded = await uploadToCloudinary(file.buffer);
      gallery.push(uploaded);
    }

    const project = await Gallery.create({
      title: { en: title_en, ar: title_ar },
      description: { en: desc_en, ar: desc_ar },
      category,
      location,
      gallery,
    });

    res.status(201).json({
      success: true,
      data: project,
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};

/* ================= UPDATE ================= */
export const updateImage = async (req, res) => {
  try {
    const project = await Gallery.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: "Not found" });

    project.title.en = req.body.title_en || project.title.en;
    project.title.ar = req.body.title_ar || project.title.ar;

    project.description.en = req.body.desc_en || project.description.en;
    project.description.ar = req.body.desc_ar || project.description.ar;

    project.location = req.body.location || project.location;

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploaded = await uploadToCloudinary(file.buffer);
        project.gallery.push(uploaded);
      }
    }

    await project.save();

    res.json({ success: true, data: project });

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};

/* ================= DELETE ================= */
export const deleteImage = async (req, res) => {
  try {
    const project = await Gallery.findById(req.params.id);

    if (!project) return res.status(404).json({ msg: "Not found" });

    for (const img of project.gallery) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    await project.deleteOne();

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ msg: "Delete error" });
  }
};

/* ================= DELETE SINGLE ================= */
export const deleteSingleImage = async (req, res) => {
  try {
    const { projectId, imageId } = req.params;

    const project = await Gallery.findById(projectId);

    const image = project.gallery.id(imageId);

    await cloudinary.uploader.destroy(image.public_id);

    project.gallery.pull(imageId);
    await project.save();

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ msg: "Delete failed" });
  }
};

/* ================= GET ================= */
export const getImages = async (req, res) => {
  try {
    const data = await Gallery.find().sort({ createdAt: -1 });

    res.json({ success: true, data });

  } catch {
    res.status(500).json({ msg: "Fetch error" });
  }
};