// src/components/ProtectedRoute.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useIdleTimer from "../../hook/userIdleTimer";
import SessionExpiredModal from "../SessionExpiredModal";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const userData = localStorage.getItem("user_data");
  const [showSessionExpired, setShowSessionExpired] = useState(false);
  const navigate = useNavigate();

  // Activa el control de inactividad SOLO si hay sesión
  if (userData) {
    useIdleTimer(20 * 60 * 1000, () => setShowSessionExpired(true));
    return (
      <>
        {children}
        <SessionExpiredModal
          isOpen={showSessionExpired}
          onClose={() => {
            setShowSessionExpired(false);
            navigate("/");
          }}
        />
      </>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600 mb-4">No hay sesión activa</p>
        <button
          onClick={() => (window.location.href = "/")}
          className="sena-button"
        >
          Volver al login
        </button>
      </div>
    </div>
  );
}
