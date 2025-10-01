

import React, { useState } from "react";
import AssignTableView from "../components/assing/AssignTableView";
// import { AssignTableRow } from "../Api/types/Modules/assign.types";
import CustomSelect from "@/components/CustomSelect";
import BuscarInput from "@/components/BuscarInput";
import DownloadReportButton from "../components/DownloadReportButton";

const programaOptions = [
  { value: "todos", label: "Todos los programas" },
  { value: "programa1", label: "Programa 1" },
  { value: "programa2", label: "Programa 2" },
];
const estadoOptions = [
  { value: "todos", label: "Todos los estados" },
  { value: "pendiente", label: "Pendiente" },
  { value: "asignado", label: "Asignado" },
];


const Assign: React.FC = () => {
  const [programa, setPrograma] = useState("todos");
  const [estado, setEstado] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  // El componente hijo se encarga de obtener los datos y filtrarlos

  return (
    <div className="bg-white relative rounded-[10px] size-full p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Asignar seguimiento</h2>
        <div className="flex gap-4 items-center">
          <BuscarInput value={busqueda} onChange={setBusqueda} />
          <DownloadReportButton onClick={() => alert('Descargar informe')} />
        </div>
      </div>
      <div className="flex gap-4 mb-6">
        <CustomSelect
          label="Programa"
          options={programaOptions}
          value={programa}
          onChange={setPrograma}
        />
        <CustomSelect
          label="Estado"
          options={estadoOptions}
          value={estado}
          onChange={setEstado}
        />
      </div>
  {/* se muestra la tabla de asignar */}
  <AssignTableView onAction={row => alert(`Asignar a: ${row.nombre}`)} actionLabel="Asignar" />
    </div>
  );
};

export default Assign;
