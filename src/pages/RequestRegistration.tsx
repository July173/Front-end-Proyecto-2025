import React from "react";

export const RequestRegistration = () => {
  return (
    <div className="flex flex-col gap-5 items-center w-full py-8">
      {/* Encabezado */}
      <div className="flex flex-col items-center w-full">
        <h1 className="font-bold text-3xl text-gray-800 mb-2">Registro de Solicitud</h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl">
          Completa el formulario para registrar una nueva solicitud. Todos los campos marcados con * son obligatorios.
        </p>
      </div>
      {/* Formulario */}
      <div className="bg-white rounded-[10px] w-full max-w-2xl p-10 flex flex-col gap-6 items-center shadow">
        <form className="w-full flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Nombre completo *</label>
              <input type="text" className="w-full border rounded px-3 py-2" placeholder="Nombre completo" required />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">Correo electrónico *</label>
              <input type="email" className="w-full border rounded px-3 py-2" placeholder="Correo electrónico" required />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Tipo de solicitud *</label>
              <select className="w-full border rounded px-3 py-2" required>
                <option value="">Selecciona una opción</option>
                <option value="soporte">Soporte</option>
                <option value="peticion">Petición</option>
                <option value="reclamo">Reclamo</option>
                <option value="sugerencia">Sugerencia</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">Teléfono *</label>
              <input type="tel" className="w-full border rounded px-3 py-2" placeholder="Teléfono" required />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label className="block mb-1 font-medium">Descripción *</label>
            <textarea className="w-full border rounded px-3 py-2 min-h-[100px]" placeholder="Describe tu solicitud" required />
          </div>
          <div className="flex justify-end w-full">
            <button type="submit" className="bg-green-600 text-white font-semibold px-6 py-2 rounded hover:bg-green-700 transition">Registrar solicitud</button>
          </div>
        </form>
      </div>
    </div>
  );
};
