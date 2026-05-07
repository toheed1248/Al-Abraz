import {
  useState,
  useEffect,
} from "react";

import {
  FaWhatsapp,
  FaTimes,
  FaPhoneAlt,
  FaUserTie,
  FaShieldAlt,
  FaChevronUp,
} from "react-icons/fa";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useMode,
} from "../context/ModeContext";

import {
  useLang,
} from "../context/LanguageContext";

const FloatingContactPro = () => {

  const [open, setOpen] =
    useState(false);

  const [showScroll, setShowScroll] =
    useState(false);

  const { mode } =
    useMode();

  const { lang } =
    useLang();

  /* ================= SCROLL ================= */

  useEffect(() => {

    const handleScroll = () => {

      setShowScroll(
        window.scrollY > 500
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

  /* ================= BODY LOCK ================= */

  useEffect(() => {

    if (open) {

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

  }, [open]);

  /* ================= NUMBERS ================= */

  const numbers = {

    masna:
      "96599575150",

    contractor:
      "96555807419",

  };

  const WHATSAPP =
    numbers[mode];

  const CALL =
    `tel:+${WHATSAPP}`;

  const WHATSAPP_LINK =
    `https://wa.me/${WHATSAPP}`;

  /* ================= CONTACT ================= */

  const goToContact = () => {

    document
      .getElementById(
        "contact"
      )
      ?.scrollIntoView({

        behavior:
          "smooth",

      });

    setOpen(false);
  };

  /* ================= TOP ================= */

  const scrollTop = () => {

    window.scrollTo({

      top: 0,
      behavior: "smooth",

    });
  };

  return (
    <>
      {/* ================= OVERLAY ================= */}

      <AnimatePresence>

        {open && (

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
              setOpen(false)
            }

            className="
              fixed inset-0

              bg-black/70

              backdrop-blur-md

              z-40
            "
          />

        )}

      </AnimatePresence>

      {/* ================= FLOAT AREA ================= */}

      <div className="
        fixed

        bottom-5
        right-5

        z-50

        flex flex-col

        items-end

        gap-4
      ">

        {/* ================= SCROLL TOP ================= */}

        <AnimatePresence>

          {showScroll && !open && (

            <motion.button

              initial={{
                opacity: 0,
                y: 20,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              exit={{
                opacity: 0,
                y: 20,
              }}

              whileHover={{
                scale: 1.06,
              }}

              whileTap={{
                scale: 0.94,
              }}

              onClick={scrollTop}

              className="
                w-[60px]
                h-[60px]

                rounded-[22px]

                bg-[#0b0b0b]/95

                border border-yellow-500/10

                backdrop-blur-3xl

                flex items-center
                justify-center

                text-yellow-400

                shadow-[0_10px_50px_rgba(255,215,0,0.08)]
              "
            >

              <FaChevronUp />

            </motion.button>

          )}

        </AnimatePresence>

        {/* ================= MAIN BUTTON ================= */}

        <div className="
          relative
        ">

          {/* PULSE */}

          <div className="
            absolute inset-0

            rounded-[26px]

            bg-yellow-400/10

            animate-ping
          " />

          <motion.button

            onClick={() =>
              setOpen(!open)
            }

            whileHover={{
              scale: 1.04,
            }}

            whileTap={{
              scale: 0.95,
            }}

            className="
              relative

              w-[72px]
              h-[72px]

              rounded-[26px]

              bg-[#0b0b0b]/95

              border border-yellow-500/10

              backdrop-blur-3xl

              flex items-center
              justify-center

              shadow-[0_10px_60px_rgba(255,215,0,0.10)]

              overflow-hidden
            "
          >

            {/* LIGHT */}

            <div className="
              absolute
              inset-0

              bg-gradient-to-br
              from-yellow-400/10
              via-transparent
              to-transparent
            " />

            {/* INNER */}

            <div className="
              relative
              z-10

              w-14
              h-14

              rounded-2xl

              bg-gradient-to-br
              from-yellow-400
              to-yellow-500

              flex items-center
              justify-center

              text-black

              text-2xl

              shadow-[0_0_30px_rgba(255,215,0,0.2)]
            ">

              {open
                ? <FaTimes />
                : <FaWhatsapp />}

            </div>

          </motion.button>

        </div>

      </div>

      {/* ================= PANEL ================= */}

      <AnimatePresence>

        {open && (

          <motion.div

            initial={{
              opacity: 0,
              y: 40,
              scale: 0.96,
            }}

            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}

            exit={{
              opacity: 0,
              y: 20,
              scale: 0.96,
            }}

            transition={{
              duration: 0.28,
            }}

            className={`
              fixed

              bottom-28
              right-5

              z-50

              w-[340px]
              md:w-[370px]

              max-h-[85vh]

              overflow-y-auto

              rounded-[36px]

              bg-[#080808]/95

              backdrop-blur-[30px]

              border border-yellow-500/10

              shadow-[0_20px_100px_rgba(0,0,0,0.8)]

              ${
                lang === "ar"
                  ? "text-right"
                  : ""
              }
            `}
          >

            {/* ================= GLOW ================= */}

            <div className="
              absolute
              top-0
              right-0

              w-[220px]
              h-[220px]

              bg-yellow-500/10

              blur-[120px]

              rounded-full
            " />

            {/* ================= HEADER ================= */}

            <div className="
              relative z-10

              p-6

              border-b border-white/5
            ">

              {/* PROFILE */}

              <div className="
                flex items-center

                gap-4
              ">

                {/* AVATAR */}

                <div className="
                  w-16
                  h-16

                  rounded-[22px]

                  bg-gradient-to-br
                  from-yellow-400
                  to-yellow-500

                  flex items-center
                  justify-center

                  text-black

                  text-2xl

                  shadow-[0_0_40px_rgba(255,215,0,0.2)]
                ">

                  <FaUserTie />

                </div>

                {/* INFO */}

                <div className="
                  flex-1

                  min-w-0
                ">

                  <h2 className="
                    text-lg md:text-xl

                    font-bold

                    text-white

                    truncate
                  ">

                    Tarique Solanki

                  </h2>

                  <p className="
                    text-xs md:text-sm

                    text-yellow-400

                    mt-1

                    leading-relaxed
                  ">

                    {lang === "ar"

                      ? "10 سنوات خبرة داخلية في الكويت"

                      : "10+ Years Kuwait Interior Experience"}

                  </p>

                </div>

              </div>

              {/* TRUST */}

              <div className="
                mt-5

                rounded-[24px]

                bg-white/[0.03]

                border border-white/5

                p-5
              ">

                <div className="
                  flex items-start

                  gap-4
                ">

                  <div className="
                    min-w-[44px]

                    w-11
                    h-11

                    rounded-2xl

                    bg-green-500/10

                    flex items-center
                    justify-center
                  ">

                    <FaShieldAlt className="
                      text-green-400
                    " />

                  </div>

                  <div>

                    <h3 className="
                      text-white

                      font-semibold

                      mb-2
                    ">

                      {lang === "ar"

                        ? "تنفيذ داخلي موثوق"

                        : "Trusted Contract Execution"}

                    </h3>

                    <p className="
                      text-sm

                      text-gray-400

                      leading-relaxed
                    ">

                      {lang === "ar"

                        ? "تنفيذ احترافي وتشطيبات فاخرة بخبرة حقيقية"

                        : "Luxury interior execution with trusted finishing and professional Kuwait experience."}

                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* ================= ACTIONS ================= */}

            <div className="
              relative z-10

              p-6

              space-y-4
            ">

              {/* WHATSAPP */}

              <motion.a

                whileHover={{
                  scale: 1.02,
                }}

                whileTap={{
                  scale: 0.98,
                }}

                href={WHATSAPP_LINK}

                target="_blank"

                rel="noopener noreferrer"

                className="
                  flex items-center
                  justify-between

                  rounded-[24px]

                  bg-green-500

                  px-6
                  py-5

                  shadow-[0_10px_40px_rgba(34,197,94,0.2)]
                "
              >

                <div>

                  <h3 className="
                    font-bold

                    text-lg
                  ">

                    WhatsApp

                  </h3>

                  <p className="
                    text-sm

                    text-white/80
                  ">

                    {lang === "ar"

                      ? "استشارة مباشرة"

                      : "Instant Consultation"}

                  </p>

                </div>

                <FaWhatsapp className="
                  text-2xl
                " />

              </motion.a>

              {/* CALL */}

              <motion.a

                whileHover={{
                  scale: 1.02,
                }}

                whileTap={{
                  scale: 0.98,
                }}

                href={CALL}

                className="
                  flex items-center
                  justify-between

                  rounded-[24px]

                  bg-white/[0.04]

                  border border-white/5

                  px-6
                  py-5

                  hover:border-yellow-400/20

                  transition-all duration-300
                "
              >

                <div>

                  <h3 className="
                    font-bold

                    text-lg

                    text-white
                  ">

                    {lang === "ar"

                      ? "اتصال مباشر"

                      : "Direct Call"}

                  </h3>

                  <p className="
                    text-sm

                    text-gray-400
                  ">

                    {lang === "ar"

                      ? "استشارة سريعة"

                      : "Quick Consultation"}

                  </p>

                </div>

                <FaPhoneAlt className="
                  text-yellow-400

                  text-xl
                " />

              </motion.a>

              {/* FORM */}

              <motion.button

                whileHover={{
                  scale: 1.02,
                }}

                whileTap={{
                  scale: 0.98,
                }}

                onClick={
                  goToContact
                }

                className="
                  w-full

                  rounded-[24px]

                  bg-yellow-500

                  py-5

                  text-black

                  font-bold

                  text-lg

                  shadow-[0_10px_40px_rgba(255,215,0,0.18)]
                "
              >

                {lang === "ar"

                  ? "إرسال طلب المشروع"

                  : "Send Project Request"}

              </motion.button>

            </div>

            {/* ================= FOOTER ================= */}

            <div className="
              relative z-10

              px-6
              pb-6
            ">

              <div className="
                rounded-[24px]

                bg-black/40

                border border-white/5

                p-5

                text-center
              ">

                <p className="
                  text-sm

                  text-gray-300

                  leading-relaxed
                ">

                  {lang === "ar"

                    ? "تشطيبات داخلية فاخرة بأعلى معايير الجودة والثقة"

                    : "Luxury interior finishing crafted with trust, precision and premium quality."}

                </p>

              </div>

            </div>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
};

export default FloatingContactPro;