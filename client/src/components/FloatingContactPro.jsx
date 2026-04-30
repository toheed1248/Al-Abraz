import { useState } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "../context/ModeContext";
import { useLang } from "../context/LanguageContext";

const FloatingContactPro = () => {
  const [open, setOpen] = useState(false);

  const { mode } = useMode();
  const { lang } = useLang();

  const numbers = {
    masna: "96599575150",
    contractor: "96555807419",
  };

  const WHATSAPP = numbers[mode];

  /* 🔥 REAL CHAT STYLE MESSAGES */
  const chats = {
    masna: [
      { en: "Hi, I want POP ceiling design.", ar: "أريد تصميم سقف جبس." },
      { en: "Do you do custom panels?", ar: "هل يوجد تصميم مخصص؟" },
      { en: "Luxury wall moulding price?", ar: "كم سعر الزخارف؟" },
      { en: "Need pillar carving work.", ar: "أحتاج نحت أعمدة." },
      { en: "Timeline for POP work?", ar: "كم مدة التنفيذ؟" },
    ],
    contractor: [
      { en: "Need lighting setup.", ar: "أحتاج تركيب إضاءة." },
      { en: "Villa interior work?", ar: "تصميم داخلي فيلا؟" },
      { en: "Turnkey project cost?", ar: "كم تكلفة المشروع؟" },
      { en: "False ceiling design?", ar: "تصميم سقف مستعار؟" },
      { en: "Full finishing service?", ar: "تشطيب كامل؟" },
    ],
  };

  const goToContact = () => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });
    setOpen(false);
  };

  return (
    <>
      {/* 🔥 FLOATING BUTTON */}
      <div className="fixed bottom-6 right-4 z-50">
        <motion.button
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.08 }}
          className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg"
        >
          {open ? <FaTimes /> : <FaWhatsapp />}
        </motion.button>
      </div>

      {/* 🔥 PANEL */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            className={`
              fixed bottom-24 right-4 z-50
              w-[320px] bg-black text-white
              rounded-2xl border border-gray-800 shadow-xl
              overflow-hidden
              ${lang === "ar" ? "text-right" : ""}
            `}
          >
            {/* HEADER */}
            <div className="bg-green-500 px-4 py-3 font-semibold flex justify-between">
              <span>WhatsApp</span>
              <span className="text-xs opacity-80">
                {mode === "masna" ? "Masna" : "Contractor"}
              </span>
            </div>

            {/* CHAT SCROLL */}
            <div className="max-h-[220px] overflow-y-auto p-3 space-y-2 text-sm">
              {(mode === "masna"
                ? chats.masna
                : chats.contractor
              ).map((msg, i) => (
                <div
                  key={i}
                  className="bg-[#111] px-3 py-2 rounded-lg w-fit max-w-[85%]"
                >
                  {msg[lang]}
                </div>
              ))}
            </div>

            {/* ACTIONS */}
            <div className="p-3 border-t border-gray-800 space-y-2">

              {/* CONTACT FORM BUTTON */}
              <button
                onClick={goToContact}
                className="w-full bg-yellow-500 text-black py-2 rounded-lg font-semibold"
              >
                {lang === "ar" ? "إرسال طلب" : "Send Request"}
              </button>

              {/* DIRECT WHATSAPP */}
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                className="w-full bg-green-500 py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <FaWhatsapp /> WhatsApp
              </a>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingContactPro;