import { useState } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaLanguage, FaCheckCircle } from "react-icons/fa";

const ManageContent = () => {
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [descEn, setDescEn] = useState("");
  const [descAr, setDescAr] = useState("");

  const handleSave = () => {
    console.log({
      titleEn,
      titleAr,
      descEn,
      descAr,
    });

    alert("Content Saved (frontend only for now)");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        max-w-xl mx-auto
        bg-gradient-to-b from-[#111] to-[#0a0a0a]
        border border-yellow-500/10
        rounded-3xl
        p-6
        shadow-[0_0_30px_rgba(255,200,0,0.08)]
        text-white
      "
    >

      {/* HEADER */}
      <div className="flex items-center gap-2 mb-6 text-yellow-400">
        <FaEdit />
        <h2 className="text-lg font-semibold">
          Content Editor
        </h2>
      </div>

      {/* TITLE EN */}
      <label className="text-xs text-gray-400 mb-1 block">
        English Title
      </label>
      <input
        placeholder="Enter title..."
        value={titleEn}
        onChange={(e) => setTitleEn(e.target.value)}
        className="input-premium"
      />

      {/* TITLE AR */}
      <label className="text-xs text-gray-400 mb-1 block">
        Arabic Title
      </label>
      <input
        placeholder="ادخل العنوان..."
        value={titleAr}
        onChange={(e) => setTitleAr(e.target.value)}
        className="input-premium"
      />

      {/* DESC EN */}
      <label className="text-xs text-gray-400 mb-1 block">
        English Description
      </label>
      <textarea
        placeholder="Write description..."
        value={descEn}
        onChange={(e) => setDescEn(e.target.value)}
        className="input-premium"
      />

      {/* DESC AR */}
      <label className="text-xs text-gray-400 mb-1 block">
        Arabic Description
      </label>
      <textarea
        placeholder="اكتب الوصف..."
        value={descAr}
        onChange={(e) => setDescAr(e.target.value)}
        className="input-premium"
      />

      {/* SAVE BUTTON */}
      <button
        onClick={handleSave}
        className="
          w-full mt-4
          bg-gradient-to-r from-yellow-500 to-yellow-400
          hover:from-yellow-400 hover:to-yellow-300
          text-black
          py-3
          rounded-full
          font-semibold
          flex items-center justify-center gap-2
          transition
        "
      >
        <FaCheckCircle />
        Save Content
      </button>

    </motion.div>
  );
};

export default ManageContent;