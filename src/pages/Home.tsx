import React from "react";
import { useUserData } from "../hook/useUserData";

export const Home = () => {
  const { userData, isLoading } = useUserData();
  const getUserName = () => {
    if (userData?.email) {
      const emailPart = userData.email.split("@")[0];
      const nameParts = emailPart.split(".");
      return nameParts
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
    }
    return "Usuario";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
    
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Bienvenido {getUserName()}
            </h1>
            <p className="text-gray-700">
              Aquí puedes gestionar tus solicitudes y ver el seguimiento.
            </p>
          </div>
        </div>

        {/* Panel informativo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Información de Sesión</h3>
            <div className="text-sm space-y-1">
              <p><strong>ID:</strong> {userData!.id}</p>
              <p><strong>Email:</strong> {userData!.email}</p>
              <p><strong>Rol:</strong> {userData!.role || "No asignado"}</p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">¿Cómo usar el menú?</h3>
            <p className="text-sm text-green-700">
              Haz clic en cualquier elemento del menú lateral para navegar por las diferentes secciones de la aplicación.
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Panel de Control</h2>
          <p className="text-gray-600 mb-4">
            Selecciona una opción del menú para comenzar:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded p-4 text-center">
              <h3 className="font-medium">Inicio</h3>
              <p className="text-sm text-gray-600">Página principal</p>
            </div>
            <div className="border border-gray-200 rounded p-4 text-center">
              <h3 className="font-medium">Seguridad</h3>
              <p className="text-sm text-gray-600">Administración y registro</p>
            </div>
            <div className="border border-gray-200 rounded p-4 text-center">
              <h3 className="font-medium">Más módulos</h3>
              <p className="text-sm text-gray-600">Según tu API</p>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Home;
