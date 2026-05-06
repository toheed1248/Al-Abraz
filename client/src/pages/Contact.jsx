import { useState } from "react";

import { useMode } from "../context/ModeContext";
import { useLang } from "../context/LanguageContext";

import { motion } from "framer-motion";

import {
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUserTie,
  FaPhoneAlt,
  FaCheckCircle,
} from "react-icons/fa";

const Contact = () => {

  const { mode } =
    useMode();

  const { lang } =
    useLang();

  const [form, setForm] =
    useState({

      name: "",
      phone: "",
      location: "",
      projectType: "",
      budget: "",
      timeline: "",
      message: "",

    });

  /* ================= NUMBERS ================= */

  const CONTRACTOR_WHATSAPP =
    "96555807419";

  const MASNA_WHATSAPP =
    "96599575150";

  const WHATSAPP =
    mode === "masna"
      ? MASNA_WHATSAPP
      : CONTRACTOR_WHATSAPP;

  /* ================= TEXT ================= */

  const t = {

    title: {
      en: "Start Your Luxury Interior Project",
      ar: "ابدأ مشروعك الداخلي الفاخر",
    },

    subtitle: {
      en: "Professional interior execution with premium finishing and trusted craftsmanship.",
      ar: "تنفيذ داخلي احترافي بتشطيبات فاخرة وجودة موثوقة.",
    },

    name: {
      en: "Full Name *",
      ar: "الاسم الكامل *",
    },

    phone: {
      en: "Phone Number *",
      ar: "رقم الهاتف *",
    },

    location: {
      en: "Project Location *",
      ar: "موقع المشروع *",
    },

    projectType: {
      en: "Project Type (Optional)",
      ar: "نوع المشروع (اختياري)",
    },

    budget: {
      en: "Estimated Budget (Optional)",
      ar: "الميزانية المتوقعة (اختياري)",
    },

    timeline: {
      en: "Expected Timeline (Optional)",
      ar: "المدة المتوقعة (اختياري)",
    },

    message: {
      en: "Describe your project... (Optional)",
      ar: "اشرح تفاصيل المشروع... (اختياري)",
    },

    send: {
      en: "Send Project Request",
      ar: "إرسال طلب المشروع",
    },

  };

  /* ================= CHANGE ================= */

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = () => {

    if (

      !form.name ||
      !form.phone ||
      !form.location

    ) {

      alert(

        lang === "ar"

          ? "يرجى إدخال الاسم ورقم الهاتف والموقع"

          : "Please fill Name, Phone and Location"

      );

      return;
    }

    const text = `

${mode === "masna"
  ? "MASNA PROJECT REQUEST"
  : "CONTRACTOR PROJECT REQUEST"}

Name:
${form.name}

Phone:
${form.phone}

Location:
${form.location}

Project Type:
${form.projectType || "Not Provided"}

Budget:
${form.budget || "Not Provided"}

Timeline:
${form.timeline || "Not Provided"}

Project Details:
${form.message || "Not Provided"}

`;

    window.open(

      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`,

      "_blank"

    );

    setForm({

      name: "",
      phone: "",
      location: "",
      projectType: "",
      budget: "",
      timeline: "",
      message: "",

    });
  };

  return (

    <section className="
      relative

      bg-black

      text-white

      py-24 md:py-32

      px-4 md:px-16

      overflow-hidden
    ">

      {/* ================= BG GLOW ================= */}

      <div className="
        absolute top-1/2 left-1/2
        -translate-x-1/2
        -translate-y-1/2

        w-[800px]
        h-[800px]

        bg-yellow-500/5

        blur-[160px]

        rounded-full
      " />

      {/* ================= HEADER ================= */}

      <div className="
        relative z-10

        text-center

        max-w-4xl

        mx-auto

        mb-20
      ">

        <div className="
          inline-flex

          items-center

          gap-3

          px-5 py-2

          rounded-full

          bg-white/[0.04]

          border border-yellow-500/10

          backdrop-blur-xl

          mb-8
        ">

          <FaCheckCircle className="
            text-yellow-400
          " />

          <span className="
            text-sm text-gray-300
          ">

            {lang === "ar"

              ? "استشارة داخلية احترافية"

              : "Professional Interior Consultation"}

          </span>

        </div>

        <h1 className="
          text-4xl md:text-6xl

          font-black

          text-yellow-400

          leading-tight

          mb-6
        ">

          {t.title[lang]}

        </h1>

        <p className="
          text-gray-400

          max-w-3xl

          mx-auto

          text-lg

          leading-relaxed
        ">

          {t.subtitle[lang]}

        </p>

      </div>

      {/* ================= MAIN GRID ================= */}

      <div className="
        relative z-10

        grid md:grid-cols-2

        gap-10

        max-w-7xl

        mx-auto
      ">

        {/* ================= LEFT ================= */}

        <motion.div

          initial={{
            opacity: 0,
            x: -40,
          }}

          whileInView={{
            opacity: 1,
            x: 0,
          }}

          viewport={{
            once: true,
          }}

          className="
            bg-[#0b0b0b]

            border border-yellow-500/10

            rounded-[36px]

            overflow-hidden

            shadow-[0_10px_80px_rgba(0,0,0,0.5)]
          "
        >

          {/* MAP */}

          <iframe

            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111336.64190663354!2d47.67764618712469!3d29.303752899344264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcff319a2c36523%3A0x6ca775c5468211f8!2sAl%20-%20Abraj%2C%20Masna%20SAAD%20-%20Gypsum%2C%20G.R.C!5e0!3m2!1sen!2sin!4v1777753474462!5m2!1sen!2sin"

            width="100%"
            height="320"

            style={{
              border: 0,
            }}

            loading="lazy"

            allowFullScreen

          />

          {/* INFO */}

          <div className="
            p-8

            space-y-6
          ">

            <div className="
              flex items-start

              gap-5
            ">

              <div className="
                w-14 h-14

                rounded-2xl

                bg-yellow-500/10

                flex items-center
                justify-center

                text-yellow-400

                text-xl
              ">

                <FaUserTie />

              </div>

              <div>

                <h2 className="
                  text-2xl

                  font-bold

                  mb-2
                ">

                  Tarique Solanki

                </h2>

                <p className="
                  text-gray-400

                  leading-relaxed
                ">

                  {mode === "masna"

                    ? "Premium POP & gypsum craftsmanship with luxury finishing."

                    : "Luxury interior contractor with modern execution expertise."}

                </p>

              </div>

            </div>

            {/* CONTACT INFO */}

            <div className="
              space-y-4
            ">

              <div className="
                flex items-center

                gap-4
              ">

                <FaMapMarkerAlt className="
                  text-yellow-400
                " />

                <span className="
                  text-gray-300
                ">

                  Kuwait

                </span>

              </div>

              <div className="
                flex items-center

                gap-4
              ">

                <FaPhoneAlt className="
                  text-yellow-400
                " />

                <span className="
                  text-gray-300
                ">

                  +{WHATSAPP}

                </span>

              </div>

              <div className="
                flex items-center

                gap-4
              ">

                <FaEnvelope className="
                  text-yellow-400
                " />

                <span className="
                  text-gray-300
                ">

                  luxuryinterior@gmail.com

                </span>

              </div>

            </div>

          </div>

        </motion.div>

        {/* ================= RIGHT FORM ================= */}

        <motion.div

          initial={{
            opacity: 0,
            x: 40,
          }}

          whileInView={{
            opacity: 1,
            x: 0,
          }}

          viewport={{
            once: true,
          }}

          className="
            bg-[#0b0b0b]

            border border-yellow-500/10

            rounded-[36px]

            p-8 md:p-10

            shadow-[0_10px_80px_rgba(0,0,0,0.5)]
          "
        >

          <div className="
            grid gap-5
          ">

            {/* NAME */}

            <input
              name="name"
              placeholder={t.name[lang]}
              value={form.name}
              onChange={handleChange}
              className="contact-input"
            />

            {/* PHONE */}

            <input
              name="phone"
              placeholder={t.phone[lang]}
              value={form.phone}
              onChange={handleChange}
              className="contact-input"
            />

            {/* LOCATION */}

            <input
              name="location"
              placeholder={t.location[lang]}
              value={form.location}
              onChange={handleChange}
              className="contact-input"
            />

            {/* PROJECT TYPE */}

            <input
              list="projectSuggestions"

              name="projectType"

              placeholder={t.projectType[lang]}

              value={form.projectType}

              onChange={handleChange}

              className="contact-input"
            />

            <datalist id="projectSuggestions">

              <option value="Villa Interior" />
              <option value="Apartment Interior" />
              <option value="POP Ceiling Design" />
              <option value="Luxury Wall Moulding" />
              <option value="TV Wall Design" />
              <option value="Commercial Interior" />
              <option value="Office Interior" />
              <option value="Restaurant Interior" />
              <option value="Modern Ceiling" />
              <option value="False Ceiling" />
              <option value="Majlis Design" />
              <option value="Luxury Lighting" />
              <option value="Wall Panels" />
              <option value="Gypsum Work" />
              <option value="Full Interior Execution" />

            </datalist>

            {/* BUDGET */}

            <input
              list="budgetSuggestions"

              name="budget"

              placeholder={t.budget[lang]}

              value={form.budget}

              onChange={handleChange}

              className="contact-input"
            />

            <datalist id="budgetSuggestions">

              <option value="500 - 1000 KD" />
              <option value="1000 - 3000 KD" />
              <option value="3000 - 5000 KD" />
              <option value="5000+ KD" />
              <option value="Flexible Budget" />

            </datalist>

            {/* TIMELINE */}

            <input
              list="timelineSuggestions"

              name="timeline"

              placeholder={t.timeline[lang]}

              value={form.timeline}

              onChange={handleChange}

              className="contact-input"
            />

            <datalist id="timelineSuggestions">

              <option value="ASAP" />
              <option value="1 Month" />
              <option value="2-3 Months" />
              <option value="Flexible" />

            </datalist>

            {/* DESCRIPTION */}

            <textarea
              name="message"

              placeholder={t.message[lang]}

              value={form.message}

              onChange={handleChange}

              rows={6}

              className="
                contact-input

                resize-none

                min-h-[170px]
              "
            />

            {/* BUTTON */}

            <motion.button

              whileHover={{
                scale: 1.02,
              }}

              whileTap={{
                scale: 0.98,
              }}

              onClick={handleSubmit}

              className="
                mt-3

                bg-yellow-500
                hover:bg-yellow-400

                text-black

                font-bold

                py-5

                rounded-2xl

                transition-all duration-300

                shadow-[0_10px_40px_rgba(255,215,0,0.18)]
              "
            >

              <FaWhatsapp className="
                inline-block
                mr-3
                text-xl
              " />

              {t.send[lang]}

            </motion.button>

          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default Contact;