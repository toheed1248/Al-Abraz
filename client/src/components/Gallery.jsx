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

  const { mode } = useMode();
  const { lang } = useLang();

  useEffect(() => {
    fetchImages();

    const interval = setInterval(fetchImages, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchImages = async () => {
    try {
      const res = await getImages();

      // 🔥 SAFE DATA HANDLING (FIX)
      setImages(Array.isArray(res.data?.data) ? res.data.data : []);

    } catch (err) {
      console.log(err);
      setImages([]); // fallback safety
    }
  };

  /* 🔥 INFINITE SCROLL */
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

  // 🔥 SAFE FILTER (FIX)
  const filteredImages = (Array.isArray(images) ? images : []).filter((item) => {
    if (mode === "masna") return item.category === "masna";
    if (mode === "contractor") return item.category === "contractor";
    return true;
  });

  return (
    <div className="bg-black text-white py-20 px-4 md:px-20">
      
      {/* 🔥 HEADER */}
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

      {/* 🔥 GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        
        {filteredImages.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="col-span-full text-center py-32"
          >
            <p className="text-gray-500 text-xl">
              No projects uploaded yet 🚀
            </p>
          </motion.div>
        ) : (
          filteredImages.slice(0, visible).map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-gradient-to-b from-[#111] to-[#0a0a0a] 
                         rounded-3xl border border-yellow-500/20 
                         overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)]
                         hover:shadow-[0_25px_60px_rgba(255,200,0,0.3)]
                         transition-all duration-700 cursor-pointer
                         hover:-translate-y-3 hover:scale-[1.02]"
              onClick={() => setSelected(item)}
            >
              {/* IMAGE */}
              <div className="relative h-64 md:h-72 overflow-hidden">
                <img
                  src={item.imageUrl}
                  loading="lazy"
                  className="w-full h-full object-cover 
                            group-hover:scale-110 group-hover:brightness-125
                            transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              {/* CONTENT */}
              <div className="p-8">
                <h2 className="text-yellow-400 text-xl font-bold mb-3">
                  {item.title?.[lang] || item.title?.en}
                </h2>

                <p className="text-gray-300 mb-6">
                  {item.description?.[lang] || item.description?.en}
                </p>

                <div className="flex justify-between border-t border-yellow-500/20 pt-4">
                  <span className="text-gray-400 text-sm">
                    {item.location || "Kuwait"}
                  </span>

                  <span className="text-yellow-400 text-sm">
                    {item.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* LOAD MORE */}
      <div ref={loader} className="h-20 flex justify-center items-center">
        <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-[#111] p-6 rounded-3xl max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selected.imageUrl} className="w-full rounded-xl mb-4" />

              <h2 className="text-yellow-400 text-2xl mb-2">
                {selected.title?.[lang] || selected.title?.en}
              </h2>

              <p className="text-gray-300 mb-4">
                {selected.description?.[lang] || selected.description?.en}
              </p>

              <span className="text-gray-400">
                {selected.location}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;