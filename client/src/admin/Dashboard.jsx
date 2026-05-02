import { useState } from "react";
import UploadImage from "./UploadImage";
import ManageGallery from "./ManageGallery";
import {
  FaUpload,
  FaImages,
  FaSignOutAlt,
  FaUserCircle,
  FaChartBar
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [tab, setTab] = useState("upload");

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* 🔝 PREMIUM APP BAR */}
      <div className="
        flex justify-between items-center
        px-5 py-4
        border-b border-yellow-500/10
        bg-black/60 backdrop-blur-xl
        shadow-[0_0_20px_rgba(255,200,0,0.05)]
      ">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-500/10 p-2 rounded-full">
            <FaUserCircle className="text-yellow-400 text-xl" />
          </div>

          <div>
            <p className="text-xs text-gray-400">Admin Panel</p>
            <h1 className="text-sm font-semibold">
              Welcome <span className="text-yellow-400">Tarique</span>
            </h1>
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/admin";
          }}
          className="
            text-red-400 text-lg
            hover:text-red-300 hover:scale-110
            transition
          "
        >
          <FaSignOutAlt />
        </button>
      </div>

      {/* 📊 PREMIUM STATUS CARD */}
      <div className="px-5 pt-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            relative
            bg-gradient-to-r from-yellow-500/10 to-yellow-500/5
            border border-yellow-500/10
            rounded-3xl
            p-5 flex items-center justify-between
            overflow-hidden
          "
        >
          {/* glow */}
          <div className="absolute inset-0 bg-yellow-500/5 blur-2xl opacity-20"></div>

          <div>
            <p className="text-xs text-gray-400">Dashboard Status</p>
            <h2 className="text-base font-semibold text-yellow-400">
              System Running Smoothly
            </h2>
          </div>

          <FaChartBar className="text-yellow-400 text-2xl" />
        </motion.div>
      </div>

      {/* 📦 MAIN CONTENT WITH ANIMATION */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-28">

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            {tab === "upload" ? <UploadImage /> : <ManageGallery />}
          </motion.div>
        </AnimatePresence>

      </div>

      {/* 🔻 PREMIUM FLOATING NAV */}
      <div className="
        fixed bottom-5 left-1/2 -translate-x-1/2
        w-[90%] max-w-md
        bg-black/60 backdrop-blur-xl
        border border-yellow-500/10
        rounded-full
        px-2 py-2
        shadow-[0_10px_40px_rgba(0,0,0,0.6)]
      ">
        <div className="flex justify-between">

          {/* UPLOAD */}
          <button
            onClick={() => setTab("upload")}
            className={`
              flex-1 flex items-center justify-center gap-2
              py-2 rounded-full text-sm transition-all
              ${
                tab === "upload"
                  ? "bg-yellow-500 text-black shadow-lg"
                  : "text-gray-400 hover:text-white"
              }
            `}
          >
            <FaUpload />
            Upload
          </button>

          {/* GALLERY */}
          <button
            onClick={() => setTab("gallery")}
            className={`
              flex-1 flex items-center justify-center gap-2
              py-2 rounded-full text-sm transition-all
              ${
                tab === "gallery"
                  ? "bg-yellow-500 text-black shadow-lg"
                  : "text-gray-400 hover:text-white"
              }
            `}
          >
            <FaImages />
            Gallery
          </button>

        </div>
      </div>

    </div>
  );
};

export default Dashboard;