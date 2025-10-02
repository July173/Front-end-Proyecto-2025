import React, { useState } from "react";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import Paginator from "../Paginator";
import ModalFormGeneric from "./ModalFormGeneric";
import ConfirmModal from "../ConfirmModal";
import { useGeneralData } from "../../hook/useGeneralData";

const cardsPerPage = 9;

const FichaSection = () => {
  const {
    fichas,
    programs,
    loading,
    error,
    createFicha,
    updateFicha,
    deleteFicha,
    refreshFichas,
  } = useGeneralData();

  const [fichasPage, setFichasPage] = useState(1);
  const [showFichaModal, setShowFichaModal] = useState(false);
  const [pendingFichaData, setPendingFichaData] = useState(null);
  const [showFichaConfirm, setShowFichaConfirm] = useState(false);
  const [editFicha, setEditFicha] = useState(null);
  const [showEditFicha, setShowEditFicha] = useState(false);
  const [pendingEditFicha, setPendingEditFicha] = useState(null);
  const [showEditFichaConfirm, setShowEditFichaConfirm] = useState(false);
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
  const handleAddFicha = () => setShowFichaModal(true);
  const handleSubmitFicha = (values: any) => {
    const fichaData = { ...values, program: values.programa };
    delete fichaData.programa;
    setPendingFichaData(fichaData);
    setShowFichaConfirm(true);
  };
  const handleConfirmFicha = async () => {
    try {
      await createFicha(pendingFichaData);
      setShowFichaModal(false);
      setShowFichaConfirm(false);
      setPendingFichaData(null);
      await refreshFichas();
    } catch (e: any) {
      alert(e.message || "Error al crear ficha");
    }
  };

  // Edit handlers
  const handleEdit = (ficha: any) => {
    setEditFicha({ ...ficha, programa: ficha.program });
    setShowEditFicha(true);
  };
  const handleSubmitEditFicha = (values: any) => {
    const data = { ...values, program: values.programa };
    delete data.programa;
    setPendingEditFicha(data);
    setShowEditFichaConfirm(true);
  };
  const handleConfirmEditFicha = async () => {
    try {
      await updateFicha(editFicha.id, pendingEditFicha);
      setShowEditFicha(false);
      setShowEditFichaConfirm(false);
      setPendingEditFicha(null);
      setEditFicha(null);
      await refreshFichas();
    } catch (e: any) {
      alert(e.message || "Error al actualizar ficha");
    }
  };

  // Toggle handlers
  const handleToggle = (ficha: any) => {
    setPendingDisable(ficha);
    setShowDisableConfirm(true);
  };
  const handleConfirmDisable = async () => {
    try {
      await deleteFicha(pendingDisable.id);
      setShowDisableConfirm(false);
      setPendingDisable(null);
      await refreshFichas();
    } catch (e: any) {
      alert(e.message || "Error al deshabilitar ficha");
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
          <h3 className="text-lg font-semibold text-gray-900">Fichas</h3>
          <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
            {fichas.length} registros
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
            <button onClick={handleAddFicha} className="flex items-center gap-2 text-white px-4 py-2 rounded font-semibold shadow transition-all duration-300 bg-[linear-gradient(to_bottom_right,_#43A047,_#2E7D32)] hover:bg-green-700 hover:shadow-lg">
              <Plus className="w-4 h-4" /> Agregar Ficha
            </button>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fichas.slice((fichasPage - 1) * cardsPerPage, fichasPage * cardsPerPage).map((ficha) => {
              const programObj = programs.find((p: any) => p.id === ficha.program);
              const programName = programObj ? programObj.name : ficha.program;
              return (
                <InfoCard
                  key={ficha.id}
                  title={`Ficha #${ficha.file_number || ficha.id}`}
                  subtitle={`Programa: ${programName}`}
                  isActive={ficha.active}
                  onEdit={() => handleEdit(ficha)}
                  onToggle={() => handleToggle(ficha)}
                />
              );
            })}
            <ModalFormGeneric
              isOpen={showEditFicha}
              title="Editar Ficha"
              fields={[
                { label: "Número de Ficha", name: "file_number", type: "number", placeholder: "Ingrese el número de ficha", required: true },
                {
                  label: "Programa",
                  name: "programa",
                  type: "select",
                  options: programs.map((p: any) => ({ value: p.id, label: p.name })),
                  required: true,
                  customSelect: true,
                },
              ]}
              onClose={() => { setShowEditFicha(false); setEditFicha(null); setPendingEditFicha(null); }}
              onSubmit={handleSubmitEditFicha}
              submitText="Actualizar Ficha"
              cancelText="Cancelar"
              initialValues={editFicha || {}}
              customRender={undefined}
              onProgramChange={undefined}
            />
            <ConfirmModal
              isOpen={showEditFichaConfirm}
              title="¿Confirmar actualización de ficha?"
              message="¿Estás seguro de que deseas actualizar esta ficha?"
              confirmText="Sí, actualizar ficha"
              cancelText="Cancelar"
              onConfirm={handleConfirmEditFicha}
              onCancel={() => { setShowEditFichaConfirm(false); setPendingEditFicha(null); }}
            />
            <ConfirmModal
              isOpen={showDisableConfirm}
              title="¿Confirmar acción?"
              message="¿Estás seguro de que deseas deshabilitar esta ficha?"
              confirmText="Sí, continuar"
              cancelText="Cancelar"
              onConfirm={handleConfirmDisable}
              onCancel={() => { setShowDisableConfirm(false); setPendingDisable(null); }}
            />
          </div>
          {Math.ceil(fichas.length / cardsPerPage) > 1 && (
            <Paginator
              page={fichasPage}
              totalPages={Math.ceil(fichas.length / cardsPerPage)}
              onPageChange={setFichasPage}
              className="mt-4 px-6"
            />
          )}

          <ModalFormGeneric
            isOpen={showFichaModal}
            title="Agregar Ficha"
            fields={[
              { label: "Número de Ficha", name: "file_number", type: "number", placeholder: "Ingrese el número de ficha", required: true },
              {
                label: "Programa",
                name: "programa",
                type: "select",
                options: programs.filter((p: any) => p.active).map((p: any) => ({ value: p.id, label: p.name })),
                required: true,
                customSelect: true,
              },
            ]}
            onClose={() => setShowFichaModal(false)}
            onSubmit={handleSubmitFicha}
            submitText="Registrar Ficha"
            cancelText="Cancelar"
            customRender={undefined}
            onProgramChange={undefined}
          />
          <ConfirmModal
            isOpen={showFichaConfirm}
            title="¿Confirmar registro de ficha?"
            message="¿Estás seguro de que deseas crear esta ficha?"
            confirmText="Sí, crear ficha"
            cancelText="Cancelar"
            onConfirm={handleConfirmFicha}
            onCancel={() => {
              setShowFichaConfirm(false);
              setPendingFichaData(null);
            }}
          />
        </>
      )}
    </div>
  );
};

export default FichaSection;
