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

const Dashboard = () => {
  const [tab, setTab] = useState("upload");

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* 🔝 APP BAR */}
      <div className="
        flex justify-between items-center
        px-4 py-3
        border-b border-yellow-500/10
        bg-gradient-to-r from-[#111] to-[#0a0a0a]
      ">
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-yellow-400 text-xl" />
          <h1 className="text-sm md:text-base font-semibold">
            Welcome <span className="text-yellow-400">Tarique Solanki</span>
          </h1>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/admin";
          }}
          className="text-red-400 text-lg hover:text-red-300 transition"
        >
          <FaSignOutAlt />
        </button>
      </div>

      {/* 📊 QUICK INFO */}
      <div className="px-4 pt-4">
        <div className="
          bg-gradient-to-r from-yellow-500/10 to-yellow-500/5
          border border-yellow-500/10
          rounded-2xl
          p-4 flex items-center justify-between
        ">
          <div>
            <p className="text-xs text-gray-400">Dashboard Status</p>
            <h2 className="text-sm font-semibold text-yellow-400">
              System Running Smoothly
            </h2>
          </div>

          <FaChartBar className="text-yellow-400 text-xl" />
        </div>
      </div>

      {/* 📦 MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 pb-28">
        {tab === "upload" ? <UploadImage /> : <ManageGallery />}
      </div>

      {/* 🔻 BOTTOM NAV */}
      <div className="
        fixed bottom-0 left-0 w-full
        bg-[#0a0a0a]
        border-t border-yellow-500/10
        px-4 py-3
      ">

        <div className="flex justify-between bg-[#111] rounded-full p-1">

          {/* UPLOAD */}
          <button
            onClick={() => setTab("upload")}
            className={`
              flex-1 flex items-center justify-center gap-2
              py-2 rounded-full text-sm transition
              ${
                tab === "upload"
                  ? "bg-yellow-500 text-black"
                  : "text-gray-400"
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
              py-2 rounded-full text-sm transition
              ${
                tab === "gallery"
                  ? "bg-yellow-500 text-black"
                  : "text-gray-400"
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