import { useMode } from "../context/ModeContext";
import { useLang } from "../context/LanguageContext";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ================= MASNA ================= */
const masnaSlides = [
  {
    img: "/images/masna1.jpeg",
    title: {
      en: "Luxury Gypsum Arch Design",
      ar: "تصميم قوس جبس فاخر"
    },
    desc: {
      en: "Elegant handcrafted arch with detailed patterns that elevate classic interiors. Designed to create a grand and luxurious entrance feel.",
      ar: "قوس جبسي فاخر بتفاصيل دقيقة يضفي لمسة كلاسيكية راقية. مصمم ليمنح المكان فخامة وأناقة مميزة."
    }
  },
  {
    img: "/images/masna 2.jpeg",
    title: {
      en: "Royal Wall Moulding",
      ar: "ديكورات جدارية ملكية"
    },
    desc: {
      en: "Premium decorative mouldings inspired by royal designs, perfect for luxury villas and interiors. Adds depth and artistic beauty to walls.",
      ar: "ديكورات جدارية مستوحاة من التصاميم الملكية تناسب الفلل الفاخرة. تضيف عمقاً وجمالاً فنياً للجدران."
    }
  },
  {
    img: "/images/masna 3.jpeg",
    title: {
      en: "Classic Floral Gypsum Panel",
      ar: "لوحات جبسية بنقوش كلاسيكية"
    },
    desc: {
      en: "Handcrafted floral patterns designed with precision for a timeless interior look. Ideal for enhancing luxury spaces.",
      ar: "نقوش زهرية مصممة يدوياً بدقة تمنح المكان طابعاً كلاسيكياً دائماً. مثالية لإضافة فخامة للمساحات."
    }
  },
  {
    img: "/images/masna 4.jpeg",
    title: {
      en: "Modern Decorative Border Design",
      ar: "تصميم حدود زخرفية حديثة"
    },
    desc: {
      en: "Stylish gypsum borders combining modern and classic patterns for clean and elegant interiors. Perfect for ceilings and walls.",
      ar: "حدود جبسية تجمع بين الطابع الحديث والكلاسيكي لإضفاء أناقة نظيفة. مثالية للأسقف والجدران."
    }
  },
  {
    img: "/images/masna 5.jpeg",
    title: {
      en: "Premium Ceiling Moulding",
      ar: "كورنيش سقف فاخر"
    },
    desc: {
      en: "Detailed ceiling mouldings designed to enhance lighting and architectural beauty. Gives a refined and premium finish.",
      ar: "كورنيش سقف بتفاصيل دقيقة يعزز الإضاءة وجمال التصميم. يمنح تشطيباً راقياً وفاخراً."
    }
  },
  {
    img: "/images/masna 6.jpeg",
    title: {
      en: "Grand Decorative Dome Design",
      ar: "تصميم قبة زخرفية فاخرة"
    },
    desc: {
      en: "Luxurious dome design with intricate detailing, perfect for creating a statement centerpiece in interiors.",
      ar: "تصميم قبة فاخرة بتفاصيل دقيقة مثالية لخلق نقطة محورية مميزة داخل المكان."
    }
  }
];

/* ================= CONTRACTOR ================= */
const contractorSlides = [
  {
    img: "/images/Contractor slider 1.jpg",
    title: {
      en: "Modern Ceiling Lighting Design",
      ar: "تصميم إضاءة سقف حديث"
    },
    desc: {
      en: "Elegant curved ceiling with soft LED lighting creating a luxurious atmosphere.",
      ar: "سقف منحني أنيق مع إضاءة LED ناعمة تمنح المكان أجواء فاخرة."
    }
  },
  {
    img: "/images/Contractor slider 2.jpg",
    title: {
      en: "Luxury Majlis Interior",
      ar: "تصميم مجلس فاخر"
    },
    desc: {
      en: "Classic Arabic majlis with rich textures and warm ambient lighting.",
      ar: "مجلس عربي كلاسيكي بلمسات فاخرة وإضاءة دافئة أنيقة."
    }
  },
  {
    img: "/images/Contractor slider 3.jpg",
    title: {
      en: "Decorative Feature Wall",
      ar: "جدار زخرفي مميز"
    },
    desc: {
      en: "Custom wall design with lighting and textured panels for a modern look.",
      ar: "تصميم جدار مخصص مع إضاءة ولوحات زخرفية لمظهر عصري."
    }
  },
  {
    img: "/images/Contractor slider 4.jpg",
    title: {
      en: "Classic Ceiling Craftsmanship",
      ar: "تصميم سقف كلاسيكي"
    },
    desc: {
      en: "Detailed gypsum ceiling inspired by classical European interiors.",
      ar: "سقف جبسي بتفاصيل دقيقة مستوحى من التصاميم الكلاسيكية."
    }
  },
  {
    img: "/images/Contractor slider 5.jpg",
    title: {
      en: "Minimal Luxury Interior",
      ar: "تصميم داخلي فاخر بسيط"
    },
    desc: {
      en: "Clean modern space with soft lighting and elegant TV wall panel.",
      ar: "مساحة حديثة نظيفة مع إضاءة ناعمة وجدار تلفاز أنيق."
    }
  },
  {
    img: "/images/Contractor slider 6.jpg",
    title: {
      en: "Architectural Pillar Design",
      ar: "تصميم أعمدة معمارية"
    },
    desc: {
      en: "Classic column detailing adding depth and luxury to interior spaces.",
      ar: "أعمدة كلاسيكية تضيف عمقاً وفخامة للمساحات الداخلية."
    }
  }
];

const Slider = () => {
  const { mode } = useMode();
  const { lang } = useLang();
  const [index, setIndex] = useState(0);

  const slides = mode === "masna" ? masnaSlides : contractorSlides;

  /* ✅ ONLY ADD THIS LOGIC */
  const contactNumbers = {
    masna: "+96599575150",
    contractor: "+96555807419",
  };

  const phoneNumber = contactNumbers[mode];
  const whatsappLink = `https://wa.me/${phoneNumber.replace("+", "")}`;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

return (
  <div className="relative h-[80vh] sm:h-[85vh] md:h-[95vh] w-full overflow-hidden">

    {/* 🔥 BACKGROUND */}
    <AnimatePresence mode="wait">
      <motion.img
        key={slides[index].img + "bg"}
        src={slides[index].img}
        className="absolute w-full h-full object-cover brightness-[0.6]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      />
    </AnimatePresence>

    {/* 🔥 FOREGROUND IMAGE (IMPROVED MOBILE VIEW) */}
    <AnimatePresence mode="wait">
      <motion.img
        key={slides[index].img + "fg"}
        src={slides[index].img}
        className="
          absolute 
          bottom-0 
          right-1/2 translate-x-1/2
          md:right-10 md:translate-x-0
          w-[100%] 
          sm:w-[85%] 
          md:w-[55%] 
          lg:w-[45%]
          object-contain
          drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]
        "
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      />
    </AnimatePresence>

    {/* 🔥 CONTENT */}
    <div
  className={`
    absolute inset-0 flex flex-col 
    md:flex-row 
    justify-center md:justify-start 
    items-center md:items-center
    px-5 sm:px-8 md:px-20 
    pt-24 md:pt-0
    text-center md:text-left
    ${lang === "ar" ? "md:ml-auto text-right" : ""}
  `}
>

      <div className="max-w-md md:max-w-xl">

        {/* TITLE */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={slides[index].title[lang]}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="
              text-2xl sm:text-3xl md:text-5xl lg:text-6xl 
              font-bold 
              text-yellow-400 
              mb-4
            "
          >
            {slides[index].title[lang]}
          </motion.h1>
        </AnimatePresence>

        {/* DESC */}
        <AnimatePresence mode="wait">
          <motion.p
            key={slides[index].desc[lang]}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base md:text-lg text-gray-200 mb-6"
          >
            {slides[index].desc[lang]}
          </motion.p>
        </AnimatePresence>

        {/* BUTTON */}
        <motion.a
          href={whatsappLink}
          target="_blank"
          whileHover={{ scale: 1.05 }}
          className="
            inline-block 
            bg-yellow-500 
            text-black 
            px-6 py-3 
            rounded-full 
            font-semibold 
            shadow-xl
          "
        >
          {lang === "ar" ? "تواصل الآن" : "Get Free Consultation"}
        </motion.a>

      </div>
    </div>

    {/* 🔥 DOTS */}
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
      {slides.map((_, i) => (
        <div
          key={i}
          className={`h-2 rounded-full transition ${
            i === index ? "bg-yellow-400 w-6" : "bg-gray-500 w-2"
          }`}
        ></div>
      ))}
    </div>

  </div>
);
};

export default Slider;