

import React, { useState } from "react";
import AssignTableView, { AssignTableRow } from "@/components/AssignTableView";
import CustomSelect from "@/components/CustomSelect";
import BuscarInput from "@/components/BuscarInput";


const rows: AssignTableRow[] = [
  {
    id: 1,
    nombre: "Daniela Polania Quintero",
    tipoIdentificacion: "Tarjeta de identidad",
    numeroIdentificacion: "1016457896",
    fechaSolicitud: "10/05/2025",
  },
  {
    id: 2,
    nombre: "Juan Pérez",
    tipoIdentificacion: "Cédula de ciudadanía",
    numeroIdentificacion: "1234567890",
    fechaSolicitud: "12/05/2025",
  },
  // ...más filas
];

const handleAssign = (row: AssignTableRow) => {
  // Aquí puedes manejar la acción de asignar
  alert(`Asignar a: ${row.nombre}`);
};


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

  // Filtrado simple por nombre
  const filteredRows = rows.filter(row =>
    row.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="bg-white relative rounded-[10px] size-full p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Asignar seguimiento</h2>
        <BuscarInput value={busqueda} onChange={setBusqueda} />
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
      <AssignTableView rows={filteredRows} onAction={handleAssign} actionLabel="Asignar" />
    </div>
  );
};

export default Assign;
