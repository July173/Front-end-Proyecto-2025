import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface DashboardChartsProps {
  requestsData: any[];
}

// Procesar datos para gráficas
function getChartData(requestsData: any[]) {
  const arr = Array.isArray(requestsData) ? requestsData : [];
  // Agrupar por mes y estado
  const asignadas: Record<string, number> = {};
  const sinAsignar: Record<string, number> = {};
  arr.forEach((req) => {
    // Suponiendo que hay un campo fecha y estado
    const fecha = req.fecha ? new Date(req.fecha) : null;
    const mes = fecha ? `${fecha.getFullYear()}-${fecha.getMonth() + 1}` : "Sin fecha";
    if (req.estado === "asignada") {
      asignadas[mes] = (asignadas[mes] || 0) + 1;
    } else if (req.estado === "sin_asignar") {
      sinAsignar[mes] = (sinAsignar[mes] || 0) + 1;
    }
  });
  // Convertir a formato para Recharts
  const dataAsignadas = Object.entries(asignadas).map(([name, value]) => ({ name, value }));
  const dataSinAsignar = Object.entries(sinAsignar).map(([name, value]) => ({ name, value }));
  return { dataAsignadas, dataSinAsignar };
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({ requestsData }) => {
  const { dataAsignadas, dataSinAsignar } = getChartData(requestsData);


  return (
    <div className="flex gap-8 w-full justify-center">
      {/* Gráfica de asignaciones sin asignar */}
      <div className="bg-white rounded-xl shadow p-4 w-[350px] flex flex-col items-center">
        {dataSinAsignar.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[180px] w-full">
            <span className="text-gray-400">No hay datos para mostrar</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={dataSinAsignar}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4caf50" />
            </BarChart>
          </ResponsiveContainer>
        )}
        <p className="font-semibold mt-4">Solicitudes sin asignar por mes</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
          <span className="text-sm text-gray-500">Recién actualizada</span>
        </div>
      </div>
      {/* Gráfica de asignaciones aprobadas */}
      <div className="bg-white rounded-xl shadow p-4 w-[350px] flex flex-col items-center">
        {dataAsignadas.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[180px] w-full">
            <span className="text-gray-400">No hay datos para mostrar</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={dataAsignadas}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#2196f3" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
        <p className="font-semibold mt-4">Solicitudes asignadas por mes</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
          <span className="text-sm text-gray-500">Recién actualizada</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
