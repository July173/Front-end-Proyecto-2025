import React, { useState } from "react";
import ReassignTableView, { ReassignTableRow } from "../components/ReassignTableView";
import ModalReasignarInstructor from "../components/ModalReasignarInstructor";
import CustomSelect from "../components/CustomSelect";

import BuscarInput from "../components/BuscarInput";

const Reassign: React.FC = () => {
  const rows: ReassignTableRow[] = [
    {
      id: 1,
      nombre: "Daniela Polania Quintero",
      tipoIdentificacion: "Tarjeta de identidad",
      numeroIdentificacion: "1016457896",
      fechaSolicitud: "10/05/2025",
      telefono: "3145697897",
      correo: "daniela_polania@soy.sena.edu.co",
      empresa: "SAS Colombia",
      nitEmpresa: "10004569878",
      jefeInmediato: "Lorenzo Suarez",
      correoJefe: "lsuarez@gmail.com",
      ubicacionEmpresa: "Neiva, Huila",
      instructor: "Carlos Bonilla",
      correoInstructor: "cbonilla@sena.edu.co",
      ficha: "2078456",
      programa: "Análisis y desarrollo de software",
      regional: "Huila",
      centro: "Centro de la industria y los servicios",
      telefonoJefe: "3145698965",
      fechaInicioPractica: "01/05/2025"
    },
    {
      id: 2,
      nombre: "Juan Pérez",
      tipoIdentificacion: "Cédula de ciudadanía",
      numeroIdentificacion: "1234567890",
      fechaSolicitud: "12/05/2025",
      telefono: "3123456789",
      correo: "juan_perez@soy.sena.edu.co",
      empresa: "Empresa XYZ",
      nitEmpresa: "900123456",
      jefeInmediato: "Ana Torres",
      correoJefe: "atorres@gmail.com",
      ubicacionEmpresa: "Bogotá, Cundinamarca",
      instructor: "Luis Martínez",
      correoInstructor: "lmartinez@sena.edu.co",
      ficha: "2087654",
      programa: "Gestión empresarial",
      regional: "Cundinamarca",
      centro: "Centro de gestión empresarial",
      telefonoJefe: "3123456780",
      fechaInicioPractica: "05/06/2025"
    }
  ];

  const programaOptions = [
    { value: "todos", label: "Todos los programas" },
    { value: "programa1", label: "Programa 1" },
    { value: "programa2", label: "Programa 2" }
  ];
  const estadoOptions = [
    { value: "todos", label: "Todos los estados" },
    { value: "pendiente", label: "Pendiente" },
    { value: "asignado", label: "Asignado" }
  ];

  const [programa, setPrograma] = useState("todos");
  const [estado, setEstado] = useState("todos");
  const [busqueda, setBusqueda] = useState("");


  const filteredRows = rows.filter(row =>
    row.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ReassignTableRow | null>(null);

  const handleReassign = (row: ReassignTableRow) => {
    setSelectedRow(row);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRow(null);
  };

  return (
    <div className="bg-white relative rounded-[10px] size-full p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Reasignar Instructor</h2>
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
      <ReassignTableView rows={filteredRows} onAction={handleReassign} actionLabel="Reasignar" />

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-4 relative">
            <button className="absolute top-2 right-2 text-gray-500" onClick={handleCloseModal}>✕</button>
            <ModalReasignarInstructor onCancel={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Reassign;
