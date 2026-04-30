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
      setImages(res.data.data || res.data || []);
    } catch (err) {
      console.log(err);
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

  // Mode-based filtering (same logic)
  const filteredImages = images.filter((item) => {
    if (mode === "masna") return item.category === "masna";
    if (mode === "contractor") return item.category === "contractor";
    return true;
  });

  return (
    <div className="bg-black text-white py-20 px-4 md:px-20">
      
      {/* 🔥 HEADER - Same theme */}
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

      {/* 🔥 CLASSIC GRID - 3 Column Layout */}
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
              whileHover={{ 
                scale: 1.02,
                rotateX: 5,
                rotateY: 5
              }}
            >
              {/* 🔥 IMAGE */}
              <div className="relative h-64 md:h-72 overflow-hidden">
                <img
                  src={item.imageUrl}
                  loading="lazy"
                  className="w-full h-full object-cover 
                            group-hover:scale-110 group-hover:brightness-125
                            transition-all duration-700 ease-out"
                />
                
                {/* 🔥 Gradient Overlay */}
                <div className="absolute inset-0 
                               bg-gradient-to-t from-black/80 via-black/40 to-transparent
                               group-hover:from-black/60 group-hover:via-black/20
                               transition-all duration-700" />
              </div>

              {/* 🔥 CONTENT */}
              <div className="p-8">
                <h2 className="text-yellow-400 text-xl md:text-2xl font-bold mb-3 
                              group-hover:text-yellow-300 transition-colors duration-300
                              line-clamp-1">
                  {item.title?.[lang] || item.title?.en}
                </h2>

                <p className="text-gray-300 text-base leading-relaxed mb-6 
                             line-clamp-3 group-hover:line-clamp-4
                             transition-all duration-300">
                  {item.description?.[lang] || item.description?.en}
                </p>

                {/* 🔥 BOTTOM BAR */}
                <div className="flex items-center justify-between pt-4 border-t border-yellow-500/20">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="flex items-center gap-2">
                      <i className="fas fa-map-marker-alt text-yellow-400"></i>
                      {item.location || "Kuwait"}
                    </span>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20
                                 border border-yellow-500/30
                                 text-yellow-400 px-5 py-2 rounded-2xl font-semibold
                                 text-sm shadow-lg hover:shadow-yellow-500/30
                                 transition-all duration-300 hover:scale-105">
                    {item.category}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* 🔥 LOAD MORE */}
      <div ref={loader} className="h-20 flex justify-center items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 text-gray-500 text-lg font-medium"
        >
          <div className="w-8 h-8 border-3 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin"></div>
          <span>Loading more...</span>
        </motion.div>
      </div>

      {/* 🔥 PREMIUM MODAL - Enhanced */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className="w-full max-w-4xl max-h-[90vh] relative bg-gradient-to-b from-[#111] to-[#0a0a0a]
                         rounded-3xl border-2 border-yellow-500/30 shadow-4xl shadow-yellow-500/20
                         backdrop-blur-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* 🔥 CLOSE BUTTON */}
              <motion.button
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 w-14 h-14 bg-black/50 hover:bg-yellow-500/20
                           border-2 border-yellow-500/50 rounded-2xl flex items-center justify-center
                           text-2xl text-yellow-400 hover:text-white transition-all duration-300
                           backdrop-blur-xl shadow-2xl hover:scale-110 z-10"
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-times"></i>
              </motion.button>

              {/* 🔥 IMAGE */}
              <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
                <img
                  src={selected.imageUrl}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>

              {/* 🔥 CONTENT */}
              <div className="p-10">
                <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-6 
                              bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                  {selected.title?.[lang] || selected.title?.en}
                </h2>
                
                <p className="text-gray-200 text-xl leading-relaxed mb-8 max-w-3xl">
                  {selected.description?.[lang] || selected.description?.en}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-yellow-500/30">
                  <div className="flex items-center gap-6 text-lg text-gray-300">
                    <span className="flex items-center gap-3">
                      <i className="fas fa-map-marker-alt text-yellow-400 text-xl"></i>
                      <span>{selected.location || "Kuwait"}</span>
                    </span>
                  </div>
                  
                  <div className="bg-gradient-to-r from-yellow-500/30 to-yellow-600/30
                                 border-2 border-yellow-500/50
                                 text-yellow-400 px-8 py-4 rounded-3xl font-bold text-xl
                                 shadow-2xl shadow-yellow-500/30 hover:shadow-yellow-500/50
                                 transition-all duration-300 hover:scale-105">
                    {selected.category}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;