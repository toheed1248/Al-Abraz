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
    masna: "+96599575150",
    contractor: "+96555807419",
  };

  const phoneNumber =
    contactNumbers[mode];

  const whatsappLink =
    `https://wa.me/${phoneNumber.replace("+", "")}`;

  return (
    <>
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
                bg-black/70
                backdrop-blur-2xl

                border-b border-yellow-500/10

                shadow-[0_10px_40px_rgba(0,0,0,0.5)]
              `
              : `
                bg-transparent
              `
          }
        `}
      >

        {/* ================= CONTAINER ================= */}

        <div className="
          max-w-[1600px]

          mx-auto

          px-5 md:px-10

          h-20

          flex items-center
          justify-between
        ">

          {/* ================= PREMIUM CLASSIC LOGO ================= */}

<motion.div
  whileHover={{
    scale: 1.02,
  }}

  transition={{
    duration: 0.3,
  }}

  onClick={() =>
    scrollTo("home")
  }

  className="
    cursor-pointer

    select-none

    flex flex-col
  "
>

  {/* TITLE */}

  <h1 className="
    text-xl md:text-2xl

    font-black

    tracking-[4px]

    text-yellow-400

    leading-none

    transition-all duration-300
  ">

    {lang === "ar"

      ? mode === "masna"
        ? "الابراز مصنع"
        : "الابراز مقاول"

      : mode === "masna"
        ? "AL-ABRAZ MASNA"
        : "AL-ABRAZ CONTRACTOR"}

  </h1>

  {/* SUBTITLE */}

  <p className="
    text-[10px] md:text-xs

    tracking-[3px]

    uppercase

    text-gray-400

    mt-2
  ">

    {lang === "ar"
      ? "حلول داخلية فاخرة"
      : "Premium Interior Solutions"}

  </p>

</motion.div>

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
                relative

                flex

                bg-white/5

                border border-white/10

                rounded-full

                p-1

                backdrop-blur-xl
              ">

                <motion.div
                  animate={{
                    x:
                      mode ===
                      "contractor"
                        ? "100%"
                        : "0%",
                  }}

                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}

                  className="
                    absolute top-1 left-1

                    w-1/2 h-[calc(100%-8px)]

                    bg-yellow-500

                    rounded-full
                  "
                />

                <button
                  onClick={() =>
                    setMode(
                      "masna"
                    )
                  }

                  className="
                    relative z-10

                    px-5 py-2

                    text-sm

                    font-medium

                    text-black
                  "
                >
                  {t.masna}
                </button>

                <button
                  onClick={() =>
                    setMode(
                      "contractor"
                    )
                  }

                  className="
                    relative z-10

                    px-5 py-2

                    text-sm

                    font-medium

                    text-black
                  "
                >
                  {t.contractor}
                </button>

              </div>

              {/* LANG */}

              <div className="
                relative

                flex

                bg-white/5

                border border-white/10

                rounded-full

                p-1
              ">

                <motion.div
                  animate={{
                    x:
                      lang === "ar"
                        ? "100%"
                        : "0%",
                  }}

                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}

                  className="
                    absolute top-1 left-1

                    w-1/2 h-[calc(100%-8px)]

                    bg-white

                    rounded-full
                  "
                />

                <button
                  onClick={() =>
                    setLang("en")
                  }

                  className="
                    relative z-10

                    px-4 py-2

                    text-xs

                    font-bold

                    text-black
                  "
                >
                  EN
                </button>

                <button
                  onClick={() =>
                    setLang("ar")
                  }

                  className="
                    relative z-10

                    px-4 py-2

                    text-xs

                    font-bold

                    text-black
                  "
                >
                  AR
                </button>

              </div>

              {/* PHONE */}

              <motion.a
                whileHover={{
                  scale: 1.03,
                }}

                href={`tel:${phoneNumber}`}

                className="
                  hidden 2xl:flex

                  items-center

                  gap-2

                  bg-yellow-500

                  text-black

                  px-5 py-3

                  rounded-full

                  font-semibold

                  shadow-[0_0_30px_rgba(255,215,0,0.2)]
                "
              >

                <FaPhone />

                {phoneNumber}

              </motion.a>

              {/* WHATSAPP */}

              <motion.a
                whileHover={{
                  scale: 1.05,
                }}

                href={whatsappLink}

                target="_blank"

                className="
                  flex items-center
                  justify-center

                  w-12 h-12

                  rounded-full

                  bg-green-500

                  text-white

                  shadow-[0_0_30px_rgba(34,197,94,0.3)]
                "
              >

                <FaWhatsapp />

              </motion.a>

              {/* ADMIN */}

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
                      px-5 py-2

                      rounded-full

                      bg-white/5

                      border border-white/10

                      hover:border-yellow-400/30

                      transition-all duration-300
                    "
                  >
                    {t.dashboard}
                  </button>

                  <button
                    onClick={
                      handleLogout
                    }

                    className="
                      text-red-400

                      hover:text-red-300

                      transition
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
                    px-5 py-2

                    rounded-full

                    border border-yellow-500/20

                    hover:bg-yellow-500

                    hover:text-black

                    transition-all duration-300
                  "
                >
                  {t.login}
                </button>

              )}

            </div>

          </div>

          {/* ================= MOBILE BUTTON ================= */}

          <motion.button
            whileTap={{
              scale: 0.95,
            }}

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

              border border-white/10

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

          </motion.button>

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

                backdrop-blur-sm

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

                backdrop-blur-3xl

                border-r border-yellow-500/10

                z-50

                p-6

                flex flex-col
              `}
            >

              {/* LOGO */}

              <div className="
                mb-10
              ">

                <h1 className="
                  text-3xl

                  font-black

                  text-yellow-400
                ">
                  AL ABRAZ
                </h1>

                <p className="
                  text-gray-400

                  text-sm

                  mt-2
                ">
                  Premium Experience
                </p>

              </div>

              {/* LINKS */}

              <div className="
                flex flex-col

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
                      text-left

                      text-lg

                      px-5 py-4

                      rounded-2xl

                      bg-white/5

                      border border-white/5

                      hover:border-yellow-400/20

                      hover:bg-yellow-500/10

                      transition-all duration-300
                    "
                  >
                    {label}
                  </button>

                ))}

              </div>

              {/* MODE */}

              <div className="
                mt-8
              ">

                <p className="
                  text-sm

                  text-gray-400

                  mb-3
                ">
                  Experience
                </p>

                <div className="
                  grid grid-cols-2

                  gap-3
                ">

                  <button
                    onClick={() =>
                      setMode(
                        "masna"
                      )
                    }

                    className={`
                      py-4

                      rounded-2xl

                      transition-all duration-300

                      ${
                        mode ===
                        "masna"
                          ? `
                            bg-yellow-500
                            text-black
                          `
                          : `
                            bg-white/5
                          `
                      }
                    `}
                  >
                    {t.masna}
                  </button>

                  <button
                    onClick={() =>
                      setMode(
                        "contractor"
                      )
                    }

                    className={`
                      py-4

                      rounded-2xl

                      transition-all duration-300

                      ${
                        mode ===
                        "contractor"
                          ? `
                            bg-yellow-500
                            text-black
                          `
                          : `
                            bg-white/5
                          `
                      }
                    `}
                  >
                    {t.contractor}
                  </button>

                </div>

              </div>

              {/* LANG */}

              <div className="
                mt-6

                grid grid-cols-2

                gap-3
              ">

                <button
                  onClick={() =>
                    setLang("en")
                  }

                  className={`
                    py-4

                    rounded-2xl

                    transition-all duration-300

                    ${
                      lang === "en"
                        ? `
                          bg-white
                          text-black
                        `
                        : `
                          bg-white/5
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
                    py-4

                    rounded-2xl

                    transition-all duration-300

                    ${
                      lang === "ar"
                        ? `
                          bg-white
                          text-black
                        `
                        : `
                          bg-white/5
                        `
                    }
                  `}
                >
                  AR
                </button>

              </div>

              {/* CONTACT */}

              <div className="
                mt-auto

                flex flex-col

                gap-4
              ">

                <a
                  href={`tel:${phoneNumber}`}

                  className="
                    flex items-center
                    justify-center

                    gap-3

                    bg-yellow-500

                    text-black

                    py-4

                    rounded-2xl

                    font-semibold
                  "
                >

                  <FaPhone />

                  {phoneNumber}

                </a>

                <a
                  href={whatsappLink}

                  target="_blank"

                  className="
                    flex items-center
                    justify-center

                    gap-3

                    bg-green-500

                    py-4

                    rounded-2xl

                    font-semibold
                  "
                >

                  <FaWhatsapp />

                  {t.whatsapp}

                </a>

                {/* ADMIN */}

                {isAdmin ? (

                  <div className="
                    grid grid-cols-2

                    gap-3
                  ">

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

                        bg-white/5
                      "
                    >
                      {t.dashboard}
                    </button>

                    <button
                      onClick={
                        handleLogout
                      }

                      className="
                        py-4

                        rounded-2xl

                        bg-red-500/20

                        text-red-400
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
                      py-4

                      rounded-2xl

                      border border-yellow-500/20

                      hover:bg-yellow-500

                      hover:text-black

                      transition-all duration-300
                    "
                  >
                    {t.login}
                  </button>

                )}

              </div>

            </motion.div>

          </>

        )}

      </AnimatePresence>
    </>
  );
};

export default Navbar;