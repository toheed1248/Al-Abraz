import { useState } from "react";
import { uploadImage } from "../services/galleryService";
import { FaUpload, FaImage } from "react-icons/fa";
import { motion } from "framer-motion";

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");

  const [descEn, setDescEn] = useState("");   // ✅ NEW
  const [descAr, setDescAr] = useState("");   // ✅ NEW

  const [location, setLocation] = useState(""); // ✅ NEW

  const [category, setCategory] = useState("masna");
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const img = e.target.files[0];
    setFile(img);
    setPreview(URL.createObjectURL(img));
  };

  const suggestArabic = () => {
    if (!titleEn) return;
    setTitleAr("🔤 " + titleEn + " (Arabic)");
  };

  const handleUpload = async () => {
    if (!file) return alert("Select image");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title_en", titleEn);
    formData.append("title_ar", titleAr);

    formData.append("desc_en", descEn);   // ✅ ADD
    formData.append("desc_ar", descAr);   // ✅ ADD

    formData.append("location", location); // ✅ ADD

    formData.append("category", category);

    try {
      setLoading(true);
      await uploadImage(formData);

      alert("Upload Success 🚀");

      // reset
      setFile(null);
      setPreview(null);
      setTitleEn("");
      setTitleAr("");
      setDescEn("");   // ✅ RESET
      setDescAr("");   // ✅ RESET
      setLocation(""); // ✅ RESET

    } catch (err) {
      alert(err.response?.data?.msg || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl text-white"
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FaUpload /> Upload Work
      </h2>

      {/* IMAGE PREVIEW */}
      <div className="mb-4">
        {preview ? (
          <img src={preview} className="w-full h-48 object-cover rounded-xl" />
        ) : (
          <div className="h-48 bg-gray-800 flex items-center justify-center rounded-xl">
            <FaImage size={30} />
          </div>
        )}
      </div>

      <input type="file" onChange={handleFile} className="mb-4 w-full text-sm" />

      {/* TITLE EN */}
      <input
        placeholder="Title (English)"
        value={titleEn}
        onChange={(e) => setTitleEn(e.target.value)}
        className="input-premium"
      />

      {/* ARABIC */}
      <button onClick={suggestArabic} className="text-sm mb-2 text-yellow-400">
        Suggest Arabic →
      </button>

      <input
        placeholder="Title (Arabic)"
        value={titleAr}
        onChange={(e) => setTitleAr(e.target.value)}
        className="input-premium"
      />

      {/* 🔥 DESCRIPTION EN */}
      <textarea
        placeholder="Description (English)"
        value={descEn}
        onChange={(e) => setDescEn(e.target.value)}
        className="input-premium"
      />

      {/* 🔥 DESCRIPTION AR */}
      <textarea
        placeholder="Description (Arabic)"
        value={descAr}
        onChange={(e) => setDescAr(e.target.value)}
        className="input-premium"
      />

      {/* 🔥 LOCATION */}
      <input
        placeholder="Location (e.g. Kuwait, Salmiya)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="input-premium"
      />

      {/* CATEGORY */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="input-premium"
      >
        <option value="masna">Masna</option>
        <option value="contractor">Contractor</option>
      </select>

      {/* BUTTON */}
      <button
        onClick={handleUpload}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg transition"
      >
        {loading ? "Uploading..." : "Upload Now"}
      </button>

    </motion.div>
  );
};

export default UploadImage;