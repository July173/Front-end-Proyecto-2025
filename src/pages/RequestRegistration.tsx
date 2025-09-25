import AprendizSection from '../components/RequestForm/AprendizSection';
import CustomSelect from '../components/CustomSelect';
import EmpresaSection from '../components/RequestForm/EmpresaSection';
import JefeSection from '../components/RequestForm/JefeSection';
import TalentoHumanoSection from '../components/RequestForm/TalentoHumanoSection';
import PdfUploadSection from '../components/RequestForm/PdfUploadSection';
import React, { useState } from "react";
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
import { FormSelects } from '../components/RequestForm/FormSelects';
import { typesDocument } from '../constants/selectOptions';
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
  const { validatePhone, validateEndDate } = useFormValidations();
  const [phoneError, setPhoneError] = useState('');
  const [humanTalentPhoneError, setHumanTalentPhoneError] = useState('');
  const [dateError, setDateError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { person, userData, aprendizId, loading: userLoading, error: userError } = useAprendizData();
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

  const [notification, setNotification] = useState<{
    isOpen: boolean;
    type: 'info' | 'warning' | 'success' | 'password-changed' | 'email-sent' | 'pending' | 'completed';
    title: string;
    message: string;
    key?: number;
  }>({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    key: 0
  });

  const [showConfirm, setShowConfirm] = useState(false);

  // Calcular rango permitido para fecha de fin (después de declarar formData)
  let minEndDate = '';
  let maxEndDate = '';
  if (formData.dateStartContract) {
    const startDate = new Date(formData.dateStartContract);
    const endMonthDate = new Date(startDate);
    endMonthDate.setMonth(endMonthDate.getMonth() + 6);
    // Primer día del mes
    minEndDate = new Date(endMonthDate.getFullYear(), endMonthDate.getMonth(), 1).toISOString().split('T')[0];
    // Último día del mes
    maxEndDate = new Date(endMonthDate.getFullYear(), endMonthDate.getMonth() + 1, 0).toISOString().split('T')[0];
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setNotification({
          isOpen: true,
          type: 'warning',
          title: 'Archivo inválido',
          message: 'Solo se permiten archivos PDF.'
        });
        return;
      }
      const maxSizeInBytes = 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        setNotification({
          isOpen: true,
          type: 'warning',
          title: 'Archivo demasiado grande',
          message: 'El archivo no puede ser mayor a 1MB.'
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('pdf-upload').click();
  };

  // Función para obtener el nombre del tipo de documento usando selectOptions
  const getDocumentTypeName = (typeValue: string) => {
    const documentType = typesDocument.find(type => type.value === typeValue);
    return documentType ? documentType.label : 'No especificado';
  };

  // Validación en tiempo real para teléfono
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    updateFormData('bossPhone', value);
    setPhoneError(validatePhone(value));
  };

  const handleHumanTalentPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    updateFormData('humanTalentPhone', value);
    setHumanTalentPhoneError(validatePhone(value));
  };

  // Validación en tiempo real para fechas
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const startValue = new Date(e.target.value).getTime();
    updateFormData('dateStartContract', startValue);
    
    // Limpiar error anterior
    setDateError('');
    
    // Si ya hay fecha de fin, validar
    if (formData.dateEndContract) {
      setDateError(validateEndDate(startValue, formData.dateEndContract));
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const endValue = new Date(e.target.value).getTime();
    updateFormData('dateEndContract', endValue);
    
    // Validar inmediatamente con la fecha de inicio
    if (formData.dateStartContract) {
      setDateError(validateEndDate(formData.dateStartContract, endValue));
    } else {
      setDateError('Debe seleccionar primero la fecha de inicio');
    }
  };

  // Nuevo handle para el submit del formulario
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  // Lógica de envío real, solo si el usuario confirma
  const handleConfirmSend = async () => {
    setShowConfirm(false);
    clearError();
    // Helper to show notification after confirm closes
    const showNotification = (notif) => {
  setTimeout(() => setNotification({ ...notif, key: Date.now() }), 200); // force remount with unique key
    };
    if (!person) {
      showNotification({
        isOpen: true,
        type: 'warning',
        title: 'Datos de aprendiz no encontrados',
        message: 'No se encontraron los datos del aprendiz. Por favor, verifica tu sesión o comunícate con soporte.'
      });
      return;
    }
    if (!selectedFile) {
      showNotification({
        isOpen: true,
        type: 'warning',
        title: 'Archivo PDF requerido',
        message: 'Debes seleccionar un archivo PDF para continuar con la solicitud.'
      });
      return;
    }
    // Actualizar formData con el ID del aprendiz (de la tabla aprendiz)
    const updatedFormData: Partial<requestAsignation> = {
      ...formData,
      aprendizId: Number(aprendizId) || 0,
    };
    // Transformar a snake_case y fechas a string
    const snakeCaseData = {
      aprendiz_id: updatedFormData.aprendizId,
      ficha_id: updatedFormData.fichaId,
      fecha_inicio_contrato: updatedFormData.dateStartContract ? new Date(updatedFormData.dateStartContract).toISOString().slice(0, 10) : '',
      fecha_fin_contrato: updatedFormData.dateEndContract ? new Date(updatedFormData.dateEndContract).toISOString().slice(0, 10) : '',
      enterprise_name: updatedFormData.enterpriseName,
      enterprise_nit: String(updatedFormData.enterpriseNit ?? ''),
      enterprise_location: updatedFormData.enterpriseLocation,
      enterprise_email: updatedFormData.enterpriseEmail,
      boss_name: updatedFormData.bossName,
      boss_phone: updatedFormData.bossPhone,
      boss_email: updatedFormData.bossEmail,
      boss_position: updatedFormData.bossPosition,
      human_talent_name: updatedFormData.humanTalentName,
      human_talent_email: updatedFormData.humanTalentEmail,
      human_talent_phone: updatedFormData.humanTalentPhone,
      sede: updatedFormData.sede,
      modality_productive_stage: updatedFormData.modalityProductiveStage,
    };
    // Verificar campos requeridos
    const requiredFields = {
      aprendizId: updatedFormData.aprendizId!,
      fichaId: updatedFormData.fichaId!,
      dateEndContract: updatedFormData.dateEndContract!,
      dateStartContract: updatedFormData.dateStartContract!,
      enterpriseName: updatedFormData.enterpriseName!,
      enterpriseNit: updatedFormData.enterpriseNit!,
      enterpriseLocation: updatedFormData.enterpriseLocation!,
      enterpriseEmail: updatedFormData.enterpriseEmail!,
      bossName: updatedFormData.bossName!,
      bossPhone: updatedFormData.bossPhone!,
      bossEmail: updatedFormData.bossEmail!,
      bossPosition: updatedFormData.bossPosition!,
      humanTalentName: updatedFormData.humanTalentName!,
      humanTalentEmail: updatedFormData.humanTalentEmail!,
      humanTalentPhone: updatedFormData.humanTalentPhone!,
      sede: updatedFormData.sede!,
      modalityProductiveStage: updatedFormData.modalityProductiveStage!,
    };
    // Validaciones extra
    const bossPhoneValidation = validatePhone(updatedFormData.bossPhone ?? '');
    const humanTalentPhoneValidation = validatePhone(updatedFormData.humanTalentPhone ?? '');
    const dateValidation = validateEndDate(updatedFormData.dateStartContract ?? null, updatedFormData.dateEndContract ?? null);
    // Filtrar solo errores no vacíos
    const validationErrors = [bossPhoneValidation, humanTalentPhoneValidation, dateValidation]
      .filter(error => error !== '');
    
    if (validationErrors.length > 0) {
      showNotification({
        isOpen: true,
        type: 'warning',
        title: 'Errores de validación',
        message: `Errores encontrados:\n${validationErrors.join('\n')}`
      });
      return;
    }

    Object.entries(requiredFields).forEach(([key, value]) => {
      const isEmpty = value === 0 || value === '' || value === null || value === undefined;
    });

    // Verificar qué campos están vacíos
    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => value === 0 || value === '' || value === null || value === undefined)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      showNotification({
        isOpen: true,
        type: 'warning',
        title: 'Campos faltantes',
        message: `Faltan los siguientes campos: ${missingFields.join(', ')}`
      });
      return;
    }

    // PASAR LOS DATOS TRANSFORMADOS AL SUBMIT
    try {
      console.log('Enviando datos principales:', snakeCaseData);
      const requestId = await submitRequest(snakeCaseData);
      console.log('ID de solicitud recibido:', requestId);
      if (requestId && selectedFile) {
        // Subir PDF con request_id como campo obligatorio
        let pdfUploadResult = null;
        try {
          console.log('Enviando PDF:', selectedFile, 'con request_id:', requestId);
          pdfUploadResult = await uploadPdf(selectedFile, requestId);
          console.log('Respuesta de uploadPdf:', pdfUploadResult);
        } catch (pdfErr) {
          console.error('Error al subir PDF:', pdfErr);
          showNotification({
            isOpen: true,
            type: 'warning',
            title: 'Error al subir PDF',
            message: pdfErr?.message || 'La solicitud fue enviada pero hubo un error al subir el archivo PDF.'
          });
          return;
        }
        if (pdfUploadResult && pdfUploadResult.ok !== false) {
          showNotification({
            isOpen: true,
            type: 'success',
            title: 'Solicitud enviada',
            message: 'La solicitud fue enviada exitosamente y el archivo PDF se ha subido correctamente.'
          });
        } else {
          showNotification({
            isOpen: true,
            type: 'warning',
            title: 'Error al subir PDF',
            message: 'La solicitud fue enviada pero hubo un error al subir el archivo PDF.'
          });
        }
      } else if (requestId) {
        showNotification({
          isOpen: true,
          type: 'success',
          title: 'Solicitud enviada',
          message: 'La solicitud fue enviada exitosamente.'
        });
      }
    } catch (err) {
      console.error('Error al enviar solicitud principal:', err);
      showNotification({
        isOpen: true,
        type: 'warning',
        title: 'Error al enviar solicitud',
        message: err?.message || 'Ocurrió un error inesperado al enviar la solicitud.'
      });
    }
  };

  if (userLoading) return <div className="p-8">Cargando información del aprendiz...</div>;
  if (userError) return <div className="p-8 text-red-500">{userError}</div>;
  if (!person) return <div className="p-8 text-orange-500">No se encontró la información del aprendiz.</div>;

  return (
    <>
      <NotificationModal
        key={notification.key}
        isOpen={notification.isOpen}
        onClose={() => setNotification({ ...notification, isOpen: false, key: Date.now() })}
        type={notification.type}
        title={notification.title}
        message={notification.message}
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
                    trigger: "w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent",
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
                    trigger: "w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent",
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
                    trigger: "w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent",
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
              dateError={dateError}
              minEndDate={minEndDate}
              maxEndDate={maxEndDate}
              handleStartDateChange={handleStartDateChange}
              handleEndDateChange={handleEndDateChange}
              getDocumentTypeName={getDocumentTypeName}
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
              phoneError={phoneError}
              handlePhoneChange={handlePhoneChange}
            />

            {/* Datos del Encargado de contratación */}
            <TalentoHumanoSection
              formData={formData}
              updateFormData={updateFormData}
              humanTalentPhoneError={humanTalentPhoneError}
              handleHumanTalentPhoneChange={handleHumanTalentPhoneChange}
            />

            {/* Archivo PDF */}
            <div >
              
              <PdfUploadSection
                selectedFile={selectedFile}
                handleFileSelect={handleFileSelect}
                triggerFileInput={triggerFileInput}
              />
              
            </div>
            

            {/* Error handling */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-red-700">{error}</div>
              </div>
            )}

            {/* Botón enviar */}
            <div className="flex flex-col items-center">
              <button 
                type="submit" 
                disabled={loading}
                className={`w-full max-w-md font-bold py-4 rounded-lg text-lg flex items-center justify-center gap-3 transition-all duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg transform hover:-translate-y-1'}`}
                style={{ 
                  backgroundColor: loading ? '#999' : COLORS.green,
                  color: COLORS.white 
                }}
              >
                <Send size={24} /> 
                {loading ? 'Enviando...' : 'Enviar Formulario'}
              </button>
              <p className="text-sm text-gray-600 mt-3 text-center">
                Asegúrate de completar todos los campos obligatorios (<span style={{ color: COLORS.error }}>*</span>)
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}