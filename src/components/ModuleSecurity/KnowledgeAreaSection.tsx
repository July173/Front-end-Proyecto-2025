import React, { useState } from "react";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import Paginator from "../Paginator";
import ModalFormGeneric from "./ModalFormGeneric";
import ConfirmModal from "../ConfirmModal";
import { useGeneralData } from "../../hook/useGeneralData";

const cardsPerPage = 9;

const KnowledgeAreaSection = () => {
  const {
    knowledgeAreas,
    loading,
    error,
    createKnowledgeArea,
    updateKnowledgeArea,
    deleteKnowledgeArea,
    refreshAreas,
  } = useGeneralData();

  const [areasPage, setAreasPage] = useState(1);
  const [showAreaModal, setShowAreaModal] = useState(false);
  const [pendingAreaData, setPendingAreaData] = useState(null);
  const [showAreaConfirm, setShowAreaConfirm] = useState(false);
  const [editArea, setEditArea] = useState(null);
  const [showEditArea, setShowEditArea] = useState(false);
  const [pendingEditArea, setPendingEditArea] = useState(null);
  const [showEditAreaConfirm, setShowEditAreaConfirm] = useState(false);
  const [showDisableConfirm, setShowDisableConfirm] = useState(false);
  const [pendingDisable, setPendingDisable] = useState(null);
  const [open, setOpen] = useState(true);

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
  const handleAddArea = () => setShowAreaModal(true);
  const handleSubmitArea = (values: any) => {
    setPendingAreaData(values);
    setShowAreaConfirm(true);
  };
  const handleConfirmArea = async () => {
    try {
      await createKnowledgeArea(pendingAreaData);
      setShowAreaModal(false);
      setShowAreaConfirm(false);
      setPendingAreaData(null);
      await refreshAreas();
    } catch (e: any) {
      alert(e.message || "Error al crear área");
    }
  };

  // Edit handlers
  const handleEdit = (area: any) => {
    setEditArea(area);
    setShowEditArea(true);
  };
  const handleSubmitEditArea = (values: any) => {
    setPendingEditArea(values);
    setShowEditAreaConfirm(true);
  };
  const handleConfirmEditArea = async () => {
    try {
      await updateKnowledgeArea(editArea.id, pendingEditArea);
      setShowEditArea(false);
      setShowEditAreaConfirm(false);
      setPendingEditArea(null);
      setEditArea(null);
      await refreshAreas();
    } catch (e: any) {
      alert(e.message || "Error al actualizar área");
    }
  };

  // Toggle handlers
  const handleToggle = (area: any) => {
    setPendingDisable(area);
    setShowDisableConfirm(true);
  };
  const handleConfirmDisable = async () => {
    try {
      await deleteKnowledgeArea(pendingDisable.id);
      setShowDisableConfirm(false);
      setPendingDisable(null);
      await refreshAreas();
    } catch (e: any) {
      alert(e.message || "Error al deshabilitar área");
    }
  };

  if (loading) return <div className="p-8">Cargando...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
      >
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-900">Áreas de Conocimiento</h3>
          <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
            {knowledgeAreas.length} registros
          </span>
        </div>
        {open ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {open && (
        <>
          <div className="flex items-center gap-4 mb-6 justify-between px-6 pt-6">
            <button onClick={handleAddArea} className="flex items-center gap-2 text-white px-4 py-2 rounded font-semibold shadow transition-all duration-300 bg-[linear-gradient(to_bottom_right,_#43A047,_#2E7D32)] hover:bg-green-700 hover:shadow-lg">
              <Plus className="w-4 h-4" /> Agregar Área
            </button>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {knowledgeAreas.slice((areasPage - 1) * cardsPerPage, areasPage * cardsPerPage).map((area) => (
              <div key={area.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{area.name}</h3>
                    {area.description && <p className="text-sm text-gray-600 mt-1">Descripción: {area.description}</p>}
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${area.active ? "bg-green-100 text-green-900" : "bg-red-100 text-red-900"}`}>{area.active ? "Activo" : "Inactivo"}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(area)} className="px-5 py-1 text-base rounded-3xl border border-gray-400 bg-gray-100 text-gray-800 font-semibold transition-colors hover:bg-gray-200">Editar</button>
                  <button onClick={() => handleToggle(area)} className={`px-5 py-1 text-base rounded-3xl border font-semibold transition-colors ${area.active ? "bg-red-100 text-red-900 border-red-700 hover:bg-red-200" : "bg-green-100 text-green-900 border-green-700 hover:bg-green-200"}`}>{area.active ? "Deshabilitar" : "Habilitar"}</button>
                </div>
              </div>
            ))}
            <ModalFormGeneric
              isOpen={showEditArea}
              title="Editar Área"
              fields={[
                { label: "Nombre del Área", name: "name", type: "text", placeholder: "Ingrese el nombre", required: true },
                { label: "Código", name: "code", type: "text", placeholder: "Ingrese el código", required: false },
              ]}
              onClose={() => { setShowEditArea(false); setEditArea(null); setPendingEditArea(null); }}
              onSubmit={handleSubmitEditArea}
              submitText="Actualizar Área"
              cancelText="Cancelar"
              initialValues={editArea || {}}
              customRender={undefined}
              onProgramChange={undefined}
            />
            <ConfirmModal
              isOpen={showEditAreaConfirm}
              title="¿Confirmar actualización de área?"
              message="¿Estás seguro de que deseas actualizar esta área?"
              confirmText="Sí, actualizar área"
              cancelText="Cancelar"
              onConfirm={handleConfirmEditArea}
              onCancel={() => { setShowEditAreaConfirm(false); setPendingEditArea(null); }}
            />
            <ConfirmModal
              isOpen={showDisableConfirm}
              title="¿Confirmar acción?"
              message="¿Estás seguro de que deseas deshabilitar esta área?"
              confirmText="Sí, continuar"
              cancelText="Cancelar"
              onConfirm={handleConfirmDisable}
              onCancel={() => { setShowDisableConfirm(false); setPendingDisable(null); }}
            />
          </div>
          {Math.ceil(knowledgeAreas.length / cardsPerPage) > 1 && (
            <Paginator
              page={areasPage}
              totalPages={Math.ceil(knowledgeAreas.length / cardsPerPage)}
              onPageChange={setAreasPage}
              className="mt-4 px-6"
            />
          )}

          <ModalFormGeneric
            isOpen={showAreaModal}
            title="Agregar Área"
            fields={[
              { label: "Nombre del Área", name: "name", type: "text", placeholder: "Ingrese el nombre", required: true },
              { label: "Código", name: "code", type: "text", placeholder: "Ingrese el código", required: false },
            ]}
            onClose={() => setShowAreaModal(false)}
            onSubmit={handleSubmitArea}
            submitText="Registrar Área"
            cancelText="Cancelar"
            customRender={undefined}
            onProgramChange={undefined}
          />
          <ConfirmModal
            isOpen={showAreaConfirm}
            title="¿Confirmar registro de área?"
            message="¿Estás seguro de que deseas crear esta área?"
            confirmText="Sí, crear área"
            cancelText="Cancelar"
            onConfirm={handleConfirmArea}
            onCancel={() => {
              setShowAreaConfirm(false);
              setPendingAreaData(null);
            }}
          />
        </>
      )}
    </div>
  );
};

export default KnowledgeAreaSection;
