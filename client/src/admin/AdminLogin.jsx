import { useState, useEffect } from "react";
import { loginAdmin } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* 🔥 BACK BUTTON FIX */
  useEffect(() => {
    const handleBack = () => {
      navigate("/", { replace: true });
    };

    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [navigate]);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await loginAdmin({ email, password });
      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-4">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-yellow-500/10 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-yellow-500/10 blur-[100px] rounded-full bottom-[-100px] right-[-100px]" />

      {/* 🔥 CARD */}
      <div className="
        relative z-10
        w-full max-w-md
        bg-gradient-to-b from-[#111] to-[#0a0a0a]
        border border-yellow-500/10
        rounded-3xl
        p-8
        shadow-[0_0_50px_rgba(255,200,0,0.12)]
      ">

        {/* ❌ CLOSE BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="
            absolute top-4 right-4
            w-9 h-9 flex items-center justify-center
            rounded-full
            bg-black/60
            border border-yellow-500/20
            text-yellow-400
            hover:bg-yellow-500 hover:text-black
            transition-all duration-300
          "
        >
          <FaTimes size={14} />
        </button>

        {/* 🔥 HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-yellow-400 mb-2 tracking-wide">
            Admin Panel
          </h2>
          <p className="text-gray-400 text-sm">
            Secure access to dashboard
          </p>
        </div>

        {/* 🔥 EMAIL */}
        <div className="mb-4">
          <label className="text-xs text-gray-400 mb-1 block">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter email"
            className="
              w-full p-3 rounded-xl
              bg-black/60
              text-white placeholder-gray-400 caret-yellow-400
              border border-yellow-500/10
              outline-none
              focus:border-yellow-500
              focus:ring-1 focus:ring-yellow-500/40
              transition-all duration-300
            "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* 🔥 PASSWORD */}
        <div className="mb-6">
          <label className="text-xs text-gray-400 mb-1 block">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            className="
              w-full p-3 rounded-xl
              bg-black/60
              text-white placeholder-gray-400 caret-yellow-400
              border border-yellow-500/10
              outline-none
              focus:border-yellow-500
              focus:ring-1 focus:ring-yellow-500/40
              transition-all duration-300
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* 🔥 BUTTON */}
        <button
          onClick={handleLogin}
          className="
            w-full
            bg-gradient-to-r from-yellow-500 to-yellow-400
            hover:from-yellow-400 hover:to-yellow-300
            text-black
            font-semibold
            py-3
            rounded-full
            transition-all duration-300
            shadow-[0_0_25px_rgba(255,200,0,0.4)]
            flex items-center justify-center gap-2
          "
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

      </div>
    </div>
  );
};

export default AdminLogin;