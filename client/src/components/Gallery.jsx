import { useEffect, useState, useRef } from "react";
import { getImages } from "../services/galleryService";
import { useMode } from "../context/ModeContext";
import { useLang } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(6);
  const [scale, setScale] = useState(1);

  const loader = useRef(null);
  const isFetching = useRef(false);

  const { mode } = useMode();
  const { lang } = useLang();

  /* ================= FETCH ================= */
  const fetchImages = async () => {
    if (isFetching.current) return;
    isFetching.current = true;

    try {
      const res = await getImages();

      let data = [];
      if (Array.isArray(res)) data = res;
      else if (Array.isArray(res?.data)) data = res.data;
      else if (Array.isArray(res?.data?.data)) data = res.data.data;

      setImages(data);
    } catch (err) {
      console.log(err);
      setImages([]);
    } finally {
      isFetching.current = false;
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  /* ================= INFINITE SCROLL ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible((prev) => prev + 6);
        }
      },
      { threshold: 1 }
    );

    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, []);

  /* ================= FILTER ================= */
  const filteredImages = images.filter((item) => {
    if (mode === "masna") return item.category === "masna";
    if (mode === "contractor") return item.category === "contractor";
    return true;
  });

  /* ================= ZOOM HANDLER ================= */
  const handleZoom = (e) => {
    e.preventDefault();
    setScale((prev) =>
      e.deltaY < 0 ? Math.min(prev + 0.2, 3) : Math.max(prev - 0.2, 1)
    );
  };

  return (
    <div className="bg-black text-white py-20 px-4 md:px-20">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-4">
          {lang === "ar" ? "المعرض" : "Gallery"}
        </h1>
        <p className="text-gray-400 text-lg">
          {lang === "ar"
            ? "استكشف أعمالنا الفاخرة"
            : "Explore our premium work"}
        </p>
      </motion.div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {filteredImages.length === 0 ? (
          <div className="col-span-full text-center py-32">
            <p className="text-gray-500 text-xl">
              No projects uploaded yet 🚀
            </p>
          </div>
        ) : (
          filteredImages.slice(0, visible).map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-gradient-to-b from-[#111] to-[#0a0a0a]
                         rounded-3xl border border-yellow-500/20
                         overflow-hidden shadow-lg cursor-pointer
                         hover:-translate-y-2 transition-all"
              onClick={() => {
                setSelected(item);
                setScale(1);
              }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.imageUrl}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-6">
                <h2 className="text-yellow-400 text-xl font-bold mb-2">
                  {item.title?.[lang] || item.title?.en}
                </h2>

                <p className="text-gray-400 line-clamp-2 mb-2">
                  {item.description?.[lang] || item.description?.en}
                </p>

                {item.location && (
                  <p className="text-xs text-yellow-400/80">
                    📍 {item.location}
                  </p>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* LOAD MORE */}
      <div ref={loader} className="h-20 flex justify-center items-center">
        <div className="text-gray-500">Loading more...</div>
      </div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            {/* CLOSE BUTTON */}
            <button
              className="absolute top-6 right-6 text-white text-3xl z-50"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>

            {/* IMAGE */}
            <motion.img
              src={selected.imageUrl}
              onWheel={handleZoom}
              style={{ scale }}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-2xl cursor-zoom-in"
              onClick={(e) => e.stopPropagation()}
              drag
              dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
            />

            {/* DETAILS */}
            <div className="absolute bottom-6 text-center text-white px-4">
              <h2 className="text-xl text-yellow-400 font-bold">
                {selected.title?.[lang] || selected.title?.en}
              </h2>

              <p className="text-gray-300 text-sm mt-1">
                {selected.description?.[lang] || selected.description?.en}
              </p>

              {selected.location && (
                <p className="text-yellow-400 text-xs mt-1">
                  📍 {selected.location}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;