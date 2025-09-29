// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import useIdleTimer from "../../hook/userIdleTimer";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const userData = localStorage.getItem("user_data");

  // Activa el control de inactividad SOLO si hay sesión
  if (userData) {
    useIdleTimer(); // 👈 aquí se monta el hook
    return <>{children}</>;
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
