import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LanguageContext";
import { useMode } from "../context/ModeContext";
import { FaChevronDown, FaWhatsapp } from "react-icons/fa";

const FAQ = () => {
  const { lang } = useLang();
  const { mode } = useMode();

  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  /* 🔥 MODE BASED NUMBERS */
  const numbers = {
    masna: "96599575150",
    contractor: "96555807419"
  };

  const WHATSAPP = numbers[mode];

  /* 🔥 FAQ DATA (SMART + SERVICES BASED) */
  const faqData = [
    {
      q: {
        en: "Do you provide custom designs?",
        ar: "هل تقدمون تصاميم مخصصة؟"
      },
      a: {
        en: "Yes, all designs are fully customized based on your space.",
        ar: "نعم، جميع التصاميم مخصصة بالكامل حسب المساحة."
      }
    },
    {
      q: {
        en: "What materials do you use?",
        ar: "ما هي المواد المستخدمة؟"
      },
      a: {
        en: "We use premium quality materials for luxury finishing.",
        ar: "نستخدم مواد عالية الجودة لضمان الفخامة."
      }
    },
    {
      q: {
        en: "Do you handle full project execution?",
        ar: "هل تنفذون المشروع بالكامل؟"
      },
      a: {
        en: "Yes, we provide complete turnkey solutions.",
        ar: "نعم، نقدم تنفيذ كامل للمشاريع."
      }
    },
    {
      q: {
        en: "How long does a project take?",
        ar: "كم يستغرق تنفيذ المشروع؟"
      },
      a: {
        en: "Timeline depends on project size, but delivery is always on time.",
        ar: "المدة تعتمد على حجم المشروع، مع التزامنا بالوقت."
      }
    },
    {
      q: {
        en: "Do you work on villas?",
        ar: "هل تعملون على الفلل؟"
      },
      a: {
        en: "Yes, we specialize in luxury villas and interiors.",
        ar: "نعم، نحن متخصصون في الفلل الفاخرة."
      }
    },
    {
      q: {
        en: "Is site supervision included?",
        ar: "هل يوجد إشراف على الموقع؟"
      },
      a: {
        en: "Yes, full supervision is provided for quality control.",
        ar: "نعم، يتم الإشراف الكامل لضمان الجودة."
      }
    },
    {
      q: {
        en: "Do you offer consultation?",
        ar: "هل تقدمون استشارة؟"
      },
      a: {
        en: "Yes, we guide you before starting the project.",
        ar: "نعم، نقدم استشارة قبل بدء المشروع."
      }
    },
    {
      q: {
        en: "Can I modify the design?",
        ar: "هل يمكن تعديل التصميم؟"
      },
      a: {
        en: "Yes, small changes can be made during execution.",
        ar: "نعم، يمكن تعديل التصميم أثناء التنفيذ."
      }
    },

    /* EXTRA (READ MORE) */
    {
      q: {
        en: "Do you provide lighting solutions?",
        ar: "هل توفرون إضاءة؟"
      },
      a: {
        en: "Yes, modern lighting is included in our services.",
        ar: "نعم، نقدم حلول إضاءة حديثة."
      }
    },
    {
      q: {
        en: "What makes your work premium?",
        ar: "ما الذي يجعل عملكم مميزاً؟"
      },
      a: {
        en: "Precision, materials, and finishing define our quality.",
        ar: "الدقة والتشطيب يميز عملنا."
      }
    }
  ];

  const visibleFaqs = showAll ? faqData : faqData.slice(0, 8);

  return (
    <div className="bg-black text-white py-24 px-4 md:px-20">

      {/* 🔥 HEADER */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-4">
          {lang === "ar" ? "الأسئلة الشائعة" : "FAQ"}
        </h1>
        <p className="text-gray-400">
          {lang === "ar"
            ? "كل ما تحتاج معرفته"
            : "Everything you need to know"}
        </p>
      </div>

      {/* 🔥 FAQ LIST */}
      <div className="max-w-4xl mx-auto space-y-6">

        {visibleFaqs.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="border border-yellow-500/20 rounded-2xl overflow-hidden 
                       bg-gradient-to-b from-[#111] to-[#050505]"
          >
            {/* QUESTION */}
            <div
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex justify-between items-center p-6 cursor-pointer"
            >
              <h2 className="text-lg md:text-xl font-semibold text-yellow-400">
                {item.q[lang]}
              </h2>

              <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }}>
                <FaChevronDown />
              </motion.div>
            </div>

            {/* ANSWER */}
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6 text-gray-300"
                >
                  {item.a[lang]}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

      </div>

      {/* 🔥 READ MORE */}
      <div className="text-center mt-12">
        <motion.button
          onClick={() => setShowAll(!showAll)}
          whileHover={{ scale: 1.08 }}
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-8 py-3 rounded-full font-semibold shadow-lg"
        >
          {showAll
            ? (lang === "ar" ? "عرض أقل" : "Show Less")
            : (lang === "ar" ? "عرض المزيد" : "Read More")}
        </motion.button>
      </div>

      {/* 🔥 CTA SECTION */}
      <div className="mt-20 max-w-4xl mx-auto text-center
                      bg-gradient-to-b from-[#111] to-[#050505]
                      border border-yellow-500/20
                      rounded-3xl p-10 shadow-[0_20px_60px_rgba(255,215,0,0.15)]">

        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4">
          {lang === "ar" ? "هل لديك أسئلة أخرى؟" : "Still have questions?"}
        </h2>

        <p className="text-gray-300 mb-8 text-lg">
          {lang === "ar"
            ? "إذا كنت بحاجة إلى المزيد، تواصل مع فريقنا."
            : "If any other, consult our team."}
        </p>

        <motion.a
          href={`https://wa.me/${WHATSAPP}`}
          target="_blank"
          whileHover={{ scale: 1.08 }}
          className="inline-flex items-center gap-3
                     bg-green-500 hover:bg-green-600
                     px-10 py-4 rounded-full font-semibold text-lg
                     shadow-xl hover:shadow-green-500/40"
        >
          <FaWhatsapp className="text-2xl" />
          {lang === "ar" ? "واتساب" : "WhatsApp"}
        </motion.a>
      </div>

    </div>
  );
};

export default FAQ;