import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

/* ================= PAGES ================= */

import Home from "./pages/Home";

import AdminLogin from "./admin/AdminLogin";

import Dashboard from "./admin/Dashboard";

import ProtectedRoute from "./admin/ProtectedRoute";

/* ================= CONTEXT ================= */

import {
  ModeProvider,
} from "./context/ModeContext";

import {
  LanguageProvider,
  useLang,
} from "./context/LanguageContext";

/* ================= PREMIUM ================= */

import IntroLoader from "./components/IntroLoader";

import WelcomeGate from "./components/WelcomeGate";

/* =========================================================
   🔥 RTL HANDLER
========================================================= */

const RTLHandler = ({
  children,
}) => {

  const { lang } = useLang();

  useEffect(() => {

    document.documentElement.dir =
      lang === "ar"
        ? "rtl"
        : "ltr";

    document.documentElement.lang =
      lang;

  }, [lang]);

  return children;
};

/* =========================================================
   🔥 APP CONTENT
========================================================= */

const AppContent = () => {

  const [loading, setLoading] =
    useState(true);

  const [entered, setEntered] =
    useState(false);

  /* ================= INITIAL LOADING ================= */

  useEffect(() => {

    /*
    🔥 PREVENT WHITE FLASH
    */
    document.body.style.background =
      "#050505";

    /*
    🔥 LOADER
    */
    const timer =
      setTimeout(() => {
        setLoading(false);
      }, 3000);

    /*
    🔥 CHECK ENTRY
    */
    const alreadyEntered =
      localStorage.getItem(
        "entered"
      );

    if (
      alreadyEntered === "true"
    ) {
      setEntered(true);
    }

    return () =>
      clearTimeout(timer);

  }, []);

  /* =====================================================
     🔥 LOADER
  ===================================================== */

  if (loading) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 1,
          }}

          exit={{
            opacity: 0,
          }}

          transition={{
            duration: 0.8,
          }}
        >
          <IntroLoader />
        </motion.div>
      </AnimatePresence>
    );
  }

  /* =====================================================
     🔥 WELCOME GATE
  ===================================================== */

  if (!entered) {
    return (
      <AnimatePresence>

        <motion.div
          initial={{
            opacity: 0,
            scale: 1.02,
          }}

          animate={{
            opacity: 1,
            scale: 1,
          }}

          exit={{
            opacity: 0,
            scale: 0.98,
          }}

          transition={{
            duration: 0.8,
          }}
        >

          <WelcomeGate
            onEnter={() =>
              setEntered(true)
            }
          />

        </motion.div>

      </AnimatePresence>
    );
  }

  /* =====================================================
     🔥 WEBSITE
  ===================================================== */

  return (
    <AnimatePresence mode="wait">

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        exit={{
          opacity: 0,
        }}

        transition={{
          duration: 1,
        }}

        className="
          bg-black
          text-white
          min-h-screen
        "
      >

        <BrowserRouter>

          <Routes>

            {/* ================= HOME ================= */}

            <Route
              path="/"
              element={<Home />}
            />

            {/* ================= ADMIN ================= */}

            <Route
              path="/admin"
              element={
                <AdminLogin />
              }
            />

            {/* ================= DASHBOARD ================= */}

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>

                  <Dashboard />

                </ProtectedRoute>
              }
            />

            {/* ================= 404 ================= */}

            <Route
              path="*"
              element={
                <div className="
                  min-h-screen

                  flex items-center
                  justify-center

                  bg-black
                  text-yellow-400

                  text-3xl
                  font-bold
                ">
                  Page Not Found
                </div>
              }
            />

          </Routes>

        </BrowserRouter>

      </motion.div>

    </AnimatePresence>
  );
};

/* =========================================================
   🔥 FINAL APP
========================================================= */

function App() {

  return (
    <LanguageProvider>

      <ModeProvider>

        <RTLHandler>

          <AppContent />

        </RTLHandler>

      </ModeProvider>

    </LanguageProvider>
  );
}

export default App;