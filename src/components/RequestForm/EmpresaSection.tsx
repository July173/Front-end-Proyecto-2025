import React from 'react';
import { Buildings } from 'react-bootstrap-icons';

interface EmpresaSectionProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const EmpresaSection: React.FC<EmpresaSectionProps> = ({ formData, updateFormData }) => (
  <div className="mb-6 bg-white rounded-lg shadow-md border-2" style={{ borderColor: '#7BCC7C' }}>
    <div className="flex items-center gap-3 px-6 py-4 rounded-t-lg border-b" style={{ backgroundColor: '#E7FFE8', borderBottomColor: '#7BCC7C' }}>
      <Buildings size={24} color="#0C672D" />
      <span className="font-semibold text-xl" style={{ color: '#0C672D' }}>Datos de la Empresa</span>
    </div>
    <div className="p-6 bg-white rounded-b-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#2D7430' }}>Nombre de la empresa *</label>
          <input type="text" className="w-full border-2 rounded-lg px-3 py-2 text-sm" required placeholder="Ingrese el nombre de la empresa" onChange={e => updateFormData('enterpriseName', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#2D7430' }}>NIT de la empresa *</label>
          <input type="number" className="w-full border-2 rounded-lg px-3 py-2 text-sm" required placeholder="Ingrese el NIT de la empresa" onChange={e => updateFormData('enterpriseNit', Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#2D7430' }}>Ubicación empresa *</label>
          <input type="text" className="w-full border-2 rounded-lg px-3 py-2 text-sm" required placeholder="Ingrese la dirección ciudad" onChange={e => updateFormData('enterpriseLocation', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#2D7430' }}>Correo de la empresa *</label>
          <input type="email" className="w-full border-2 rounded-lg px-3 py-2 text-sm" required placeholder="Ingrese el correo " onChange={e => updateFormData('enterpriseEmail', e.target.value)} />
        </div>
      </div>
    </div>
  </div>
);

export default EmpresaSection;
