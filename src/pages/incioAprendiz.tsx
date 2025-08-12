import React from "react";
import Sidebar from "../components/Sidebar";

const InicioAprendiz = () => {
  // Aquí puedes obtener el nombre dinámicamente si lo tienes en contexto o props
  const nombre = "Brandon";
  return (
    <div className="flex min-h-screen">
      <Sidebar rol="Aprendiz" nombre={nombre} />
      <main className="flex-1 bg-white p-8">
        <h1 className="text-2xl font-bold mb-4">Bienvenido Aprendiz</h1>
        <p className="text-gray-700">Aquí puedes gestionar tus solicitudes y ver el seguimiento.</p>
        {/* Aquí puedes agregar los módulos o componentes específicos para el aprendiz */}
      </main>
    </div>
  );
};

export default InicioAprendiz;
