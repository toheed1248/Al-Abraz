import { useEffect, useState } from "react";
import {
  getImages,
  deleteImage,
  updateImage,
  deleteSingleImage
} from "../services/galleryService";
import { motion } from "framer-motion";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

const ManageGallery = () => {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [newFiles, setNewFiles] = useState([]);

  const [editData, setEditData] = useState({
    title_en: "",
    title_ar: "",
    desc_en: "",
    desc_ar: "",
    location: ""
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const data = await getImages();
    setImages(data);
  };

  /* DELETE PROJECT */
  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;

    await deleteImage(id);
    setImages((prev) => prev.filter((item) => item._id !== id));
  };

  /* DELETE SINGLE IMAGE */
  const handleDeleteSingle = async (imageId) => {
    await deleteSingleImage(selected._id, imageId);

    setSelected((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((img) => img._id !== imageId)
    }));
  };

  /* OPEN EDIT */
  const openEdit = (item) => {
    setSelected(item);

    setEditData({
      title_en: item.title?.en || "",
      title_ar: item.title?.ar || "",
      desc_en: item.description?.en || "",
      desc_ar: item.description?.ar || "",
      location: item.location || ""
    });
  };

  /* ADD NEW FILES */
  const handleFiles = (e) => {
    const files = Array.from(e.target.files);

    if (selected.gallery.length + files.length > 8) {
      return alert("Max 8 images allowed");
    }

    setNewFiles(files);
  };

  /* UPDATE */
  const handleUpdate = async () => {
    const formData = new FormData();

    Object.keys(editData).forEach((key) => {
      formData.append(key, editData[key]);
    });

    newFiles.forEach((file) => {
      formData.append("images", file);
    });

    await updateImage(selected._id, formData);

    alert("Updated Successfully ✅");
    setSelected(null);
    setNewFiles([]);
    fetchImages();
  };

  return (
    <div className="bg-black text-white min-h-screen px-4 md:px-10 py-10">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold gold-text">
          Manage Gallery
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          Premium project management system
        </p>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {images.map((img, i) => (
          <motion.div
            key={img._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -6 }}
            className="group bg-gradient-to-b from-[#111] to-[#0a0a0a]
                       rounded-3xl border border-yellow-500/10 overflow-hidden shadow-xl"
          >
            {/* COVER */}
            <div className="relative h-[230px]">
              <img
                src={img.coverImage || img.gallery?.[0]?.url}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />

              {/* COUNT BADGE */}
              <div className="absolute top-3 left-3 bg-black/70 px-3 py-1 rounded-full text-xs">
                {img.gallery?.length} images
              </div>

              {/* ACTION */}
              <div className="absolute bottom-0 w-full flex justify-between p-3 bg-black/60">
                <button onClick={() => openEdit(img)} className="text-yellow-400">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(img._id)} className="text-red-400">
                  <FaTrash />
                </button>
              </div>
            </div>

            <div className="p-4">
              <h2 className="text-yellow-400 font-semibold">{img.title?.en}</h2>
              <p className="text-gray-400 text-sm">{img.location}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ================= EDIT MODAL ================= */}
      {selected && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 overflow-y-auto">

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#0a0a0a] p-6 rounded-3xl w-full max-w-2xl"
          >

            <h2 className="text-yellow-400 text-lg mb-4">Edit Project</h2>

            {/* 🔥 EXISTING GALLERY */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {selected.gallery?.map((img) => (
                <div key={img._id} className="relative group">
                  <img src={img.url} className="h-24 w-full object-cover rounded-lg" />

                  <button
                    onClick={() => handleDeleteSingle(img._id)}
                    className="absolute top-1 right-1 bg-black/70 p-1 rounded opacity-0 group-hover:opacity-100"
                  >
                    <FaTrash size={10} />
                  </button>
                </div>
              ))}
            </div>

            {/* 🔥 ADD MORE IMAGES */}
            <label className="flex items-center gap-2 mb-4 text-yellow-400 cursor-pointer">
              <FaPlus /> Add Images
              <input type="file" multiple onChange={handleFiles} className="hidden" />
            </label>

            {/* TEXT INPUTS */}
            <input
              value={editData.title_en}
              onChange={(e) => setEditData({ ...editData, title_en: e.target.value })}
              className="input-premium"
              placeholder="Title EN"
            />

            <input
              value={editData.title_ar}
              onChange={(e) => setEditData({ ...editData, title_ar: e.target.value })}
              className="input-premium"
              placeholder="Title AR"
            />

            <textarea
              value={editData.desc_en}
              onChange={(e) => setEditData({ ...editData, desc_en: e.target.value })}
              className="input-premium"
              placeholder="Description EN"
            />

            <textarea
              value={editData.desc_ar}
              onChange={(e) => setEditData({ ...editData, desc_ar: e.target.value })}
              className="input-premium"
              placeholder="Description AR"
            />

            <input
              value={editData.location}
              onChange={(e) => setEditData({ ...editData, location: e.target.value })}
              className="input-premium"
              placeholder="Location"
            />

            {/* ACTION */}
            <button
              onClick={handleUpdate}
              className="w-full bg-yellow-500 text-black py-3 rounded-xl mt-4"
            >
              Save Changes
            </button>

          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ManageGallery;