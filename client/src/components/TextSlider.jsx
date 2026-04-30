import { useMode } from "../context/ModeContext";
import { useLang } from "../context/LanguageContext";
import { useState } from "react";

const TextSlider = () => {
  const { mode } = useMode();
  const { lang } = useLang();
  const [hovered, setHovered] = useState(false);

  const data = {
    masna: [
      { key: "pop", en: "POP Design", ar: "تصاميم جبسية" },
      { key: "wall", en: "Wall Moulding", ar: "زخارف الجدران" },
      { key: "panel", en: "Decor Panels", ar: "ألواح زخرفية" },
      { key: "ceiling", en: "Ceiling Art", ar: "تصاميم الأسقف" },
      { key: "luxury", en: "Luxury Finish", ar: "تشطيبات فاخرة" }
    ],
    contractor: [
      { key: "light", en: "Ceiling Lighting", ar: "إضاءة السقف" },
      { key: "wall", en: "Wall Design", ar: "تصميم الجدران" },
      { key: "pillar", en: "Pillar Work", ar: "أعمال الأعمدة" },
      { key: "tv", en: "TV Wall Design", ar: "خلفيات التلفاز" },
      { key: "hall", en: "Hall Decoration", ar: "ديكور الصالات" }
    ]
  };

  const items = data[mode];

  // 🔥 CLICK → filter gallery
  const handleClick = (key) => {
    window.dispatchEvent(new CustomEvent("filterGallery", { detail: key }));
  };

  return (
    <div className="relative w-full overflow-hidden bg-black border-y border-yellow-500/20">

      {/* 🔥 EDGE BLUR */}
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black to-transparent z-20"></div>
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black to-transparent z-20"></div>

      {/* 🔥 STRIP */}
      <div
        className="h-[70px] md:h-[80px] flex items-center"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className={`flex gap-12 whitespace-nowrap px-4 ${
            hovered ? "pause" : "animate-marquee-ultra"
          }`}
        >

          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              onClick={() => handleClick(item.key)}
              className="
                cursor-pointer
                text-sm md:text-lg
                font-semibold
                tracking-wide
                transition
                hover:scale-110
                hover:text-white
                flex items-center gap-2
                gold-text
              "
            >
              ✦ {item[lang]}
            </span>
          ))}

        </div>
      </div>
    </div>
  );
};

export default TextSlider;