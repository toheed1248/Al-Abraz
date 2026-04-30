import Gallery from "../models/Gallery.js";
import cloudinary from "../config/cloudinary.js";

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

    // 🔹 Cloudinary upload
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
      location: location || "Kuwait",   // ✅ FIX
      imageUrl: result.secure_url,
      public_id: result.public_id,
    });

    res.status(201).json({
      success: true,
      data: newImage,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      msg: "Upload failed",
    });
  }
};

/* ================= GET ================= */
export const getImages = async (req, res) => {
  try {
    const { category } = req.query;

    const images = await Gallery.find(
      category ? { category } : {}
    ).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: images,
    });

  } catch (err) {
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

    res.json({ success: true, msg: "Deleted" });

  } catch (err) {
    res.status(500).json({ msg: "Delete error" });
  }
};

/* ================= UPDATE (FULL POWER) ================= */
export const updateImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ msg: "Not found" });
    }

    // 🔥 TEXT UPDATE
    image.title.en = req.body.title_en || image.title.en;
    image.title.ar = req.body.title_ar || image.title.ar;

    image.description.en = req.body.desc_en || image.description.en;
    image.description.ar = req.body.desc_ar || image.description.ar;

    image.location = req.body.location || image.location;

    // 🔥 IMAGE REPLACE (ADVANCED)
    if (req.file) {
      // old delete
      await cloudinary.uploader.destroy(image.public_id);

      // new upload
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

    res.json({
      success: true,
      data: image,
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};