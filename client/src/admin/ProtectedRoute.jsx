import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setValid(false);
        setLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);

        // 🔥 EXP CHECK
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          setValid(false);
        } else {
          setValid(true);
        }

      } catch (err) {
        localStorage.removeItem("token");
        setValid(false);
      }

      setLoading(false);
    };

    checkAuth();

    // 🔥 AUTO SYNC (multiple tabs)
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  /* ================= LOADING UI ================= */
  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-yellow-400">

        {/* PREMIUM LOADER */}
        <motion.div
          className="w-16 h-16 border-4 border-yellow-500/30 border-t-yellow-400 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />

        <p className="mt-4 text-sm text-gray-400">
          Checking secure access...
        </p>
      </div>
    );
  }

  /* ================= INVALID ================= */
  if (!valid) {
    return <Navigate to="/admin" replace />;
  }

  /* ================= SUCCESS ================= */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
};

export default ProtectedRoute;