import React from 'react';
import { FileEarmarkPdf, BoxArrowUp } from 'react-bootstrap-icons';

interface PdfUploadSectionProps {
  selectedFile: File | null;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  triggerFileInput: () => void;
}

const PdfUploadSection: React.FC<PdfUploadSectionProps> = ({ selectedFile, handleFileSelect, triggerFileInput }) => (
  <div className="mb-6 bg-white rounded-lg shadow-md border-2" style={{ borderColor: '#7BCC7C' }}>
    <div className="flex items-center gap-3 px-6 py-4 rounded-t-lg border-b" style={{ backgroundColor: '#E7FFE8', borderBottomColor: '#7BCC7C' }}>
      <FileEarmarkPdf size={24} color="#0C672D" />
      <span className="font-semibold text-xl" style={{ color: '#0C672D' }}>
        Cargue aquí un solo archivo en PDF con el documento que soporte su solicitud (máximo 1MB)
        <span style={{ color: '#DC395F' }}>*</span>
      </span>
    </div>
    <div className="p-6 bg-white rounded-b-lg">
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Favor tenga en cuenta que, para Contrato de Aprendizaje debe cargar la copia del contrato celebrado con la empresa. Para las modalidades de Desempeño a través de vinculación laboral o contractual, Participación en un proyecto productivo, De apoyo a una unidad productiva familiar o Pasantías, debe cargar la evidencia mediante la cual el Coordinador Académico le Aprobó realizar su etapa práctica bajo algunas de estas modalidades. Si aún no cuenta con dicha autorización puede ingresar al siguiente enlace y solicitar la aprobación.{' '}
                <a href="#" className="text-green-700 underline hover:text-green-800">
                  1-2-2 Autorización Modalidad Etapa Práctica Aprendiz, diferente a Contrato de Aprendizaje.
                </a>
              </p>  
      <div className={`w-full flex flex-col items-center border-2 border-dashed rounded-lg py-8 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${!selectedFile ? 'border-red-300 bg-red-50' : ''}`}
        style={{ borderColor: !selectedFile ? '#DC395F' : '#7BCC7C' }}
        onClick={triggerFileInput}
      >
        <BoxArrowUp size={40} color={!selectedFile ? '#DC395F' : '#0C672D'} className="mb-3" />
        <span className="font-medium text-lg mb-2" style={{ color: !selectedFile ? '#DC395F' : '#0C672D' }}>
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
          onChange={handleFileSelect}
        />
      </div>
      {selectedFile && (
        <div className="mt-3 p-3 bg-green-50 rounded-lg border" style={{ borderColor: '#7BCC7C' }}>
          <p className="text-sm font-medium" style={{ color: '#0C672D' }}>
            Archivo seleccionado: {selectedFile.name}
          </p>
          <p className="text-xs text-gray-600">
            Tamaño: {(selectedFile.size / 1024).toFixed(2)} KB
          </p>
        </div>
      )}
      {!selectedFile && (
        <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
          <p className="text-sm text-red-700">
            ⚠️ Debe seleccionar un archivo PDF para continuar
          </p>
        </div>
      )}
    </div>
  </div>
);

export default PdfUploadSection;
