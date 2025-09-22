// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";

/**
 * Props para el componente ProtectedRoute.
 * @property {React.ReactNode} children - Componentes hijos que requieren protección de sesión.
 */
interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Componente ProtectedRoute
 * Protege rutas que requieren sesión activa. Si no hay sesión, muestra mensaje y botón para volver al login.
 *
 * Características:
 * - Verifica si existe información de usuario en localStorage.
 * - Si no hay sesión, muestra mensaje y botón para redirigir al login.
 * - Si hay sesión, renderiza los componentes hijos.
 *
 * @param {ProtectedRouteProps} props - Propiedades del componente.
 * @returns {JSX.Element} Elemento protegido o mensaje de no sesión.
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const userData = localStorage.getItem("user_data");
  if (!userData) {
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

  return <>{children}</>;
}
