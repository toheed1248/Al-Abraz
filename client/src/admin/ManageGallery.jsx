import { useEffect, useState } from "react";

import {
  getImages,
  deleteImage,
  updateImage,
} from "../services/galleryService";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FaTrash,
  FaEdit,
  FaImages,
} from "react-icons/fa";

import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import {
  Navigation,
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ManageGallery = () => {

  /* ================= STATES ================= */

  const [images, setImages] =
    useState([]);

  const [selected, setSelected] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [newFiles, setNewFiles] =
    useState([]);

  const [previewFiles, setPreviewFiles] =
    useState([]);

  const [editData, setEditData] =
    useState({
      title_en: "",
      title_ar: "",
      desc_en: "",
      desc_ar: "",
      location: "",
      category: "masna",
    });

  /* ================= FETCH ================= */

  const fetchImages = async () => {
    try {
      const data =
        await getImages();

      setImages(data || []);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  /* ================= DELETE ================= */

  const handleDelete = async (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        "Delete this project?"
      );

    if (!confirmDelete) return;

    try {

      await deleteImage(id);

      setImages((prev) =>
        prev.filter(
          (item) =>
            item._id !== id
        )
      );

      alert(
        "Project deleted ✅"
      );

    } catch (err) {
      console.log(err);

      alert("Delete failed");
    }
  };

  /* ================= OPEN EDIT ================= */

  const openEdit = (item) => {

    setSelected(item);

    setEditData({
      title_en:
        item.title?.en || "",

      title_ar:
        item.title?.ar || "",

      desc_en:
        item.description?.en || "",

      desc_ar:
        item.description?.ar || "",

      location:
        item.location || "",

      category:
        item.category ||
        "masna",
    });

    setPreviewFiles([]);

    setNewFiles([]);
  };

  /* ================= FILE CHANGE ================= */

  const handleFiles = (e) => {

    const files =
      Array.from(
        e.target.files
      );

    setNewFiles(files);

    const previews = files.map(
      (file) =>
        URL.createObjectURL(file)
    );

    setPreviewFiles(previews);
  };

  /* ================= UPDATE ================= */

  const handleUpdate =
    async () => {

      try {

        setLoading(true);

        const formData =
          new FormData();

        /*
        🔥 TEXT DATA
        */
        formData.append(
          "title_en",
          editData.title_en
        );

        formData.append(
          "title_ar",
          editData.title_ar
        );

        formData.append(
          "desc_en",
          editData.desc_en
        );

        formData.append(
          "desc_ar",
          editData.desc_ar
        );

        formData.append(
          "location",
          editData.location
        );

        formData.append(
          "category",
          editData.category
        );

        /*
        🔥 NEW IMAGES
        */
       if (newFiles.length > 0) {
        newFiles.forEach((file) => {
             formData.append(
      "images",
      file
    );
  });
}

        await updateImage(
          selected._id,
          formData
        );

        alert(
          "Updated Successfully ✅"
        );

        setSelected(null);

        fetchImages();

      } catch (err) {

        console.log(err);

        alert(
          "Update failed"
        );

      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="
      bg-black text-white
      min-h-screen
      px-4 md:px-10 py-10
    ">

      {/* ================= HEADER ================= */}

      <div className="
        text-center mb-12
      ">

        <h1 className="
          text-4xl md:text-5xl
          font-bold
          text-yellow-400
        ">
          Manage Gallery
        </h1>

        <p className="
          text-gray-400
          mt-3
        ">
          Edit, update or delete projects
        </p>

      </div>

      {/* ================= GRID ================= */}

      <div className="
        grid sm:grid-cols-2
        lg:grid-cols-3
        gap-8
      ">

        {images.map(
          (item, i) => (

            <motion.div
              key={item._id}

              initial={{
                opacity: 0,
                y: 40,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                delay:
                  i * 0.05,
              }}

              whileHover={{
                y: -8,
              }}

              className="
                group

                bg-gradient-to-b
                from-[#111]
                to-[#0a0a0a]

                rounded-3xl

                overflow-hidden

                border
                border-yellow-500/10

                shadow-xl
              "
            >

              {/* ================= SLIDER ================= */}

              <div className="
                relative h-72
              ">

                <Swiper
                  modules={[
                    Navigation,
                    Pagination,
                  ]}

                  navigation

                  pagination={{
                    clickable: true,
                  }}

                  className="
                    h-full
                  "
                >

                  {item.images?.map(
                    (
                      img,
                      index
                    ) => (

                      <SwiperSlide
                        key={index}
                      >

                        <img
                          src={
                            img.imageUrl
                          }

                          className="
                            w-full h-full
                            object-cover

                            group-hover:scale-105

                            transition duration-700
                          "
                        />

                      </SwiperSlide>
                    )
                  )}

                </Swiper>

                {/* IMAGE COUNT */}

                <div className="
                  absolute top-4 right-4
                  z-20

                  bg-black/70

                  px-3 py-1

                  rounded-full

                  text-xs
                ">
                  <FaImages className="
                    inline mr-1
                  " />

                  {
                    item.images
                      ?.length
                  }
                </div>

                {/* ACTIONS */}

                <div className="
                  absolute bottom-0 left-0
                  w-full

                  flex justify-between

                  bg-black/60
                  backdrop-blur-xl

                  px-4 py-3

                  z-20
                ">

                  <button
                    onClick={() =>
                      openEdit(
                        item
                      )
                    }

                    className="
                      text-yellow-400
                      flex items-center gap-2
                    "
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        item._id
                      )
                    }

                    className="
                      text-red-400
                      flex items-center gap-2
                    "
                  >
                    <FaTrash />
                    Delete
                  </button>

                </div>

              </div>

              {/* ================= CONTENT ================= */}

              <div className="
                p-5
              ">

                <h2 className="
                  text-yellow-400
                  text-xl font-bold
                  mb-2
                ">
                  {
                    item.title?.en
                  }
                </h2>

                <p className="
                  text-gray-400
                  line-clamp-2
                ">
                  {
                    item.description
                      ?.en
                  }
                </p>

                <div className="
                  flex justify-between
                  items-center
                  mt-4
                ">

                  <span className="
                    text-xs
                    text-yellow-400/70
                  ">
                    📍{" "}
                    {
                      item.location
                    }
                  </span>

                  <span className="
                    bg-yellow-500/10

                    text-yellow-400

                    text-xs

                    px-3 py-1

                    rounded-full
                  ">
                    {
                      item.category
                    }
                  </span>

                </div>

              </div>

            </motion.div>
          )
        )}

      </div>

      {/* ================= EDIT MODAL ================= */}

      <AnimatePresence>

        {selected && (

          <motion.div
            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}

            className="
              fixed inset-0
              bg-black/90

              flex items-center
              justify-center

              z-50

              p-4
            "
          >

            <motion.div
              initial={{
                scale: 0.8,
                opacity: 0,
              }}

              animate={{
                scale: 1,
                opacity: 1,
              }}

              className="
                bg-gradient-to-b
                from-[#111]
                to-[#0a0a0a]

                border
                border-yellow-500/10

                rounded-3xl

                p-6

                w-full
                max-w-2xl

                max-h-[90vh]
                overflow-y-auto
              "
            >

              {/* TITLE */}

              <h2 className="
                text-2xl
                text-yellow-400
                font-bold
                mb-6
              ">
                Edit Project
              </h2>

              {/* CURRENT IMAGES */}

              <div className="
                grid grid-cols-2
                md:grid-cols-3
                gap-4 mb-6
              ">

                {selected.images?.map(
                  (
                    img,
                    index
                  ) => (

                    <img
                      key={index}

                      src={
                        img.imageUrl
                      }

                      className="
                        h-32 w-full
                        object-cover
                        rounded-2xl
                      "
                    />
                  )
                )}

              </div>

              {/* NEW IMAGES */}

              <label className="
                border-2 border-dashed
                border-yellow-500/20

                rounded-2xl

                p-6

                flex flex-col
                items-center
                justify-center

                cursor-pointer

                mb-6
              ">

                <p className="
                  text-gray-400
                ">
                  Upload New Images
                </p>

                <input
                  type="file"

                  multiple

                  className="hidden"

                  onChange={
                    handleFiles
                  }
                />

              </label>

              {/* PREVIEWS */}

              {previewFiles.length >
                0 && (

                <div className="
                  grid grid-cols-2
                  md:grid-cols-4
                  gap-4 mb-6
                ">

                  {previewFiles.map(
                    (
                      img,
                      index
                    ) => (

                      <img
                        key={index}

                        src={img}

                        className="
                          h-28 w-full
                          object-cover
                          rounded-2xl
                        "
                      />
                    )
                  )}

                </div>
              )}

              {/* FORM */}

              <div className="
                space-y-4
              ">

                <input
                  value={
                    editData.title_en
                  }

                  onChange={(e) =>
                    setEditData({
                      ...editData,

                      title_en:
                        e.target
                          .value,
                    })
                  }

                  placeholder="Title EN"

                  className="
                    input-premium
                  "
                />

                <input
                  value={
                    editData.title_ar
                  }

                  onChange={(e) =>
                    setEditData({
                      ...editData,

                      title_ar:
                        e.target
                          .value,
                    })
                  }

                  placeholder="Title AR"

                  className="
                    input-premium
                  "
                />

                <textarea
                  value={
                    editData.desc_en
                  }

                  onChange={(e) =>
                    setEditData({
                      ...editData,

                      desc_en:
                        e.target
                          .value,
                    })
                  }

                  placeholder="Description EN"

                  className="
                    input-premium
                  "
                />

                <textarea
                  value={
                    editData.desc_ar
                  }

                  onChange={(e) =>
                    setEditData({
                      ...editData,

                      desc_ar:
                        e.target
                          .value,
                    })
                  }

                  placeholder="Description AR"

                  className="
                    input-premium
                  "
                />

                <input
                  value={
                    editData.location
                  }

                  onChange={(e) =>
                    setEditData({
                      ...editData,

                      location:
                        e.target
                          .value,
                    })
                  }

                  placeholder="Location"

                  className="
                    input-premium
                  "
                />

                <select
                  value={
                    editData.category
                  }

                  onChange={(e) =>
                    setEditData({
                      ...editData,

                      category:
                        e.target
                          .value,
                    })
                  }

                  className="
                    input-premium
                  "
                >

                  <option value="masna">
                    Masna
                  </option>

                  <option value="contractor">
                    Contractor
                  </option>

                </select>

              </div>

              {/* BUTTONS */}

              <div className="
                flex gap-4 mt-8
              ">

                <button
                  onClick={() =>
                    setSelected(
                      null
                    )
                  }

                  className="
                    flex-1

                    bg-gray-800

                    py-3 rounded-2xl
                  "
                >
                  Cancel
                </button>

                <button
                  onClick={
                    handleUpdate
                  }

                  disabled={loading}

                  className="
                    flex-1

                    bg-yellow-500
                    hover:bg-yellow-400

                    text-black
                    font-semibold

                    py-3 rounded-2xl

                    transition
                  "
                >

                  {loading
                    ? "Updating..."
                    : "Save Changes"}

                </button>

              </div>

            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
};

export default ManageGallery;