import { useMode } from "../context/ModeContext";
import { useLang } from "../context/LanguageContext";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaCrown, FaTools, FaGem } from "react-icons/fa";

/* COUNTER SAME */
const Counter = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const step = target / 50;
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setCount(Math.floor(current));
    }, 30);
    return () => clearInterval(interval);
  }, [target]);

  return <span>{count}+</span>;
};

const About = () => {
  const { mode } = useMode();
  const { lang } = useLang();
  const [showAll, setShowAll] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [6, -6]);
  const rotateY = useTransform(x, [-100, 100], [-6, 6]);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  /* CONTENT */
  const content = {
    masna: {
      title: { en: "About Our Masna", ar: "عن مصنعنا" },
      desc: {
        en: "We craft premium POP designs with luxury finishing and artistic precision.",
        ar: "نصنع تصاميم جبسية فاخرة بدقة عالية وتشطيب راقٍ."
      },
      tagline: {
        en: "Crafting Luxury Interiors with Precision & Passion",
        ar: "نصنع الفخامة بدقة وشغف"
      },
      works: [
        { en: "Wall Design Panels", ar: "ألواح تصميم الجدران" },
        { en: "Ceiling Art Structures", ar: "هياكل فنية للأسقف" },
        { en: "POP Luxury Frames", ar: "إطارات جبسية فاخرة" }
      ],
      images: [
        "/images/About masna 1.jpeg",
        "/images/About masna 2.jpeg",
        "/images/About masna 3.jpeg",
        "/images/About masna 4.jpeg"
      ]
    },

    contractor: {
      title: { en: "About Our Contractor", ar: "عن المقاولات" },
      desc: {
        en: "We execute full interior projects with high-end finishing.",
        ar: "ننفذ مشاريع داخلية متكاملة بجودة عالية."
      },
      tagline: {
        en: "Crafting Luxury Interiors with Precision & Passion",
        ar: "نصنع الفخامة بدقة وشغف"
      },
      works: [
        { en: "POP Ceiling Work", ar: "أعمال الأسقف الجبسية" },
        { en: "Lighting Installation", ar: "تركيب الإضاءة" },
        { en: "Luxury Finishing", ar: "تشطيبات فاخرة" }
      ],
      images: [
        "/images/contractor about 1.jpg",
        "/images/contractor about 2.jpg",
        "/images/contractor about 3.jpg",
        "/images/contractor about 5.jpg"
      ]
    }
  };

  const d = content[mode];

  const numbers = {
    masna: "+96599575150",
    contractor: "+96555807419"
  };

  const whatsappLink = `https://wa.me/${numbers[mode].replace("+", "")}`;

  return (
    <div className="bg-black text-white py-24 px-4 md:px-20">

      {/* 🔥 HERO TRUST BLOCK */}
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold text-yellow-400 mb-3">
          Tarique Solanki
        </h1>

        <p className="text-gray-300 italic mb-4">
          {d.tagline[lang]}
        </p>

        <div className="flex justify-center gap-8 text-sm text-gray-400">
          <span>⭐ 15+ {lang === "ar" ? "سنة خبرة" : "Years Experience"}</span>
          <span>⭐ 200+ {lang === "ar" ? "عملاء سعداء" : "Happy Clients"}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-center">

        {/* 🎯 VISUAL GRID */}
        <motion.div
          style={{ rotateX, rotateY }}
          onMouseMove={handleMove}
          onMouseLeave={() => { x.set(0); y.set(0); }}
          className="grid grid-cols-2 gap-5"
        >
          {d.images.map((img, i) => (
            <div key={i}
              className={`overflow-hidden rounded-2xl border border-yellow-500/30 ${i === 0 ? "col-span-2 h-[300px]" : "h-[180px]"} group`}>
              <img
                src={img}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
            </div>
          ))}
        </motion.div>

        {/* 💎 GLASS CARD */}
        <div className="bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-yellow-500/20 shadow-[0_0_40px_rgba(255,215,0,0.15)]">

          <h2 className="text-2xl text-yellow-400 mb-6">
            {d.title[lang]}
          </h2>

          <p className="text-gray-400 mb-6">
            {d.desc[lang]}
          </p>

          {/* SERVICES */}
          <div className="space-y-4 mb-8">
            {d.works.map((w, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 bg-black/40 p-3 rounded-xl hover:shadow-[0_0_15px_gold]"
              >
                {i === 0 && <FaTools className="text-yellow-400" />}
                {i === 1 && <FaCrown className="text-yellow-400" />}
                {i === 2 && <FaGem className="text-yellow-400" />}
                <span>{w[lang]}</span>
              </motion.div>
            ))}
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-black/40 p-4 rounded-xl text-center">
              <h3 className="text-yellow-400 text-xl font-bold">
                <Counter target={200} />
              </h3>
              <p className="text-gray-400 text-sm">
                {lang === "ar" ? "عملاء سعداء" : "Happy Clients"}
              </p>
            </div>

            <div className="bg-black/40 p-4 rounded-xl text-center">
              <h3 className="text-yellow-400 text-xl font-bold">
                <Counter target={300} />
              </h3>
              <p className="text-gray-400 text-sm">
                {lang === "ar" ? "مشاريع" : "Projects"}
              </p>
            </div>
          </div>

          {/* ⚡ CTA */}
          <div className="text-center">
            <p className="text-gray-300 mb-4">
              {lang === "ar"
                ? "هل لديك فكرة؟ دعنا نحولها إلى واقع"
                : "Have a vision? Let’s turn it into reality."}
            </p>

            <a
              href={whatsappLink}
              target="_blank"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full mb-3"
            >
              <FaWhatsapp />
              {lang === "ar" ? "استشارة مع المالك" : "Consult with Owner"}
            </a>

            <div className="text-xs text-gray-500 flex justify-center gap-4">
              <span>⏱ Quick Response</span>
              <span>🔒 Trusted Work</span>
              <span>💼 Professional</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default About;