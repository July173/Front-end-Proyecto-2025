import React from 'react';
import CustomSelect from '../CustomSelect';

interface FormSelectsProps {
  // Regional, Centro, Sede
  regionales: Array<{id: number, name: string}>;
  centrosFiltrados: Array<{id: number, name: string}>;
  sedesFiltradas: Array<{id: number, name: string}>;
  
  // Programa y Ficha
  programas: Array<{id: number, name: string}>;
  fichas: Array<{id: number, file_number?: string}>;
  
  // Valores seleccionados
  selectedRegional: number;
  selectedCenter: number;
  selectedSede: number;
  selectedProgram: number;
  selectedFicha: number;
  
  // Callbacks
  onRegionalChange: (value: number) => void;
  onCenterChange: (value: number) => void;
  onSedeChange: (value: number) => void;
  onProgramChange: (value: number) => void;
  onFichaChange: (value: number) => void;
  
  colors: any;
}

export const FormSelects: React.FC<FormSelectsProps> = ({
  regionales,
  centrosFiltrados,
  sedesFiltradas,
  programas,
  fichas,
  selectedRegional,
  selectedCenter,
  selectedSede,
  selectedProgram,
  selectedFicha,
  onRegionalChange,
  onCenterChange,
  onSedeChange,
  onProgramChange,
  onFichaChange,
  colors
}) => {
  return (
    <>
      {/* Regional, Centro, Sede */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <label className="block text-sm font-medium mb-2" style={{ color: colors.green }}>
            Regional <span style={{ color: colors.error }}>*</span>
          </label>
          <CustomSelect
            value={selectedRegional ? String(selectedRegional) : ""}
            onChange={value => onRegionalChange(Number(value))}
            options={regionales.map(r => ({ value: String(r.id), label: r.name }))}
            placeholder="Seleccione..."
            classNames={{
              trigger: "w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent",
              label: "hidden",
            }}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <label className="block text-sm font-medium mb-2" style={{ color: colors.green }}>
            Centro de formación <span style={{ color: colors.error }}>*</span>
          </label>
          <CustomSelect
            value={selectedCenter ? String(selectedCenter) : ""}
            onChange={value => onCenterChange(Number(value))}
            options={centrosFiltrados.map(c => ({ value: String(c.id), label: c.name }))}
            placeholder="Seleccione..."
            classNames={{
              trigger: "w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent",
              label: "hidden",
            }}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <label className="block text-sm font-medium mb-2" style={{ color: colors.green }}>
            Sede centro de formación <span style={{ color: colors.error }}>*</span>
          </label>
          <CustomSelect
            value={selectedSede ? String(selectedSede) : ""}
            onChange={value => onSedeChange(Number(value))}
            options={sedesFiltradas.map(s => ({ value: String(s.id), label: s.name }))}
            placeholder="Seleccione..."
            classNames={{
              trigger: "w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent",
              label: "hidden",
            }}
          />
        </div>
      </div>

      {/* Programa y Ficha dentro del formulario de aprendiz */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: colors.green2 }}>
            Programa de Formación <span style={{ color: colors.error }}>*</span>
          </label>
          <CustomSelect
            value={selectedProgram ? String(selectedProgram) : ""}
            onChange={value => onProgramChange(Number(value))}
            options={programas.map(p => ({ value: String(p.id), label: p.name }))}
            placeholder="Seleccione..."
            classNames={{
              trigger: "w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent",
              label: "hidden",
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: colors.green2 }}>
            Número de Ficha <span style={{ color: colors.error }}>*</span>
          </label>
          <CustomSelect
            value={selectedFicha ? String(selectedFicha) : ""}
            onChange={value => onFichaChange(Number(value))}
            options={fichas.map(f => ({ 
              value: String(f.id), 
              label: f.file_number || String(f.id) 
            }))}
            placeholder="Seleccione..."
            classNames={{
              trigger: "w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent",
              label: "hidden",
            }}
          />
        </div>
      </div>
    </>
  );
};