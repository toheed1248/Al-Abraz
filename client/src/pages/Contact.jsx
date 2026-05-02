import { useState } from "react";
import { useMode } from "../context/ModeContext";
import { useLang } from "../context/LanguageContext";
import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaFacebookF,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Contact = () => {
  const { mode } = useMode();
  const { lang } = useLang();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    message: "",
  });

  // 🔥 SEPARATE NUMBERS
  const CONTRACTOR_WHATSAPP = "96555807419";
  const MASNA_WHATSAPP = "96599575150";
  const WHATSAPP = mode === "masna" ? MASNA_WHATSAPP : CONTRACTOR_WHATSAPP;

  const t = {
    title: { en: "Get In Touch", ar: "تواصل معنا" },
    subtitle: {
      en: "We turn ideas into luxury reality.",
      ar: "نحوّل أفكارك إلى واقع فاخر",
    },
    name: { en: "Your Name", ar: "اسمك" },
    phone: { en: "Phone Number", ar: "رقم الهاتف" },
    location: { en: "Your Location", ar: "موقعك" },
    message: { en: "Project details...", ar: "تفاصيل المشروع..." },
    send: { en: "Start WhatsApp Chat", ar: "ابدأ المحادثة" },
    masna: { en: "Masna Inquiry", ar: "استفسار مصنع" },
    contractor: { en: "Contractor Inquiry", ar: "استفسار مقاولات" },
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const text = `
${mode === "masna" ? "MASNA" : "CONTRACTOR"} REQUEST

Name: ${form.name}
Phone: ${form.phone}
Location: ${form.location}

Details:
${form.message}
    `;
    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
    // 🔥 Smooth form reset
    setForm({ name: "", phone: "", location: "", message: "" });
  };

  return (
    <div className="relative bg-black text-white py-24 px-4 md:px-20 overflow-hidden">
      
      {/* 🔥 EXTRA SMOOTH BACKGROUND GLOW */}
      <motion.div 
        className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-gradient-to-br from-yellow-500/15 to-yellow-400/5 rounded-full blur-[150px]"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-gradient-to-br from-yellow-400/10 to-orange-500/5 rounded-full blur-[150px]"
        animate={{ 
          scale: [1, 1.15, 1],
          rotate: [0, -10, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* 🔥 EXTRA SMOOTH HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center mb-20"
      >
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-black text-yellow-400 mb-6"
          animate={{ 
            scale: [1, 1.05, 1],
            textShadow: [
              "0 0 20px rgba(255, 215, 0, 0.3)",
              "0 0 30px rgba(255, 215, 0, 0.5)",
              "0 0 20px rgba(255, 215, 0, 0.3)"
            ]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          {t.title[lang]}
        </motion.h1>
        <motion.p 
          className="text-gray-300 mt-3 text-lg md:text-xl px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {t.subtitle[lang]}
        </motion.p>
      </motion.div>

      {/* 🔥 YOUR ORIGINAL GRID - EXTRA SMOOTH */}
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
        
        {/* 🔥 LEFT PANEL - SMOOTH */}
        <motion.div
          initial={{ opacity: 0, x: -80, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2 
          }}
          className="glass-ultra p-8 lg:p-10 flex flex-col justify-between group hover:shadow-2xl hover:shadow-yellow-500/30 transition-all duration-700"
          whileHover={{ 
            y: -10,
            scale: 1.02,
            transition: { duration: 0.4 }
          }}
        >
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-yellow-400 mb-4 group-hover:text-yellow-300 transition-all duration-500">
                Tarique Solanki
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {mode === "masna"
                  ? "Premium POP craftsmanship with artistic precision."
                  : "Luxury interior contracting with modern execution."}
              </p>
            </motion.div>

            {/* 🔥 SMOOTH MAP */}
           <motion.div 
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.7, duration: 1 }}
  className="rounded-3xl overflow-hidden shadow-2xl shadow-black/50 hover:shadow-yellow-500/20 transition-all duration-700"
>
  <iframe 
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111336.64190663354!2d47.67764618712469!3d29.303752899344264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcff319a2c36523%3A0x6ca775c5468211f8!2sAl%20-%20Abraj%2C%20Masna%20SAAD%20-%20Gypsum%2C%20G.R.C!5e0!3m2!1sen!2sin!4v1777753474462!5m2!1sen!2sin"
    
    width="100%" 
    height="450"
    
    style={{ border: 0 }}  // ✅ FIX
    allowFullScreen        // ✅ FIX
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"  // ✅ FIX
  />
</motion.div>

            {/* 🔥 CONTACT INFO */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="flex items-center gap-4 p-5 bg-black/50 backdrop-blur-xl rounded-3xl border border-yellow-500/30 
                        hover:border-yellow-500/60 hover:bg-yellow-500/5 transition-all duration-500 shadow-xl"
            >
              <FaMapMarkerAlt className="text-yellow-400 text-2xl flex-shrink-0" />
              <div>
                <p className="text-gray-500 text-sm font-medium">Location</p>
                <p className="font-bold text-lg text-white">Kuwait</p>
              </div>
            </motion.div>
          </div>

          {/* 🔥 SOCIAL - EXTRA SMOOTH */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex gap-6 pt-8 border-t border-yellow-500/30 mt-auto"
          >
            <motion.a 
              href="https://facebook.com" 
              target="_blank"
              className="w-16 h-16 bg-black/60 hover:bg-yellow-500/20 border-2 border-yellow-500/40 
                        rounded-3xl flex items-center justify-center text-2xl shadow-xl 
                        hover:shadow-yellow-500/40 hover:scale-125 hover:rotate-180 transition-all duration-500"
              whileHover={{ scale: 1.25, rotate: 360 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaFacebookF />
            </motion.a>
            <motion.a 
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              className="w-20 h-20 bg-green-500/20 hover:bg-green-500/50 border-4 border-green-500/50 
                        rounded-3xl flex items-center justify-center text-3xl shadow-2xl 
                        hover:shadow-green-500/40 hover:scale-125 transition-all duration-500"
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaWhatsapp />
            </motion.a>
            <motion.a 
              href="mailto:youremail@gmail.com"
              className="w-16 h-16 bg-black/60 hover:bg-yellow-500/20 border-2 border-yellow-500/40 
                        rounded-3xl flex items-center justify-center text-2xl shadow-xl 
                        hover:shadow-yellow-500/40 hover:scale-125 hover:rotate-180 transition-all duration-500"
              whileHover={{ scale: 1.25, rotate: -360 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* 🔥 RIGHT FORM - EXTRA SMOOTH */}
        <motion.div
          initial={{ opacity: 0, x: 80, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.22, 1, 0.36, 1],
            delay: 0.4 
          }}
          className="glass-ultra p-8 lg:p-10 group hover:shadow-2xl hover:shadow-yellow-500/30 transition-all duration-700"
          whileHover={{ 
            y: -10,
            scale: 1.02,
            transition: { duration: 0.4 }
          }}
        >
          <motion.h2 
            className="text-yellow-400 mb-8 text-xl lg:text-2xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {mode === "masna" ? t.masna[lang] : t.contractor[lang]}
          </motion.h2>

          {/* 🔥 INPUTS - EXTRA SMOOTH */}
          <div className="space-y-5 mb-10">
            <motion.input
              name="name"
              placeholder={t.name[lang]}
              value={form.name}
              onChange={handleChange}
              className="input-ultra w-full"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            />
            
            <motion.input
              name="phone"
              placeholder={t.phone[lang]}
              value={form.phone}
              onChange={handleChange}
              className="input-ultra w-full"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            />
            
            <motion.input
              name="location"
              placeholder={t.location[lang]}
              value={form.location}
              onChange={handleChange}
              className="input-ultra w-full"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
            />
            
            <motion.textarea
              name="message"
              placeholder={t.message[lang]}
              value={form.message}
              onChange={handleChange}
              className="input-ultra h-32 w-full"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
            />
          </div>

          {/* 🔥 BUTTON - EXTRA SMOOTH */}
          <motion.button
            onClick={handleSubmit}
            className="btn-ultra w-full !py-5 !text-xl shadow-2xl hover:shadow-yellow-500/40 
                      hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 25px 50px rgba(255, 215, 0, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <FaWhatsapp className="inline-block mr-3 text-xl -ml-1" />
            {t.send[lang]}
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;