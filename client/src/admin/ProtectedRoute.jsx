import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setValid(false);
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);

      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        setValid(false);
      } else {
        setValid(true);
      }

    } catch (err) {
      localStorage.removeItem("token");
      setValid(false);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-yellow-400">
        Checking access...
      </div>
    );
  }

  if (!valid) {
    return <Navigate to="/admin" />;
  }

  return children;
};

export default ProtectedRoute;