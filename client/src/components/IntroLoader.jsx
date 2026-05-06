import { motion } from "framer-motion";

const IntroLoader = () => {
  return (
    <div
      className="
        fixed inset-0
        bg-[#050505]
        z-[9999]

        flex flex-col
        items-center
        justify-center

        overflow-hidden
      "
    >

      {/* ================= BACKGROUND ================= */}

      <div className="
        absolute inset-0
        bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.08),transparent_60%)]
      " />

      {/* ================= FLOATING PARTICLES ================= */}

      <div className="absolute inset-0 overflow-hidden">

        <motion.div
          animate={{
            y: [0, -40, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
          }}
          className="
            absolute top-20 left-20
            w-3 h-3 rounded-full
            bg-yellow-400
            blur-[1px]
          "
        />

        <motion.div
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
          }}
          className="
            absolute top-40 right-40
            w-2 h-2 rounded-full
            bg-yellow-300
          "
        />

        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
          className="
            absolute bottom-24 left-1/3
            w-4 h-4 rounded-full
            bg-yellow-500/60
          "
        />

      </div>

      {/* ================= GOLD GLOW ================= */}

      <div className="
        absolute
        w-[500px]
        h-[500px]

        bg-yellow-500/10

        blur-[140px]

        rounded-full
      " />

      {/* ================= CEILING ================= */}

      <motion.div
        initial={{
          width: 0,
        }}

        animate={{
          width: 320,
        }}

        transition={{
          duration: 1,
        }}

        className="
          absolute top-28

          h-5

          bg-gradient-to-r
          from-gray-400
          via-white
          to-gray-400

          rounded-full

          shadow-[0_0_40px_rgba(255,255,255,0.2)]
        "
      />

      {/* ================= POP SHEET ================= */}

      <motion.div
        initial={{
          scaleY: 0,
          opacity: 0,
        }}

        animate={{
          scaleY: 1,
          opacity: 1,
        }}

        transition={{
          duration: 1.2,
        }}

        className="
          absolute top-32

          w-72 h-16

          bg-gradient-to-b
          from-white
          to-gray-200

          rounded-md

          origin-top

          shadow-[0_20px_60px_rgba(255,255,255,0.2)]
        "
      />

      {/* ================= WORKER ================= */}

      <motion.div
        animate={{
          y: [0, -12, 0],
        }}

        transition={{
          repeat: Infinity,
          duration: 1.5,
        }}

        className="
          relative mt-28

          flex flex-col
          items-center
        "
      >

        {/* HELMET */}

        <div className="
          absolute -top-3

          w-20 h-8

          bg-yellow-300

          rounded-full

          shadow-[0_0_20px_rgba(255,215,0,0.4)]
        " />

        {/* HEAD */}

        <div className="
          w-16 h-16

          rounded-full

          bg-gradient-to-b
          from-yellow-500
          to-yellow-600

          border-4 border-yellow-300
        " />

        {/* BODY */}

        <div className="
          w-24 h-36

          bg-gradient-to-b
          from-yellow-400
          to-yellow-500

          rounded-3xl

          mt-2

          shadow-[0_0_40px_rgba(255,215,0,0.2)]
        " />

        {/* ARMS */}

        <div className="
          flex justify-between

          w-48

          absolute top-10
        ">

          <motion.div
            animate={{
              rotate: [-25, 25, -25],
            }}

            transition={{
              repeat: Infinity,
              duration: 1,
            }}

            className="
              w-6 h-28

              bg-gradient-to-b
              from-yellow-300
              to-yellow-500

              rounded-full

              origin-top
            "
          />

          <motion.div
            animate={{
              rotate: [25, -25, 25],
            }}

            transition={{
              repeat: Infinity,
              duration: 1,
            }}

            className="
              w-6 h-28

              bg-gradient-to-b
              from-yellow-300
              to-yellow-500

              rounded-full

              origin-top
            "
          />

        </div>

      </motion.div>

      {/* ================= TITLE ================= */}

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
          delay: 0.5,
          duration: 1,
        }}

        className="
          mt-20

          text-yellow-400

          text-5xl md:text-7xl

          font-black

          tracking-[12px]

          drop-shadow-[0_0_25px_rgba(255,215,0,0.5)]
        "
      >
        AL ABRAZ
      </motion.h1>

      {/* ================= SUBTITLE ================= */}

      <motion.p
        initial={{
          opacity: 0,
        }}

        animate={{
          opacity: 1,
        }}

        transition={{
          delay: 1,
        }}

        className="
          text-gray-400

          mt-5

          tracking-[6px]

          uppercase

          text-xs md:text-sm
        "
      >
        Premium Ceiling Experience
      </motion.p>

      {/* ================= LOADING BAR ================= */}

      <div className="
        mt-10

        w-60 h-1

        bg-white/10

        rounded-full

        overflow-hidden
      ">

        <motion.div
          initial={{
            x: "-100%",
          }}

          animate={{
            x: "100%",
          }}

          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}

          className="
            w-1/2 h-full

            bg-gradient-to-r
            from-transparent
            via-yellow-400
            to-transparent
          "
        />

      </div>

    </div>
  );
};

export default IntroLoader;