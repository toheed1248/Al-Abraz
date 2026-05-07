import { motion } from "framer-motion";

const IntroLoader = () => {

  return (

    <div
      className="
        fixed inset-0

        bg-[#030303]

        z-[9999]

        overflow-hidden

        flex flex-col
        items-center
        justify-center
      "
    >

      {/* ================= CINEMATIC BG ================= */}

      <div className="
        absolute inset-0

        bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.08),transparent_50%)]

        opacity-80
      " />

      {/* ================= GOLD GLOW ================= */}

      <motion.div

        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.7, 0.4],
        }}

        transition={{
          repeat: Infinity,
          duration: 4,
        }}

        className="
          absolute

          w-[700px]
          h-[700px]

          bg-yellow-500/10

          blur-[180px]

          rounded-full
        "
      />

      {/* ================= DUST PARTICLES ================= */}

      {[...Array(18)].map((_, i) => (

        <motion.div
          key={i}

          animate={{
            y: [0, -120],
            opacity: [0, 1, 0],
            x: [0, i % 2 === 0 ? 20 : -20],
          }}

          transition={{
            repeat: Infinity,
            duration: 3 + i * 0.2,
            delay: i * 0.2,
          }}

          className="
            absolute

            w-2 h-2

            rounded-full

            bg-yellow-300/40
          "

          style={{
            bottom: "20%",
            left: `${10 + i * 5}%`,
          }}
        />

      ))}

      {/* ================= CEILING ================= */}

      <motion.div

        initial={{
          width: 0,
        }}

        animate={{
          width: "420px",
        }}

        transition={{
          duration: 1.2,
        }}

        className="
          absolute top-20

          h-6

          bg-gradient-to-r
          from-gray-300
          via-white
          to-gray-300

          rounded-full

          shadow-[0_0_50px_rgba(255,255,255,0.2)]
        "
      />

      {/* ================= POP SHEET ================= */}

      <motion.div

        initial={{
          scaleY: 0,
          opacity: 0,
          y: -30,
        }}

        animate={{
          scaleY: 1,
          opacity: 1,
          y: 0,
        }}

        transition={{
          delay: 0.6,
          duration: 1.4,
        }}

        className="
          absolute top-[105px]

          w-[360px]
          h-[70px]

          bg-gradient-to-b
          from-white
          via-gray-100
          to-gray-300

          rounded-md

          origin-top

          shadow-[0_30px_80px_rgba(255,255,255,0.25)]
        "
      />

      {/* ================= WORKER ================= */}

      <motion.div

        animate={{
          y: [0, -10, 0],
        }}

        transition={{
          repeat: Infinity,
          duration: 1.6,
        }}

        className="
          relative

          mt-40

          flex flex-col
          items-center
        "
      >

        {/* HELMET */}

        <motion.div

          animate={{
            rotate: [0, 2, -2, 0],
          }}

          transition={{
            repeat: Infinity,
            duration: 2,
          }}

          className="
            absolute -top-4

            w-24 h-10

            bg-gradient-to-b
            from-yellow-200
            to-yellow-500

            rounded-full

            shadow-[0_0_30px_rgba(255,215,0,0.4)]
          "
        />

        {/* HEAD */}

        <div className="
          w-20 h-20

          rounded-full

          bg-gradient-to-b
          from-yellow-500
          to-yellow-700

          border-[5px] border-yellow-300
        " />

        {/* BODY */}

        <div className="
          relative

          w-32 h-44

          mt-2

          bg-gradient-to-b
          from-yellow-400
          to-yellow-600

          rounded-[40px]

          shadow-[0_20px_60px_rgba(255,215,0,0.15)]
        ">

          {/* SAFETY STRIPE */}

          <div className="
            absolute top-12 left-0

            w-full h-4

            bg-black/20
          " />

        </div>

        {/* LEFT ARM */}

        <motion.div

          animate={{
            rotate: [-35, 20, -35],
          }}

          transition={{
            repeat: Infinity,
            duration: 1.3,
          }}

          className="
            absolute top-8 left-[-45px]

            w-7 h-36

            bg-gradient-to-b
            from-yellow-300
            to-yellow-500

            rounded-full

            origin-top

            shadow-[0_0_20px_rgba(255,215,0,0.2)]
          "
        />

        {/* RIGHT ARM */}

        <motion.div

          animate={{
            rotate: [35, -20, 35],
          }}

          transition={{
            repeat: Infinity,
            duration: 1.3,
          }}

          className="
            absolute top-8 right-[-45px]

            w-7 h-36

            bg-gradient-to-b
            from-yellow-300
            to-yellow-500

            rounded-full

            origin-top

            shadow-[0_0_20px_rgba(255,215,0,0.2)]
          "
        />

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
          delay: 1,
          duration: 1,
        }}

        className="
          mt-24

          text-yellow-400

          text-5xl md:text-7xl

          font-black

          tracking-[14px]

          drop-shadow-[0_0_30px_rgba(255,215,0,0.4)]
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
          delay: 1.5,
        }}

        className="
          mt-5

          text-gray-400

          uppercase

          tracking-[8px]

          text-xs md:text-sm
        "
      >

        Premium POP & Interior Experience

      </motion.p>

      {/* ================= LOADING BAR ================= */}

      <div className="
        relative

        mt-12

        w-72 h-[5px]

        rounded-full

        overflow-hidden

        bg-white/10
      ">

        <motion.div

          initial={{
            width: 0,
          }}

          animate={{
            width: "100%",
          }}

          transition={{
            duration: 4,
            ease: "easeInOut",
          }}

          className="
            absolute left-0 top-0

            h-full

            bg-gradient-to-r
            from-yellow-300
            via-yellow-500
            to-yellow-300

            shadow-[0_0_30px_rgba(255,215,0,0.5)]
          "
        />

      </div>

    </div>
  );
};

export default IntroLoader;