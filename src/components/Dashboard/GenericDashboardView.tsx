import React from "react";

const GenericDashboardView: React.FC<{ nombre?: string }> = ({ nombre }) => {
  return (
    <div className="flex flex-col items-center gap-8 p-6 w-full min-h-[60vh] justify-center">
      <div className="bg-gray-100 rounded-lg flex items-center px-5 py-14 w-full max-w-xl mb-4 shadow">
        <div className="bg-gray-300 rounded-full flex items-center justify-center w-[70px] h-[70px] mr-6">
          <div className="bg-gray-400 rounded-full w-[40px] h-[40px]" />
        </div>
        <div className="flex flex-col text-gray-700">
          <p className="text-3xl font-bold mb-0">¡ Bienvenido !</p>
          <p className="text-2xl font-normal mb-0">{nombre || "Usuario"}</p>
          <p className="text-lg font-normal">No tienes una vista personalizada asignada</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow w-full max-w-xl p-8 flex flex-col items-center">
        <p className="text-lg text-gray-700 mb-2">Tu rol no tiene una vista específica en el sistema.</p>
        <p className="text-base text-gray-500 text-center">Por favor contacta al administrador si necesitas acceso a funcionalidades especiales o si crees que esto es un error.</p>
      </div>
    </div>
  );
};

export default GenericDashboardView;
