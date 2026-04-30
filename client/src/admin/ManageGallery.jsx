import { useEffect, useState } from "react";
import {
  getImages,
  deleteImage,
  updateImage
} from "../services/galleryService";
import { motion } from "framer-motion";
import { FaTrash, FaEdit } from "react-icons/fa";

const ManageGallery = () => {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);

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
    try {
      const res = await getImages();

      const data = Array.isArray(res?.data)
        ? res.data
        : res?.data?.data || [];

      setImages(data);
    } catch (err) {
      console.log(err);
    }
  };

  /* DELETE */
  const handleDelete = async (id) => {
    if (!confirm("Delete this image?")) return;

    try {
      await deleteImage(id);
      setImages((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
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

  /* UPDATE */
  const handleUpdate = async () => {
    try {
      await updateImage(selected._id, editData);
      alert("Updated Successfully ✅");
      setSelected(null);
      fetchImages();
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen px-4 md:px-10 py-10">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold gold-text">
          Manage Gallery
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          Edit, update or delete your projects
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
            className="
              group
              bg-gradient-to-b from-[#111] to-[#0a0a0a]
              rounded-3xl
              border border-yellow-500/10
              overflow-hidden
              shadow-[0_0_30px_rgba(255,200,0,0.05)]
              hover:shadow-[0_0_40px_rgba(255,200,0,0.15)]
              transition
            "
          >

            {/* IMAGE */}
            <div className="relative h-[230px] overflow-hidden rounded-t-3xl">

              <img
                src={img.imageUrl}
                className="
                  w-full h-full object-cover
                  group-hover:scale-110
                  transition duration-700 ease-out
                "
              />

              {/* ACTION BAR (FIXED FOR MOBILE + DESKTOP) */}
              <div className="
                absolute bottom-0 left-0 w-full
                flex justify-between items-center
                px-4 py-3
                bg-black/60 backdrop-blur-xl
                translate-y-0
                md:translate-y-full md:group-hover:translate-y-0
                transition
              ">

                <button
                  onClick={() => openEdit(img)}
                  className="
                    flex items-center gap-2 text-yellow-400 text-sm
                    hover:scale-105 transition
                  "
                >
                  <FaEdit /> Edit
                </button>

                <button
                  onClick={() => handleDelete(img._id)}
                  className="
                    flex items-center gap-2 text-red-400 text-sm
                    hover:scale-105 transition
                  "
                >
                  <FaTrash /> Delete
                </button>

              </div>
            </div>

            {/* CONTENT */}
            <div className="p-5">
              <h2 className="text-yellow-400 font-semibold mb-1">
                {img.title?.en}
              </h2>

              <p className="text-gray-400 text-sm line-clamp-2">
                {img.description?.en}
              </p>

              <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                <span>📍 {img.location || "Kuwait"}</span>

                <span className="
                  bg-gradient-to-r from-yellow-500/20 to-yellow-400/10
                  text-yellow-400 px-3 py-1 rounded-full text-[10px]
                ">
                  {img.category}
                </span>
              </div>
            </div>

          </motion.div>
        ))}

      </div>

      {/* EDIT MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">

          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="
              bg-gradient-to-b from-[#111] to-[#0a0a0a]
              border border-yellow-500/10
              rounded-3xl
              p-6
              w-full max-w-md
              shadow-[0_0_30px_rgba(255,200,0,0.1)]
            "
          >

            <h2 className="text-yellow-400 text-lg mb-4 font-semibold">
              Edit Project
            </h2>

            <input
              placeholder="Title EN"
              value={editData.title_en}
              onChange={(e) =>
                setEditData({ ...editData, title_en: e.target.value })
              }
              className="input-premium"
            />

            <input
              placeholder="Title AR"
              value={editData.title_ar}
              onChange={(e) =>
                setEditData({ ...editData, title_ar: e.target.value })
              }
              className="input-premium"
            />

            <textarea
              placeholder="Description EN"
              value={editData.desc_en}
              onChange={(e) =>
                setEditData({ ...editData, desc_en: e.target.value })
              }
              className="input-premium"
            />

            <textarea
              placeholder="Description AR"
              value={editData.desc_ar}
              onChange={(e) =>
                setEditData({ ...editData, desc_ar: e.target.value })
              }
              className="input-premium"
            />

            <input
              placeholder="Location"
              value={editData.location}
              onChange={(e) =>
                setEditData({ ...editData, location: e.target.value })
              }
              className="input-premium"
            />

            <button
              onClick={handleUpdate}
              className="
                w-full mt-3
                bg-yellow-500 hover:bg-yellow-400
                text-black py-3 rounded-full font-semibold
                transition
              "
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