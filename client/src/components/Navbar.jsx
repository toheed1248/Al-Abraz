import { useMode } from "../context/ModeContext";
import { useLang } from "../context/LanguageContext";

import { useNavigate } from "react-router-dom";

import {
  useState,
  useEffect,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FaWhatsapp,
  FaPhone,
} from "react-icons/fa";

const Navbar = () => {

  const { mode, setMode } =
    useMode();

  const { lang, setLang } =
    useLang();

  const navigate =
    useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [isAdmin, setIsAdmin] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  /* ================= BODY LOCK ================= */

  useEffect(() => {

    if (menuOpen) {

      document.body.style.overflow =
        "hidden";

    } else {

      document.body.style.overflow =
        "auto";
    }

    return () => {

      document.body.style.overflow =
        "auto";
    };

  }, [menuOpen]);

  /* ================= ADMIN ================= */

  useEffect(() => {

    const token =
      localStorage.getItem(
        "token"
      );

    setIsAdmin(!!token);

  }, []);

  /* ================= SCROLL ================= */

  useEffect(() => {

    const handleScroll = () => {

      setScrolled(
        window.scrollY > 20
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };

  }, []);

  /* ================= ESC CLOSE ================= */

  useEffect(() => {

    const handleEsc = (e) => {

      if (e.key === "Escape") {

        setMenuOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEsc
    );

    return () => {

      window.removeEventListener(
        "keydown",
        handleEsc
      );
    };

  }, []);

  /* ================= LOGOUT ================= */

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    setIsAdmin(false);

    navigate("/");
  };

  /* ================= SCROLL TO ================= */

  const scrollTo = (id) => {

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });

    setMenuOpen(false);
  };

  /* ================= TEXT ================= */

  const t = {

    home:
      lang === "ar"
        ? "الرئيسية"
        : "Home",

    about:
      lang === "ar"
        ? "من نحن"
        : "About",

    services:
      lang === "ar"
        ? "الخدمات"
        : "Services",

    gallery:
      lang === "ar"
        ? "المعرض"
        : "Gallery",

    contact:
      lang === "ar"
        ? "اتصل بنا"
        : "Contact",

    login:
      lang === "ar"
        ? "تسجيل"
        : "Login",

    dashboard:
      lang === "ar"
        ? "لوحة التحكم"
        : "Dashboard",

    logout:
      lang === "ar"
        ? "خروج"
        : "Logout",

    masna:
      lang === "ar"
        ? "مصنع"
        : "Masna",

    contractor:
      lang === "ar"
        ? "مقاول"
        : "Contractor",

    whatsapp:
      lang === "ar"
        ? "واتساب"
        : "WhatsApp",
  };

  /* ================= CONTACT ================= */

  const contactNumbers = {

    masna:
      "+96599575150",

    contractor:
      "+96555807419",

  };

  const phoneNumber =
    contactNumbers[mode];

  const whatsappLink =
    `https://wa.me/${phoneNumber.replace("+", "")}`;

  return (
    <>
      {/* ================= NAVBAR ================= */}

      <motion.nav

        initial={{
          y: -80,
        }}

        animate={{
          y: 0,
        }}

        className={`
          fixed top-0 left-0

          w-full

          z-50

          transition-all duration-500

          ${
            scrolled

              ? `
                bg-[#050505]/75

                backdrop-blur-3xl

                border-b border-yellow-500/10

                shadow-[0_10px_50px_rgba(0,0,0,0.55)]
              `

              : `
                bg-transparent
              `
          }
        `}
      >

        <div className="
          max-w-[1600px]

          mx-auto

          px-5 md:px-10

          h-20

          flex items-center
          justify-between
        ">

          {/* ================= LOGO ================= */}

          <div
            onClick={() =>
              scrollTo("home")
            }

            className="
              cursor-pointer

              select-none
            "
          >

            <h1 className="
              text-xl md:text-2xl

              font-black

              tracking-[4px]

              text-yellow-400
            ">

              {mode === "masna"

                ? "AL ABRAZ MASNA"

                : "AL ABRAZ CONTRACTOR"}

            </h1>

            <p className="
              text-[10px] md:text-xs

              tracking-[3px]

              uppercase

              text-gray-400

              mt-1
            ">

              {lang === "ar"

                ? "حلول داخلية فاخرة"

                : "Premium Interior Solutions"}

            </p>

          </div>

          {/* ================= DESKTOP ================= */}

          <div className="
            hidden xl:flex

            items-center

            gap-10
          ">

            {/* LINKS */}

            <div className="
              flex items-center

              gap-8
            ">

              {[
                ["home", t.home],
                ["about", t.about],
                ["services", t.services],
                ["gallery", t.gallery],
                ["contact", t.contact],
              ].map(([id, label]) => (

                <button
                  key={id}

                  onClick={() =>
                    scrollTo(id)
                  }

                  className="
                    relative

                    text-sm

                    text-gray-300

                    hover:text-yellow-400

                    transition-all duration-300

                    group
                  "
                >

                  {label}

                  <span className="
                    absolute

                    left-0 -bottom-2

                    w-0 h-[1px]

                    bg-yellow-400

                    transition-all duration-300

                    group-hover:w-full
                  " />

                </button>

              ))}

            </div>

            {/* RIGHT */}

            <div className="
              flex items-center

              gap-4
            ">

              {/* MODE */}

              <div className="
                flex

                bg-white/5

                border border-white/10

                rounded-full

                p-1
              ">

                <button
                  onClick={() =>
                    setMode("masna")
                  }

                  className={`
                    px-5 py-2

                    rounded-full

                    text-sm

                    transition-all duration-300

                    ${
                      mode === "masna"

                        ? `
                          bg-yellow-500
                          text-black
                        `

                        : `
                          text-white
                        `
                    }
                  `}
                >

                  {t.masna}

                </button>

                <button
                  onClick={() =>
                    setMode("contractor")
                  }

                  className={`
                    px-5 py-2

                    rounded-full

                    text-sm

                    transition-all duration-300

                    ${
                      mode === "contractor"

                        ? `
                          bg-yellow-500
                          text-black
                        `

                        : `
                          text-white
                        `
                    }
                  `}
                >

                  {t.contractor}

                </button>

              </div>

              {/* LANG */}

              <div className="
                flex

                bg-white/5

                border border-white/10

                rounded-full

                p-1
              ">

                <button
                  onClick={() =>
                    setLang("en")
                  }

                  className={`
                    px-4 py-2

                    rounded-full

                    text-xs

                    font-bold

                    transition-all duration-300

                    ${
                      lang === "en"

                        ? `
                          bg-white
                          text-black
                        `

                        : `
                          text-white
                        `
                    }
                  `}
                >

                  EN

                </button>

                <button
                  onClick={() =>
                    setLang("ar")
                  }

                  className={`
                    px-4 py-2

                    rounded-full

                    text-xs

                    font-bold

                    transition-all duration-300

                    ${
                      lang === "ar"

                        ? `
                          bg-white
                          text-black
                        `

                        : `
                          text-white
                        `
                    }
                  `}
                >

                  AR

                </button>

              </div>

              {/* ================= ADMIN BUTTONS ================= */}

              {isAdmin ? (

                <div className="
                  flex items-center

                  gap-3
                ">

                  <button
                    onClick={() =>
                      navigate(
                        "/admin/dashboard"
                      )
                    }

                    className="
                      relative

                      overflow-hidden

                      px-5 py-3

                      rounded-2xl

                      bg-gradient-to-r
                      from-yellow-400
                      to-yellow-500

                      text-black

                      text-sm

                      font-bold

                      shadow-[0_0_30px_rgba(255,215,0,0.18)]

                      hover:scale-[1.03]

                      transition-all duration-300
                    "
                  >

                    <span className="
                      relative z-10
                    ">

                      {t.dashboard}

                    </span>

                  </button>

                  <button
                    onClick={handleLogout}

                    className="
                      px-5 py-3

                      rounded-2xl

                      bg-red-500/10

                      border border-red-500/20

                      text-red-400

                      text-sm

                      font-semibold

                      hover:bg-red-500

                      hover:text-white

                      transition-all duration-300
                    "
                  >

                    {t.logout}

                  </button>

                </div>

              ) : (

                <button
                  onClick={() =>
                    navigate("/admin")
                  }

                  className="
                    relative

                    overflow-hidden

                    px-6 py-3

                    rounded-2xl

                    border border-yellow-500/20

                    bg-white/[0.03]

                    backdrop-blur-xl

                    text-white

                    text-sm

                    font-semibold

                    hover:bg-yellow-500

                    hover:text-black

                    hover:border-yellow-400

                    transition-all duration-300
                  "
                >

                  <span className="
                    relative z-10
                  ">

                    {t.login}

                  </span>

                </button>

              )}

            </div>

          </div>

          {/* ================= MOBILE BUTTON ================= */}

          <button

            onClick={() =>
              setMenuOpen(
                !menuOpen
              )
            }

            className="
              xl:hidden

              relative

              w-14 h-14

              rounded-2xl

              bg-white/5

              border border-yellow-500/10

              backdrop-blur-xl

              flex flex-col
              items-center
              justify-center

              gap-1.5
            "
          >

            <motion.span
              animate={{
                rotate:
                  menuOpen
                    ? 45
                    : 0,

                y:
                  menuOpen
                    ? 8
                    : 0,
              }}

              className="
                w-6 h-[2px]

                bg-yellow-400

                rounded-full
              "
            />

            <motion.span
              animate={{
                opacity:
                  menuOpen
                    ? 0
                    : 1,
              }}

              className="
                w-6 h-[2px]

                bg-yellow-400

                rounded-full
              "
            />

            <motion.span
              animate={{
                rotate:
                  menuOpen
                    ? -45
                    : 0,

                y:
                  menuOpen
                    ? -8
                    : 0,
              }}

              className="
                w-6 h-[2px]

                bg-yellow-400

                rounded-full
              "
            />

          </button>

        </div>

      </motion.nav>

     {/* ================= MOBILE MENU ================= */}

<AnimatePresence>

  {menuOpen && (

    <>
      {/* OVERLAY */}

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

        onClick={() =>
          setMenuOpen(false)
        }

        className="
          fixed inset-0

          bg-black/70

          backdrop-blur-md

          z-40
        "
      />

      {/* MENU */}

      <motion.div

        initial={{
          x:
            lang === "ar"
              ? 400
              : -400,
        }}

        animate={{
          x: 0,
        }}

        exit={{
          x:
            lang === "ar"
              ? 400
              : -400,
        }}

        transition={{
          type: "spring",
          stiffness: 120,
        }}

        className={`
          fixed top-0

          ${
            lang === "ar"
              ? "right-0"
              : "left-0"
          }

          h-full

          w-[85%]
          max-w-[360px]

          bg-[#050505]/95

          backdrop-blur-2xl

          border-r border-yellow-500/10

          z-50

          flex flex-col

          overflow-y-auto
        `}
      >

        {/* ================= TOP ================= */}

        <div className="
          p-6

          border-b border-yellow-500/10
        ">

          <h1 className="
            text-2xl

            font-black

            tracking-[4px]

            text-yellow-400
          ">

            {mode === "masna"

              ? "AL ABRAZ MASNA"

              : "AL ABRAZ CONTRACTOR"}

          </h1>

          <p className="
            text-xs

            text-gray-400

            mt-2

            tracking-[2px]
          ">

            {lang === "ar"

              ? "حلول داخلية فاخرة"

              : "Premium Interior Solutions"}

          </p>

        </div>

        {/* ================= LINKS ================= */}

        <div className="
          flex flex-col

          px-5 py-6

          gap-3
        ">

          {[
            ["home", t.home],
            ["about", t.about],
            ["services", t.services],
            ["gallery", t.gallery],
            ["contact", t.contact],
          ].map(([id, label]) => (

            <button
              key={id}

              onClick={() =>
                scrollTo(id)
              }

              className="
                w-full

                text-left

                px-5 py-4

                rounded-2xl

                bg-white/[0.03]

                border border-white/5

                text-white

                hover:bg-yellow-500

                hover:text-black

                transition-all duration-300
              "
            >

              {label}

            </button>

          ))}

        </div>

        {/* ================= MODE ================= */}

        <div className="
          px-5
        ">

          <div className="
            flex

            bg-white/5

            border border-white/10

            rounded-2xl

            p-1
          ">

            <button
              onClick={() =>
                setMode("masna")
              }

              className={`
                flex-1

                py-4

                rounded-2xl

                text-sm

                font-semibold

                transition-all duration-300

                ${
                  mode === "masna"

                    ? `
                      bg-yellow-500
                      text-black
                    `

                    : `
                      text-white
                    `
                }
              `}
            >

              {t.masna}

            </button>

            <button
              onClick={() =>
                setMode("contractor")
              }

              className={`
                flex-1

                py-4

                rounded-2xl

                text-sm

                font-semibold

                transition-all duration-300

                ${
                  mode === "contractor"

                    ? `
                      bg-yellow-500
                      text-black
                    `

                    : `
                      text-white
                    `
                }
              `}
            >

              {t.contractor}

            </button>

          </div>

        </div>

        {/* ================= LANGUAGE ================= */}

        <div className="
          px-5

          mt-5
        ">

          <div className="
            flex

            bg-white/5

            border border-white/10

            rounded-2xl

            p-1
          ">

            <button
              onClick={() =>
                setLang("en")
              }

              className={`
                flex-1

                py-4

                rounded-2xl

                text-sm

                font-bold

                transition-all duration-300

                ${
                  lang === "en"

                    ? `
                      bg-white
                      text-black
                    `

                    : `
                      text-white
                    `
                }
              `}
            >

              English

            </button>

            <button
              onClick={() =>
                setLang("ar")
              }

              className={`
                flex-1

                py-4

                rounded-2xl

                text-sm

                font-bold

                transition-all duration-300

                ${
                  lang === "ar"

                    ? `
                      bg-white
                      text-black
                    `

                    : `
                      text-white
                    `
                }
              `}
            >

              العربية

            </button>

          </div>

        </div>

        {/* ================= CONTACT ================= */}

        <div className="
          px-5

          mt-6

          flex flex-col

          gap-4
        ">

          {/* WHATSAPP */}

          <a
            href={whatsappLink}

            target="_blank"

            rel="noopener noreferrer"

            className="
              flex items-center
              justify-center

              gap-3

              py-4

              rounded-2xl

              bg-green-500

              text-white

              font-semibold

              shadow-[0_10px_30px_rgba(34,197,94,0.2)]
            "
          >

            <FaWhatsapp />

            {t.whatsapp}

          </a>

          {/* CALL */}

          <a
            href={`tel:${phoneNumber}`}

            className="
              flex items-center
              justify-center

              gap-3

              py-4

              rounded-2xl

              bg-white/[0.03]

              border border-white/10

              text-white

              font-semibold
            "
          >

            <FaPhone />

            {phoneNumber}

          </a>

        </div>

        {/* ================= ADMIN ================= */}

        <div className="
          px-5

          mt-6

          pb-8
        ">

          {isAdmin ? (

            <div className="
              flex flex-col

              gap-4
            ">

              {/* DASHBOARD */}

              <button
                onClick={() => {

                  navigate(
                    "/admin/dashboard"
                  );

                  setMenuOpen(false);
                }}

                className="
                  py-4

                  rounded-2xl

                  bg-yellow-500

                  text-black

                  font-bold

                  shadow-[0_10px_30px_rgba(255,215,0,0.15)]
                "
              >

                {t.dashboard}

              </button>

              {/* LOGOUT */}

              <button
                onClick={() => {

                  handleLogout();

                  setMenuOpen(false);
                }}

                className="
                  py-4

                  rounded-2xl

                  bg-red-500/10

                  border border-red-500/20

                  text-red-400

                  font-semibold
                "
              >

                {t.logout}

              </button>

            </div>

          ) : (

            <button
              onClick={() => {

                navigate("/admin");

                setMenuOpen(false);
              }}

              className="
                w-full

                py-4

                rounded-2xl

                bg-yellow-500

                text-black

                font-bold

                shadow-[0_10px_30px_rgba(255,215,0,0.15)]
              "
            >

              {t.login}

            </button>

          )}

        </div>

      </motion.div>

    </>
  )}

</AnimatePresence>  </>
  );
};

export default Navbar;