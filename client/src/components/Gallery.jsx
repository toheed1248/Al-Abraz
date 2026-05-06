import { useEffect, useState, useRef } from "react";

import { getImages } from "../services/galleryService";

import { useMode } from "../context/ModeContext";

import { useLang } from "../context/LanguageContext";

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
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Gallery = () => {
  /* ================= STATES ================= */

  const [images, setImages] = useState([]);

  const [selected, setSelected] =
    useState(null);

  const [visible, setVisible] =
    useState(6);

  const [loading, setLoading] =
    useState(true);

  const [scale, setScale] =
    useState(1);

  const loader = useRef(null);

  const { mode } = useMode();

  const { lang } = useLang();

  /* ================= FETCH ================= */

  const fetchImages = async () => {
    try {
      setLoading(true);

      const res = await getImages();

      setImages(res || []);

    } catch (err) {
      console.log(err);

      setImages([]);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  /* ================= INFINITE SCROLL ================= */

  useEffect(() => {
    const observer =
      new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting
          ) {
            setVisible(
              (prev) => prev + 6
            );
          }
        },
        {
          threshold: 1,
        }
      );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();

  }, []);

  /* ================= FILTER ================= */

  const filteredImages =
    images.filter((item) => {

      if (mode === "masna") {
        return (
          item.category === "masna"
        );
      }

      if (mode === "contractor") {
        return (
          item.category ===
          "contractor"
        );
      }

      return true;
    });

  /* ================= ZOOM ================= */

  const handleZoom = (e) => {
    e.preventDefault();

    setScale((prev) =>
      e.deltaY < 0
        ? Math.min(prev + 0.2, 3)
        : Math.max(prev - 0.2, 1)
    );
  };

  return (
    <div className="
      bg-black text-white
      py-20 px-4 md:px-20
    ">

      {/* ================= HEADER ================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: -40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          text-center mb-20
        "
      >

        <h1 className="
          text-4xl md:text-6xl
          font-bold text-yellow-400
          mb-4
        ">
          {lang === "ar"
            ? "المعرض"
            : "Gallery"}
        </h1>

        <p className="
          text-gray-400 text-lg
        ">
          {lang === "ar"
            ? "استكشف أعمالنا الفاخرة"
            : "Explore our premium work"}
        </p>

      </motion.div>

      {/* ================= GRID ================= */}

      <div className="
        grid grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-8 mb-20
      ">

        {/* ================= SKELETON ================= */}

        {loading &&
          Array.from({ length: 6 }).map(
            (_, i) => (
              <div
                key={i}
                className="
                  animate-pulse
                  bg-[#111]
                  rounded-3xl
                  overflow-hidden
                  h-[400px]
                "
              >
                <div className="
                  h-64 bg-gray-800
                " />

                <div className="p-6">
                  <div className="
                    h-5 w-32 bg-gray-700
                    rounded mb-4
                  " />

                  <div className="
                    h-4 w-full bg-gray-800
                    rounded mb-2
                  " />

                  <div className="
                    h-4 w-2/3 bg-gray-800
                    rounded
                  " />
                </div>
              </div>
            )
          )}

        {/* ================= NO DATA ================= */}

        {!loading &&
          filteredImages.length === 0 && (
            <div className="
              col-span-full
              text-center py-32
            ">
              <p className="
                text-gray-500 text-xl
              ">
                No projects uploaded 🚀
              </p>
            </div>
          )}

        {/* ================= CARDS ================= */}

        {!loading &&
          filteredImages
            .slice(0, visible)
            .map((item, i) => (

              <motion.div
                key={item._id}

                initial={{
                  opacity: 0,
                  y: 40,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: i * 0.05,
                }}

                className="
                  group
                  bg-gradient-to-b
                  from-[#111]
                  to-[#0a0a0a]

                  rounded-3xl

                  border border-yellow-500/10

                  overflow-hidden

                  shadow-xl

                  hover:-translate-y-2

                  transition-all

                  cursor-pointer
                "
              >

                {/* ================= SLIDER ================= */}

                <div className="
                  relative h-72
                ">

                  <Swiper
                    modules={[
                      Navigation,
                      Pagination,
                    ]}

                    navigation

                    pagination={{
                      clickable: true,
                    }}

                    className="
                      h-full
                    "
                  >

                    {item.images?.map(
                      (img, index) => (
                        <SwiperSlide
                          key={index}
                        >

                          <img
                            src={
                              img.imageUrl
                            }

                            loading="lazy"

                            className="
                              w-full h-full
                              object-cover

                              group-hover:scale-105

                              transition duration-700
                            "

                            onClick={() => {
                              setSelected(
                                item
                              );

                              setScale(1);
                            }}
                          />

                        </SwiperSlide>
                      )
                    )}

                  </Swiper>

                  {/* IMAGE COUNT */}

                  <div className="
                    absolute top-4 right-4
                    z-20

                    bg-black/70
                    backdrop-blur-lg

                    px-3 py-1
                    rounded-full

                    text-xs text-white
                  ">
                    {item.images?.length || 0}
                    &nbsp;Photos
                  </div>

                </div>

                {/* ================= CONTENT ================= */}

                <div className="p-6">

                  <h2 className="
                    text-yellow-400
                    text-xl font-bold
                    mb-2
                  ">
                    {item.title?.[lang] ||
                      item.title?.en}
                  </h2>

                  <p className="
                    text-gray-400
                    line-clamp-2
                    mb-3
                  ">
                    {item.description?.[
                      lang
                    ] ||
                      item.description?.en}
                  </p>

                  {item.location && (
                    <p className="
                      text-xs
                      text-yellow-400/70
                    ">
                      📍 {item.location}
                    </p>
                  )}

                </div>

              </motion.div>
            ))}

      </div>

      {/* ================= LOAD MORE ================= */}

      <div
        ref={loader}
        className="
          h-20 flex
          items-center justify-center
        "
      >

        {!loading && (
          <div className="
            text-gray-500
          ">
            Loading more...
          </div>
        )}

      </div>

      {/* ================= FULLSCREEN MODAL ================= */}

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
              bg-black/95
              z-50

              flex items-center
              justify-center
            "
          >

            {/* CLOSE */}

            <button
              className="
                absolute top-6 right-6
                text-4xl text-white
                z-50
              "

              onClick={() =>
                setSelected(null)
              }
            >
              ×
            </button>

            {/* MODAL SLIDER */}

            <div className="
              w-full max-w-6xl
              px-4
            ">

              <Swiper
                modules={[
                  Navigation,
                  Pagination,
                ]}

                navigation

                pagination={{
                  clickable: true,
                }}
              >

                {selected.images?.map(
                  (img, i) => (

                    <SwiperSlide
                      key={i}
                    >

                      <div className="
                        flex flex-col
                        items-center
                      ">

                        <motion.img
                          src={
                            img.imageUrl
                          }

                          onWheel={
                            handleZoom
                          }

                          style={{
                            scale,
                          }}

                          drag

                          dragConstraints={{
                            left: -200,
                            right: 200,
                            top: -200,
                            bottom: 200,
                          }}

                          className="
                            max-h-[80vh]
                            rounded-3xl

                            object-contain

                            shadow-2xl
                          "
                        />

                        {/* DETAILS */}

                        <div className="
                          text-center mt-6
                          px-4
                        ">

                          <h2 className="
                            text-2xl
                            text-yellow-400
                            font-bold
                          ">
                            {selected.title?.[
                              lang
                            ] ||
                              selected.title
                                ?.en}
                          </h2>

                          <p className="
                            text-gray-300
                            mt-2
                          ">
                            {selected
                              .description?.[
                              lang
                            ] ||
                              selected
                                .description
                                ?.en}
                          </p>

                          {selected.location && (
                            <p className="
                              text-yellow-400/70
                              text-sm mt-2
                            ">
                              📍{" "}
                              {
                                selected.location
                              }
                            </p>
                          )}

                        </div>

                      </div>

                    </SwiperSlide>
                  )
                )}

              </Swiper>

            </div>

          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
};

export default Gallery;