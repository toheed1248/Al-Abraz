import { useMode } from "../context/ModeContext";
import { useLang } from "../context/LanguageContext";

import {
  FaWhatsapp,
  FaFacebookF,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaArrowUp,
} from "react-icons/fa";

import { motion } from "framer-motion";

const Footer = () => {

  const { mode } =
    useMode();

  const { lang } =
    useLang();

  /* ================= CONTACT ================= */

  const numbers = {

    masna:
      "96599575150",

    contractor:
      "96555807419",

  };

  const WHATSAPP =
    numbers[mode];

  const EMAIL =
    "luxuryinterior@gmail.com";

  /* ================= CONTENT ================= */

  const content = {

    /* ================= MASNA ================= */

    masna: {

      brand: {

        en: "Al Abraz Masna",
        ar: "الأبراز مصنع",

      },

      desc: {

        en: "Luxury POP craftsmanship with premium gypsum ceiling concepts, elegant wall mouldings and handcrafted detailing.",

        ar: "تنفيذ جبس فاخر مع أسقف راقية وزخارف جدارية وتشطيبات داخلية احترافية.",

      },

      services: [

        {
          en: "Luxury POP Ceiling",
          ar: "أسقف جبسية فاخرة",
        },

        {
          en: "Wall Moulding",
          ar: "زخارف الجدران",
        },

        {
          en: "Decorative Panels",
          ar: "ألواح زخرفية",
        },

        {
          en: "Custom Gypsum Work",
          ar: "أعمال جبسية مخصصة",
        },

      ],

      images: [

        "/images/About masna 1.jpeg",
        "/images/About masna 2.jpeg",
        "/images/About masna 3.jpeg",
        "/images/About masna 4.jpeg",

      ],

    },

    /* ================= CONTRACTOR ================= */

    contractor: {

      brand: {

        en: "Al Abraz Contractor",
        ar: "الأبراز للمقاولات",

      },

      desc: {

        en: "Professional interior contractor delivering luxury finishing, lighting systems and modern execution for villas and interiors.",

        ar: "مقاولات داخلية احترافية مع تشطيبات فاخرة وأنظمة إضاءة حديثة وتنفيذ راقٍ.",

      },

      services: [

        {
          en: "Interior Execution",
          ar: "تنفيذ داخلي",
        },

        {
          en: "Modern Lighting",
          ar: "إضاءة حديثة",
        },

        {
          en: "Luxury Finishing",
          ar: "تشطيبات فاخرة",
        },

        {
          en: "Villa Interior",
          ar: "ديكور الفلل",
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

  const t = {

    services: {
      en: "Services",
      ar: "الخدمات",
    },

    gallery: {
      en: "Our Projects",
      ar: "مشاريعنا",
    },

    contact: {
      en: "Contact",
      ar: "التواصل",
    },

    newsletter: {
      en: "Newsletter",
      ar: "النشرة البريدية",
    },

    subscribe: {
      en: "Subscribe",
      ar: "اشتراك",
    },

    placeholder: {
      en: "Enter your email",
      ar: "أدخل بريدك الإلكتروني",
    },

    consultation: {
      en: "Free Consultation",
      ar: "استشارة مجانية",
    },

  };

  const data =
    content[mode];

  /* ================= SCROLL ================= */

  const scrollTop = () => {

    window.scrollTo({

      top: 0,
      behavior: "smooth",

    });
  };

  return (

    <footer className="
      relative

      bg-black

      text-white

      overflow-hidden

      pt-24

      border-t border-yellow-500/10
    ">

      {/* ================= BG GLOW ================= */}

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

      {/* ================= MAIN ================= */}

      <div className="
        relative z-10

        max-w-7xl

        mx-auto

        px-5 md:px-10
      ">

        {/* ================= TOP ================= */}

        <div className="
          grid

          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4

          gap-12

          pb-16
        ">

          {/* ================= BRAND ================= */}

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

            <h2 className="
              text-3xl

              font-black

              text-yellow-400

              mb-5
            ">

              {data.brand[lang]}

            </h2>

            <p className="
              text-gray-400

              leading-relaxed

              text-sm

              mb-7
            ">

              {data.desc[lang]}

            </p>

            <a

              href={`https://wa.me/${WHATSAPP}`}

              target="_blank"

              rel="noopener noreferrer"

              className="
                inline-flex

                items-center

                gap-3

                bg-yellow-500
                hover:bg-yellow-400

                text-black

                px-6 py-3

                rounded-full

                font-semibold

                transition-all duration-300

                shadow-[0_10px_40px_rgba(255,215,0,0.15)]
              "
            >

              <FaWhatsapp />

              {t.consultation[lang]}

            </a>

          </motion.div>

          {/* ================= SERVICES ================= */}

          <motion.div

            initial={{
              opacity: 0,
              y: 30,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: 0.1,
            }}

            viewport={{
              once: true,
            }}
          >

            <h3 className="
              text-xl

              font-bold

              text-yellow-400

              mb-6
            ">

              {t.services[lang]}

            </h3>

            <ul className="
              space-y-4
            ">

              {data.services.map(
                (s, i) => (

                  <li

                    key={i}

                    className="
                      text-gray-400

                      hover:text-yellow-400

                      transition-all duration-300

                      cursor-pointer
                    "
                  >

                    ✦ {s[lang]}

                  </li>

                )
              )}

            </ul>

          </motion.div>

          {/* ================= GALLERY ================= */}

          <motion.div

            initial={{
              opacity: 0,
              y: 30,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: 0.2,
            }}

            viewport={{
              once: true,
            }}
          >

            <h3 className="
              text-xl

              font-bold

              text-yellow-400

              mb-6
            ">

              {t.gallery[lang]}

            </h3>

            <div className="
              grid grid-cols-2

              gap-3
            ">

              {data.images.map(
                (img, i) => (

                  <div

                    key={i}

                    className="
                      overflow-hidden

                      rounded-2xl

                      border border-yellow-500/10
                    "
                  >

                    <img

                      src={img}

                      alt="project"

                      loading="lazy"

                      className="
                        w-full
                        h-[90px]

                        object-cover

                        hover:scale-110

                        transition duration-700
                      "
                    />

                  </div>

                )
              )}

            </div>

          </motion.div>

          {/* ================= CONTACT ================= */}

          <motion.div

            initial={{
              opacity: 0,
              y: 30,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: 0.3,
            }}

            viewport={{
              once: true,
            }}
          >

            <h3 className="
              text-xl

              font-bold

              text-yellow-400

              mb-6
            ">

              {t.contact[lang]}

            </h3>

            <div className="
              space-y-5
            ">

              <div className="
                flex items-center

                gap-4
              ">

                <div className="
                  w-12 h-12

                  rounded-2xl

                  bg-yellow-500/10

                  flex items-center
                  justify-center

                  text-yellow-400
                ">

                  <FaMapMarkerAlt />

                </div>

                <span className="
                  text-gray-400
                ">

                  Kuwait

                </span>

              </div>

              <div className="
                flex items-center

                gap-4
              ">

                <div className="
                  w-12 h-12

                  rounded-2xl

                  bg-yellow-500/10

                  flex items-center
                  justify-center

                  text-yellow-400
                ">

                  <FaPhoneAlt />

                </div>

                <span className="
                  text-gray-400
                ">

                  +{WHATSAPP}

                </span>

              </div>

              <div className="
                flex items-center

                gap-4
              ">

                <div className="
                  w-12 h-12

                  rounded-2xl

                  bg-yellow-500/10

                  flex items-center
                  justify-center

                  text-yellow-400
                ">

                  <FaEnvelope />

                </div>

                <span className="
                  text-gray-400
                ">

                  {EMAIL}

                </span>

              </div>

            </div>

            {/* SOCIAL */}

            <div className="
              flex items-center

              gap-4

              mt-8
            ">

              <a

                href={`https://wa.me/${WHATSAPP}`}

                target="_blank"

                rel="noopener noreferrer"

                className="
                  w-12 h-12

                  rounded-2xl

                  bg-[#111]

                  border border-yellow-500/10

                  flex items-center
                  justify-center

                  hover:bg-yellow-500
                  hover:text-black

                  transition-all duration-300
                "
              >

                <FaWhatsapp />

              </a>

              <a

                href="#"

                className="
                  w-12 h-12

                  rounded-2xl

                  bg-[#111]

                  border border-yellow-500/10

                  flex items-center
                  justify-center

                  hover:bg-yellow-500
                  hover:text-black

                  transition-all duration-300
                "
              >

                <FaFacebookF />

              </a>

              <a

                href={`mailto:${EMAIL}`}

                className="
                  w-12 h-12

                  rounded-2xl

                  bg-[#111]

                  border border-yellow-500/10

                  flex items-center
                  justify-center

                  hover:bg-yellow-500
                  hover:text-black

                  transition-all duration-300
                "
              >

                <FaEnvelope />

              </a>

            </div>

          </motion.div>

        </div>

        {/* ================= BOTTOM ================= */}

        <div className="
          border-t border-yellow-500/10

          py-8

          flex flex-col
          md:flex-row

          items-center
          justify-between

          gap-5
        ">

          <p className="
            text-gray-500

            text-sm

            text-center
          ">

            © {new Date().getFullYear()} {" "}
            {data.brand[lang]} — All Rights Reserved

          </p>

          {/* TOP BUTTON */}

          <button

            onClick={scrollTop}

            className="
              w-14 h-14

              rounded-full

              bg-yellow-500

              text-black

              flex items-center
              justify-center

              hover:scale-110

              transition-all duration-300

              shadow-[0_10px_30px_rgba(255,215,0,0.15)]
            "
          >

            <FaArrowUp />

          </button>

        </div>

      </div>

    </footer>
  );
};

export default Footer;