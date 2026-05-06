import { useMode } from "../context/ModeContext";
import { useLang } from "../context/LanguageContext";

import {
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

import {
  useEffect,
  useState,
} from "react";

import {
  FaWhatsapp,
  FaShieldAlt,
  FaCrown,
  FaTools,
  FaGem,
  FaCheckCircle,
} from "react-icons/fa";

/* ================= COUNTER ================= */

const Counter = ({
  target,
}) => {

  const [count, setCount] =
    useState(0);

  useEffect(() => {

    let current = 0;

    const step =
      target / 50;

    const interval =
      setInterval(() => {

        current += step;

        if (
          current >= target
        ) {

          current = target;

          clearInterval(
            interval
          );
        }

        setCount(
          Math.floor(current)
        );

      }, 30);

    return () =>
      clearInterval(interval);

  }, [target]);

  return <span>{count}+</span>;
};

/* ========================================================= */

const About = () => {

  const { mode } =
    useMode();

  const { lang } =
    useLang();

  const x =
    useMotionValue(0);

  const y =
    useMotionValue(0);

  const rotateX =
    useTransform(
      y,
      [-100, 100],
      [5, -5]
    );

  const rotateY =
    useTransform(
      x,
      [-100, 100],
      [-5, 5]
    );

  const handleMove = (
    e
  ) => {

    const rect =
      e.currentTarget.getBoundingClientRect();

    x.set(
      e.clientX -
        rect.left -
        rect.width / 2
    );

    y.set(
      e.clientY -
        rect.top -
        rect.height / 2
    );
  };

  /* ================= CONTENT ================= */

  const content = {

    masna: {

      title: {
        en: "About Our Masna",
        ar: "عن مصنعنا",
      },

      desc: {

        en: "We specialize in luxury POP ceiling solutions, decorative mouldings, wall panels, and handcrafted gypsum artistry designed for premium interiors.",

        ar: "نحن متخصصون في حلول الأسقف الجبسية الفاخرة والتصاميم الداخلية الراقية بأعلى جودة.",
      },

      tagline: {

        en: "Crafting Luxury Interiors with Precision & Passion",

        ar: "نصنع الفخامة بدقة وشغف",
      },

      works: [

        {
          en: "Wall Design Panels",
          ar: "ألواح تصميم الجدران",
        },

        {
          en: "Ceiling Art Structures",
          ar: "هياكل فنية للأسقف",
        },

        {
          en: "POP Luxury Frames",
          ar: "إطارات جبسية فاخرة",
        },

      ],

      images: [

        "/images/About masna 1.jpeg",

        "/images/About masna 2.jpeg",

        "/images/About masna 3.jpeg",

        "/images/About masna 4.jpeg",

      ],

    },

    contractor: {

      title: {
        en: "About Our Contractor",
        ar: "عن المقاولات",
      },

      desc: {

        en: "We execute complete luxury interior projects including ceilings, lighting, wall concepts, and finishing with professional contract-based execution.",

        ar: "ننفذ مشاريع داخلية فاخرة متكاملة مع تنفيذ احترافي قائم على العقود.",
      },

      tagline: {

        en: "Luxury Interior Contracting with Trusted Execution",

        ar: "تنفيذ فاخر بثقة وجودة عالية",
      },

      works: [

        {
          en: "POP Ceiling Work",
          ar: "أعمال الأسقف الجبسية",
        },

        {
          en: "Lighting Installation",
          ar: "تركيب الإضاءة",
        },

        {
          en: "Luxury Finishing",
          ar: "تشطيبات فاخرة",
        },

      ],

      images: [

        "/images/contractor about 1.jpg",

        "/images/contractor about 2.jpg",

        "/images/contractor about 3.jpg",

        "/images/contractor about 5.jpg",

      ],

    },

  };

  const d = content[mode];

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

      px-5 md:px-20

      overflow-hidden
    ">

      {/* ================= BG GLOW ================= */}

      <div className="
        absolute top-0 left-1/2
        -translate-x-1/2

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

        max-w-4xl

        mx-auto

        mb-20
      ">

        <motion.div

          initial={{
            opacity: 0,
            y: 30,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          viewport={{
            once: true,
          }}
        >

          <div className="
            inline-flex

            items-center

            gap-2

            px-5 py-2

            rounded-full

            bg-white/5

            border border-yellow-500/10

            backdrop-blur-xl

            mb-8
          ">

            <FaShieldAlt className="
              text-yellow-400
            " />

            <span className="
              text-sm text-gray-300
            ">

              {lang === "ar"

                ? "شركة موثوقة للتصميم الداخلي"

                : "Trusted Luxury Interior Company"}

            </span>

          </div>

          <h1 className="
            text-4xl
            md:text-6xl

            font-black

            text-yellow-400

            mb-6
          ">

            AL ABRAZ

          </h1>

          <p className="
            text-xl md:text-2xl

            text-white

            font-medium

            mb-6
          ">

            {d.tagline[lang]}

          </p>

          <p className="
            text-gray-400

            max-w-3xl

            mx-auto

            leading-relaxed

            text-base md:text-lg
          ">

            {d.desc[lang]}

          </p>

        </motion.div>

      </div>

      {/* ================= MAIN GRID ================= */}

      <div className="
        relative z-10

        grid lg:grid-cols-2

        gap-16

        items-center
      ">

        {/* ================= IMAGE GRID ================= */}

        <motion.div

          style={{
            rotateX,
            rotateY,
          }}

          onMouseMove={
            handleMove
          }

          onMouseLeave={() => {

            x.set(0);

            y.set(0);

          }}

          className="
            grid grid-cols-2

            gap-5
          "
        >

          {d.images.map(
            (img, i) => (

              <motion.div

                whileHover={{
                  scale: 1.02,
                }}

                key={i}

                className={`
                  overflow-hidden

                  rounded-3xl

                  border border-yellow-500/10

                  bg-white/5

                  backdrop-blur-xl

                  shadow-[0_0_40px_rgba(255,215,0,0.05)]

                  ${
                    i === 0
                      ? `
                        col-span-2
                        h-[320px]
                      `
                      : `
                        h-[200px]
                      `
                  }
                `}
              >

                <img
                  src={img}

                  className="
                    w-full h-full

                    object-cover

                    hover:scale-110

                    transition duration-700
                  "
                />

              </motion.div>

            )
          )}

        </motion.div>

        {/* ================= CONTENT CARD ================= */}

        <div className="
          relative

          bg-white/[0.04]

          border border-yellow-500/10

          backdrop-blur-2xl

          rounded-[32px]

          p-8 md:p-12

          shadow-[0_0_60px_rgba(255,215,0,0.08)]
        ">

          {/* TITLE */}

          <h2 className="
            text-3xl md:text-4xl

            font-black

            text-yellow-400

            mb-6
          ">

            {d.title[lang]}

          </h2>

          {/* DESC */}

          <p className="
            text-gray-300

            leading-relaxed

            mb-10
          ">

            {d.desc[lang]}

          </p>

          {/* SERVICES */}

          <div className="
            space-y-4

            mb-10
          ">

            {d.works.map(
              (w, i) => (

                <motion.div

                  whileHover={{
                    x: 6,
                  }}

                  key={i}

                  className="
                    flex items-center

                    gap-4

                    p-4

                    rounded-2xl

                    bg-black/30

                    border border-white/5

                    hover:border-yellow-400/20

                    transition-all duration-300
                  "
                >

                  <div className="
                    w-12 h-12

                    rounded-2xl

                    bg-yellow-500/10

                    flex items-center
                    justify-center
                  ">

                    {i === 0 && (
                      <FaTools className="
                        text-yellow-400
                      " />
                    )}

                    {i === 1 && (
                      <FaCrown className="
                        text-yellow-400
                      " />
                    )}

                    {i === 2 && (
                      <FaGem className="
                        text-yellow-400
                      " />
                    )}

                  </div>

                  <span className="
                    text-white
                  ">

                    {w[lang]}

                  </span>

                </motion.div>

              )
            )}

          </div>

          {/* TRUST BADGES */}

          <div className="
            grid sm:grid-cols-2

            gap-4

            mb-10
          ">

            <div className="
              bg-black/30

              border border-white/5

              rounded-2xl

              p-5
            ">

              <div className="
                flex items-center

                gap-3

                mb-3
              ">

                <FaShieldAlt className="
                  text-yellow-400
                " />

                <h3 className="
                  font-semibold
                ">

                  {lang === "ar"

                    ? "تنفيذ موثوق"

                    : "Trusted Contract Work"}

                </h3>

              </div>

              <p className="
                text-sm text-gray-400
              ">

                {lang === "ar"

                  ? "تنفيذ احترافي بعقود واضحة وجودة عالية"

                  : "Professional execution with transparent contract-based workflow."}

              </p>

            </div>

            <div className="
              bg-black/30

              border border-white/5

              rounded-2xl

              p-5
            ">

              <div className="
                flex items-center

                gap-3

                mb-3
              ">

                <FaCheckCircle className="
                  text-yellow-400
                " />

                <h3 className="
                  font-semibold
                ">

                  {lang === "ar"

                    ? "ضمان الجودة"

                    : "Premium Quality"}

                </h3>

              </div>

              <p className="
                text-sm text-gray-400
              ">

                {lang === "ar"

                  ? "خامات وتشطيبات عالية الجودة"

                  : "Luxury finishing with premium materials and detailing."}

              </p>

            </div>

          </div>

          {/* STATS */}

          <div className="
            grid grid-cols-2

            gap-5

            mb-10
          ">

            <div className="
              text-center

              p-6

              rounded-3xl

              bg-black/30

              border border-white/5
            ">

              <h3 className="
                text-3xl

                font-black

                text-yellow-400

                mb-2
              ">

                <Counter
                  target={200}
                />

              </h3>

              <p className="
                text-gray-400
              ">

                {lang === "ar"
                  ? "عملاء سعداء"
                  : "Happy Clients"}

              </p>

            </div>

            <div className="
              text-center

              p-6

              rounded-3xl

              bg-black/30

              border border-white/5
            ">

              <h3 className="
                text-3xl

                font-black

                text-yellow-400

                mb-2
              ">

                <Counter
                  target={300}
                />

              </h3>

              <p className="
                text-gray-400
              ">

                {lang === "ar"
                  ? "مشاريع"
                  : "Projects"}

              </p>

            </div>

          </div>

          {/* CTA */}

          <div className="
            text-center
          ">

            <p className="
              text-gray-300

              mb-6
            ">

              {lang === "ar"

                ? "هل لديك فكرة؟ دعنا نحولها إلى واقع"

                : "Have a vision? Let’s transform it into reality."}

            </p>

            <motion.a

              whileHover={{
                scale: 1.03,
              }}

              whileTap={{
                scale: 0.98,
              }}

              href={whatsappLink}

              target="_blank"

              className="
                inline-flex

                items-center

                gap-3

                bg-green-500
                hover:bg-green-600

                px-8 py-4

                rounded-full

                font-semibold

                shadow-[0_0_40px_rgba(34,197,94,0.25)]

                transition-all duration-300
              "
            >

              <FaWhatsapp />

              {lang === "ar"

                ? "استشارة مع المالك"

                : "Consult with Owner"}

            </motion.a>

            {/* MINI BADGES */}

            <div className="
              flex flex-wrap

              justify-center

              gap-3

              mt-6
            ">

              {[
                "Quick Response",
                "Trusted Work",
                "Contract Based",
                "Premium Finish",
              ].map(
                (item, i) => (

                  <div
                    key={i}

                    className="
                      px-4 py-2

                      rounded-full

                      bg-white/5

                      border border-white/5

                      text-xs

                      text-gray-400
                    "
                  >

                    {item}

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default About;