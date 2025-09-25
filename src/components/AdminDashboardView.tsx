import React, { useEffect, useState } from "react";
import DashboardCharts from "./DashboardCharts";
import { getAprendices } from "../Api/Services/Aprendiz";
import { getAllRequests } from "../Api/Services/RequestAssignaton";

// Vista de inicio para administrador (extraída de Figma)
const AdminDashboardView: React.FC = () => {
  const [aprendicesCount, setAprendicesCount] = useState<number | null>(null);
  const [solicitudesSinAsignar, setSolicitudesSinAsignar] = useState<number | null>(null);
  const [solicitudesAsignadas, setSolicitudesAsignadas] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [requestsData, setRequestsData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
  // Aprendices
  const aprendices = await getAprendices();
  console.log("Aprendices recibidos:", aprendices);
  const activos = Array.isArray(aprendices) ? aprendices.filter(a => a.active).length : 0;
  setAprendicesCount(activos);
  // Solicitudes
  const solicitudes = await getAllRequests();
  // Si la respuesta es un objeto con la propiedad 'data', usa solicitudes.data
  setRequestsData(Array.isArray(solicitudes) ? solicitudes : solicitudes.data ?? []);
  // Filtrar por estado (ajusta el campo según la API, por ejemplo 'estado')
  setSolicitudesSinAsignar(solicitudes.filter(s => s.estado === 'sin_asignar').length);
  setSolicitudesAsignadas(solicitudes.filter(s => s.estado === 'asignada').length);
      } catch (err) {
        // Solo poner en 0 si aprendices falló
        setAprendicesCount(prev => prev ?? 0);
        setSolicitudesSinAsignar(0);
        setSolicitudesAsignadas(0);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-lg p-8 w-full">
      <h1 className="text-3xl font-bold text-green-700 mb-6">BIENVENIDO A AUTOGESTIÓN SENA</h1>
      <div className="flex flex-wrap gap-6 justify-center mb-8">
        <div className="bg-white rounded-xl shadow p-4 w-56">
          <p className="text-gray-600 text-sm">Registro de</p>
          <p className="text-gray-800 text-xl font-semibold">Aprendices</p>
          <p className="text-green-600 text-2xl font-bold">
            {loading
              ? "..."
              : typeof aprendicesCount === "number" && !isNaN(aprendicesCount)
                ? aprendicesCount.toLocaleString("es-CO")
                : "0"}
          </p>
          <p className="text-gray-500 text-sm">Aprendices Registrados</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 w-60">
          <p className="text-gray-600 text-sm">Registro de</p>
          <p className="text-gray-800 text-xl font-semibold">Solicitudes sin asignar</p>
          <p className="text-green-600 text-2xl font-bold">
            {loading ? "..." : `${solicitudesSinAsignar} Registros`}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 w-56">
          <p className="text-gray-600 text-sm">Registro de</p>
          <p className="text-gray-800 text-xl font-semibold">Solicitudes asignadas</p>
          <p className="text-green-600 text-2xl font-bold">
            {loading ? "..." : `${solicitudesAsignadas} Registros`}
          </p>
        </div>
      </div>
  <DashboardCharts requestsData={requestsData} />
    </div>
  );
};

export default AdminDashboardView;
