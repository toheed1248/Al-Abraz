import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import ProtectedRoute from "./admin/ProtectedRoute";

import { ModeProvider } from "./context/ModeContext";
import { LanguageProvider, useLang } from "./context/LanguageContext";


// 🔥 RTL Handler Component
const RTLHandler = ({ children }) => {
  const { lang } = useLang();

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  return children;
};


function App() {
  return (
    <LanguageProvider>
      <ModeProvider>
        <RTLHandler>
          <BrowserRouter>
            <Routes>

              <Route path="/" element={<Home />} />

              <Route path="/admin" element={<AdminLogin />} />

              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<h1>Page Not Found</h1>} />

            </Routes>
          </BrowserRouter>
        </RTLHandler>
      </ModeProvider>
    </LanguageProvider>
  );
}

export default App;