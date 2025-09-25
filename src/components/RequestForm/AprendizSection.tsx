import React from 'react';
import CustomSelect from '../CustomSelect';
import { Person } from 'react-bootstrap-icons';

interface AprendizSectionProps {
  person: any;
  userData: any;
  programas: any[];
  selectedProgram: number | null;
  updateSelectedProgram: (id: number) => void;
  fichas: any[];
  formData: any;
  updateFormData: (field: string, value: any) => void;
  modalidades: any[];
  dateError: string;
  minEndDate: string;
  maxEndDate: string;
  handleStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEndDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getDocumentTypeName: (typeValue: string) => string;
}

const AprendizSection: React.FC<AprendizSectionProps> = ({
  person,
  userData,
  programas,
  selectedProgram,
  updateSelectedProgram,
  fichas,
  formData,
  updateFormData,
  modalidades,
  dateError,
  minEndDate,
  maxEndDate,
  handleStartDateChange,
  handleEndDateChange,
  getDocumentTypeName
}) => (
  <div className="mb-6 bg-white rounded-lg shadow-sm border-2" style={{ borderColor: '#7BCC7C' }}>
    <div className="flex items-center gap-3 px-6 py-4 rounded-t-lg border-b" style={{ backgroundColor: '#E7FFE8', borderBottomColor: '#7BCC7C' }}>
      <Person size={24} color="#0C672D" />
      <span className="font-semibold text-xl" style={{ color: '#0C672D' }}>Datos del Aprendiz</span>
    </div>
    <div className="p-6 bg-white rounded-b-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Información pre-cargada (no editable) */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#2D7430' }}>Tipo de identificación *</label>
          <input type="text" className="w-full border-2 rounded-lg px-3 py-2 text-sm bg-gray-100 cursor-not-allowed" value={getDocumentTypeName(person.type_identification)} readOnly disabled />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#2D7430' }}>Número de identificación *</label>
          <input type="text" className="w-full border-2 rounded-lg px-3 py-2 text-sm bg-gray-100 cursor-not-allowed" value={person.number_identification} readOnly disabled />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#2D7430' }}>Nombre *</label>
          <input type="text" className="w-full border-2 rounded-lg px-3 py-2 text-sm bg-gray-100 cursor-not-allowed" value={`${person.first_name}${person.second_name ? ` ${person.second_name}` : ' '}`} readOnly disabled />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#2D7430' }}>Primer Apellido *</label>
          <input type="text" className="w-full border-2 rounded-lg px-3 py-2 text-sm bg-gray-100 cursor-not-allowed" value={person.first_last_name} readOnly disabled />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#2D7430' }}>Segundo Apellido</label>
          <input type="text" className="w-full border-2 rounded-lg px-3 py-2 text-sm bg-gray-100 cursor-not-allowed" value={person.second_last_name || 'Ninguno'} readOnly disabled />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#2D7430' }}>Correo Electrónico *</label>
          <input type="email" className="w-full border-2 rounded-lg px-3 py-2 text-sm bg-gray-100 cursor-not-allowed" value={userData?.email || ''} readOnly disabled />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#2D7430' }}>Número de teléfono móvil *</label>
          <input type="tel" className="w-full border-2 rounded-lg px-3 py-2 text-sm bg-gray-100 cursor-not-allowed" value={person.phone_number} readOnly disabled />
        </div>
        {/* Campos editables */}
        <div>
          <CustomSelect
            value={selectedProgram ? String(selectedProgram) : ""}
            onChange={val => updateSelectedProgram(Number(val))}
            options={programas.map(p => ({ value: String(p.id), label: p.name }))}
            label="Programa de Formación *"
            placeholder="Seleccione..."
            classNames={{
              trigger: "w-full border-2 rounded-lg px-3 py-2 text-sm",
              label: "block text-sm font-medium mb-2",
            }}
          />
        </div>
        <div>
          <CustomSelect
            value={formData.fichaId ? String(formData.fichaId) : ""}
            onChange={val => updateFormData('fichaId', Number(val))}
            options={fichas.map(f => ({ value: String(f.id), label: f.file_number || String(f.id) }))}
            label="Número de Ficha *"
            placeholder="Seleccione..."
            classNames={{
              trigger: "w-full border-2 rounded-lg px-3 py-2 text-sm",
              label: "block text-sm font-medium mb-2",
            }}
            disabled={!selectedProgram}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#2D7430' }}>Fecha de inicio de contrato de aprendizaje *</label>
          <input type="date" className="w-full border-2 rounded-lg px-3 py-2 text-sm" required onChange={handleStartDateChange} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#2D7430' }}>Fecha de fin de contrato de aprendizaje *</label>
          <input type="date" className="w-full border-2 rounded-lg px-3 py-2 text-sm" required min={minEndDate} max={maxEndDate} disabled={!formData.dateStartContract} onChange={handleEndDateChange} />
          {dateError && <div className="mt-1"><span className="text-red-600 text-xs">{dateError}</span></div>}
        </div>
        <div>
          <CustomSelect
            value={formData.modalityProductiveStage ? String(formData.modalityProductiveStage) : ""}
            onChange={val => updateFormData('modalityProductiveStage', Number(val))}
            options={modalidades.map(modalidad => ({ value: String(modalidad.id), label: modalidad.name_modality }))}
            label="Modalidad etapa productiva *"
            placeholder="Seleccione..."
            classNames={{
              trigger: "w-full border-2 rounded-lg px-3 py-2 text-sm",
              label: "block text-sm font-medium mb-2",
            }}
          />
        </div>
      </div>
    </div>
  </div>
);

export default AprendizSection;
