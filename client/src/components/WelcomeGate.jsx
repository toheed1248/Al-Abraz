import { motion } from "framer-motion";

import {
  useLang,
} from "../context/LanguageContext";

import {
  useMode,
} from "../context/ModeContext";

const WelcomeGate = ({
  onEnter,
}) => {

  const { lang, setLang } =
    useLang();

  const { mode, setMode } =
    useMode();

  const handleEnter = () => {

    localStorage.setItem(
      "entered",
      "true"
    );

    onEnter();
  };

  return (
    <div className="
      min-h-screen

      bg-[#050505]

      text-white

      flex items-center
      justify-center

      px-4

      overflow-hidden

      relative
    ">

      {/* ================= BG EFFECTS ================= */}

      <div className="absolute inset-0 overflow-hidden">

        {/* GLOW 1 */}

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}

          transition={{
            repeat: Infinity,
            duration: 6,
          }}

          className="
            absolute

            top-10 left-10

            w-[400px]
            h-[400px]

            bg-yellow-500/10

            rounded-full

            blur-[120px]
          "
        />

        {/* GLOW 2 */}

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
          }}

          transition={{
            repeat: Infinity,
            duration: 7,
          }}

          className="
            absolute

            bottom-10 right-10

            w-[500px]
            h-[500px]

            bg-yellow-400/10

            rounded-full

            blur-[150px]
          "
        />

        {/* PARTICLES */}

        <motion.div
          animate={{
            y: [0, -30, 0],
          }}

          transition={{
            repeat: Infinity,
            duration: 4,
          }}

          className="
            absolute top-20 left-1/4

            w-3 h-3

            rounded-full

            bg-yellow-400
          "
        />

        <motion.div
          animate={{
            y: [0, -20, 0],
          }}

          transition={{
            repeat: Infinity,
            duration: 5,
          }}

          className="
            absolute bottom-20 right-1/4

            w-2 h-2

            rounded-full

            bg-yellow-300
          "
        />

      </div>

      {/* ================= MAIN CARD ================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 50,
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
          max-w-3xl

          rounded-[40px]

          border
          border-yellow-500/20

          bg-gradient-to-b
          from-white/10
          to-white/5

          backdrop-blur-3xl

          p-8 md:p-14

          shadow-[0_0_80px_rgba(255,215,0,0.08)]

          overflow-hidden
        "
      >

        {/* CARD SHINE */}

        <div className="
          absolute inset-0

          bg-gradient-to-br
          from-white/5
          via-transparent
          to-transparent

          pointer-events-none
        " />

        {/* ================= TITLE ================= */}

        <div className="
          text-center mb-14
        ">

          <motion.h1
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
              text-5xl md:text-7xl

              font-black

              text-yellow-400

              mb-5

              tracking-[12px]

              drop-shadow-[0_0_25px_rgba(255,215,0,0.5)]
            "
          >
            AL ABRAZ
          </motion.h1>

          <p className="
            text-gray-400

            leading-relaxed

            max-w-xl

            mx-auto
          ">
            {lang === "ar"
              ? "اختر اللغة والخدمة المفضلة لديك لتجربة فاخرة"
              : "Choose your preferred experience and language for a premium journey"}
          </p>

        </div>

        {/* ================= MODE ================= */}

        <div className="
          mb-12
        ">

          <h2 className="
            text-yellow-400

            text-xl font-semibold

            mb-6
          ">
            {lang === "ar"
              ? "ماذا تريد أن ترى؟"
              : "What do you want to explore?"}
          </h2>

          <div className="
            grid md:grid-cols-2
            gap-6
          ">

            {/* MASNA */}

            <motion.button
              whileHover={{
                y: -8,
                scale: 1.03,
              }}

              onClick={() =>
                setMode("masna")
              }

              className={`
                relative overflow-hidden

                p-8 rounded-3xl

                border

                transition-all duration-500

                ${
                  mode === "masna"
                    ? "bg-yellow-500 text-black border-yellow-400 shadow-[0_0_40px_rgba(255,215,0,0.2)]"
                    : "bg-white/5 border-white/10 hover:border-yellow-500/40"
                }
              `}
            >

              {/* SHINE */}

              <div className="
                absolute inset-0

                bg-gradient-to-r
                from-transparent
                via-white/10
                to-transparent

                -translate-x-full
                hover:translate-x-full

                transition duration-1000
              " />

              <h3 className="
                text-3xl font-bold mb-3
              ">
                Masna
              </h3>

              <p className="
                text-sm opacity-80
              ">
                POP ceiling & factory showcase
              </p>

            </motion.button>

            {/* CONTRACTOR */}

            <motion.button
              whileHover={{
                y: -8,
                scale: 1.03,
              }}

              onClick={() =>
                setMode(
                  "contractor"
                )
              }

              className={`
                relative overflow-hidden

                p-8 rounded-3xl

                border

                transition-all duration-500

                ${
                  mode ===
                  "contractor"
                    ? "bg-yellow-500 text-black border-yellow-400 shadow-[0_0_40px_rgba(255,215,0,0.2)]"
                    : "bg-white/5 border-white/10 hover:border-yellow-500/40"
                }
              `}
            >

              <div className="
                absolute inset-0

                bg-gradient-to-r
                from-transparent
                via-white/10
                to-transparent

                -translate-x-full
                hover:translate-x-full

                transition duration-1000
              " />

              <h3 className="
                text-3xl font-bold mb-3
              ">
                Contractor
              </h3>

              <p className="
                text-sm opacity-80
              ">
                Interior & execution projects
              </p>

            </motion.button>

          </div>

        </div>

        {/* ================= LANGUAGE ================= */}

        <div className="
          mb-14
        ">

          <h2 className="
            text-yellow-400

            text-xl font-semibold

            mb-6
          ">
            {lang === "ar"
              ? "اختر اللغة"
              : "Choose Language"}
          </h2>

          <div className="
            flex gap-5
          ">

            {/* ENGLISH */}

            <motion.button
              whileHover={{
                scale: 1.03,
              }}

              onClick={() =>
                setLang("en")
              }

              className={`
                flex-1

                py-5

                rounded-2xl

                font-bold

                transition-all duration-300

                ${
                  lang === "en"
                    ? "bg-yellow-500 text-black shadow-[0_0_40px_rgba(255,215,0,0.2)]"
                    : "bg-white/5 border border-white/10 hover:border-yellow-500/30"
                }
              `}
            >
              English
            </motion.button>

            {/* ARABIC */}

            <motion.button
              whileHover={{
                scale: 1.03,
              }}

              onClick={() =>
                setLang("ar")
              }

              className={`
                flex-1

                py-5

                rounded-2xl

                font-bold

                transition-all duration-300

                ${
                  lang === "ar"
                    ? "bg-yellow-500 text-black shadow-[0_0_40px_rgba(255,215,0,0.2)]"
                    : "bg-white/5 border border-white/10 hover:border-yellow-500/30"
                }
              `}
            >
              العربية
            </motion.button>

          </div>

        </div>

        {/* ================= ENTER BUTTON ================= */}

        <motion.button
          whileHover={{
            scale: 1.02,
          }}

          whileTap={{
            scale: 0.98,
          }}

          onClick={handleEnter}

          className="
            relative overflow-hidden

            w-full

            bg-yellow-500
            hover:bg-yellow-400

            text-black

            font-black

            py-5

            rounded-2xl

            transition-all duration-300

            text-lg

            shadow-[0_0_40px_rgba(255,215,0,0.25)]
          "
        >

          {/* BUTTON SHINE */}

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

          <span className="relative z-10">

            {lang === "ar"
              ? "دخول"
              : "Enter Experience →"}

          </span>

        </motion.button>

      </motion.div>

    </div>
  );
};

export default WelcomeGate;