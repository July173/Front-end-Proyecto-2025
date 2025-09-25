import React from 'react';
import { Person } from 'react-bootstrap-icons';

interface TalentoHumanoSectionProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  humanTalentPhoneError: string;
  handleHumanTalentPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TalentoHumanoSection: React.FC<TalentoHumanoSectionProps> = ({ formData, updateFormData, humanTalentPhoneError, handleHumanTalentPhoneChange }) => (
  <div className="mb-6 bg-white rounded-lg shadow-md border-2" style={{ borderColor: '#7BCC7C' }}>
    <div className="flex items-center gap-3 px-6 py-4 rounded-t-lg border-b" style={{ backgroundColor: '#E7FFE8', borderBottomColor: '#7BCC7C' }}>
      <Person size={24} color="#0C672D" />
      <span className="font-semibold text-xl" style={{ color: '#0C672D' }}>Datos del Encargado de contratación o área de Talento Humano</span>
    </div>
    <div className="p-6 bg-white rounded-b-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#2D7430' }}>Nombre completo *</label>
          <input type="text" className="w-full border-2 rounded-lg px-3 py-2 text-sm" required placeholder="Ingrese el nombre completo" onChange={e => updateFormData('humanTalentName', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#2D7430' }}>Número de teléfono *</label>
          <input type="tel" className="w-full border-2 rounded-lg px-3 py-2 text-sm" required placeholder="Ingrese el número de teléfono" value={formData.humanTalentPhone || ''} onChange={handleHumanTalentPhoneChange} />
          {humanTalentPhoneError && <span className="text-red-600 text-xs">{humanTalentPhoneError}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#2D7430' }}>Correo electrónico *</label>
          <input type="email" className="w-full border-2 rounded-lg px-3 py-2 text-sm" required placeholder="Ingrese el correo" onChange={e => updateFormData('humanTalentEmail', e.target.value)} />
        </div>
      </div>
    </div>
  </div>
);

export default TalentoHumanoSection;
