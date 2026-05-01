import { useEffect, useState, useRef } from "react";
import { getImages } from "../services/galleryService";
import { useMode } from "../context/ModeContext";
import { useLang } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(6);

  const loader = useRef(null);
  const isFetching = useRef(false);

  const { mode } = useMode();
  const { lang } = useLang();

  /* ================= FETCH (FINAL FIX) ================= */
const fetchImages = async () => {
  if (isFetching.current) return;
  isFetching.current = true;

  try {
    const data = await getImages(); // ✅ already array
    setImages(data);
  } catch (err) {
    console.log(err);
    setImages([]);
  } finally {
    isFetching.current = false;
  }
};

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

  return (
    <div className="bg-black text-white py-20 px-4 md:px-20">

      {/* HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
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

      {/* PREMIUM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
        
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
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-yellow-500/20 shadow-xl hover:shadow-yellow-500/20 transition-all duration-500"
              onClick={() => setSelected(item)}
            >

              {/* IMAGE */}
              <img
                src={item.imageUrl}
                className="w-full h-[300px] object-cover group-hover:scale-110 transition duration-700"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-6">
                
                <h2 className="text-yellow-400 text-xl font-bold mb-2">
                  {item.title?.[lang] || item.title?.en}
                </h2>

                <p className="text-gray-300 text-sm line-clamp-2">
                  {item.description?.[lang] || item.description?.en}
                </p>

                <span className="text-xs text-yellow-300 mt-2">
                  📍 {item.location}
                </span>
              </div>

            </motion.div>
          ))
        )}
      </div>

      {/* LOAD MORE */}
      <div ref={loader} className="h-20 flex justify-center items-center">
        <div className="text-gray-500">Loading more...</div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            onClick={() => setSelected(null)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <img src={selected.imageUrl} className="max-h-[80vh]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;