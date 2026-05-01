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
  const isFetching = useRef(false); // 🔥 anti-spam

  const { mode } = useMode();
  const { lang } = useLang();

  /* ================= FETCH ================= */
  const fetchImages = async () => {
    if (isFetching.current) return; // 🔥 prevent spam
    isFetching.current = true;

    try {
      const res = await getImages();

      if (Array.isArray(res.data?.data)) {
        setImages(res.data.data);
      } else {
        setImages([]);
      }

    } catch (err) {
      console.log(err);
      setImages([]);
    } finally {
      isFetching.current = false;
    }
  };

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    fetchImages();
  }, []);

  /* ❌ REMOVE THIS (IMPORTANT) */
  // setInterval(fetchImages, 5000);

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
              onClick={() => setSelected(item)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.imageUrl}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <h2 className="text-yellow-400 text-xl font-bold mb-2">
                  {item.title?.[lang] || item.title?.en}
                </h2>

                <p className="text-gray-400 line-clamp-2">
                  {item.description?.[lang] || item.description?.en}
                </p>
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
            className="fixed inset-0 bg-black/90 flex items-center justify-center"
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