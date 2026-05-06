import { useMode } from "../context/ModeContext";
import { useLang } from "../context/LanguageContext";

import {
  useEffect,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

/* ================= MASNA ================= */

const masnaSlides = [
  {
    img: "/images/masna1.jpeg",
    title: {
      en: "Luxury Gypsum Arch Design",
      ar: "تصميم قوس جبس فاخر",
    },
    desc: {
      en: "Elegant handcrafted arch with detailed patterns that elevate classic interiors.",
      ar: "قوس جبسي فاخر بتفاصيل دقيقة يضفي لمسة كلاسيكية راقية.",
    },
  },

  {
    img: "/images/masna 2.jpeg",
    title: {
      en: "Royal Wall Moulding",
      ar: "ديكورات جدارية ملكية",
    },
    desc: {
      en: "Premium decorative mouldings inspired by royal designs.",
      ar: "ديكورات جدارية مستوحاة من التصاميم الملكية.",
    },
  },

  {
    img: "/images/masna 3.jpeg",
    title: {
      en: "Classic Floral Gypsum Panel",
      ar: "لوحات جبسية بنقوش كلاسيكية",
    },
    desc: {
      en: "Handcrafted floral patterns designed with precision.",
      ar: "نقوش زهرية مصممة يدوياً بدقة.",
    },
  },

  {
    img: "/images/masna 4.jpeg",
    title: {
      en: "Modern Decorative Border Design",
      ar: "تصميم حدود زخرفية حديثة",
    },
    desc: {
      en: "Stylish gypsum borders combining modern elegance.",
      ar: "حدود جبسية تجمع بين الطابع الحديث والكلاسيكي.",
    },
  },

  {
    img: "/images/masna 5.jpeg",
    title: {
      en: "Premium Ceiling Moulding",
      ar: "كورنيش سقف فاخر",
    },
    desc: {
      en: "Detailed ceiling mouldings for luxury interiors.",
      ar: "كورنيش سقف بتفاصيل دقيقة يعزز جمال التصميم.",
    },
  },

  {
    img: "/images/masna 6.jpeg",
    title: {
      en: "Grand Decorative Dome Design",
      ar: "تصميم قبة زخرفية فاخرة",
    },
    desc: {
      en: "Luxurious dome design with intricate detailing.",
      ar: "تصميم قبة فاخرة بتفاصيل دقيقة.",
    },
  },
];

/* ================= CONTRACTOR ================= */

const contractorSlides = [
  {
    img: "/images/Contractor slider 1.jpg",
    title: {
      en: "Modern Ceiling Lighting Design",
      ar: "تصميم إضاءة سقف حديث",
    },
    desc: {
      en: "Elegant curved ceiling with luxurious LED lighting.",
      ar: "سقف منحني أنيق مع إضاءة LED فاخرة.",
    },
  },

  {
    img: "/images/Contractor slider 2.jpg",
    title: {
      en: "Luxury Majlis Interior",
      ar: "تصميم مجلس فاخر",
    },
    desc: {
      en: "Classic Arabic majlis with premium atmosphere.",
      ar: "مجلس عربي كلاسيكي بلمسات فاخرة.",
    },
  },

  {
    img: "/images/Contractor slider 3.jpg",
    title: {
      en: "Decorative Feature Wall",
      ar: "جدار زخرفي مميز",
    },
    desc: {
      en: "Custom wall design with textured elegance.",
      ar: "تصميم جدار مخصص مع إضاءة ولوحات زخرفية.",
    },
  },

  {
    img: "/images/Contractor slider 4.jpg",
    title: {
      en: "Classic Ceiling Craftsmanship",
      ar: "تصميم سقف كلاسيكي",
    },
    desc: {
      en: "Detailed gypsum ceiling inspired by classical interiors.",
      ar: "سقف جبسي بتفاصيل دقيقة مستوحى من التصاميم الكلاسيكية.",
    },
  },

  {
    img: "/images/Contractor slider 5.jpg",
    title: {
      en: "Minimal Luxury Interior",
      ar: "تصميم داخلي فاخر بسيط",
    },
    desc: {
      en: "Modern luxury with elegant TV wall panels.",
      ar: "مساحة حديثة نظيفة مع جدار تلفاز أنيق.",
    },
  },

  {
    img: "/images/Contractor slider 6.jpg",
    title: {
      en: "Architectural Pillar Design",
      ar: "تصميم أعمدة معمارية",
    },
    desc: {
      en: "Classic columns adding luxury to interiors.",
      ar: "أعمدة كلاسيكية تضيف عمقاً وفخامة.",
    },
  },
];

const Slider = () => {

  const { mode } = useMode();

  const { lang } = useLang();

  const [index, setIndex] =
    useState(0);

  const slides =
    mode === "masna"
      ? masnaSlides
      : contractorSlides;

  const contactNumbers = {
    masna: "+96599575150",
    contractor: "+96555807419",
  };

  const phoneNumber =
    contactNumbers[mode];

  const whatsappLink =
    `https://wa.me/${phoneNumber.replace("+", "")}`;

  /* ================= AUTO SLIDE ================= */

  useEffect(() => {

    const interval =
      setInterval(() => {

        setIndex((prev) =>
          (prev + 1) %
          slides.length
        );

      }, 6000);

    return () =>
      clearInterval(interval);

  }, [slides.length]);

  return (
    <div className="
      relative

      min-h-screen

      overflow-hidden

      bg-black
    ">

      {/* ================= BACKGROUND ================= */}

      <AnimatePresence mode="wait">

        <motion.img
          key={slides[index].img}

          src={slides[index].img}

          initial={{
            scale: 1.1,
            opacity: 0,
          }}

          animate={{
            scale: 1,
            opacity: 1,
          }}

          exit={{
            opacity: 0,
          }}

          transition={{
            duration: 1.5,
          }}

          className="
            absolute inset-0

            w-full h-full

            object-cover

            brightness-[0.28]
          "
        />

      </AnimatePresence>

      {/* ================= OVERLAYS ================= */}

      <div className="
        absolute inset-0

        bg-gradient-to-r
        from-black via-black/70 to-black/30
      " />

      <div className="
        absolute inset-0

        bg-[radial-gradient(circle_at_top_right,rgba(255,215,0,0.12),transparent_35%)]
      " />

      {/* ================= CONTENT ================= */}

      <div
        className={`
          relative z-20

          min-h-screen

          flex flex-col
          lg:flex-row

          items-center
          justify-center

          px-5 sm:px-8 md:px-16 lg:px-24

          pt-28 lg:pt-0

          gap-8 lg:gap-16

          ${
            lang === "ar"
              ? "lg:flex-row-reverse"
              : ""
          }
        `}
      >

        {/* ================= TEXT ================= */}

        <div className="
          flex-1

          max-w-2xl

          text-center
          lg:text-left
        ">

          {/* PREMIUM TAG */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            className="
              inline-flex

              items-center

              gap-2

              bg-white/5

              border border-white/10

              px-5 py-2

              rounded-full

              backdrop-blur-xl

              mb-6
            "
          >

            <div className="
              w-2 h-2

              rounded-full

              bg-yellow-400
            " />

            <span className="
              text-sm text-gray-300
            ">
              Premium Interior Solutions
            </span>

          </motion.div>

          {/* TITLE */}

          <AnimatePresence mode="wait">

            <motion.h1
              key={
                slides[index]
                  .title[lang]
              }

              initial={{
                opacity: 0,
                y: 60,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              exit={{
                opacity: 0,
                y: -40,
              }}

              transition={{
                duration: 0.8,
              }}

              className="
                text-4xl
                sm:text-5xl
                md:text-6xl
                lg:text-7xl

                font-black

                leading-tight

                text-white
              "
            >

              <span className="
                text-yellow-400
              ">
                {slides[index]
                  .title[lang]}
              </span>

            </motion.h1>

          </AnimatePresence>

          {/* DESC */}

          <AnimatePresence mode="wait">

            <motion.p
              key={
                slides[index]
                  .desc[lang]
              }

              initial={{
                opacity: 0,
                y: 30,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              exit={{
                opacity: 0,
              }}

              transition={{
                delay: 0.1,
                duration: 0.7,
              }}

              className="
                mt-7

                text-base
                md:text-lg

                text-gray-300

                leading-relaxed

                max-w-xl

                mx-auto lg:mx-0
              "
            >
              {slides[index]
                .desc[lang]}
            </motion.p>

          </AnimatePresence>

          {/* BUTTONS */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: 0.2,
            }}

            className="
              flex flex-col
              sm:flex-row

              items-center

              gap-4

              mt-10
            "
          >

            {/* PRIMARY */}

            <motion.a
              href={whatsappLink}

              target="_blank"

              whileHover={{
                scale: 1.03,
              }}

              whileTap={{
                scale: 0.98,
              }}

              className="
                relative overflow-hidden

                bg-yellow-500
                hover:bg-yellow-400

                text-black

                px-8 py-4

                rounded-full

                font-bold

                shadow-[0_0_40px_rgba(255,215,0,0.2)]

                transition-all duration-300
              "
            >

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
              ">
                {lang === "ar"
                  ? "تواصل الآن"
                  : "Get Free Consultation"}
              </span>

            </motion.a>

            {/* SECONDARY */}

            <motion.a
              href="#gallery"

              whileHover={{
                scale: 1.03,
              }}

              className="
                border border-white/10

                bg-white/5

                backdrop-blur-xl

                px-8 py-4

                rounded-full

                text-white

                hover:border-yellow-400/40

                transition-all duration-300
              "
            >
              {lang === "ar"
                ? "استكشف الأعمال"
                : "Explore Projects"}
            </motion.a>

          </motion.div>

        </div>

        {/* ================= IMAGE ================= */}

        <div className="
          flex-1

          relative

          flex items-center
          justify-center

          w-full
        ">

          {/* GLOW */}

          <div className="
            absolute

            w-[300px]
            md:w-[450px]

            h-[300px]
            md:h-[450px]

            bg-yellow-500/10

            rounded-full

            blur-[120px]
          " />

          <AnimatePresence mode="wait">

            <motion.img
              key={
                slides[index].img +
                "fg"
              }

              src={
                slides[index].img
              }

              initial={{
                opacity: 0,
                y: 40,
                scale: 0.95,
              }}

              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}

              exit={{
                opacity: 0,
              }}

              transition={{
                duration: 1,
              }}

              className="
                relative z-10

                w-full

                max-w-[320px]
                sm:max-w-[420px]
                md:max-w-[520px]
                lg:max-w-[650px]

                max-h-[45vh]
                sm:max-h-[50vh]
                md:max-h-[60vh]
                lg:max-h-[75vh]

                object-contain

                drop-shadow-[0_30px_80px_rgba(0,0,0,0.8)]
              "
            />

          </AnimatePresence>

        </div>

      </div>

      {/* ================= PROGRESS ================= */}

      <div className="
        absolute bottom-0 left-0

        w-full h-[3px]

        bg-white/10
      ">

        <motion.div
          key={index}

          initial={{
            width: 0,
          }}

          animate={{
            width: "100%",
          }}

          transition={{
            duration: 6,
            ease: "linear",
          }}

          className="
            h-full

            bg-yellow-400
          "
        />

      </div>

      {/* ================= DOTS ================= */}

      <div className="
        absolute bottom-7

        left-1/2
        -translate-x-1/2

        flex gap-3

        z-30
      ">

        {slides.map((_, i) => (

          <button
            key={i}

            onClick={() =>
              setIndex(i)
            }

            className={`
              transition-all duration-500

              rounded-full

              ${
                i === index
                  ? "w-10 h-3 bg-yellow-400"
                  : "w-3 h-3 bg-white/30"
              }
            `}
          />

        ))}

      </div>

    </div>
  );
};

export default Slider;