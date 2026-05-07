import {
  useState,
  useEffect,
} from "react";

import {
  loginAdmin,
} from "../services/authService";

import {
  useNavigate,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  FaTimes,
  FaLock,
  FaEnvelope,
  FaShieldAlt,
} from "react-icons/fa";

const AdminLogin = () => {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const navigate =
    useNavigate();

  /* ================= BACK FIX ================= */

  useEffect(() => {

    const handleBack = () => {

      navigate("/", {
        replace: true,
      });
    };

    window.addEventListener(
      "popstate",
      handleBack
    );

    return () => {

      window.removeEventListener(
        "popstate",
        handleBack
      );
    };

  }, [navigate]);

  /* ================= LOGIN ================= */

  const handleLogin = async () => {

    if (!email || !password) {

      alert(
        "Please fill all fields"
      );

      return;
    }

    try {

      setLoading(true);

      await loginAdmin({
        email,
        password,
      });

      navigate(
        "/admin/dashboard"
      );

    } catch (err) {

      console.log(
        "Login Error:",
        err
      );

      const message =

        err?.response?.data?.msg ||

        err?.message ||

        (
          typeof err === "string"
            ? err
            : "Login failed"
        );

      alert(message);

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="
      relative

      min-h-screen

      bg-[#050505]

      overflow-hidden

      flex items-center
      justify-center

      px-4

      text-white
    ">

      {/* ================= CINEMATIC BG ================= */}

      <div className="
        absolute inset-0
      ">

        {/* GOLD LIGHT */}

        <motion.div

          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4],
          }}

          transition={{
            repeat: Infinity,
            duration: 8,
          }}

          className="
            absolute

            top-[-150px]
            left-[-100px]

            w-[500px]
            h-[500px]

            rounded-full

            bg-yellow-500/10

            blur-[150px]
          "
        />

        {/* GLOW */}

        <motion.div

          animate={{
            scale: [1, 1.15, 1],
          }}

          transition={{
            repeat: Infinity,
            duration: 10,
          }}

          className="
            absolute

            bottom-[-200px]
            right-[-100px]

            w-[600px]
            h-[600px]

            rounded-full

            bg-yellow-400/10

            blur-[180px]
          "
        />

        {/* GRID */}

        <div className="
          absolute inset-0

          opacity-[0.03]

          bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)]

          bg-[size:60px_60px]
        " />

      </div>

      {/* ================= MAIN CARD ================= */}

      <motion.div

        initial={{
          opacity: 0,
          y: 40,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.9,
        }}

        className="
          relative z-10

          w-full
          max-w-md

          rounded-[36px]

          border border-yellow-500/10

          bg-gradient-to-b
          from-white/[0.08]
          to-white/[0.03]

          backdrop-blur-[30px]

          shadow-[0_0_100px_rgba(255,215,0,0.08)]

          overflow-hidden
        "
      >

        {/* TOP LINE */}

        <div className="
          h-[3px]

          bg-gradient-to-r
          from-transparent
          via-yellow-400
          to-transparent
        " />

        <div className="
          p-7 md:p-9
        ">

          {/* ================= CLOSE ================= */}

          <button

            onClick={() =>
              navigate("/")
            }

            className="
              absolute top-5 right-5

              w-11 h-11

              rounded-2xl

              bg-white/[0.04]

              border border-white/10

              flex items-center
              justify-center

              text-yellow-400

              hover:bg-yellow-500
              hover:text-black

              transition-all duration-300
            "
          >

            <FaTimes />

          </button>

          {/* ================= HEADER ================= */}

          <div className="
            text-center

            mb-10
          ">

            {/* ICON */}

            <motion.div

              animate={{
                y: [0, -8, 0],
              }}

              transition={{
                repeat: Infinity,
                duration: 3,
              }}

              className="
                mx-auto

                mb-6

                w-24 h-24

                rounded-[30px]

                bg-gradient-to-b
                from-yellow-300
                to-yellow-500

                text-black

                flex items-center
                justify-center

                text-4xl

                shadow-[0_20px_60px_rgba(255,215,0,0.2)]
              "
            >

              <FaShieldAlt />

            </motion.div>

            {/* TITLE */}

            <h1 className="
              text-4xl

              font-black

              tracking-[5px]

              text-yellow-400

              drop-shadow-[0_0_20px_rgba(255,215,0,0.25)]
            ">

              ADMIN

            </h1>

            {/* SUB */}

            <p className="
              mt-4

              text-gray-400

              leading-relaxed

              text-sm
            ">

              Secure dashboard access for
              Al Abraz Interior Management

            </p>

          </div>

          {/* ================= EMAIL ================= */}

          <div className="
            mb-5
          ">

            <label className="
              text-sm

              text-gray-400

              mb-3

              block
            ">

              Email Address

            </label>

            <div className="
              relative
            ">

              <FaEnvelope
                className="
                  absolute left-5 top-1/2

                  -translate-y-1/2

                  text-yellow-400/70
                "
              />

              <input

                type="email"

                placeholder="Enter admin email"

                value={email}

                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }

                className="
                  w-full

                  h-[64px]

                  pl-14 pr-5

                  rounded-2xl

                  bg-white/[0.04]

                  border border-white/10

                  text-white

                  placeholder:text-gray-500

                  outline-none

                  focus:border-yellow-500/40

                  focus:bg-white/[0.06]

                  transition-all duration-300
                "
              />

            </div>

          </div>

          {/* ================= PASSWORD ================= */}

          <div className="
            mb-8
          ">

            <label className="
              text-sm

              text-gray-400

              mb-3

              block
            ">

              Password

            </label>

            <div className="
              relative
            ">

              <FaLock
                className="
                  absolute left-5 top-1/2

                  -translate-y-1/2

                  text-yellow-400/70
                "
              />

              <input

                type="password"

                placeholder="Enter secure password"

                value={password}

                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }

                className="
                  w-full

                  h-[64px]

                  pl-14 pr-5

                  rounded-2xl

                  bg-white/[0.04]

                  border border-white/10

                  text-white

                  placeholder:text-gray-500

                  outline-none

                  focus:border-yellow-500/40

                  focus:bg-white/[0.06]

                  transition-all duration-300
                "
              />

            </div>

          </div>

          {/* ================= BUTTON ================= */}

          <motion.button

            whileHover={{
              scale: 1.01,
            }}

            whileTap={{
              scale: 0.98,
            }}

            onClick={handleLogin}

            disabled={loading}

            className="
              relative

              overflow-hidden

              w-full

              h-[64px]

              rounded-2xl

              bg-yellow-500

              hover:bg-yellow-400

              text-black

              font-black

              text-lg

              shadow-[0_0_50px_rgba(255,215,0,0.2)]

              transition-all duration-300
            "
          >

            {/* SHINE */}

            <div className="
              absolute inset-0

              bg-gradient-to-r
              from-transparent
              via-white/40
              to-transparent

              -translate-x-full
              hover:translate-x-full

              transition duration-1000
            " />

            <span className="
              relative z-10

              flex items-center
              justify-center

              gap-3
            ">

              {loading ? (

                <>
                  <span className="
                    w-5 h-5

                    border-2 border-black

                    border-t-transparent

                    rounded-full

                    animate-spin
                  " />

                  Authenticating...

                </>

              ) : (

                <>
                  <FaShieldAlt />

                  Access Dashboard

                </>

              )}

            </span>

          </motion.button>

          {/* ================= FOOTER ================= */}

          <div className="
            mt-8

            text-center
          ">

            <p className="
              text-xs

              text-gray-500

              leading-relaxed
            ">

              Protected Admin Access •
              Kuwait Interior Management System

            </p>

          </div>

        </div>

      </motion.div>

    </div>
  );
};

export default AdminLogin;