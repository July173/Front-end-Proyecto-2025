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
  const { person, userData, loading: userLoading, error: userError } = useAprendizData();
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
      // Validar tipo de archivo
      if (file.type !== 'application/pdf') {
        alert('Solo se permiten archivos PDF');
        return;
      }
      
      // Validar tamaño (1MB = 1024 * 1024 bytes)
      const maxSizeInBytes = 1024 * 1024; // 1MB
      if (file.size > maxSizeInBytes) {
        alert('El archivo no puede ser mayor a 1MB');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!person) {
      alert('No se encontraron los datos del aprendiz');
      return;
    }

    // VALIDAR ARCHIVO PDF MANUALMENTE
    if (!selectedFile) {
      alert('Debe seleccionar un archivo PDF');
      return;
    }

    // Actualizar formData con el ID del aprendiz - CONVERTIR A NÚMERO
    const updatedFormData: Partial<requestAsignation> = {
      ...formData,
      aprendizId: Number(person.id) || 0, // Convertir explícitamente a número
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

    // CONSOLE LOGS PARA DEBUG
    console.log('=== DATOS DEL FORMULARIO ===');
    console.log('Person ID:', person.id, 'Tipo:', typeof person.id);
    console.log('Person ID convertido:', Number(person.id), 'Tipo:', typeof Number(person.id));
    console.log('FormData actual:', formData);
    console.log('FormData actualizado:', updatedFormData);
    
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
      alert(`Errores de validación:\n${validationErrors.join('\n')}`);
      return;
    }

    console.log('=== CAMPOS REQUERIDOS ===');
    Object.entries(requiredFields).forEach(([key, value]) => {
      const isEmpty = value === 0 || value === '' || value === null || value === undefined;
      console.log(`${key}:`, value, 'Tipo:', typeof value, isEmpty ? '❌ FALTA' : '✅ OK');
    });

    console.log('=== ARCHIVO PDF ===');
    console.log('Archivo seleccionado:', selectedFile);

    // Verificar qué campos están vacíos
    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => value === 0 || value === '' || value === null || value === undefined)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      console.error('❌ CAMPOS FALTANTES:', missingFields);
      alert(`Faltan los siguientes campos: ${missingFields.join(', ')}`);
      return;
    }

    console.log('✅ ENVIANDO SOLICITUD...');

  // PASAR LOS DATOS TRANSFORMADOS AL SUBMIT
  const requestId = await submitRequest(snakeCaseData);
    
    console.log('Respuesta del servidor - ID de solicitud:', requestId);
    
    if (requestId && selectedFile) {
      // Subir PDF si hay archivo seleccionado
      const pdfUploaded = await uploadPdf(selectedFile, requestId);
      if (pdfUploaded) {
        alert('Solicitud enviada exitosamente');
        // Aquí podrías redirigir o limpiar el formulario
      }
    } else if (requestId) {
      alert('Solicitud enviada exitosamente');
    }
  };

  if (userLoading) return <div className="p-8">Cargando información del aprendiz...</div>;
  if (userError) return <div className="p-8 text-red-500">{userError}</div>;
  if (!person) return <div className="p-8 text-orange-500">No se encontró la información del aprendiz.</div>;

  return (
    <div className="min-h-screen py-8 rounded-md" style={{ background: '#f8f9fa' }}>
      <div className="w-full max-w-4xl mx-auto px-4">
        <form onSubmit={handleSubmit}>
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
              <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green }}>
                Regional <span style={{ color: COLORS.error }}>*</span>
              </label>
              <select
                value={selectedRegional || ""}
                onChange={(e) => updateSelectedRegional(Number(e.target.value))}
                className="w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                style={{ borderColor: COLORS.green3 }}
                required
              >
                <option value="">Seleccione...</option>
                {regionales.map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
              <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green }}>
                Centro de formación <span style={{ color: COLORS.error }}>*</span>
              </label>
              <select
                value={selectedCenter || ""}
                onChange={(e) => updateSelectedCenter(Number(e.target.value))}
                className="w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                style={{ borderColor: COLORS.green3 }}
                required
                disabled={!selectedRegional}
              >
                <option value="">Seleccione...</option>
                {centrosFiltrados.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
              <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green }}>
                Sede centro de formación <span style={{ color: COLORS.error }}>*</span>
              </label>
              <select
                value={formData.sede || ""}
                onChange={(e) => updateFormData('sede', Number(e.target.value))}
                className="w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                style={{ borderColor: COLORS.green3 }}
                required
                disabled={!selectedCenter}
              >
                <option value="">Seleccione...</option>
                {sedesFiltradas.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Datos del Aprendiz - campos pre-cargados + campos editables */}
          <div className="mb-6 bg-white rounded-lg shadow-sm border-2" style={{ borderColor: COLORS.green3 }}>
            <div className="flex items-center gap-3 px-6 py-4 rounded-t-lg border-b" style={{ backgroundColor: COLORS.green4, borderBottomColor: COLORS.green3 }}>
              <Person size={24} color={COLORS.green} />
              <span className="font-semibold text-xl" style={{ color: COLORS.green }}>
                Datos del Aprendiz
              </span>
            </div>
            <div className="p-6 bg-white rounded-b-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Información pre-cargada (no editable) */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green2 }}>
                    Tipo de identificación <span style={{ color: COLORS.error }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    className="w-full border-2 rounded-lg px-3 py-2 text-sm bg-gray-100 cursor-not-allowed" 
                    style={{ borderColor: COLORS.green3 }} 
                    value={getDocumentTypeName(person.type_identification)}
                    readOnly
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green2 }}>
                    Número de identificación <span style={{ color: COLORS.error }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    className="w-full border-2 rounded-lg px-3 py-2 text-sm bg-gray-100 cursor-not-allowed" 
                    style={{ borderColor: COLORS.green3 }} 
                    value={person.number_identification}
                    readOnly
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green2 }}>
                    Nombre <span style={{ color: COLORS.error }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    className="w-full border-2 rounded-lg px-3 py-2 text-sm bg-gray-100 cursor-not-allowed" 
                    style={{ borderColor: COLORS.green3 }} 
                    value={`${person.first_name}${person.second_name ? ` ${person.second_name}` : ' - Ninguno'}`}
                    readOnly
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green2 }}>
                    Primer Apellido <span style={{ color: COLORS.error }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    className="w-full border-2 rounded-lg px-3 py-2 text-sm bg-gray-100 cursor-not-allowed" 
                    style={{ borderColor: COLORS.green3 }} 
                    value={person.first_last_name}
                    readOnly
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green2 }}>
                    Segundo Apellido
                  </label>
                  <input 
                    type="text" 
                    className="w-full border-2 rounded-lg px-3 py-2 text-sm bg-gray-100 cursor-not-allowed" 
                    style={{ borderColor: COLORS.green3 }} 
                    value={person.second_last_name || 'Ninguno'}
                    readOnly
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green2 }}>
                    Correo Electrónico <span style={{ color: COLORS.error }}>*</span>
                  </label>
                  <input 
                    type="email" 
                    className="w-full border-2 rounded-lg px-3 py-2 text-sm bg-gray-100 cursor-not-allowed" 
                    style={{ borderColor: COLORS.green3 }} 
                    value={userData?.email || ''}
                    readOnly
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green2 }}>
                    Número de teléfono móvil <span style={{ color: COLORS.error }}>*</span>
                  </label>
                  <input 
                    type="tel" 
                    className="w-full border-2 rounded-lg px-3 py-2 text-sm bg-gray-100 cursor-not-allowed" 
                    style={{ borderColor: COLORS.green3 }} 
                    value={person.phone_number}
                    readOnly
                    disabled
                  />
                </div>

                {/* Campos editables - PROGRAMA Y FICHA DENTRO DE DATOS DEL APRENDIZ */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green2 }}>
                    Programa de Formación <span style={{ color: COLORS.error }}>*</span>
                  </label>
                  <select
                    value={selectedProgram || ""}
                    onChange={(e) => updateSelectedProgram(Number(e.target.value))}
                    className="w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    style={{ borderColor: COLORS.green3 }}
                    required
                  >
                    <option value="">Seleccione...</option>
                    {programas.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green2 }}>
                    Número de Ficha <span style={{ color: COLORS.error }}>*</span>
                  </label>
                  <select
                    value={formData.fichaId || ""}
                    onChange={(e) => updateFormData('fichaId', Number(e.target.value))}
                    className="w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    style={{ borderColor: COLORS.green3 }}
                    required
                    disabled={!selectedProgram}
                  >
                    <option value="">Seleccione...</option>
                    {fichas.map(f => (
                      <option key={f.id} value={f.id}>
                        {f.file_number || f.id}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green2 }}>
                    Fecha de inicio de contrato de aprendizaje <span style={{ color: COLORS.error }}>*</span>
                  </label>
                  <input 
                    type="date" 
                    className="w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" 
                    style={{ borderColor: COLORS.green3 }} 
                    required 
                    onChange={handleStartDateChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green2 }}>
                    Fecha de fin de contrato de aprendizaje <span style={{ color: COLORS.error }}>*</span>
                  </label>
                  <input 
                    type="date" 
                    className="w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" 
                    style={{ borderColor: COLORS.green3 }} 
                    required 
                    min={minEndDate}
                    max={maxEndDate}
                    disabled={!formData.dateStartContract}
                    onChange={handleEndDateChange}
                  />
                  {dateError && <div className="mt-1"><span className="text-red-600 text-xs">{dateError}</span></div>}
                </div>

              <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green2 }}>
                    Modalidad etapa productiva <span style={{ color: COLORS.error }}>*</span>
                  </label>
                  <select 
                    className="w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" 
                    style={{ borderColor: COLORS.green3 }} 
                    required
                    value={formData.modalityProductiveStage || ""}
                    onChange={(e) => updateFormData('modalityProductiveStage', Number(e.target.value))}
                  >
                    <option value="">Seleccione...</option>
                    {modalidades.map(modalidad => (
                      <option key={modalidad.id} value={modalidad.id}>
                        {modalidad.name_modality}
                      </option>
                    ))}
                  </select>
                </div>

              </div>
            </div>
          </div>

          {/* Datos de la Empresa */}
          <div className="mb-6 bg-white rounded-lg shadow-md border-2" style={{ borderColor: COLORS.green3 }}>
            <div className="flex items-center gap-3 px-6 py-4 rounded-t-lg border-b" style={{ backgroundColor: COLORS.green4, borderBottomColor: COLORS.green3 }}>
              <Buildings size={24} color={COLORS.green} />
              <span className="font-semibold text-xl" style={{ color: COLORS.green }}>
                Datos de la Empresa
              </span>
            </div>
            <div className="p-6 bg-white rounded-b-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green }}>
                    Nombre de la empresa <span style={{ color: COLORS.error }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    className="w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" 
                    style={{ borderColor: COLORS.green3 }} 
                    required 
                    placeholder="Ingrese el nombre de la empresa"
                    onChange={(e) => updateFormData('enterpriseName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green }}>
                    NIT de la empresa <span style={{ color: COLORS.error }}>*</span>
                  </label>
                  <input 
                    type="number" 
                    className="w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" 
                    style={{ borderColor: COLORS.green3 }} 
                    required 
                    placeholder="Ingrese el NIT de la empresa"
                    onChange={(e) => updateFormData('enterpriseNit', Number(e.target.value))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green }}>
                    Ubicación empresa <span style={{ color: COLORS.error }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    className="w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" 
                    style={{ borderColor: COLORS.green3 }} 
                    required 
                    placeholder="Ingrese la dirección ciudad"
                    onChange={(e) => updateFormData('enterpriseLocation', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green }}>
                    Correo de la empresa <span style={{ color: COLORS.error }}>*</span>
                  </label>
                  <input 
                    type="email" 
                    className="w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" 
                    style={{ borderColor: COLORS.green3 }} 
                    required 
                    placeholder="Empresa@gmail.com"
                    onChange={(e) => updateFormData('enterpriseEmail', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Datos del Jefe Inmediato */}
          <div className="mb-6 bg-white rounded-lg shadow-md border-2" style={{ borderColor: COLORS.green3 }}>
            <div className="flex items-center gap-3 px-6 py-4 rounded-t-lg border-b" style={{ backgroundColor: COLORS.green4, borderBottomColor: COLORS.green3 }}>
              <Person size={24} color={COLORS.green} />
              <span className="font-semibold text-xl" style={{ color: COLORS.green }}>
                Datos del Jefe Inmediato
              </span>
            </div>
            <div className="p-6 bg-white rounded-b-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green }}>
                    Nombre completo <span style={{ color: COLORS.error }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    className="w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" 
                    style={{ borderColor: COLORS.green3 }} 
                    required 
                    placeholder="Ingrese el nombre completo"
                    onChange={(e) => updateFormData('bossName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green }}>
                    Número de teléfono <span style={{ color: COLORS.error }}>*</span>
                  </label>
                  <input 
                    type="tel" 
                    className="w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" 
                    style={{ borderColor: COLORS.green3 }} 
                    required 
                    placeholder="Ingrese el número de teléfono"
                      value={formData.bossPhone || ''}
                      onChange={handlePhoneChange}
                  />
                    {phoneError && <span className="text-red-600 text-xs">{phoneError}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green }}>
                    Correo electrónico <span style={{ color: COLORS.error }}>*</span>
                  </label>
                  <input 
                    type="email" 
                    className="w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" 
                    style={{ borderColor: COLORS.green3 }} 
                    required 
                    placeholder="Ingrese el correo"
                    onChange={(e) => updateFormData('bossEmail', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green }}>
                    Cargo <span style={{ color: COLORS.error }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    className="w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" 
                    style={{ borderColor: COLORS.green3 }} 
                    required 
                    placeholder="Cargo del jefe"
                    onChange={(e) => updateFormData('bossPosition', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Datos del Encargado de contratación */}
          <div className="mb-6 bg-white rounded-lg shadow-md border-2" style={{ borderColor: COLORS.green3 }}>
            <div className="flex items-center gap-3 px-6 py-4 rounded-t-lg border-b" style={{ backgroundColor: COLORS.green4, borderBottomColor: COLORS.green3 }}>
              <Person size={24} color={COLORS.green} />
              <span className="font-semibold text-xl" style={{ color: COLORS.green }}>
                Datos del Encargado de contratación o área de Talento Humano
              </span>
            </div>
            <div className="p-6 bg-white rounded-b-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green }}>
                    Nombre completo <span style={{ color: COLORS.error }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    className="w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" 
                    style={{ borderColor: COLORS.green3 }} 
                    required 
                    placeholder="Ingrese el nombre completo"
                    onChange={(e) => updateFormData('humanTalentName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green }}>
                    Número de teléfono <span style={{ color: COLORS.error }}>*</span>
                  </label>
                  <input 
                    type="tel" 
                    className="w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" 
                    style={{ borderColor: COLORS.green3 }} 
                    required 
                    placeholder="Ingrese el número de teléfono"
                      value={formData.humanTalentPhone || ''}
                      onChange={handleHumanTalentPhoneChange}
                  />
                    {humanTalentPhoneError && <span className="text-red-600 text-xs">{humanTalentPhoneError}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green }}>
                    Correo electrónico <span style={{ color: COLORS.error }}>*</span>
                  </label>
                  <input 
                    type="email" 
                    className="w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" 
                    style={{ borderColor: COLORS.green3 }} 
                    required 
                    placeholder="Ingrese el correo"
                    onChange={(e) => updateFormData('humanTalentEmail', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Archivo PDF */}
          <div className="mb-6 bg-white rounded-lg shadow-md border-2" style={{ borderColor: COLORS.green3 }}>
            <div className="flex items-center gap-3 px-6 py-4 rounded-t-lg border-b" style={{ backgroundColor: COLORS.green4, borderBottomColor: COLORS.green3 }}>
              <FileEarmarkPdf size={24} color={COLORS.green} />
              <span className="font-semibold text-xl" style={{ color: COLORS.green }}>
                Cargue aquí un solo archivo en PDF con el documento que soporte su solicitud (máximo 1MB)
                <span style={{ color: COLORS.error }}>*</span>
              </span>
            </div>
            <div className="p-6 bg-white rounded-b-lg">
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Favor tenga en cuenta que, para Contrato de Aprendizaje debe cargar la copia del contrato celebrado con la empresa. Para las modalidades de Desempeño a través de vinculación laboral o contractual, Participación en un proyecto productivo, De apoyo a una unidad productiva familiar o Pasantías, debe cargar la evidencia mediante la cual el Coordinador Académico le Aprobó realizar su etapa práctica bajo algunas de estas modalidades. Si aún no cuenta con dicha autorización puede ingresar al siguiente enlace y solicitar la aprobación.{' '}
                <a href="#" className="text-green-700 underline hover:text-green-800">
                  1-2-2 Autorización Modalidad Etapa Práctica Aprendiz, diferente a Contrato de Aprendizaje.
                </a>
              </p>
              
              <div 
                className={`w-full flex flex-col items-center border-2 border-dashed rounded-lg py-8 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${!selectedFile ? 'border-red-300 bg-red-50' : ''}`}
                style={{ borderColor: !selectedFile ? COLORS.error : COLORS.green3 }}
                onClick={triggerFileInput}
              >
                <BoxArrowUp size={40} color={!selectedFile ? COLORS.error : COLORS.green} className="mb-3" />
                <span className="font-medium text-lg mb-2" style={{ color: !selectedFile ? COLORS.error : COLORS.green }}>
                  {selectedFile ? selectedFile.name : 'Seleccionar archivo PDF (Requerido)'}
                </span>
                <span className="text-sm text-gray-500 text-center max-w-md">
                  {selectedFile 
                    ? 'Haz clic para cambiar el archivo seleccionado'
                    : 'Arrastra y suelta tu archivo aquí o haz clic para seleccionar'
                  }
                </span>
                
                <input
                  id="pdf-upload"
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  // REMOVER EL REQUIRED DE AQUÍ
                  onChange={handleFileSelect}
                />
              </div>
              
              {selectedFile && (
                <div className="mt-3 p-3 bg-green-50 rounded-lg border" style={{ borderColor: COLORS.green3 }}>
                  <p className="text-sm font-medium" style={{ color: COLORS.green }}>
                    Archivo seleccionado: {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    Tamaño: {(selectedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              )}

              {/* Mostrar error si no hay archivo seleccionado */}
              {!selectedFile && (
                <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm text-red-700">
                    ⚠️ Debe seleccionar un archivo PDF para continuar
                  </p>
                </div>
              )}
            </div>
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
  );
}