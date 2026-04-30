import { useMode } from "../context/ModeContext";
import { useLang } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaWhatsapp, FaPhone } from "react-icons/fa";

const Navbar = () => {
  const { mode, setMode } = useMode();
  const { lang, setLang } = useLang();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAdmin(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAdmin(false);
    navigate("/");
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const t = {
    home: lang === "ar" ? "الرئيسية" : "Home",
    about: lang === "ar" ? "من نحن" : "About",
    services: lang === "ar" ? "الخدمات" : "Services",
    gallery: lang === "ar" ? "المعرض" : "Gallery",
    contact: lang === "ar" ? "اتصل بنا" : "Contact",
    login: lang === "ar" ? "تسجيل" : "Login",
    dashboard: lang === "ar" ? "لوحة التحكم" : "Dashboard",
    logout: lang === "ar" ? "خروج" : "Logout",
    masna: lang === "ar" ? "مصنع" : "Masna",
    contractor: lang === "ar" ? "مقاول" : "Contractor",
    whatsapp: lang === "ar" ? "واتساب" : "WhatsApp",
  };

  const contactNumbers = {
    masna: "+96599575150",
    contractor: "+96555807419",
  };

  const phoneNumber = contactNumbers[mode];
  const whatsappLink = `https://wa.me/${phoneNumber.replace("+", "")}`;

  return (
    <nav className="bg-black text-white px-4 md:px-8 py-4 flex justify-between items-center sticky top-0 z-50 border-b border-yellow-500/30 shadow-lg">

      {/* LOGO */}
      <h2
        onClick={() => scrollTo("home")}
        className="cursor-pointer font-semibold tracking-wide text-sm md:text-xl text-yellow-400 hover:text-yellow-300 transition"
      >
        {lang === "ar"
          ? mode === "masna"
            ? "الابراز مصنع"
            : "الابراز مقاول"
          : mode === "masna"
            ? "Al-Abraz Masna"
            : "Al-Abraz Contractor"}
      </h2>

      {/* DESKTOP */}
      <div className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm">

        {[
          ["home", t.home],
          ["about", t.about],
          ["services", t.services],
          ["gallery", t.gallery],
          ["contact", t.contact],
        ].map(([id, label]) => (
          <button key={id} onClick={() => scrollTo(id)} className="relative group px-2 py-1">
            {label}
            <span className="absolute left-0 -bottom-2 w-0 h-[1px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </button>
        ))}

        {/* MODE */}
        <div className="relative w-32 h-8 bg-[#111] border border-yellow-500/20 rounded-full flex items-center p-1">
          <div className={`absolute top-1 left-1 h-6 w-1/2 bg-yellow-500 rounded-full transition ${mode === "contractor" ? "translate-x-full" : ""}`} />
          <button onClick={() => setMode("masna")} className="flex-1 z-10 text-xs">{t.masna}</button>
          <button onClick={() => setMode("contractor")} className="flex-1 z-10 text-xs">{t.contractor}</button>
        </div>

        {/* LANG */}
        <div className="relative w-16 h-8 bg-[#111] border border-yellow-500/20 rounded-full flex items-center p-1">
          <div className={`absolute top-1 left-1 h-6 w-1/2 bg-white rounded-full transition ${lang === "ar" ? "translate-x-full" : ""}`} />
          <button onClick={() => setLang("en")} className="flex-1 z-10 text-xs text-black">EN</button>
          <button onClick={() => setLang("ar")} className="flex-1 z-10 text-xs text-black">AR</button>
        </div>

        <a href={`tel:${phoneNumber}`} className="hidden xl:flex items-center gap-2 bg-yellow-500 text-black px-3 py-1 rounded-full">
          <FaPhone /> {phoneNumber}
        </a>

        <a href={whatsappLink} target="_blank" className="flex items-center gap-2 bg-green-500 px-3 py-1 rounded-full">
          <FaWhatsapp />
        </a>

        {isAdmin ? (
          <>
            <button onClick={() => navigate("/admin/dashboard")}>{t.dashboard}</button>
            <button onClick={handleLogout} className="text-red-400">{t.logout}</button>
          </>
        ) : (
          <button onClick={() => navigate("/admin")}>{t.login}</button>
        )}
      </div>

      {/* HAMBURGER */}
      <button
        className="lg:hidden w-12 h-12 flex items-center justify-center bg-[#111] border border-yellow-500/30 rounded-xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="space-y-1">
          <span className={`block h-[2px] w-6 bg-yellow-400 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block h-[2px] w-6 bg-yellow-400 ${menuOpen ? "opacity-0" : ""}`}></span>
          <span className={`block h-[2px] w-6 bg-yellow-400 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </div>
      </button>

      {/* MOBILE MENU */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 bg-black/70 z-40" onClick={() => setMenuOpen(false)} />

          <div className="fixed top-0 left-0 h-full w-[80%] max-w-[340px]
bg-black border-r border-yellow-500/20
z-50 p-6 flex flex-col gap-6 animate-slideIn">

  {/* 🔥 NAV LINKS */}
  {[
    ["home", t.home],
    ["about", t.about],
    ["services", t.services],
    ["gallery", t.gallery],
    ["contact", t.contact],
  ].map(([id, label]) => (
    <button
      key={id}
      onClick={() => scrollTo(id)}
      className="
        text-left text-lg px-3 py-2 rounded-lg
        transition-all duration-300
        hover:bg-yellow-500/10
        hover:text-yellow-400
      "
    >
      {label}
    </button>
  ))}

  {/* 🔥 MODE (PREMIUM ACTIVE STATE) */}
  <div className="flex gap-3 mt-2">

    <button
      onClick={() => { setMode("masna"); setMenuOpen(false); }}
      className={`
        flex-1 py-2 rounded-xl text-sm transition-all duration-300
        ${mode === "masna"
          ? "bg-yellow-500 text-black shadow-md"
          : "bg-[#111] text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-400"}
      `}
    >
      {t.masna}
    </button>

    <button
      onClick={() => { setMode("contractor"); setMenuOpen(false); }}
      className={`
        flex-1 py-2 rounded-xl text-sm transition-all duration-300
        ${mode === "contractor"
          ? "bg-yellow-500 text-black shadow-md"
          : "bg-[#111] text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-400"}
      `}
    >
      {t.contractor}
    </button>

  </div>

  {/* 🔥 LANG */}
  <div className="flex gap-3">
    <button
      onClick={() => { setLang("en"); setMenuOpen(false); }}
      className="flex-1 py-2 rounded-xl bg-[#111] hover:bg-yellow-500/10 hover:text-yellow-400"
    >
      EN
    </button>

    <button
      onClick={() => { setLang("ar"); setMenuOpen(false); }}
      className="flex-1 py-2 rounded-xl bg-[#111] hover:bg-yellow-500/10 hover:text-yellow-400"
    >
      AR
    </button>
  </div>

  {/* 🔥 CONTACT */}
  <a
    href={`tel:${phoneNumber}`}
    onClick={() => setMenuOpen(false)}
    className="
      flex items-center gap-2 px-3 py-2 rounded-lg
      hover:bg-yellow-500/10 hover:text-yellow-400 transition
    "
  >
    <FaPhone /> {phoneNumber}
  </a>

  <a
    href={whatsappLink}
    onClick={() => setMenuOpen(false)}
    className="
      bg-green-500 px-4 py-2 rounded-xl flex items-center justify-center gap-2
      hover:scale-105 transition
    "
  >
    <FaWhatsapp /> {t.whatsapp}
  </a>

  {/* 🔥 ADMIN */}
  {isAdmin ? (
    <>
      <button
        onClick={() => { navigate("/admin/dashboard"); setMenuOpen(false); }}
        className="hover:text-yellow-400 transition"
      >
        {t.dashboard}
      </button>

      <button
        onClick={handleLogout}
        className="text-red-400 hover:text-red-500"
      >
        {t.logout}
      </button>
    </>
  ) : (
    <button
      onClick={() => { navigate("/admin"); setMenuOpen(false); }}
      className="hover:text-yellow-400 transition"
    >
      {t.login}
    </button>
  )}
</div>
        </>
      )}
    </nav>
  );
};

export default Navbar;