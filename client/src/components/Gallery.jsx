import {
  useEffect,
  useState,
  useRef,
} from "react";

import {
  getImages,
} from "../services/galleryService";

import {
  useMode,
} from "../context/ModeContext";

import {
  useLang,
} from "../context/LanguageContext";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import {
  Navigation,
  Pagination,
  Autoplay,
  Zoom,
} from "swiper/modules";

import {
  FaShieldAlt,
  FaGem,
  FaCheckCircle,
} from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";

const Gallery = () => {

  const [images, setImages] =
    useState([]);

  const [selected, setSelected] =
    useState(null);

  const [visible, setVisible] =
    useState(6);

  const [loading, setLoading] =
    useState(true);

  const loader =
    useRef(null);

  const { mode } =
    useMode();

  const { lang } =
    useLang();

  /* ================= FETCH ================= */

  const fetchImages =
    async () => {

      try {

        setLoading(true);

        const res =
          await getImages();

        setImages(
          res || []
        );

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }
    };

  useEffect(() => {

    fetchImages();

  }, []);

  /* ================= BODY LOCK ================= */

  useEffect(() => {

    if (selected) {

      document.body.style.overflow =
        "hidden";

    } else {

      document.body.style.overflow =
        "auto";
    }

    return () => {

      document.body.style.overflow =
        "auto";
    };

  }, [selected]);

  /* ================= INFINITE ================= */

  useEffect(() => {

    const observer =
      new IntersectionObserver(
        (entries) => {

          if (
            entries[0]
              .isIntersecting
          ) {

            setVisible(
              (prev) =>
                prev + 6
            );
          }
        }
      );

    if (loader.current) {

      observer.observe(
        loader.current
      );
    }

    return () =>
      observer.disconnect();

  }, []);

  /* ================= FILTER ================= */

  const filteredImages =
    images.filter(
      (item) => {

        if (
          mode === "masna"
        ) {

          return (
            item.category ===
            "masna"
          );
        }

        if (
          mode ===
          "contractor"
        ) {

          return (
            item.category ===
            "contractor"
          );
        }

        return true;
      }
    );

  return (
    <section className="
      relative

      bg-black

      text-white

      py-24 md:py-32

      px-4 md:px-12

      overflow-hidden
    ">

      {/* ================= BG GLOW ================= */}

      <div className="
        absolute top-1/2 left-1/2
        -translate-x-1/2
        -translate-y-1/2

        w-[700px]
        h-[700px]

        bg-yellow-500/5

        blur-[140px]

        rounded-full
      " />

      {/* ================= HEADER ================= */}

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

        className="
          relative z-10

          text-center

          max-w-4xl

          mx-auto

          mb-20
        "
      >

        <div className="
          inline-flex

          items-center

          gap-3

          px-5 py-2

          rounded-full

          bg-white/[0.04]

          border border-yellow-500/10

          backdrop-blur-xl

          mb-8
        ">

          <FaGem className="
            text-yellow-400
          " />

          <span className="
            text-sm text-gray-300
          ">

            {lang === "ar"

              ? "معرض المشاريع الفاخرة"

              : "Luxury Project Showcase"}

          </span>

        </div>

        <h1 className="
          text-4xl md:text-6xl

          font-black

          text-yellow-400

          mb-6
        ">

          {lang === "ar"
            ? "المعرض"
            : "Gallery"}

        </h1>

        <p className="
          text-gray-400

          max-w-2xl

          mx-auto

          leading-relaxed
        ">

          {lang === "ar"

            ? "أعمال داخلية فاخرة بتنفيذ احترافي وتشطيبات عالية الجودة"

            : "Luxury interior projects crafted with trusted execution and premium finishing."}

        </p>

      </motion.div>

      {/* ================= TRUST SECTION ================= */}

      <div className="
        relative z-10

        grid md:grid-cols-3

        gap-5

        max-w-6xl

        mx-auto

        mb-20
      ">

        {[
          {
            icon:
              <FaShieldAlt />,
            title:
              lang === "ar"
                ? "تنفيذ موثوق"
                : "Trusted Work",
            desc:
              lang === "ar"
                ? "تنفيذ احترافي بعقود واضحة"
                : "Professional contract-based execution",
          },

          {
            icon:
              <FaCheckCircle />,
            title:
              lang === "ar"
                ? "تشطيبات فاخرة"
                : "Premium Finish",
            desc:
              lang === "ar"
                ? "خامات عالية الجودة"
                : "Luxury materials & detailing",
          },

          {
            icon:
              <FaGem />,
            title:
              lang === "ar"
                ? "تصميم راقٍ"
                : "Elegant Design",
            desc:
              lang === "ar"
                ? "تصاميم داخلية راقية"
                : "Sophisticated interior concepts",
          },

        ].map((item, i) => (

          <motion.div

            key={i}

            whileHover={{
              y: -4,
            }}

            className="
              bg-white/[0.04]

              border border-yellow-500/10

              backdrop-blur-2xl

              rounded-[28px]

              p-6

              text-center

              shadow-[0_0_40px_rgba(255,215,0,0.04)]
            "
          >

            <div className="
              w-14 h-14

              rounded-2xl

              bg-yellow-500/10

              flex items-center
              justify-center

              text-yellow-400

              text-xl

              mx-auto

              mb-5
            ">

              {item.icon}

            </div>

            <h3 className="
              font-semibold

              text-lg

              mb-2
            ">

              {item.title}

            </h3>

            <p className="
              text-sm

              text-gray-400
            ">

              {item.desc}

            </p>

          </motion.div>

        ))}

      </div>

      {/* ================= GRID ================= */}

      <div className="
        relative z-10

        grid grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3

        gap-8
      ">

        {/* ================= LOADING ================= */}

        {loading &&

          Array.from({
            length: 6,
          }).map(
            (_, i) => (

              <div
                key={i}

                className="
                  animate-pulse

                  h-[500px]

                  rounded-[36px]

                  bg-[#111]
                "
              />

            )
          )}

        {/* ================= CARDS ================= */}

        {!loading &&

          filteredImages
            .slice(0, visible)
            .map(
              (
                item,
                i
              ) => (

                <motion.div

                  key={item._id}

                  initial={{
                    opacity: 0,
                    y: 40,
                  }}

                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}

                  viewport={{
                    once: true,
                  }}

                  transition={{
                    delay:
                      i * 0.04,
                  }}

                  whileHover={{
                    y: -8,
                  }}

                  className="
                    group

                    relative

                    overflow-hidden

                    rounded-[36px]

                    bg-[#0b0b0b]

                    border border-yellow-500/10

                    shadow-[0_10px_60px_rgba(0,0,0,0.5)]
                  "
                >

                  {/* ================= SLIDER ================= */}

                  <div className="
                    relative

                    h-[420px]

                    bg-black
                  ">

                    <Swiper

                      modules={[
                        Navigation,
                        Pagination,
                        Autoplay,
                      ]}

                      autoplay={{
                        delay: 3500,
                      }}

                      pagination={{
                        clickable: true,
                      }}

                      navigation={
                        window.innerWidth >
                        768
                      }

                      touchRatio={1.2}

                      grabCursor

                      className="
                        h-full
                      "
                    >

                      {item.images?.map(
                        (
                          img,
                          index
                        ) => (

                          <SwiperSlide
                            key={index}
                          >

                            <img

                              src={
                                img.imageUrl
                              }

                              loading="lazy"

                              decoding="async"

                              onClick={() =>
                                setSelected(
                                  item
                                )
                              }

                              className="
                                w-full
                                h-full

                                object-cover

                                transition duration-1000

                                group-hover:scale-105
                              "
                            />

                          </SwiperSlide>

                        )
                      )}

                    </Swiper>

                    {/* OVERLAY */}

                    <div className="
                      absolute inset-0

                      bg-gradient-to-t
                      from-black
                      via-transparent
                      to-transparent

                      pointer-events-none
                    " />

                    {/* PHOTO COUNT */}

                    <div className="
                      absolute top-5 right-5
                      z-20

                      px-4 py-2

                      rounded-full

                      bg-black/60

                      backdrop-blur-xl

                      border border-white/10

                      text-xs
                    ">

                      {
                        item.images
                          ?.length
                      } Photos

                    </div>

                    {/* CONTENT */}

                    <div className="
                      absolute bottom-0 left-0

                      w-full

                      p-7

                      z-20
                    ">

                      <h2 className="
                        text-2xl

                        font-bold

                        text-white

                        mb-3
                      ">

                        {item.title?.[
                          lang
                        ] ||
                          item.title
                            ?.en}

                      </h2>

                      <div className="
                        flex items-center
                        justify-between
                      ">

                        <span className="
                          text-sm

                          text-yellow-300
                        ">

                          📍 {item.location}

                        </span>

                        <span className="
                          px-4 py-2

                          rounded-full

                          bg-yellow-500/10

                          border border-yellow-500/20

                          text-yellow-400

                          text-xs
                        ">

                          {
                            item.category
                          }

                        </span>

                      </div>

                    </div>

                  </div>

                </motion.div>

              )
            )}

      </div>

      {/* ================= LOAD MORE ================= */}

      <div
        ref={loader}
        className="h-20"
      />

      {/* ================= FULLSCREEN ================= */}

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

            className="
              fixed inset-0

              bg-black

              z-[9999]
            "
          >

            {/* CLOSE */}

            <button

              onClick={() =>
                setSelected(null)
              }

              className="
                absolute top-5 right-5

                z-50

                w-14 h-14

                rounded-full

                bg-black/60

                backdrop-blur-xl

                text-white

                text-4xl
              "
            >

              ×

            </button>

            {/* SLIDER */}

            <Swiper

              modules={[
                Navigation,
                Pagination,
                Zoom,
              ]}

              navigation={
                window.innerWidth >
                768
              }

              pagination={{
                clickable: true,
              }}

              zoom

              touchRatio={1.3}

              grabCursor

              className="
                w-full
                h-full
              "
            >

              {selected.images?.map(
                (
                  img,
                  index
                ) => (

                  <SwiperSlide
                    key={index}
                  >

                    <div className="
                      swiper-zoom-container

                      w-full
                      h-full

                      flex items-center
                      justify-center
                    ">

                      <img

                        src={
                          img.imageUrl
                        }

                        className="
                          max-w-full
                          max-h-full

                          object-contain
                        "
                      />

                    </div>

                  </SwiperSlide>

                )
              )}

            </Swiper>

          </motion.div>

        )}

      </AnimatePresence>

    </section>
  );
};

export default Gallery;