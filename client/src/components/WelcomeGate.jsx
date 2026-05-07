import { motion } from "framer-motion";

import {
  useLang,
} from "../context/LanguageContext";

import {
  useMode,
} from "../context/ModeContext";

import {
  useNavigate,
} from "react-router-dom";

const WelcomeGate = ({
  onEnter,
}) => {

  const navigate =
    useNavigate();

  const { lang, setLang } =
    useLang();

  const { mode, setMode } =
    useMode();

  /* ================= ENTER ================= */

  const handleEnter = () => {

    const now =
      Date.now();

    localStorage.setItem(
      "welcome_expire",
      now + 24 * 60 * 60 * 1000
    );

    onEnter();
  };

  /* ================= TEXT ================= */

  const content = {

    en: {

      title:
        "AL ABRAZ",

      subtitle:
        "Luxury POP & Interior Execution In Kuwait",

      owner:
        "Direct Consultation With Tarique Solanki",

      exp:
        "10+ Years Offline Experience In Kuwait",

      desc:
        "Professional POP ceiling, gypsum design, wall moulding and luxury interior execution with trusted offline experience.",

      modeTitle:
        "Choose Your Experience",

      masnaTitle:
        "Masna Experience",

      masnaDesc:
        "If you want to explore POP factory work, gypsum designs, moulding concepts and custom farma work, choose Masna.",

      contractorTitle:
        "Contractor Experience",

      contractorDesc:
        "If you want complete execution, ceiling installation, villa interior work and custom design creation through our masna production, choose Contractor.",

      langTitle:
        "Choose Language",

      enter:
        "Enter Experience",

      admin:
        "Admin Dashboard",

      trust1:
        "Trusted Kuwait Work",

      trust2:
        "Contract Based Service",

      trust3:
        "Luxury Interior Finishing",

    },

    ar: {

      title:
        "الابراز",

      subtitle:
        "تنفيذ ديكورات وأسقف فاخرة في الكويت",

      owner:
        "استشارة مباشرة مع طارق سولانكي",

      exp:
        "أكثر من 10 سنوات خبرة في الكويت",

      desc:
        "تنفيذ احترافي للأسقف الجبسية والديكورات الداخلية والتشطيبات الفاخرة بخبرة حقيقية داخل الكويت.",

      modeTitle:
        "اختر التجربة المناسبة",

      masnaTitle:
        "قسم المصنع",

      masnaDesc:
        "إذا كنت تريد مشاهدة أعمال الجبس والتصاميم والقوالب والزخارف الخاصة بالمصنع اختر المصنع.",

      contractorTitle:
        "قسم المقاولات",

      contractorDesc:
        "إذا كنت تريد تنفيذ كامل للمشاريع والديكور الداخلي والأسقف والإضاءة والتصاميم الخاصة اختر المقاولات.",

      langTitle:
        "اختر اللغة",

      enter:
        "دخول التجربة",

      admin:
        "لوحة التحكم",

      trust1:
        "خبرة موثوقة في الكويت",

      trust2:
        "تنفيذ بعقود رسمية",

      trust3:
        "تشطيبات داخلية فاخرة",
    },
  };

  const t =
    content[lang];

  return (
    <div className="
      relative

      min-h-screen

      bg-[#050505]

      overflow-hidden

      flex items-center
      justify-center

      px-4 py-10

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
            opacity: [0.5, 0.8, 0.5],
          }}

          transition={{
            repeat: Infinity,
            duration: 8,
          }}

          className="
            absolute

            -top-20 left-[-100px]

            w-[500px]
            h-[500px]

            rounded-full

            bg-yellow-500/10

            blur-[140px]
          "
        />

        {/* GLOW */}

        <motion.div

          animate={{
            scale: [1, 1.2, 1],
          }}

          transition={{
            repeat: Infinity,
            duration: 10,
          }}

          className="
            absolute

            bottom-[-100px]
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
          duration: 1,
        }}

        className="
          relative z-10

          w-full
          max-w-6xl

          rounded-[40px]

          border border-yellow-500/10

          bg-gradient-to-b
          from-white/[0.08]
          to-white/[0.03]

          backdrop-blur-[30px]

          shadow-[0_0_100px_rgba(255,215,0,0.06)]

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
          p-6 md:p-14
        ">

          {/* ================= TOP ================= */}

          <div className="
            flex flex-col
            lg:flex-row

            items-start
            justify-between

            gap-10
          ">

            {/* LEFT */}

            <div className="
              flex-1
            ">

              {/* LOGO */}

              <motion.h1

                initial={{
                  opacity: 0,
                  y: 30,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  duration: 1,
                }}

                className="
                  text-5xl md:text-7xl

                  font-black

                  tracking-[10px]

                  text-yellow-400

                  drop-shadow-[0_0_30px_rgba(255,215,0,0.3)]
                "
              >

                {t.title}

              </motion.h1>

              {/* SUB */}

              <p className="
                mt-5

                text-gray-300

                text-lg md:text-xl

                leading-relaxed

                max-w-2xl
              ">

                {t.subtitle}

              </p>

              {/* OWNER */}

              <div className="
                mt-8

                flex flex-wrap

                gap-4
              ">

                <div className="
                  px-5 py-3

                  rounded-2xl

                  bg-white/5

                  border border-yellow-500/10
                ">

                  <p className="
                    text-yellow-400

                    text-sm

                    font-semibold
                  ">
                    {t.owner}
                  </p>

                </div>

                <div className="
                  px-5 py-3

                  rounded-2xl

                  bg-white/5

                  border border-yellow-500/10
                ">

                  <p className="
                    text-yellow-400

                    text-sm

                    font-semibold
                  ">
                    {t.exp}
                  </p>

                </div>

              </div>

              {/* DESCRIPTION */}

              <p className="
                mt-8

                text-gray-400

                leading-relaxed

                max-w-3xl
              ">

                {t.desc}

              </p>

              {/* TRUST */}

              <div className="
                mt-10

                grid md:grid-cols-3

                gap-4
              ">

                {[

                  t.trust1,
                  t.trust2,
                  t.trust3,

                ].map((item, i) => (

                  <div
                    key={i}

                    className="
                      bg-white/[0.03]

                      border border-white/5

                      rounded-2xl

                      px-5 py-4

                      text-sm

                      text-gray-300
                    "
                  >

                    ✦ {item}

                  </div>

                ))}

              </div>

            </div>

            {/* RIGHT */}

            <div className="
              w-full
              lg:w-[340px]
            ">

              {/* LANGUAGE */}

              <div className="
                bg-white/[0.03]

                border border-yellow-500/10

                rounded-3xl

                p-5
              ">

                <h2 className="
                  text-lg

                  font-semibold

                  text-yellow-400

                  mb-5
                ">

                  {t.langTitle}

                </h2>

                <div className="
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

                      font-semibold

                      transition-all duration-300

                      ${
                        lang === "en"

                          ? `
                            bg-yellow-500
                            text-black
                          `

                          : `
                            bg-white/5
                            border border-white/10
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
                      py-4

                      rounded-2xl

                      font-semibold

                      transition-all duration-300

                      ${
                        lang === "ar"

                          ? `
                            bg-yellow-500
                            text-black
                          `

                          : `
                            bg-white/5
                            border border-white/10
                          `
                      }
                    `}
                  >

                    العربية

                  </button>

                </div>

              </div>

              {/* ADMIN */}

              <button

                onClick={() =>
                  navigate("/admin")
                }

                className="
                  mt-5

                  w-full

                  py-4

                  rounded-2xl

                  bg-white/5

                  border border-white/10

                  hover:border-yellow-500/30

                  transition-all duration-300
                "
              >

                {t.admin}

              </button>

            </div>

          </div>

          {/* ================= EXPERIENCE ================= */}

          <div className="
            mt-16
          ">

            <h2 className="
              text-3xl

              font-bold

              text-yellow-400

              mb-8
            ">

              {t.modeTitle}

            </h2>

            <div className="
              grid lg:grid-cols-2

              gap-6
            ">

              {/* MASNA */}

              <motion.button

                whileHover={{
                  y: -8,
                }}

                onClick={() =>
                  setMode("masna")
                }

                className={`
                  relative

                  overflow-hidden

                  rounded-[32px]

                  border

                  p-8 md:p-10

                  text-left

                  transition-all duration-500

                  ${
                    mode === "masna"

                      ? `
                        bg-yellow-500
                        text-black

                        border-yellow-300

                        shadow-[0_0_50px_rgba(255,215,0,0.18)]
                      `

                      : `
                        bg-white/[0.04]

                        border-white/10

                        hover:border-yellow-500/30
                      `
                  }
                `}
              >

                <div className="
                  absolute top-0 right-0

                  w-40 h-40

                  bg-white/10

                  rounded-full

                  blur-[70px]
                " />

                <h3 className="
                  text-3xl

                  font-black

                  mb-5
                ">

                  MASNA

                </h3>

                <p className="
                  leading-relaxed

                  text-sm md:text-base

                  opacity-90
                ">

                  {t.masnaDesc}

                </p>

              </motion.button>

              {/* CONTRACTOR */}

              <motion.button

                whileHover={{
                  y: -8,
                }}

                onClick={() =>
                  setMode("contractor")
                }

                className={`
                  relative

                  overflow-hidden

                  rounded-[32px]

                  border

                  p-8 md:p-10

                  text-left

                  transition-all duration-500

                  ${
                    mode === "contractor"

                      ? `
                        bg-yellow-500
                        text-black

                        border-yellow-300

                        shadow-[0_0_50px_rgba(255,215,0,0.18)]
                      `

                      : `
                        bg-white/[0.04]

                        border-white/10

                        hover:border-yellow-500/30
                      `
                  }
                `}
              >

                <div className="
                  absolute top-0 right-0

                  w-40 h-40

                  bg-white/10

                  rounded-full

                  blur-[70px]
                " />

                <h3 className="
                  text-3xl

                  font-black

                  mb-5
                ">

                  CONTRACTOR

                </h3>

                <p className="
                  leading-relaxed

                  text-sm md:text-base

                  opacity-90
                ">

                  {t.contractorDesc}

                </p>

              </motion.button>

            </div>

          </div>

          {/* ================= ENTER ================= */}

          <motion.button

            whileHover={{
              scale: 1.01,
            }}

            whileTap={{
              scale: 0.98,
            }}

            onClick={handleEnter}

            className="
              mt-14

              w-full

              py-6

              rounded-[28px]

              bg-yellow-500

              hover:bg-yellow-400

              text-black

              font-black

              text-xl

              shadow-[0_0_60px_rgba(255,215,0,0.2)]

              transition-all duration-300
            "
          >

            {t.enter} →

          </motion.button>

        </div>

      </motion.div>

    </div>
  );
};

export default WelcomeGate;