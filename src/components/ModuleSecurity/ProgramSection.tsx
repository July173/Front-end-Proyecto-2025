import React, { useState } from "react";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import Paginator from "../Paginator";
import ModalFormGeneric from "./ModalFormGeneric";
import ConfirmModal from "../ConfirmModal";
import { useGeneralData } from "../../hook/useGeneralData";

const cardsPerPage = 9;

const ProgramSection = () => {
  const {
    programs,
    loading,
    error,
    createProgram,
    updateProgram,
    deleteProgram,
    refreshPrograms,
  } = useGeneralData();

  const [programsPage, setProgramsPage] = useState(1);
  const [showProgramModal, setShowProgramModal] = useState(false);
  const [pendingProgramData, setPendingProgramData] = useState(null);
  const [showProgramConfirm, setShowProgramConfirm] = useState(false);
  const [editProgram, setEditProgram] = useState(null);
  const [showEditProgram, setShowEditProgram] = useState(false);
  const [pendingEditProgram, setPendingEditProgram] = useState(null);
  const [showEditProgramConfirm, setShowEditProgramConfirm] = useState(false);
  const [showDisableConfirm, setShowDisableConfirm] = useState(false);
  const [pendingDisable, setPendingDisable] = useState(null);

  // Card
  const InfoCard = ({ title, subtitle, isActive, onEdit, onToggle }: any) => (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${isActive ? "bg-green-100 text-green-900" : "bg-red-100 text-red-900"}`}>{isActive ? "Activo" : "Inactivo"}</div>
      </div>
      <div className="flex gap-2">
        <button onClick={onEdit} className="px-5 py-1 text-base rounded-3xl border border-gray-400 bg-gray-100 text-gray-800 font-semibold transition-colors hover:bg-gray-200">Editar</button>
        <button onClick={onToggle} className={`px-5 py-1 text-base rounded-3xl border font-semibold transition-colors ${isActive ? "bg-red-100 text-red-900 border-red-700 hover:bg-red-200" : "bg-green-100 text-green-900 border-green-700 hover:bg-green-200"}`}>{isActive ? "Deshabilitar" : "Habilitar"}</button>
      </div>
    </div>
  );

  // Modal handlers
  const handleAddProgram = () => setShowProgramModal(true);
  const handleSubmitProgram = (values: any) => {
    setPendingProgramData(values);
    setShowProgramConfirm(true);
  };
  const handleConfirmProgram = async () => {
    try {
      await createProgram(pendingProgramData);
      setShowProgramModal(false);
      setShowProgramConfirm(false);
      setPendingProgramData(null);
      await refreshPrograms();
    } catch (e: any) {
      alert(e.message || "Error al crear programa");
    }
  };

  // Edit handlers
  const handleEdit = (program: any) => {
    setEditProgram(program);
    setShowEditProgram(true);
  };
  const handleSubmitEditProgram = (values: any) => {
    setPendingEditProgram(values);
    setShowEditProgramConfirm(true);
  };
  const handleConfirmEditProgram = async () => {
    try {
      await updateProgram(editProgram.id, pendingEditProgram);
      setShowEditProgram(false);
      setShowEditProgramConfirm(false);
      setPendingEditProgram(null);
      setEditProgram(null);
      await refreshPrograms();
    } catch (e: any) {
      alert(e.message || "Error al actualizar programa");
    }
  };

  // Toggle handlers
  const handleToggle = (program: any) => {
    setPendingDisable(program);
    setShowDisableConfirm(true);
  };
  const handleConfirmDisable = async () => {
    try {
      await deleteProgram(pendingDisable.id);
      setShowDisableConfirm(false);
      setPendingDisable(null);
      await refreshPrograms();
    } catch (e: any) {
      alert(e.message || "Error al deshabilitar programa");
    }
  };

  if (loading) return <div className="p-8">Cargando...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-6 justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Programas</h3>
        <button onClick={handleAddProgram} className="flex items-center gap-2 text-white px-4 py-2 rounded font-semibold shadow transition-all duration-300 bg-[linear-gradient(to_bottom_right,_#43A047,_#2E7D32)] hover:bg-green-700 hover:shadow-lg">
          <Plus className="w-4 h-4" /> Agregar Programa
        </button>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {programs.slice((programsPage - 1) * cardsPerPage, programsPage * cardsPerPage).map((program) => (
          <InfoCard
            key={program.id}
            title={program.name || `Programa ${program.codeProgram}`}
            subtitle={program.description || program.typeProgram}
            isActive={program.active}
            onEdit={() => handleEdit(program)}
            onToggle={() => handleToggle(program)}
          />
        ))}
      <ModalFormGeneric
        isOpen={showEditProgram}
        title="Editar Programa"
        fields={[
          { label: "Nombre del Programa", name: "name", type: "text", placeholder: "Ingrese el nombre del programa", required: true },
          { label: "Código del Programa", name: "codeProgram", type: "text", placeholder: "Ingrese el código del programa", required: true },
          { label: "Descripción", name: "description", type: "text", placeholder: "Ingrese una descripción", required: false },
          { label: "Tipo de Programa", name: "typeProgram", type: "text", placeholder: "Ingrese el tipo de programa", required: false },
        ]}
        onClose={() => { setShowEditProgram(false); setEditProgram(null); setPendingEditProgram(null); }}
        onSubmit={handleSubmitEditProgram}
        submitText="Actualizar Programa"
        cancelText="Cancelar"
        initialValues={editProgram || {}}
        customRender={undefined}
        onProgramChange={undefined}
      />
      <ConfirmModal
        isOpen={showEditProgramConfirm}
        title="¿Confirmar actualización de programa?"
        message="¿Estás seguro de que deseas actualizar este programa?"
        confirmText="Sí, actualizar programa"
        cancelText="Cancelar"
        onConfirm={handleConfirmEditProgram}
        onCancel={() => { setShowEditProgramConfirm(false); setPendingEditProgram(null); }}
      />
      <ConfirmModal
        isOpen={showDisableConfirm}
        title="¿Confirmar acción?"
        message="¿Estás seguro de que deseas deshabilitar este programa?"
        confirmText="Sí, continuar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDisable}
        onCancel={() => { setShowDisableConfirm(false); setPendingDisable(null); }}
      />
      </div>
      {Math.ceil(programs.length / cardsPerPage) > 1 && (
        <Paginator
          page={programsPage}
          totalPages={Math.ceil(programs.length / cardsPerPage)}
          onPageChange={setProgramsPage}
          className="mt-4"
        />
      )}

      <ModalFormGeneric
        isOpen={showProgramModal}
        title="Agregar Programa"
        fields={[
          { label: "Nombre del Programa", name: "name", type: "text", placeholder: "Ingrese el nombre del programa", required: true },
          { label: "Código del Programa", name: "codeProgram", type: "text", placeholder: "Ingrese el código del programa", required: true },
          { label: "Descripción", name: "description", type: "text", placeholder: "Ingrese una descripción", required: false },
          { label: "Tipo de Programa", name: "typeProgram", type: "text", placeholder: "Ingrese el tipo de programa", required: false },
        ]}
        onClose={() => setShowProgramModal(false)}
        onSubmit={handleSubmitProgram}
        submitText="Registrar Programa"
        cancelText="Cancelar"
        customRender={undefined}
        onProgramChange={undefined}
      />
      <ConfirmModal
        isOpen={showProgramConfirm}
        title="¿Confirmar registro de programa?"
        message="¿Estás seguro de que deseas crear este programa?"
        confirmText="Sí, crear programa"
        cancelText="Cancelar"
        onConfirm={handleConfirmProgram}
        onCancel={() => {
          setShowProgramConfirm(false);
          setPendingProgramData(null);
        }}
      />
    </div>
  );
};

export default ProgramSection;
