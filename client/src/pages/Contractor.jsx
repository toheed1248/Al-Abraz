import { useMode } from "../context/ModeContext";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ✅ IMPORT IMAGES */
import masna1 from "../assets/masna3.jpeg";
import masna2 from "../assets/masna4.jpeg";
import masna3 from "../assets/masna5.jpeg";
import masna4 from "../assets/masna6.jpeg";

import con1 from "../assets/sealing design 4.jpg";
import con2 from "../assets/sealing design 5.jpg";
import con3 from "../assets/sealing design 6.jpg";
import con4 from "../assets/sealing design 7.jpg";

/* ================= MASNA ================= */
const masnaSlides = [
  {
    img: masna1,
    title: "Luxury POP Craftsmanship",
    desc: "Intricate handmade gypsum designs crafted with precision and elegance",
  },
  {
    img: masna2,
    title: "Classic Wall Moulding",
    desc: "Elegant decorative patterns inspired by royal interiors",
  },
  {
    img: masna3,
    title: "Premium Artistic Panels",
    desc: "Custom ornamental panels that enhance luxury spaces",
  },
  {
    img: masna4,
    title: "Designer Wall Textures",
    desc: "Unique patterns built for modern interiors",
  },
];

/* ================= CONTRACTOR ================= */
const contractorSlides = [
  {
    img: con1,
    title: "Modern Ceiling Lighting",
    desc: "Advanced LED ceiling systems with warm lighting",
  },
  {
    img: con2,
    title: "Luxury Interior Designs",
    desc: "Premium finishing for villas & offices",
  },
  {
    img: con3,
    title: "Architectural Concepts",
    desc: "Smart geometric ceiling designs",
  },
  {
    img: con4,
    title: "Elegant Chandelier Setup",
    desc: "Luxury ceiling with premium lighting",
  },
];

const Hero = () => {
  const { mode } = useMode();
  const [index, setIndex] = useState(0);

  const slides = mode === "masna" ? masnaSlides : contractorSlides;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  return (
    <div className="relative h-[90vh] w-full overflow-hidden">

      <AnimatePresence mode="wait">
        <motion.img
          key={slides[index].img}
          src={slides[index].img}
          className="absolute w-full h-full object-cover scale-110 blur-[2px]"
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/70"></div>

      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 text-white max-w-3xl">

        <motion.h1
          key={slides[index].title}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl md:text-6xl font-bold mb-4 text-yellow-400"
        >
          {slides[index].title}
        </motion.h1>

        <motion.p
          key={slides[index].desc}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-sm md:text-lg text-gray-300 mb-6"
        >
          {slides[index].desc}
        </motion.p>

        <a
          href="https://wa.me/96512345678"
          target="_blank"
          className="w-fit bg-yellow-500 text-black px-6 py-3 rounded-full"
        >
          Get Free Consultation
        </a>

      </div>
    </div>
  );
};

export default Hero;