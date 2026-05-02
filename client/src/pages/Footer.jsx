import { useMode } from "../context/ModeContext";
import { useLang } from "../context/LanguageContext";
import { FaWhatsapp, FaFacebookF, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const { mode } = useMode();
  const { lang } = useLang();

  const WHATSAPP = "+96555807419";
  const EMAIL = "youremail@gmail.com";

  const content = {
    masna: {
      desc: {
        en: "10+ years crafting premium POP designs including panels, pillars, and custom carvings.",
        ar: "أكثر من 10 سنوات في تصميم الجبس الفاخر مثل الألواح والأعمدة والتصاميم اليدوية.",
      },
      services: [
        { en: "POP Panel Design", ar: "تصميم ألواح الجبس" },
        { en: "Pillar Carving Design", ar: "نحت الأعمدة" },
        { en: "Custom POP Patterns", ar: "تصاميم جبسية مخصصة" },
        { en: "Luxury Wall Moulding", ar: "زخارف الجدران الفاخرة" },
      ],
       images: [
        "/images/About masna 1.jpeg",
        "/images/About masna 2.jpeg",
        "/images/About masna 3.jpeg",
        "/images/About masna 4.jpeg"
      ],
    },

    contractor: {
      desc: {
        en: "Professional contractor work including ceiling lighting, interior finishing, and modern design execution.",
        ar: "أعمال مقاولات احترافية تشمل الإضاءة والأسقف والتشطيبات الداخلية الحديثة.",
      },
      services: [
        { en: "Ceiling Lighting Setup", ar: "تركيب إضاءة السقف" },
        { en: "Interior Finishing", ar: "تشطيبات داخلية" },
        { en: "Modern Ceiling Design", ar: "تصميم سقف حديث" },
        { en: "Villa & Office Work", ar: "أعمال الفلل والمكاتب" },
      ],
      images: [
        "/images/contractor about 1.jpg",
        "/images/contractor about 2.jpg",
        "/images/contractor about 3.jpg",
        "/images/contractor about 5.jpg"
      ],
    },
  };

  const t = {
    services: { en: "Services", ar: "الخدمات" },
    gallery: { en: "Our Work", ar: "أعمالنا" },
    contact: { en: "Contact", ar: "اتصل بنا" },
    newsletter: { en: "Newsletter", ar: "النشرة البريدية" },
    subscribe: { en: "Subscribe", ar: "اشترك" },
    placeholder: {
      en: "Enter your email",
      ar: "أدخل بريدك الإلكتروني",
    },
  };

  const data = content[mode];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`bg-black text-white pt-16 pb-8 px-6 ${
        lang === "ar" ? "text-right" : ""
      }`}
    >

      {/* ✅ SAFE CONTAINER */}
      <div className="max-w-[1200px] mx-auto">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* 🔥 BRAND */}
          <div>
            <h2 className="text-2xl text-yellow-400 mb-3">
              Tarique Solanki
            </h2>

            <p className="text-gray-400 text-sm leading-relaxed">
              {data.desc[lang]}
            </p>

            <a
              href={`https://wa.me/${WHATSAPP}`}
              className="inline-block mt-4 bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-yellow-400"
            >
              {lang === "ar" ? "استشارة مجانية" : "Free Consultation"}
            </a>
          </div>

          {/* 🔥 SERVICES */}
          <div>
            <h3 className="text-yellow-400 mb-3">
              {t.services[lang]}
            </h3>

            <ul className="space-y-2 text-gray-400 text-sm">
              {data.services.map((s, i) => (
                <li key={i} className="hover:text-yellow-400 transition">
                  {s[lang]}
                </li>
              ))}
            </ul>
          </div>

          {/* 🔥 MINI GALLERY */}
          <div>
            <h3 className="text-yellow-400 mb-3">
              {t.gallery[lang]}
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {data.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="w-full h-auto rounded-lg transition hover:scale-105"
                />
              ))}
            </div>
          </div>

          {/* 🔥 CONTACT + NEWSLETTER */}
          <div>
            <h3 className="text-yellow-400 mb-3">
              {t.contact[lang]}
            </h3>

            <p className="text-gray-400 text-sm mb-2">
              📍 {lang === "ar" ? "الكويت" : "Kuwait"}
            </p>

            <p className="text-gray-400 text-sm mb-4">
              📞 +{WHATSAPP}
            </p>

            {/* SOCIAL */}
            <div className="flex gap-4 text-lg mb-4">
              <a href={`https://wa.me/${WHATSAPP}`}>
                <FaWhatsapp />
              </a>
              <a href="#">
                <FaFacebookF />
              </a>
              <a href={`mailto:${EMAIL}`}>
                <FaEnvelope />
              </a>
            </div>

            {/* NEWSLETTER */}
            <h4 className="text-yellow-400 text-sm mb-2">
              {t.newsletter[lang]}
            </h4>

            <div className="flex gap-2">
              <input
                placeholder={t.placeholder[lang]}
                className="flex-1 p-2 rounded-lg bg-black/40 border border-yellow-500/10 text-sm"
              />
              <button className="bg-yellow-500 px-3 rounded-lg text-black text-sm">
                {t.subscribe[lang]}
              </button>
            </div>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-yellow-500/10 mt-10 pt-5 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Tarique Solanki
        </div>

      </div>
    </motion.footer>
  );
};

export default Footer;