import { useState } from "react";

import {
  FaWhatsapp,
  FaTimes,
  FaPhoneAlt,
  FaUserTie,
  FaShieldAlt,
} from "react-icons/fa";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { useMode } from "../context/ModeContext";
import { useLang } from "../context/LanguageContext";

const FloatingContactPro = () => {

  const [open, setOpen] =
    useState(false);

  const { mode } =
    useMode();

  const { lang } =
    useLang();

  /* ================= NUMBERS ================= */

  const numbers = {

    masna: "96599575150",

    contractor:
      "96555807419",

  };

  const WHATSAPP =
    numbers[mode];

  const CALL =
    `tel:+${WHATSAPP}`;

  const WHATSAPP_LINK =
    `https://wa.me/${WHATSAPP}`;

  /* ================= CONTACT FORM ================= */

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

  return (
    <>
      {/* ================= FLOATING BUTTON ================= */}

      <div className="
        fixed
        bottom-5
        right-5
        z-50
      ">

        {/* PULSE */}

        <div className="
          absolute
          inset-0

          rounded-[26px]

          bg-yellow-400/20

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

            border border-yellow-500/15

            backdrop-blur-3xl

            flex items-center
            justify-center

            shadow-[0_10px_60px_rgba(255,215,0,0.12)]

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

            shadow-[0_0_30px_rgba(255,215,0,0.25)]
          ">

            {open
              ? <FaTimes />
              : <FaWhatsapp />}

          </div>

        </motion.button>

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

              rounded-[36px]

              overflow-hidden

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

            {/* ================= TOP GLOW ================= */}

            <div className="
              absolute
              top-0
              right-0

              w-[250px]
              h-[250px]

              bg-yellow-500/10

              blur-[120px]

              rounded-full
            " />

            {/* ================= HEADER ================= */}

            <div className="
              relative
              z-10

              p-7

              border-b border-white/5
            ">

              {/* PROFILE */}

              <div className="
                flex items-center

                gap-4
              ">

                {/* AVATAR */}

                <div className="
                  relative

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

                  shadow-[0_0_40px_rgba(255,215,0,0.25)]
                ">

                  <FaUserTie />

                </div>

                {/* TEXT */}

                <div>

                  <h2 className="
                    text-xl

                    font-bold

                    text-white
                  ">

                    Tarique Solanki

                  </h2>

                  <p className="
                    text-sm

                    text-yellow-400

                    mt-1
                  ">

                    {lang === "ar"

                      ? "استشاري داخلي فاخر"

                      : "Luxury Interior Consultant"}

                  </p>

                </div>

              </div>

              {/* TRUST BAR */}

              <div className="
                mt-6

                rounded-[24px]

                bg-white/[0.03]

                border border-white/5

                backdrop-blur-xl

                p-5
              ">

                <div className="
                  flex items-start

                  gap-4
                ">

                  <div className="
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

                        : "Trusted Interior Execution"}

                    </h3>

                    <p className="
                      text-sm

                      text-gray-400

                      leading-relaxed
                    ">

                      {lang === "ar"

                        ? "تنفيذ فاخر بعقود واضحة وتشطيبات احترافية"

                        : "Professional contract-based luxury interior execution with premium finishing."}

                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* ================= ACTIONS ================= */}

            <div className="
              relative
              z-10

              p-7

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
                  group

                  flex items-center
                  justify-between

                  w-full

                  rounded-[24px]

                  bg-green-500

                  px-6
                  py-5

                  shadow-[0_10px_40px_rgba(34,197,94,0.2)]

                  transition-all duration-300
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

                      ? "دردشة مباشرة"

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

                  w-full

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

                  transition-all duration-300
                "
              >

                {lang === "ar"

                  ? "إرسال طلب المشروع"

                  : "Send Project Request"}

              </motion.button>

            </div>

            {/* ================= FOOTER ================= */}

            <div className="
              relative
              z-10

              px-7
              pb-7
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