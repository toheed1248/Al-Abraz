import { useMode } from "../context/ModeContext";
import { useLang } from "../context/LanguageContext";

import { useState } from "react";

import {
  motion,
} from "framer-motion";

const TextSlider = () => {

  const { mode } = useMode();

  const { lang } = useLang();

  const [hovered, setHovered] =
    useState(false);

  /* ================= DATA ================= */

  const data = {

    masna: [

      {
        key: "pop",
        en: "POP Design",
        ar: "تصاميم جبسية",
      },

      {
        key: "wall",
        en: "Wall Moulding",
        ar: "زخارف الجدران",
      },

      {
        key: "panel",
        en: "Decor Panels",
        ar: "ألواح زخرفية",
      },

      {
        key: "ceiling",
        en: "Ceiling Art",
        ar: "تصاميم الأسقف",
      },

      {
        key: "luxury",
        en: "Luxury Finish",
        ar: "تشطيبات فاخرة",
      },

    ],

    contractor: [

      {
        key: "light",
        en: "Ceiling Lighting",
        ar: "إضاءة السقف",
      },

      {
        key: "wall",
        en: "Wall Design",
        ar: "تصميم الجدران",
      },

      {
        key: "pillar",
        en: "Pillar Work",
        ar: "أعمال الأعمدة",
      },

      {
        key: "tv",
        en: "TV Wall Design",
        ar: "خلفيات التلفاز",
      },

      {
        key: "hall",
        en: "Hall Decoration",
        ar: "ديكور الصالات",
      },

    ],

  };

  const items = data[mode];

  /* ================= FILTER ================= */

  const handleClick = (key) => {

    window.dispatchEvent(

      new CustomEvent(
        "filterGallery",
        {
          detail: key,
        }
      )

    );
  };

  return (
    <section className="
      relative

      overflow-hidden

      bg-[#050505]

      border-y border-yellow-500/10
    ">

      {/* ================= BG GLOW ================= */}

      <div className="
        absolute inset-0

        bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.08),transparent_60%)]
      " />

      {/* ================= TOP LINE ================= */}

      <div className="
        absolute top-0 left-0

        w-full h-[1px]

        bg-gradient-to-r
        from-transparent
        via-yellow-400/30
        to-transparent
      " />

      {/* ================= BOTTOM LINE ================= */}

      <div className="
        absolute bottom-0 left-0

        w-full h-[1px]

        bg-gradient-to-r
        from-transparent
        via-yellow-400/20
        to-transparent
      " />

      {/* ================= EDGE BLUR ================= */}

      <div className="
        absolute left-0 top-0

        h-full w-32

        bg-gradient-to-r
        from-[#050505]
        to-transparent

        z-20
      " />

      <div className="
        absolute right-0 top-0

        h-full w-32

        bg-gradient-to-l
        from-[#050505]
        to-transparent

        z-20
      " />

      {/* ================= STRIP ================= */}

      <div
        className="
          relative z-10

          h-[78px] md:h-[90px]

          flex items-center
        "

        onMouseEnter={() =>
          setHovered(true)
        }

        onMouseLeave={() =>
          setHovered(false)
        }
      >

        <motion.div

          animate={{
            x: hovered
              ? 0
              : ["0%", "-50%"],
          }}

          transition={{
            repeat: Infinity,
            duration: 22,
            ease: "linear",
          }}

          className="
            flex

            items-center

            gap-8 md:gap-14

            whitespace-nowrap

            px-6
          "
        >

          {[...items, ...items].map(
            (item, i) => (

              <motion.button

                whileHover={{
                  scale: 1.08,
                  y: -2,
                }}

                whileTap={{
                  scale: 0.96,
                }}

                key={i}

                onClick={() =>
                  handleClick(
                    item.key
                  )
                }

                className="
                  relative

                  group

                  flex items-center

                  gap-3

                  px-5 py-3

                  rounded-full

                  bg-white/[0.03]

                  border border-white/[0.06]

                  backdrop-blur-xl

                  hover:border-yellow-400/30

                  transition-all duration-500
                "
              >

                {/* GOLD GLOW */}

                <div className="
                  absolute inset-0

                  rounded-full

                  bg-yellow-400/0

                  group-hover:bg-yellow-400/[0.06]

                  transition-all duration-500
                " />

                {/* ICON */}

                <div className="
                  relative z-10

                  w-2 h-2

                  rounded-full

                  bg-yellow-400

                  shadow-[0_0_12px_rgba(255,215,0,0.8)]
                " />

                {/* TEXT */}

                <span className="
                  relative z-10

                  text-sm md:text-base

                  font-semibold

                  tracking-[2px]

                  uppercase

                  text-gray-200

                  group-hover:text-yellow-300

                  transition-all duration-300
                ">

                  {item[lang]}

                </span>

              </motion.button>

            )
          )}

        </motion.div>

      </div>

    </section>
  );
};

export default TextSlider;