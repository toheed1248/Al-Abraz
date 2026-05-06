import { useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useLang,
} from "../context/LanguageContext";

import {
  useMode,
} from "../context/ModeContext";

import {
  FaChevronDown,
  FaWhatsapp,
  FaGem,
} from "react-icons/fa";

const FAQ = () => {

  const { lang } =
    useLang();

  const { mode } =
    useMode();

  const [openIndex, setOpenIndex] =
    useState(null);

  const [visibleCount, setVisibleCount] =
    useState(8);

  /* ================= NUMBERS ================= */

  const numbers = {

    masna:
      "96599575150",

    contractor:
      "96555807419",

  };

  const WHATSAPP =
    numbers[mode];

  /* ================= FAQ DATA ================= */

  const faqData = {

    /* ================= MASNA ================= */

    masna: [

      {
        q: {
          en: "Do you create custom POP ceiling designs?",
          ar: "هل تقومون بتصميم أسقف جبسية مخصصة؟",
        },

        a: {
          en: "Yes, every POP ceiling design is customized according to the space and interior theme.",
          ar: "نعم، جميع تصاميم الأسقف الجبسية يتم تنفيذها حسب المساحة والديكور الداخلي.",
        },
      },

      {
        q: {
          en: "What type of gypsum work do you provide?",
          ar: "ما أنواع أعمال الجبس التي تقدمونها؟",
        },

        a: {
          en: "We provide ceilings, mouldings, wall panels and luxury gypsum decorations.",
          ar: "نوفر الأسقف والزخارف الجدارية والألواح الجبسية والتفاصيل الفاخرة.",
        },
      },

      {
        q: {
          en: "Do you make luxury wall mouldings?",
          ar: "هل توفرون زخارف جدارية فاخرة؟",
        },

        a: {
          en: "Yes, we specialize in premium wall moulding concepts for luxury interiors.",
          ar: "نعم، نحن متخصصون في الزخارف الجدارية الفاخرة.",
        },
      },

      {
        q: {
          en: "Can you create modern ceiling concepts?",
          ar: "هل يمكنكم تنفيذ أسقف حديثة؟",
        },

        a: {
          en: "Yes, we execute modern and luxury ceiling concepts.",
          ar: "نعم، نقوم بتنفيذ الأسقف الحديثة والفاخرة.",
        },
      },

      {
        q: {
          en: "Do you provide gypsum carving work?",
          ar: "هل تقدمون أعمال نقش الجبس؟",
        },

        a: {
          en: "Yes, handcrafted gypsum carving is part of our specialty.",
          ar: "نعم، أعمال النقش الفني من تخصصنا.",
        },
      },

      {
        q: {
          en: "What materials are used in your POP work?",
          ar: "ما المواد المستخدمة في أعمال الجبس؟",
        },

        a: {
          en: "We use high quality gypsum materials for durability and premium finishing.",
          ar: "نستخدم خامات جبسية عالية الجودة لضمان الفخامة والمتانة.",
        },
      },

      {
        q: {
          en: "Do you work on villas and apartments?",
          ar: "هل تعملون على الفلل والشقق؟",
        },

        a: {
          en: "Yes, we execute gypsum work for villas and apartments.",
          ar: "نعم، نعمل على الفلل والشقق والمساحات الداخلية الفاخرة.",
        },
      },

      {
        q: {
          en: "How long does POP work usually take?",
          ar: "كم تستغرق أعمال الجبس؟",
        },

        a: {
          en: "Execution time depends on project size and detailing.",
          ar: "تعتمد مدة التنفيذ على حجم المشروع والتفاصيل.",
        },
      },

      {
        q: {
          en: "Can I request custom ceiling ideas?",
          ar: "هل يمكنني طلب تصميم خاص؟",
        },

        a: {
          en: "Yes, every client can request unique custom ceiling concepts.",
          ar: "نعم، يمكن طلب أفكار وتصاميم مخصصة.",
        },
      },

      {
        q: {
          en: "Do you provide consultation before work?",
          ar: "هل تقدمون استشارة قبل التنفيذ؟",
        },

        a: {
          en: "Yes, we help clients choose the best ceiling and wall concepts.",
          ar: "نعم، نساعد العملاء في اختيار أفضل التصاميم.",
        },
      },

    ],

    /* ================= CONTRACTOR ================= */

    contractor: [

      {
        q: {
          en: "Do you provide complete interior contracting?",
          ar: "هل تقدمون تنفيذ داخلي متكامل؟",
        },

        a: {
          en: "Yes, we provide complete turnkey interior execution services.",
          ar: "نعم، نقدم خدمات تنفيذ داخلي متكاملة.",
        },
      },

      {
        q: {
          en: "Do you install modern lighting systems?",
          ar: "هل تقومون بتركيب الإضاءة الحديثة؟",
        },

        a: {
          en: "Yes, we execute modern lighting concepts.",
          ar: "نعم، نقوم بتنفيذ أنظمة الإضاءة الحديثة.",
        },
      },

      {
        q: {
          en: "Can you execute villa interior projects?",
          ar: "هل يمكنكم تنفيذ مشاريع الفلل؟",
        },

        a: {
          en: "Yes, villa interiors are one of our core specialties.",
          ar: "نعم، تنفيذ الديكور الداخلي للفلل من تخصصاتنا.",
        },
      },

      {
        q: {
          en: "Do you handle full finishing work?",
          ar: "هل تقومون بالتشطيبات الكاملة؟",
        },

        a: {
          en: "Yes, we handle premium finishing professionally.",
          ar: "نعم، نقوم بالتشطيبات الفاخرة باحترافية عالية.",
        },
      },

      {
        q: {
          en: "Do you work with contract agreements?",
          ar: "هل يتم العمل بعقود واضحة؟",
        },

        a: {
          en: "Yes, projects are handled with trusted contracts.",
          ar: "نعم، يتم تنفيذ المشاريع بعقود واضحة.",
        },
      },

      {
        q: {
          en: "Do you provide site supervision?",
          ar: "هل يوجد إشراف على الموقع؟",
        },

        a: {
          en: "Yes, our team supervises every stage of the project.",
          ar: "نعم، يتم الإشراف على جميع مراحل التنفيذ.",
        },
      },

      {
        q: {
          en: "Can I request modern interior themes?",
          ar: "هل يمكن طلب تصميم داخلي حديث؟",
        },

        a: {
          en: "Yes, we execute modern and luxury interior themes.",
          ar: "نعم، ننفذ التصاميم الحديثة والفاخرة.",
        },
      },

      {
        q: {
          en: "Do you provide commercial interior work?",
          ar: "هل تعملون على المشاريع التجارية؟",
        },

        a: {
          en: "Yes, we handle residential and commercial projects.",
          ar: "نعم، نعمل على المشاريع السكنية والتجارية.",
        },
      },

      {
        q: {
          en: "How can I contact your team?",
          ar: "كيف يمكنني التواصل معكم؟",
        },

        a: {
          en: "You can contact us directly through WhatsApp or phone consultation.",
          ar: "يمكنكم التواصل معنا مباشرة عبر الواتساب أو الاتصال.",
        },
      },

      {
        q: {
          en: "Do you provide premium finishing?",
          ar: "هل توفرون تشطيبات فاخرة؟",
        },

        a: {
          en: "Yes, premium finishing is one of our strongest specialties.",
          ar: "نعم، التشطيبات الفاخرة من أهم خدماتنا.",
        },
      },

    ],

  };

  const allFaqs =
    faqData[mode] || [];

  const visibleFaqs =
    allFaqs.slice(
      0,
      visibleCount
    );

  const remaining =
    allFaqs.length -
    visibleCount;

  return (
    <section className="
      relative
      bg-black
      text-white
      py-24 md:py-32
      px-4 md:px-20
      overflow-hidden
    ">

      {/* BG */}

      <div className="
        absolute top-1/2 left-1/2
        -translate-x-1/2
        -translate-y-1/2

        w-[700px]
        h-[700px]

        bg-yellow-500/5

        blur-[150px]

        rounded-full
      " />

      {/* HEADER */}

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

          <FaGem className="
            text-yellow-400
          " />

          <span className="
            text-sm text-gray-300
          ">

            {lang === "ar"

              ? "الأسئلة والاستفسارات"

              : "Questions & Consultation"}

          </span>

        </div>

        <h1 className="
          text-4xl md:text-6xl

          font-black

          text-yellow-400

          mb-6
        ">

          FAQ

        </h1>

      </div>

      {/* FAQ */}

      <div className="
        relative z-10

        max-w-5xl

        mx-auto

        space-y-5
      ">

        {visibleFaqs.map(
          (item, i) => (

            <motion.div

              key={i}

              initial={{
                opacity: 0,
                y: 30,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              viewport={{
                once: true,
              }}

              className="
                bg-[#0b0b0b]

                border border-yellow-500/10

                rounded-[30px]

                overflow-hidden

                shadow-[0_10px_40px_rgba(0,0,0,0.4)]
              "
            >

              <button

                onClick={() =>
                  setOpenIndex(
                    openIndex === i
                      ? null
                      : i
                  )
                }

                className="
                  w-full

                  flex items-center
                  justify-between

                  gap-6

                  px-7 py-6

                  text-left
                "
              >

                <h2 className="
                  text-lg md:text-xl

                  font-semibold

                  text-white
                ">

                  {item.q[lang]}

                </h2>

                <motion.div

                  animate={{
                    rotate:
                      openIndex === i
                        ? 180
                        : 0,
                  }}

                  className="
                    min-w-[42px]
                    h-[42px]

                    rounded-full

                    bg-yellow-500/10

                    flex items-center
                    justify-center

                    text-yellow-400
                  "
                >

                  <FaChevronDown />

                </motion.div>

              </button>

              <AnimatePresence>

                {openIndex === i && (

                  <motion.div

                    initial={{
                      height: 0,
                      opacity: 0,
                    }}

                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}

                    exit={{
                      height: 0,
                      opacity: 0,
                    }}

                    className="
                      overflow-hidden
                    "
                  >

                    <div className="
                      px-7 pb-7

                      text-gray-400

                      leading-relaxed
                    ">

                      {item.a[lang]}

                    </div>

                  </motion.div>

                )}

              </AnimatePresence>

            </motion.div>

          )
        )}

      </div>

      {/* LOAD MORE */}

      {remaining > 0 && (

        <div className="
          relative z-10

          text-center

          mt-14
        ">

          <motion.button

            whileHover={{
              scale: 1.04,
            }}

            whileTap={{
              scale: 0.97,
            }}

            onClick={() =>
              setVisibleCount(
                (prev) =>
                  prev + 5
              )
            }

            className="
              px-10 py-4

              rounded-full

              bg-yellow-500

              text-black

              font-bold
            "
          >

            {lang === "ar"

              ? `عرض المزيد (${remaining})`

              : `Read More (${remaining})`}

          </motion.button>

        </div>

      )}

      {/* CTA */}

      <div className="
        relative z-10

        mt-24

        text-center
      ">

        <motion.a

          href={`https://wa.me/${WHATSAPP}`}

          target="_blank"

          rel="noopener noreferrer"

          whileHover={{
            scale: 1.04,
          }}

          whileTap={{
            scale: 0.97,
          }}

          className="
            inline-flex

            items-center

            gap-4

            bg-green-500
            hover:bg-green-600

            px-10 py-5

            rounded-full

            text-lg

            font-bold

            shadow-[0_10px_40px_rgba(34,197,94,0.2)]

            transition-all duration-300
          "
        >

          <FaWhatsapp className="
            text-2xl
          " />

          {lang === "ar"

            ? "تواصل عبر واتساب"

            : "Consult on WhatsApp"}

        </motion.a>

      </div>

    </section>
  );
};

export default FAQ;