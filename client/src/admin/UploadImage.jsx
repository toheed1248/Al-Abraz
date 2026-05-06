import { useState } from "react";
import { uploadImage } from "../services/galleryService";

import {
  FaUpload,
  FaImage,
  FaTrash,
} from "react-icons/fa";

import { motion } from "framer-motion";

const UploadImage = () => {
  /* ================= STATES ================= */

  const [files, setFiles] = useState([]);

  const [previews, setPreviews] = useState([]);

  const [loading, setLoading] = useState(false);

  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");

  const [descEn, setDescEn] = useState("");
  const [descAr, setDescAr] = useState("");

  const [location, setLocation] = useState("");

  const [category, setCategory] =
    useState("masna");

  /* ================= FILE HANDLER ================= */

  const handleFiles = (e) => {
    const selectedFiles = Array.from(
      e.target.files
    );

    /*
    🔥 LIMIT
    */
    if (
      files.length + selectedFiles.length >
      15
    ) {
      return alert("Maximum 15 images allowed");
    }

    setFiles((prev) => [
      ...prev,
      ...selectedFiles,
    ]);

    /*
    🔥 PREVIEW URLS
    */
    const previewUrls = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviews((prev) => [
      ...prev,
      ...previewUrls,
    ]);
  };

  /* ================= REMOVE IMAGE ================= */

  const removeImage = (index) => {
    setFiles((prev) =>
      prev.filter((_, i) => i !== index)
    );

    setPreviews((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  /* ================= ARABIC SUGGEST ================= */

  const suggestArabic = () => {
    if (!titleEn) return;

    setTitleAr(
      "🔤 " + titleEn + " (Arabic)"
    );
  };

  /* ================= UPLOAD ================= */

  const handleUpload = async () => {
    if (files.length === 0) {
      return alert("Select images");
    }

    try {
      setLoading(true);

      const formData = new FormData();

      /*
      🔥 MULTI IMAGE
      */
      files.forEach((file) => {
        formData.append("images", file);
      });

      formData.append(
        "title_en",
        titleEn
      );

      formData.append(
        "title_ar",
        titleAr
      );

      formData.append(
        "desc_en",
        descEn
      );

      formData.append(
        "desc_ar",
        descAr
      );

      formData.append(
        "location",
        location
      );

      formData.append(
        "category",
        category
      );

      await uploadImage(formData);

      alert("Project uploaded 🚀");

      /*
      🔥 RESET
      */
      setFiles([]);

      setPreviews([]);

      setTitleEn("");

      setTitleAr("");

      setDescEn("");

      setDescAr("");

      setLocation("");

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.msg ||
          "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        max-w-3xl mx-auto
        bg-white/10
        backdrop-blur-lg
        p-6
        rounded-3xl
        shadow-2xl
        text-white
        border border-yellow-500/10
      "
    >

      {/* ================= HEADER ================= */}

      <h2 className="
        text-2xl font-semibold mb-6
        flex items-center gap-3
        text-yellow-400
      ">
        <FaUpload />
        Upload Project
      </h2>

      {/* ================= DROPZONE ================= */}

      <label
        className="
          border-2 border-dashed border-yellow-500/20
          rounded-3xl
          p-10
          flex flex-col items-center justify-center
          cursor-pointer
          hover:border-yellow-500/50
          transition
          bg-black/20
        "
      >

        <FaImage
          size={40}
          className="text-yellow-400 mb-4"
        />

        <p className="text-gray-300 text-center">
          Drag & Drop images here
          <br />
          or click to browse
        </p>

        <span className="
          text-xs text-gray-500 mt-2
        ">
          Maximum 15 images
        </span>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFiles}
          className="hidden"
        />
      </label>

      {/* ================= PREVIEW GRID ================= */}

      {previews.length > 0 && (
        <div className="
          grid grid-cols-2 md:grid-cols-4
          gap-4 mt-6
        ">

          {previews.map((img, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="
                relative rounded-2xl overflow-hidden
                group
              "
            >

              <img
                src={img}
                className="
                  w-full h-32 object-cover
                "
              />

              <button
                onClick={() =>
                  removeImage(index)
                }
                className="
                  absolute top-2 right-2
                  bg-red-500 text-white
                  p-2 rounded-full
                  opacity-0 group-hover:opacity-100
                  transition
                "
              >
                <FaTrash size={12} />
              </button>

            </motion.div>
          ))}

        </div>
      )}

      {/* ================= FORM ================= */}

      <div className="mt-8 space-y-4">

        <input
          placeholder="Title (English)"
          value={titleEn}
          onChange={(e) =>
            setTitleEn(e.target.value)
          }
          className="input-premium"
        />

        <button
          onClick={suggestArabic}
          className="
            text-sm text-yellow-400
          "
        >
          Suggest Arabic →
        </button>

        <input
          placeholder="Title (Arabic)"
          value={titleAr}
          onChange={(e) =>
            setTitleAr(e.target.value)
          }
          className="input-premium"
        />

        <textarea
          placeholder="Description (English)"
          value={descEn}
          onChange={(e) =>
            setDescEn(e.target.value)
          }
          className="input-premium"
        />

        <textarea
          placeholder="Description (Arabic)"
          value={descAr}
          onChange={(e) =>
            setDescAr(e.target.value)
          }
          className="input-premium"
        />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
          className="input-premium"
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="input-premium"
        >
          <option value="masna">
            Masna
          </option>

          <option value="contractor">
            Contractor
          </option>
        </select>

      </div>

      {/* ================= BUTTON ================= */}

      <button
        onClick={handleUpload}
        disabled={loading}
        className="
          w-full mt-8
          bg-yellow-500 hover:bg-yellow-400
          disabled:opacity-50
          text-black font-semibold
          py-4 rounded-2xl
          transition
          text-lg
        "
      >

        {loading
          ? "Uploading Project..."
          : "Upload Project"}

      </button>

    </motion.div>
  );
};

export default UploadImage;