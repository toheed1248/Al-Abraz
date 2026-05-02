import { useState } from "react";
import { uploadImage } from "../services/galleryService";
import { FaUpload, FaImage, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

const UploadImage = () => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");

  const [descEn, setDescEn] = useState("");
  const [descAr, setDescAr] = useState("");

  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("masna");

  const [loading, setLoading] = useState(false);

  /* ================= FILE SELECT ================= */
  const handleFiles = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length + files.length > 8) {
      return alert("Max 8 images allowed");
    }

    const newFiles = [...files, ...selectedFiles];
    setFiles(newFiles);

    const newPreviews = newFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviews(newPreviews);
  };

  /* ================= REMOVE IMAGE ================= */
  const removeImage = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);

    const updatedPreviews = updatedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviews(updatedPreviews);
  };

  /* ================= ARABIC SUGGEST ================= */
  const suggestArabic = () => {
    if (!titleEn) return;
    setTitleAr("🔤 " + titleEn + " (Arabic)");
  };

  /* ================= UPLOAD ================= */
const handleUpload = async () => {
  if (files.length === 0) return alert("Select images");

  const formData = new FormData();

  files.forEach((file) => {
    formData.append("images", file);
  });

  // 🔥 YE LINE ADD KARO (IMPORTANT)
  console.log([...formData.entries()]);

  formData.append("title_en", titleEn);
  formData.append("title_ar", titleAr);
  formData.append("desc_en", descEn);
  formData.append("desc_ar", descAr);
  formData.append("location", location);
  formData.append("category", category);

  try {
    setLoading(true);
    await uploadImage(formData);
    alert("Upload Success 🚀");
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto bg-gradient-to-b from-[#111] to-[#0a0a0a]
                 p-8 rounded-3xl shadow-2xl border border-yellow-500/20 text-white"
    >
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-yellow-400">
        <FaUpload /> Upload Premium Project
      </h2>

      {/* ================= IMAGE GRID ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {previews.map((src, i) => (
          <div key={i} className="relative group">
            <img
              src={src}
              className="w-full h-32 object-cover rounded-xl"
            />

            {/* DELETE */}
            <button
              onClick={() => removeImage(i)}
              className="absolute top-2 right-2 bg-black/70 p-2 rounded-full
                         opacity-0 group-hover:opacity-100 transition"
            >
              <FaTrash size={12} />
            </button>
          </div>
        ))}

        {/* ADD BOX */}
        {files.length < 8 && (
          <label className="h-32 flex flex-col items-center justify-center
                            border-2 border-dashed border-yellow-500/30
                            rounded-xl cursor-pointer hover:bg-yellow-500/10">
            <FaImage size={24} />
            <span className="text-xs mt-1">Add Images</span>

            <input
              type="file"
              multiple
              onChange={handleFiles}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* ================= INPUTS ================= */}
      <input
        placeholder="Title (English)"
        value={titleEn}
        onChange={(e) => setTitleEn(e.target.value)}
        className="input-premium"
      />

      <button onClick={suggestArabic} className="text-sm text-yellow-400 mb-2">
        Suggest Arabic →
      </button>

      <input
        placeholder="Title (Arabic)"
        value={titleAr}
        onChange={(e) => setTitleAr(e.target.value)}
        className="input-premium"
      />

      <textarea
        placeholder="Description (English)"
        value={descEn}
        onChange={(e) => setDescEn(e.target.value)}
        className="input-premium"
      />

      <textarea
        placeholder="Description (Arabic)"
        value={descAr}
        onChange={(e) => setDescAr(e.target.value)}
        className="input-premium"
      />

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="input-premium"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="input-premium"
      >
        <option value="masna">Masna</option>
        <option value="contractor">Contractor</option>
      </select>

      {/* ================= BUTTON ================= */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black
                   font-semibold py-3 rounded-xl mt-4 transition-all"
      >
        {loading ? "Uploading..." : "Upload Project"}
      </button>

      {/* LOADING BAR */}
      {loading && (
        <div className="w-full bg-gray-800 h-1 mt-4 rounded-full overflow-hidden">
          <div className="h-full bg-yellow-500 animate-pulse w-full"></div>
        </div>
      )}
    </motion.div>
  );
};

export default UploadImage;