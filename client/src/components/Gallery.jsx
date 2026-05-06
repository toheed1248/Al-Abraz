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
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Gallery = () => {
  const [images, setImages] =
    useState([]);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  /* ================= LOCK BODY SCROLL ================= */

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
            entries[0].isIntersecting
          ) {
            setVisible(
              (prev) => prev + 6
            );
          }
        }
      );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () =>
      observer.disconnect();

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
        ? Math.min(prev + 0.2, 4)
        : Math.max(prev - 0.2, 1)
    );
  };

  return (
    <div className="
      bg-black text-white
      py-20 px-4 md:px-16
    ">

      {/* ================= HEADER ================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: -30,
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
          font-bold
          text-yellow-400
          mb-4
        ">
          {lang === "ar"
            ? "المعرض"
            : "Gallery"}
        </h1>

        <p className="
          text-gray-400
        ">
          Premium Work Showcase
        </p>

      </motion.div>

      {/* ================= GRID ================= */}

      <div className="
        grid grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-8
      ">

        {loading &&
          Array.from({ length: 6 }).map(
            (_, i) => (
              <div
                key={i}
                className="
                  animate-pulse
                  bg-[#111]
                  h-[450px]
                  rounded-3xl
                "
              />
            )
          )}

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
                  delay:
                    i * 0.05,
                }}

                whileHover={{
                  y: -8,
                }}

                className="
                  group

                  bg-gradient-to-b
                  from-[#111]
                  to-[#0a0a0a]

                  border
                  border-yellow-500/10

                  rounded-3xl

                  overflow-hidden

                  shadow-2xl
                "
              >

                {/* ================= SLIDER ================= */}

                <div className="
                  relative
                  h-[320px]
                  bg-black
                ">

                  <Swiper
                    modules={[
                      Navigation,
                      Pagination,
                      Autoplay,
                    ]}

                    autoplay={{
                      delay: 3000,
                    }}

                    pagination={{
                      clickable: true,
                    }}

                    navigation={
                      window.innerWidth > 768
                    }

                    touchRatio={1}

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

                            className="
                              w-full
                              h-full

                              object-contain

                              bg-black

                              transition
                              duration-700

                              group-hover:scale-[1.02]
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

                  {/* COUNT */}

                  <div className="
                    absolute top-4 right-4
                    z-20

                    bg-black/70
                    backdrop-blur-lg

                    px-3 py-1

                    rounded-full

                    text-xs
                  ">
                    {
                      item.images
                        ?.length
                    } Photos
                  </div>

                </div>

                {/* ================= CONTENT ================= */}

                <div className="
                  p-6
                ">

                  <h2 className="
                    text-yellow-400
                    text-xl
                    font-bold
                    mb-3
                  ">
                    {item.title?.[
                      lang
                    ] ||
                      item.title?.en}
                  </h2>

                  <p className="
                    text-gray-400
                    line-clamp-2
                    text-sm
                  ">
                    {item.description?.[
                      lang
                    ] ||
                      item.description
                        ?.en}
                  </p>

                  <div className="
                    flex justify-between
                    items-center mt-5
                  ">

                    <span className="
                      text-yellow-400/70
                      text-xs
                    ">
                      📍{" "}
                      {item.location}
                    </span>

                    <span className="
                      bg-yellow-500/10
                      text-yellow-400

                      text-xs

                      px-3 py-1
                      rounded-full
                    ">
                      {
                        item.category
                      }
                    </span>

                  </div>

                </div>

              </motion.div>
            ))}

      </div>

      {/* ================= LOAD MORE ================= */}

      <div
        ref={loader}
        className="h-20"
      />

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

            className="
              fixed inset-0
              bg-black/95
              z-[999]

              flex items-center
              justify-center

              touch-none
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

                text-white
                text-5xl
              "
            >
              ×
            </button>

            {/* SLIDER */}

            <div className="
              w-full h-full
              flex items-center
              justify-center
            ">

              <Swiper
                modules={[
                  Navigation,
                  Pagination,
                ]}

                navigation={
                  window.innerWidth > 768
                }

                pagination={{
                  clickable: true,
                }}

                touchRatio={1.2}

                grabCursor

                className="
                  w-full h-full
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
                        w-full h-full

                        flex flex-col
                        items-center
                        justify-center

                        px-4 py-16
                      ">

                        <motion.img
                          src={
                            img.imageUrl
                          }

                          onWheel={
                            handleZoom
                          }

                          drag

                          dragElastic={
                            0.05
                          }

                          style={{
                            scale,
                          }}

                          className="
                            max-h-[75vh]
                            max-w-full

                            object-contain

                            rounded-3xl

                            shadow-2xl
                          "
                        />

                        <div className="
                          mt-6
                          text-center
                          max-w-2xl
                        ">

                          <h2 className="
                            text-2xl
                            font-bold
                            text-yellow-400
                          ">
                            {selected
                              .title?.[
                              lang
                            ] ||
                              selected
                                .title
                                ?.en}
                          </h2>

                          <p className="
                            text-gray-300
                            mt-3
                          ">
                            {selected
                              .description?.[
                              lang
                            ] ||
                              selected
                                .description
                                ?.en}
                          </p>

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