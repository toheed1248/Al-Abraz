import { useMode } from "../context/ModeContext";
import { useLang } from "../context/LanguageContext";
import { motion } from "framer-motion";
import {
  FaLightbulb,
  FaTools,
  FaCouch,
  FaLayerGroup,
  FaGem,
  FaCrown,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import { useRef, useEffect, useState } from "react";

const Services = () => {
  const { mode } = useMode();
  const { lang } = useLang();

  const sliderRef = useRef(null);
  const [selected, setSelected] = useState(null);

  /* 🔥 SMOOTH AUTO INTRO (Apple feel) */
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    setTimeout(() => {
      slider.scrollBy({
        left: slider.offsetWidth * 0.6,
        behavior: "smooth"
      });
    }, 400);

    setTimeout(() => {
      slider.scrollTo({
        left: 0,
        behavior: "smooth"
      });
    }, 2000);
  }, []);

  /* 🔥 SLIDE BUTTONS */
  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -sliderRef.current.offsetWidth * 0.8,
      behavior: "smooth"
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth * 0.8,
      behavior: "smooth"
    });
  };

  const content = {
    masna: {
      title: { en: "Our Masna Services", ar: "خدمات المصنع" },
      tagline: {
        en: "Crafting luxury with precision.",
        ar: "نصنع الفخامة بدقة"
      },
      services: [
  { icon:<FaLayerGroup/>, title:{en:"POP Ceiling",ar:"أسقف جبسية"}, desc:{en:"Luxury ceiling finishing.",ar:"تشطيبات سقف فاخرة."}, img:"/images/Services masna1.jpg"},
  { icon:<FaTools/>, title:{en:"POP Sheet Ceiling",ar:"ألواح جبس"}, desc:{en:"Smooth gypsum sheet ceiling.",ar:"ألواح جبسية ناعمة."}, img:"/images/Services masna2.jpg"},
  { icon:<FaGem/>, title:{en:"POP Sheet Carving",ar:"نقش الجبس"}, desc:{en:"Custom carved sheet design.",ar:"نقوش مخصصة."}, img:"/images/Services masna3.jpg"},
  { icon:<FaCouch/>, title:{en:"Wall Moulding",ar:"زخارف الجدران"}, desc:{en:"Elegant wall finishing.",ar:"تشطيبات أنيقة."}, img:"/images/Services masna 4.jpg"},
  { icon:<FaLayerGroup/>, title:{en:"Decor Panels",ar:"ألواح زخرفية"}, desc:{en:"Luxury panels.",ar:"ألواح فاخرة."}, img:"/images/Services masna5.jpg"},
  { icon:<FaCrown/>, title:{en:"Cornice Work",ar:"كورنيش"}, desc:{en:"Ceiling border design.",ar:"كورنيش فاخر."}, img:"/images/Services masna6.jpg"},
  { icon:<FaGem/>, title:{en:"Arch Design",ar:"تصميم أقواس"}, desc:{en:"Luxury arch work.",ar:"تصميم أقواس."}, img:"/images/Services masna7.jpg"},
  { icon:<FaTools/>, title:{en:"Hand Carving",ar:"نقش يدوي"}, desc:{en:"Fine detail carving.",ar:"تفاصيل دقيقة."}, img:"/images/Services masna8.jpg"},
  { icon:<FaLayerGroup/>, title:{en:"Custom Gypsum",ar:"جبس مخصص"}, desc:{en:"Custom design work.",ar:"تصاميم حسب الطلب."}, img:"/images/Services masna9.jpg"},
  { icon:<FaCrown/>, title:{en:"Classic Design",ar:"تصميم كلاسيك"}, desc:{en:"Royal style interiors.",ar:"تصاميم كلاسيكية."}, img:"/images/Services masna10.jpg"}
]
    },

    contractor: {
      title: { en: "Our Contractor Services", ar: "خدمات المقاولات" },
      tagline: {
        en: "Execution defines luxury living.",
        ar: "التنفيذ هو الفخامة"
      },
      services: [
  { icon:<FaLightbulb/>, title:{en:"Lighting",ar:"إضاءة"}, desc:{en:"Modern LED systems.",ar:"إضاءة حديثة."}, img:"/images/Contractor service 1.jpg"},
  { icon:<FaTools/>, title:{en:"Pillar Work",ar:"الأعمدة"}, desc:{en:"Luxury pillars.",ar:"أعمدة فاخرة."}, img:"/images/Contractor service 2.jpg"},
  { icon:<FaLayerGroup/>, title:{en:"Wall Panels",ar:"الجدران"}, desc:{en:"Wall panel design.",ar:"تصميم الجدران."}, img:"/images/Contractor service 3.jpg"},
  { icon:<FaGem/>, title:{en:"False Ceiling",ar:"أسقف مستعارة"}, desc:{en:"Modern ceilings.",ar:"أسقف حديثة."}, img:"/images/Contractor service 4.jpg"},
  { icon:<FaCrown/>, title:{en:"Villa Work",ar:"فلل"}, desc:{en:"Luxury villa interior.",ar:"فلل فاخرة."}, img:"/images/Contractor service 5.jpg"},
  { icon:<FaTools/>, title:{en:"Turnkey",ar:"تنفيذ كامل"}, desc:{en:"Complete projects.",ar:"تنفيذ كامل."}, img:"/images/Contractor service 6.jpg"},
  { icon:<FaLayerGroup/>, title:{en:"Ceiling Design",ar:"تصميم سقف"}, desc:{en:"Modern ceiling style.",ar:"تصميم حديث."}, img:"/images/Contractor service 7.jpg"},
  { icon:<FaGem/>, title:{en:"Interior Work",ar:"تشطيبات"}, desc:{en:"Full finishing.",ar:"تشطيبات كاملة."}, img:"/images/Contractor service 8.jpg"},
  { icon:<FaCrown/>, title:{en:"Luxury Finish",ar:"تشطيب فاخر"}, desc:{en:"Premium finishing.",ar:"تشطيب فاخر."}, img:"/images/Contractor service 9.jpg"},
  { icon:<FaTools/>, title:{en:"Custom Work",ar:"مخصص"}, desc:{en:"Custom design.",ar:"حسب الطلب."}, img:"/images/Contractor service 10.jpg"}
]
    }
  };

  const data = content[mode];

  const numbers = {
    masna: "+96599575150",
    contractor: "+96555807419"
  };

  const whatsappLink = `https://wa.me/${numbers[mode].replace("+", "")}`;

  return (
    <div className="bg-black text-white py-24 px-4 md:px-20">

      {/* HEADER */}
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-4">
          {data.title[lang]}
        </h1>
        <p className="text-gray-400">{data.tagline[lang]}</p>
      </div>

      {/* SLIDER WRAPPER */}
      <div className="relative">

        {/* LEFT BUTTON */}
        <button
          onClick={scrollLeft}
          className="hidden md:flex absolute left-[-25px] top-1/2 -translate-y-1/2 z-10
          bg-black/60 backdrop-blur-md border border-yellow-500/20
          text-white p-3 rounded-full hover:scale-110 transition"
        >
          <FaChevronLeft />
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={scrollRight}
          className="hidden md:flex absolute right-[-25px] top-1/2 -translate-y-1/2 z-10
          bg-black/60 backdrop-blur-md border border-yellow-500/20
          text-white p-3 rounded-full hover:scale-110 transition"
        >
          <FaChevronRight />
        </button>

        {/* SLIDER */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-6 scroll-smooth snap-x snap-mandatory"
        >
          {data.services.map((item, i) => (
            <motion.div
              key={i}
              onClick={() => setSelected(item)}
              whileHover={{ scale: 1.05 }}
              className="
                snap-center
                min-w-[85%]
                sm:min-w-[60%]
                md:min-w-[32%]
                rounded-3xl
                overflow-hidden
                bg-gradient-to-b from-[#111] to-[#050505]
                border border-yellow-500/10
                shadow-[0_0_40px_rgba(255,215,0,0.08)]
                group
              "
            >
              {/* IMAGE */}
              <div className="h-[260px] overflow-hidden relative">
                <img
                  src={item.img}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition" />
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <div className="text-yellow-400 text-3xl mb-3">
                  {item.icon}
                </div>

                <h2 className="text-lg md:text-xl font-semibold mb-2">
                  {item.title[lang]}
                </h2>

                <p className="text-gray-400 text-sm">
                  {item.desc[lang]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-4xl w-full p-6"
          >
            <img
              src={selected.img}
              className="w-full max-h-[70vh] object-contain rounded-xl mb-6"
            />
            <h2 className="text-2xl text-yellow-400 mb-2">
              {selected.title[lang]}
            </h2>
            <p className="text-gray-300">
              {selected.desc[lang]}
            </p>
          </motion.div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-24 text-center">
        <p className="text-gray-300 mb-4">
          {lang === "ar"
            ? "هل لديك فكرة؟ دعنا نحولها إلى واقع"
            : "Have a vision? Let’s turn it into reality."}
        </p>

        <motion.a
          whileHover={{ scale: 1.08 }}
          href={whatsappLink}
          className="bg-green-500 hover:bg-green-600 px-10 py-4 rounded-full font-semibold shadow-xl"
        >
          {lang === "ar" ? "استشارة الآن" : "Consult Now"}
        </motion.a>

      </div>

    </div>
  );
};

export default Services;