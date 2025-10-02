import AprendizSection from '../components/RequestForm/AprendizSection';
import CustomSelect from '../components/CustomSelect';
import EmpresaSection from '../components/RequestForm/EmpresaSection';
import JefeSection from '../components/RequestForm/JefeSection';
import TalentoHumanoSection from '../components/RequestForm/TalentoHumanoSection';
import PdfUploadSection from '../components/RequestForm/PdfUploadSection';
import { 
  JournalText,
  Person,
  Buildings,
  FileEarmarkPdf,
  BoxArrowUp,
  Send
} from 'react-bootstrap-icons';
import { useAprendizData } from '../hook/useAprendizData';
import { useRequestAssignation } from '../hook/useRequestAssignation';
import { useFormValidations } from '../hook/useFormValidations';
import { useState } from "react";
import { useDocumentTypes } from '../hook/useDocumentTypes';
import { useFileUpload } from '../hook/useFileUpload';
import { useDateValidation } from '../hook/useDateValidation';
import { useFormHandlers } from '../hook/useFormHandlers';
import { requestAsignation } from '../Api/types/Modules/assign.types';
import NotificationModal from '../components/NotificationModal';
import ConfirmModal from '../components/ConfirmModal';

// Colores usados
const COLORS = {
  green: "#0C672D",
  green2: "#2D7430",
  green3: "#7BCC7C",
  green4: "#E7FFE8",
  white: "#FFFFFF",
  grey: "#686868",
  black: "#000000",
  error: "#DC395F",
};

export default function RequestRegistration() {
  // Handler para el envío del formulario
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  // Handler para confirmar el envío
  const handleConfirmSend = async () => {
    setShowConfirm(false);
    try {
      const requestId = await submitRequest(formData);
      if (requestId && pdfFile) {
        const pdfUploadResult = await uploadPdf(pdfFile, requestId);
        if (pdfUploadResult === true) {
          setFileNotification({
            isOpen: true,
            type: 'success',
            title: 'Solicitud enviada',
            message: 'La solicitud fue enviada exitosamente y el archivo PDF se ha subido correctamente.',
            key: Date.now()
          });
        } else {
          setFileNotification({
            isOpen: true,
            type: 'warning',
            title: 'Error al subir PDF',
            message: 'La solicitud fue enviada pero hubo un error al subir el archivo PDF.',
            key: Date.now()
          });
        }
      } else if (requestId) {
        setFileNotification({
          isOpen: true,
          type: 'success',
          title: 'Solicitud enviada',
          message: 'La solicitud fue enviada exitosamente.',
          key: Date.now()
        });
      }
    } catch (err: any) {
      setFileNotification({
        isOpen: true,
        type: 'warning',
        title: 'Error al enviar solicitud',
        message: err?.message || 'Ocurrió un error inesperado al enviar la solicitud.',
        key: Date.now()
      });
    }
  };
  const { validatePhone, validateEndDate } = useFormValidations();
  const {
    documentTypes: docTypes,
    loading: docTypesLoading,
    error: docTypesError
  } = useDocumentTypes();
  const {
    selectedFile: pdfFile,
    setSelectedFile: setPdfFile,
    notification: fileNotification,
    setNotification: setFileNotification,
    handleFileSelect: handlePdfSelect,
    triggerFileInput: triggerPdfInput
  } = useFileUpload();


  // useRequestAssignation para obtener formData primero
  const {
    loading,
    error,
    formData,
    regionales,
    centrosFiltrados,
    sedesFiltradas,
    programas,
    fichas,
    modalidades, // Añadir modalidades
    selectedRegional,
    selectedCenter,
    selectedProgram,
    updateFormData,
    updateSelectedRegional,
    updateSelectedCenter,
    updateSelectedProgram,
    submitRequest,
    uploadPdf,
    clearError
  } = useRequestAssignation();

  // Ahora sí, useDateValidation con formData ya definido
  const {
    minEndDate: minContractEndDate,
    maxEndDate: maxContractEndDate,
    dateError: contractDateError,
    setDateError: setContractDateError,
    handleStartDateChange: handleContractStartDateChange,
    handleEndDateChange: handleContractEndDateChange
  } = useDateValidation(formData, validateEndDate);
  const {
    phoneError: jefePhoneError,
    setPhoneError: setJefePhoneError,
    humanTalentPhoneError: talentoPhoneError,
    setHumanTalentPhoneError: setTalentoPhoneError,
    handlePhoneChange: handleJefePhoneChange,
    handleHumanTalentPhoneChange: handleTalentoPhoneChange
  } = useFormHandlers(validatePhone);
  const { person, userData, aprendizId, loading: userLoading, error: userError } = useAprendizData();

  const [showConfirm, setShowConfirm] = useState(false);

  if (userLoading) return <div className="p-8">Cargando información del aprendiz...</div>;
  if (userError) return <div className="p-8 text-red-500">{userError}</div>;
  if (!person) return <div className="p-8 text-orange-500">No se encontró la información del aprendiz.</div>;

  return (
    <>
      <NotificationModal
        key={fileNotification.key}
        isOpen={fileNotification.isOpen}
        onClose={() => setFileNotification({ ...fileNotification, isOpen: false, key: Date.now() })}
        type={fileNotification.type}
        title={fileNotification.title}
        message={fileNotification.message}
      />
      <ConfirmModal
        isOpen={showConfirm}
        title="¿Confirmar envío de solicitud?"
        message="¿Estás seguro de que deseas enviar el formulario?"
        confirmText="Sí, enviar"
        cancelText="Cancelar"
        onConfirm={handleConfirmSend}
        onCancel={() => setShowConfirm(false)}
      />
      <div className="min-h-screen py-8 rounded-md" style={{ background: '#f8f9fa' }}>
        <div className="w-full max-w-4xl mx-auto px-4">
          <form onSubmit={handleFormSubmit}>
            <div className="flex items-center gap-3 mb-6 justify-center ">
              <div 
                className="flex items-center justify-center rounded-full" 
                style={{ width: 48, height: 48, backgroundColor: COLORS.green2 }}
              >
                <JournalText size={28} color={COLORS.white} />
              </div>
              <h1 className="font-bold text-3xl" style={{ color: COLORS.green2 }}>
                Formulario de Asignación
              </h1>
            </div>
            {/* Encabezado centrado */}
            <div className="w-full flex flex-col items-center justify-center mb-8 bg-white rounded-lg shadow-md p-6 border border-gray-200">
              
              <h2 className="font-semibold text-xl mb-4 text-center" style={{ color: COLORS.green2 }}>
                Asignación instructor acompañamiento etapa práctica
              </h2>
              <p className="text-sm text-gray-700 text-center max-w-2xl leading-relaxed">
                Únicamente para la alternativa de Contrato de Aprendizaje. Acepto el tratamiento de mis datos personales conforme a lo consagrado en el artículo 15 Constitución Política y en la Resolución No. 0924 del MINTIC.
              </p>
            </div>

            {/* Términos y condiciones */}
            <div className="w-full mb-6 bg-white rounded-lg   shadow-md p-4 border border-gray-200">
              <div className="flex items-start gap-3 mb-2">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="mt-1 accent-green-600" 
                  style={{ accentColor: COLORS.green }}
                  required 
                />
                <div>
                  <label htmlFor="terms" className="font-medium text-sm cursor-pointer">
                    Acepto los términos y condiciones <span style={{ color: COLORS.error }}>*</span>
                  </label>
                  <p className="text-xs text-gray-600 mt-1">
                    LOS DATOS PROPORCIONADOS SERÁN TRATADOS DE ACUERDO A LA POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES DEL SENA Y A LA LEY 1581 DE 2012
                  </p>
                </div>
              </div>
            </div>

            {/* Selects de Regional, Centro, Sede (solo estos por fuera) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                <CustomSelect
                  value={selectedRegional ? String(selectedRegional) : ""}
                  onChange={val => updateSelectedRegional(Number(val))}
                  options={regionales.map(r => ({ value: String(r.id), label: r.name }))}
                  label={`Regional *`}
                  placeholder="Seleccione..."
                  classNames={{
                    trigger: "w-full border-2 rounded-lg px-3 py-2 text-sm flex items-center justify-between bg-white",
                    label: "block text-sm font-medium mb-2",
                  }}
                />
              </div>

              <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                <CustomSelect
                  value={selectedCenter ? String(selectedCenter) : ""}
                  onChange={val => updateSelectedCenter(Number(val))}
                  options={centrosFiltrados.map(c => ({ value: String(c.id), label: c.name }))}
                  label={`Centro de formación *`}
                  placeholder="Seleccione..."
                  classNames={{
                    trigger: "w-full border-2 rounded-lg px-3 py-2 text-sm flex items-center justify-between bg-white",
                    label: "block text-sm font-medium mb-2",
                  }}
                  disabled={!selectedRegional}
                />
              </div>

              <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                <CustomSelect
                  value={formData.sede ? String(formData.sede) : ""}
                  onChange={val => updateFormData('sede', Number(val))}
                  options={sedesFiltradas.map(s => ({ value: String(s.id), label: s.name }))}
                  label={`Sede centro de formación *`}
                  placeholder="Seleccione..."
                  classNames={{
                    trigger: "w-full border-2 rounded-lg px-3 py-2 text-sm flex items-center justify-between bg-white",
                    label: "block text-sm font-medium mb-2",
                  }}
                  disabled={!selectedCenter}
                />
              </div>
            </div>

            {/* Datos del Aprendiz - campos pre-cargados + campos editables */}
            <AprendizSection
              person={person}
              userData={userData}
              programas={programas}
              selectedProgram={selectedProgram}
              updateSelectedProgram={updateSelectedProgram}
              fichas={fichas}
              formData={formData}
              updateFormData={updateFormData}
              modalidades={modalidades}
              dateError={contractDateError}
              minEndDate={minContractEndDate}
              maxEndDate={maxContractEndDate}
              handleStartDateChange={handleContractStartDateChange}
              handleEndDateChange={handleContractEndDateChange}
              getDocumentTypeName={(typeValue) => {
                const documentType = docTypes.find(type => String(type.id) === String(typeValue));
                return documentType ? documentType.name : 'No especificado';
              }}
              documentTypes={docTypes}
            />

            {/* Datos de la Empresa */}
            <EmpresaSection
              formData={formData}
              updateFormData={updateFormData}
            />

            {/* Datos del Jefe Inmediato */}
            <JefeSection
              formData={formData}
              updateFormData={updateFormData}
              phoneError={jefePhoneError}
              handlePhoneChange={handleJefePhoneChange(updateFormData)}
            />

            {/* Datos del Encargado de contratación */}
            <TalentoHumanoSection
              formData={formData}
              updateFormData={updateFormData}
              humanTalentPhoneError={talentoPhoneError}
              handleHumanTalentPhoneChange={handleTalentoPhoneChange(updateFormData)}
            />

            {/* Archivo PDF */}
            <div>
              {/* Aquí iría PdfUploadSection y otros campos finales del formulario */}
            </div>
          </form>
        </div>
      </div>
    </>
              
          )}