import { useMode } from "../context/ModeContext";
import { useLang } from "../context/LanguageContext";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import {
  useRef,
  useEffect,
  useState,
} from "react";

const Services = () => {

  const { mode } =
    useMode();

  const { lang } =
    useLang();

  const sliderRef =
    useRef(null);

  const [selected, setSelected] =
    useState(null);

  /* ================= AUTO INTRO ================= */

  useEffect(() => {

    const slider =
      sliderRef.current;

    if (!slider) return;

    setTimeout(() => {

      slider.scrollBy({
        left:
          slider.offsetWidth *
          0.5,

        behavior:
          "smooth",
      });

    }, 500);

    setTimeout(() => {

      slider.scrollTo({
        left: 0,

        behavior:
          "smooth",
      });

    }, 2000);

  }, []);

  /* ================= SLIDE ================= */

  const scrollLeft = () => {

    sliderRef.current.scrollBy({

      left:
        -sliderRef.current
          .offsetWidth * 0.8,

      behavior: "smooth",

    });
  };

  const scrollRight = () => {

    sliderRef.current.scrollBy({

      left:
        sliderRef.current
          .offsetWidth * 0.8,

      behavior: "smooth",

    });
  };

  /* ================= CONTENT ================= */

  const content = {

    masna: {

      title: {

        en: "Our Masna Services",

        ar: "خدمات المصنع",

      },

      tagline: {

        en: "Luxury POP craftsmanship designed for elegant interiors.",

        ar: "تصاميم جبسية فاخرة للمساحات الراقية",

      },

      services: [

        {
          title: {
            en: "POP Ceiling",
            ar: "أسقف جبسية",
          },

          desc: {
            en: "Luxury ceiling finishing with elegant detailing.",

            ar: "تشطيبات سقف فاخرة بتفاصيل راقية.",
          },

          img:
            "/images/Services masna1.jpg",
        },

        {
          title: {
            en: "POP Sheet Ceiling",
            ar: "ألواح جبسية",
          },

          desc: {
            en: "Modern gypsum sheet ceilings for premium spaces.",

            ar: "ألواح جبسية حديثة للمساحات الفاخرة.",
          },

          img:
            "/images/Services masna2.jpg",
        },

        {
          title: {
            en: "POP Sheet Carving",
            ar: "نقش الجبس",
          },

          desc: {
            en: "Custom artistic carving with handcrafted precision.",

            ar: "نقوش فنية بتفاصيل دقيقة.",
          },

          img:
            "/images/Services masna3.jpg",
        },

        {
          title: {
            en: "Wall Moulding",
            ar: "زخارف الجدران",
          },

          desc: {
            en: "Elegant wall finishing inspired by luxury interiors.",

            ar: "تشطيبات جدارية مستوحاة من الفخامة.",
          },

          img:
            "/images/Services masna 4.jpg",
        },

        {
          title: {
            en: "Decor Panels",
            ar: "ألواح زخرفية",
          },

          desc: {
            en: "Decorative panels crafted for sophisticated interiors.",

            ar: "ألواح زخرفية للمساحات الراقية.",
          },

          img:
            "/images/Services masna5.jpg",
        },

        {
          title: {
            en: "Cornice Work",
            ar: "كورنيش",
          },

          desc: {
            en: "Luxury ceiling borders with classical aesthetics.",

            ar: "كورنيش فاخر بتصميم كلاسيكي.",
          },

          img:
            "/images/Services masna6.jpg",
        },

      ],

    },

    contractor: {

      title: {

        en: "Our Contractor Services",

        ar: "خدمات المقاولات",

      },

      tagline: {

        en: "Premium execution for luxury interior living.",

        ar: "تنفيذ فاخر للمساحات الداخلية",

      },

      services: [

        {
          title: {
            en: "Lighting Design",
            ar: "تصميم الإضاءة",
          },

          desc: {
            en: "Modern lighting systems crafted for elegant ambiance.",

            ar: "أنظمة إضاءة حديثة بأجواء راقية.",
          },

          img:
            "/images/Contractor service 1.jpg",
        },

        {
          title: {
            en: "Pillar Work",
            ar: "الأعمدة",
          },

          desc: {
            en: "Architectural pillar concepts with premium execution.",

            ar: "تصاميم أعمدة مع تنفيذ فاخر.",
          },

          img:
            "/images/Contractor service 2.jpg",
        },

        {
          title: {
            en: "Wall Panels",
            ar: "الجدران",
          },

          desc: {
            en: "Luxury wall concepts designed for modern interiors.",

            ar: "تصاميم جدارية حديثة وفاخرة.",
          },

          img:
            "/images/Contractor service 3.jpg",
        },

        {
          title: {
            en: "False Ceiling",
            ar: "أسقف مستعارة",
          },

          desc: {
            en: "Modern false ceiling systems with elegant finishing.",

            ar: "أسقف حديثة بتشطيبات راقية.",
          },

          img:
            "/images/Contractor service 4.jpg",
        },

        {
          title: {
            en: "Villa Interior",
            ar: "تصميم فلل",
          },

          desc: {
            en: "Luxury villa interior execution with premium detailing.",

            ar: "تنفيذ فلل فاخرة بتفاصيل راقية.",
          },

          img:
            "/images/Contractor service 5.jpg",
        },

        {
          title: {
            en: "Turnkey Projects",
            ar: "تنفيذ كامل",
          },

          desc: {
            en: "Complete turnkey solutions for luxury projects.",

            ar: "حلول تنفيذ متكاملة للمشاريع الفاخرة.",
          },

          img:
            "/images/Contractor service 6.jpg",
        },

      ],

    },

  };

  const data = content[mode];

  const numbers = {

    masna:
      "+96599575150",

    contractor:
      "+96555807419",

  };

  const whatsappLink =
    `https://wa.me/${numbers[
      mode
    ].replace("+", "")}`;

  return (
    <section className="
      relative

      bg-black

      text-white

      py-24 md:py-32

      overflow-hidden
    ">

      {/* BG GLOW */}

      <div className="
        absolute top-1/2 left-1/2
        -translate-x-1/2
        -translate-y-1/2

        w-[700px]
        h-[700px]

        bg-yellow-500/5

        blur-[150px]

        rounded-full
      " />

      {/* ================= HEADER ================= */}

      <div className="
        relative z-10

        text-center

        px-5

        mb-20
      ">

        <h1 className="
          text-4xl md:text-6xl

          font-black

          text-yellow-400

          mb-5
        ">

          {data.title[lang]}

        </h1>

        <p className="
          text-gray-400

          max-w-2xl

          mx-auto
        ">

          {data.tagline[lang]}

        </p>

      </div>

      {/* ================= SLIDER ================= */}

      <div className="
        relative z-10
      ">

        {/* BUTTON LEFT */}

        <button
          onClick={scrollLeft}

          className="
            hidden md:flex

            absolute left-6 top-1/2
            -translate-y-1/2

            z-20

            w-14 h-14

            rounded-full

            bg-black/60

            border border-yellow-500/10

            backdrop-blur-xl

            items-center
            justify-center

            hover:scale-110

            transition-all duration-300
          "
        >

          <FaChevronLeft />

        </button>

        {/* BUTTON RIGHT */}

        <button
          onClick={scrollRight}

          className="
            hidden md:flex

            absolute right-6 top-1/2
            -translate-y-1/2

            z-20

            w-14 h-14

            rounded-full

            bg-black/60

            border border-yellow-500/10

            backdrop-blur-xl

            items-center
            justify-center

            hover:scale-110

            transition-all duration-300
          "
        >

          <FaChevronRight />

        </button>

        {/* CARDS */}

        <div
          ref={sliderRef}

          className="
            flex

            gap-6

            overflow-x-auto

            no-scrollbar

            snap-x snap-mandatory

            scroll-smooth

            px-5 md:px-20

            pb-8
          "
        >

          {data.services.map(
            (item, i) => (

              <motion.div

                whileHover={{
                  y: -6,
                }}

                key={i}

                onClick={() =>
                  setSelected(item)
                }

                className="
                  relative

                  snap-center

                  min-w-[88%]
                  sm:min-w-[65%]
                  lg:min-w-[38%]

                  h-[520px]

                  rounded-[36px]

                  overflow-hidden

                  cursor-pointer

                  group

                  border border-yellow-500/10

                  shadow-[0_0_50px_rgba(255,215,0,0.06)]
                "
              >

                {/* IMAGE */}

                <img
                  src={item.img}

                  className="
                    absolute inset-0

                    w-full h-full

                    object-cover

                    group-hover:scale-110

                    transition duration-1000
                  "
                />

                {/* OVERLAY */}

                <div className="
                  absolute inset-0

                  bg-gradient-to-t
                  from-black
                  via-black/30
                  to-transparent
                " />

                {/* CONTENT */}

                <div className="
                  absolute bottom-0 left-0

                  w-full

                  p-8
                ">

                  <div className="
                    inline-flex

                    px-4 py-2

                    rounded-full

                    bg-white/10

                    backdrop-blur-xl

                    border border-white/10

                    text-xs

                    tracking-[2px]

                    uppercase

                    text-yellow-300

                    mb-5
                  ">

                    Premium Service

                  </div>

                  <h2 className="
                    text-3xl

                    font-bold

                    mb-4
                  ">

                    {item.title[lang]}

                  </h2>

                  <p className="
                    text-gray-300

                    leading-relaxed
                  ">

                    {item.desc[lang]}

                  </p>

                </div>

              </motion.div>

            )
          )}

        </div>

      </div>

      {/* ================= MODAL ================= */}

      <AnimatePresence>

        {selected && (

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
              setSelected(null)
            }

            className="
              fixed inset-0

              bg-black/90

              backdrop-blur-xl

              z-50

              flex items-center
              justify-center

              p-5
            "
          >

            <motion.div

              initial={{
                scale: 0.9,
                opacity: 0,
              }}

              animate={{
                scale: 1,
                opacity: 1,
              }}

              exit={{
                scale: 0.9,
                opacity: 0,
              }}

              className="
                max-w-5xl

                w-full

                overflow-hidden

                rounded-[32px]

                bg-[#0a0a0a]

                border border-yellow-500/10
              "
            >

              <img
                src={selected.img}

                className="
                  w-full

                  max-h-[75vh]

                  object-cover
                "
              />

              <div className="
                p-8
              ">

                <h2 className="
                  text-3xl

                  font-bold

                  text-yellow-400

                  mb-4
                ">

                  {selected.title[lang]}

                </h2>

                <p className="
                  text-gray-300
                ">

                  {selected.desc[lang]}

                </p>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

      {/* ================= CTA ================= */}

      <div className="
        relative z-10

        mt-24

        text-center

        px-5
      ">

        <p className="
          text-gray-300

          mb-6
        ">

          {lang === "ar"

            ? "هل لديك فكرة؟ دعنا نحولها إلى واقع"

            : "Have a vision? Let’s turn it into reality."}

        </p>

        <motion.a

          whileHover={{
            scale: 1.04,
          }}

          whileTap={{
            scale: 0.97,
          }}

          href={whatsappLink}

          className="
            inline-flex

            items-center
            justify-center

            bg-green-500
            hover:bg-green-600

            px-10 py-4

            rounded-full

            font-semibold

            shadow-[0_0_40px_rgba(34,197,94,0.2)]

            transition-all duration-300
          "
        >

          {lang === "ar"

            ? "استشارة الآن"

            : "Consult Now"}

        </motion.a>

      </div>

    </section>
  );
};

export default Services;