// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const userData = localStorage.getItem("user_data");

  if (!userData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No hay sesión activa</p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="sena-button"
          >
            Volver al login
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
