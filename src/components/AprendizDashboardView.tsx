import React from "react";

// Vista de inicio para aprendiz (extraída de Figma)
const AprendizDashboardView: React.FC<{ nombre?: string }> = ({ nombre }) => {
  // ...código extraído de Figma para el dashboard de aprendiz...
  // Aquí solo se muestra la estructura base y textos principales
  return (
    <div className="flex flex-col items-center gap-4 p-6 w-full">
      <div className="bg-green-600 rounded-lg flex items-center px-5 py-14 w-[1000px] mb-4">
        <div className="bg-gray-200/50 rounded-full flex items-center justify-center w-[70px] h-[70px] mr-6">
          <div className="bg-gray-400 rounded-full w-[40px] h-[40px]" />
        </div>
        <div className="flex flex-col text-white">
          <p className="text-3xl font-bold mb-0">¡ bienvenido !</p>
          <p className="text-2xl font-normal mb-0">{nombre || "Aprendiz"}</p>
          <p className="text-lg font-normal">gestione desde aquí tus procesos de formación</p>
        </div>
      </div>
      <div className="flex gap-5 w-full justify-center">
        {/* Estado de solicitud */}
        <div className="bg-white rounded-lg shadow w-[495px] p-6 flex flex-col items-center">
          <div className="bg-blue-700/70 rounded-lg w-full py-4 mb-6 flex items-center justify-center">
            <p className="text-xl font-bold text-black">Estado de tu solicitud</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="bg-gray-300/70 rounded-full w-[100px] h-[100px] flex items-center justify-center mb-2">
              <div className="bg-gray-400 rounded-full w-[60px] h-[60px]" />
            </div>
            <p className="text-lg text-black">Sin solicitudes para tu etapa productiva</p>
            <p className="text-base text-black text-center">Aún no has solicitado ningún proceso para tu etapa productiva, por favor registra una solicitud</p>
            <button className="bg-green-600 text-white rounded-lg px-6 py-3 font-medium mt-2">Hacer una solicitud</button>
          </div>
        </div>
        {/* Tu instructor asignado */}
        <div className="flex flex-col gap-5 w-[486px]">
          <div className="bg-white rounded-lg shadow w-full p-6 flex flex-col items-center">
            <div className="bg-[#d7b8ff] rounded-lg w-full py-4 mb-4 flex items-center justify-center">
              <p className="text-lg font-bold text-black">Tu Instructor asignado</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="bg-gray-400/70 rounded-full w-[100px] h-[100px] flex items-center justify-center mb-2">
                <p className="text-2xl font-semibold text-white">CW</p>
              </div>
              <p className="text-xl font-semibold text-black">No asignado</p>
              <div className="bg-gray-400/50 rounded-lg px-4 py-2">
                <p className="text-xl font-semibold text-black">pendiente de Asignar</p>
              </div>
            </div>
          </div>
          {/* Detalle de solicitud */}
          <div className="bg-white rounded-lg shadow w-full p-6 flex flex-col items-center">
            <div className="bg-[#fae17e] rounded-lg w-full py-4 mb-4 flex items-center justify-center">
              <p className="text-lg font-bold text-black">Detalle de tu Solicitud</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-xl font-semibold text-black">Sin solicitud</p>
              <p className="text-base text-black text-center">Aparecerán los detalles de la solicitud una vez sea aprobado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AprendizDashboardView;
