// imagenes de figma exportadas a public/reportmass
import { excelTemplateService, UploadResult } from '../Api/Services/ExcelTemplate';
import { useState, useRef } from 'react';

const img = "../../public/massRegistartions/tarjeta_excel.svg";
const img1 = "../../public/massRegistartions/upload.svg";
const img2 = "../../public/massRegistartions/tarjeta_excel_azul.svg";
const img3 = "../../public/massRegistartions/person.svg";
const img4 = "../../public/massRegistartions/download_B.svg";
const img5 = "../../public/massRegistartions/people.svg";
const img6 = "../../public/massRegistartions/download.svg";
const img7 = "../../public/massRegistartions/upload_N.svg";

interface TarjetaExcelProps {
  property1?: string;
  onDownload?: () => void;
  onUpload?: (file: File) => void;
  isUploading?: boolean;
}

function TarjetaExcel({ property1 = "instructor", onDownload, onUpload, isUploading = false }: TarjetaExcelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onUpload) {
      onUpload(file);
    }
    // Limpiar el input para permitir subir el mismo archivo nuevamente
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  if (property1 === "Variant3") {
    return (
      <div className="relative rounded-[10px] w-full h-[252px] bg-[#c0fbcd]">
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        <div className="flex flex-col gap-4 px-[15px] py-[9px] h-full">
          <div className="h-[185px] relative rounded-[10px] w-full">
            <div className="flex flex-col gap-5 h-[185px] items-center justify-center w-full">
              <div className="relative w-[50px] h-[50px]">
                <img alt="excel" className="absolute inset-0 w-full h-full" src={img} />
              </div>
              <div className="flex flex-col font-semibold text-[#055e09] text-[16px] text-center">
                <p className="mb-0">
                  {isUploading ? 'Procesando archivo...' : 'Seleccionar archivo Excel'}
                </p>
                <p className="text-[#7bcc7f]">Formatos soportados: .xlsx, .xls</p>
              </div>
            </div>
            <div aria-hidden="true" className="absolute border border-dashed border-green-600 inset-0 pointer-events-none rounded-[10.5px]" />
          </div>
          <div
            className={`${isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 cursor-pointer'} flex gap-3 items-center justify-center py-1.5 rounded-[10px] w-full transition-colors`}
            onClick={!isUploading ? handleUploadClick : undefined}
          >
            {isUploading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <img alt="upload" className="w-4 h-4" src={img1} />
            )}
            <span className="font-semibold text-[14px] text-white">
              {isUploading ? 'Subiendo...' : 'Subir instructores'}
            </span>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border-2 border-[#7bcc7f] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
    );
  }
  if (property1 === "Variant4") {
    return (
      <div className="relative rounded-[10px] w-full h-[252px] bg-[#eaf5ff]">
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        <div className="flex flex-col gap-4 px-[15px] py-[9px] h-full">
          <div className="h-[185px] relative rounded-[10px] w-full">
            <div className="flex flex-col gap-5 h-[185px] items-center justify-center w-full">
              <div className="relative w-[50px] h-[50px]">
                <img alt="excel" className="absolute inset-0 w-full h-full" src={img2} />
              </div>
              <div className="flex flex-col font-semibold text-[#055e09] text-[16px] text-center">
                <p className="mb-0 text-[#154fef]">
                  {isUploading ? 'Procesando archivo...' : 'Seleccionar archivo Excel'}
                </p>
                <p className="text-[rgba(37,99,235,0.7)]">Formatos soportados: .xlsx, .xls</p>
              </div>
            </div>
            <div aria-hidden="true" className="absolute border border-[#154fef] border-dashed inset-0 pointer-events-none rounded-[10.5px]" />
          </div>
          <div
            className={`${isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#154fef] cursor-pointer'} flex gap-3 items-center justify-center py-1.5 rounded-[10px] w-full transition-colors`}
            onClick={!isUploading ? handleUploadClick : undefined}
          >
            {isUploading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <img alt="upload" className="w-4 h-4" src={img1} />
            )}
            <span className="font-semibold text-[14px] text-white">
              {isUploading ? 'Subiendo...' : 'Subir Aprendices'}
            </span>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border-2 border-[#154fef] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
    );
  }
  if (property1 === "aprendices") {
    return (
      <div className="relative rounded-[10px] w-full h-[252px] bg-[#eaf5ff]">
        <div className="flex flex-col gap-4 px-[15px] py-[9px] h-full">
          <div className="flex gap-5 items-center">
            <img alt="person" className="w-[50px] h-[50px]" src={img3} />
            <div className="flex flex-col font-semibold text-[#154fef] text-[16px]">
              <p className="mb-0">Plantilla Aprendices</p>
              <p className="text-[12px] text-[rgba(21,79,239,0.7)]">Campos básicos para registro de aprendices</p>
            </div>
          </div>
          <div className="flex flex-col font-semibold text-[#154fef] text-[12px]">
            <p className="mb-0">Campos incluidos:</p>
            <ul className="list-disc ml-5">
              <li>Datos personales básicos</li>
              <li>Información de contacto</li>
              <li>Programa de formación</li>
              <li>Ficha y centro de formación</li>
              <li>Estado del aprendiz</li>
            </ul>
          </div>
          <div className="bg-[#154fef] flex gap-3 items-center justify-center py-1.5 rounded-[10px] w-full cursor-pointer" onClick={onDownload}>
            <img alt="download" className="w-4 h-4" src={img4} />
            <span className="font-semibold text-[14px] text-white">Descargar plantilla para aprendices</span>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border-2 border-[#154fef] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
    );
  }
  // Default: instructores
  return (
    <div className="relative rounded-[10px] w-full h-[252px] bg-[#c0fbcd]">
      <div className="flex flex-col gap-4 px-[15px] py-[9px] h-full">
        <div className="flex gap-5 items-center">
          <img alt="people" className="w-[50px] h-[50px]" src={img5} />
          <div className="flex flex-col font-semibold text-[#055e09] text-[16px]">
            <p className="mb-0">Plantilla Instructores</p>
            <p className="text-[12px] text-[rgba(5,94,9,0.7)]">Campos para registro de instructores del SENA</p>
          </div>
        </div>
        <div className="flex flex-col font-semibold text-[#055e09] text-[12px]">
          <p className="mb-0">Campos incluidos:</p>
          <ul className="list-disc ml-5">
            <li>Datos personales básicos</li>
            <li>Información de contacto</li>
            <li>Tipo y fecha de contrato</li>
            <li>Área de conocimiento</li>
            <li>Credenciales de acceso</li>
          </ul>
        </div>
        <div className="bg-green-600 flex gap-3 items-center justify-center py-1.5 rounded-[10px] w-full cursor-pointer" onClick={onDownload}>
          <img alt="download" className="w-4 h-4" src={img6} />
          <span className="font-semibold text-[14px] text-white">Descargar plantilla para instructores</span>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#7bcc7f] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

// Modal para mostrar resultados de la carga
interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: UploadResult | null;
  type: 'instructor' | 'aprendiz';
}

function ResultModal({ isOpen, onClose, results, type }: ResultModalProps) {
  if (!isOpen || !results) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              Resultados de carga de {type === 'instructor' ? 'Instructores' : 'Aprendices'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Resumen */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{results.total_processed}</div>
              <div className="text-sm text-gray-600">Total procesados</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{results.successful_registrations}</div>
              <div className="text-sm text-gray-600">Exitosos</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-red-600">{results.errors.length}</div>
              <div className="text-sm text-gray-600">Con errores</div>
            </div>
          </div>

          {/* Registros exitosos */}
          {results.success.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-green-600 mb-2">
                ✅ Registros exitosos ({results.success.length})
              </h3>
              <div className="max-h-40 overflow-y-auto bg-green-50 p-4 rounded-lg">
                {results.success.map((success, index) => (
                  <div key={index} className="mb-2 last:mb-0">
                    <span className="font-medium">Fila {success.row}:</span> {success.message}
                    <div className="text-sm text-gray-600">Email: {success.email}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Errores */}
          {results.errors.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-red-600">
                  ❌ Errores encontrados ({results.errors.length})
                </h3>
                {results.error_report_url && (
                  <button
                    onClick={async () => {
                      try {
                        await excelTemplateService.downloadErrorReport(results.error_report_url!);
                      } catch (error) {
                        console.error('Error descargando reporte:', error);
                        alert('Error al descargar el reporte de errores');
                      }
                    }}
                    className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                  >
                    📥 Descargar Reporte
                  </button>
                )}
              </div>
              
              {results.error_report_message && (
                <div className="mb-3 p-2 bg-orange-50 border border-orange-200 rounded text-sm text-orange-700">
                  💡 {results.error_report_message}
                </div>
              )}

              <div className="max-h-40 overflow-y-auto bg-red-50 p-4 rounded-lg">
                {results.errors.map((error, index) => (
                  <div key={index} className="mb-3 last:mb-0 border-b border-red-200 last:border-b-0 pb-2 last:pb-0">
                    {error.row ? (
                      <div className="font-medium">Fila {error.row}:</div>
                    ) : (
                      <div className="font-medium">Error general:</div>
                    )}
                    <ul className="list-disc ml-4 text-sm">
                      {error.errors.map((err, errIndex) => (
                        <li key={errIndex}>{err}</li>
                      ))}
                    </ul>
                    {error.general && (
                      <div className="text-sm text-red-700 mt-1">{error.general}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MassRegistration() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isUploadingInstructor, setIsUploadingInstructor] = useState(false);
  const [isUploadingAprendiz, setIsUploadingAprendiz] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [uploadResults, setUploadResults] = useState<UploadResult | null>(null);
  const [resultType, setResultType] = useState<'instructor' | 'aprendiz'>('instructor');

  const handleDownloadInstructorTemplate = async () => {
    setIsDownloading(true);
    try {
      await excelTemplateService.downloadInstructorTemplate();
    } catch (error) {
      console.error('Error descargando plantilla de instructores:', error);
      alert('Error al descargar la plantilla de instructores');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadAprendizTemplate = async () => {
    setIsDownloading(true);
    try {
      await excelTemplateService.downloadAprendizTemplate();
    } catch (error) {
      console.error('Error descargando plantilla de aprendices:', error);
      alert('Error al descargar la plantilla de aprendices');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleUploadInstructorFile = async (file: File) => {
    setIsUploadingInstructor(true);
    try {
      const results = await excelTemplateService.uploadInstructorExcel(file);
      setUploadResults(results);
      setResultType('instructor');
      setShowResultModal(true);
    } catch (error) {
      console.error('Error subiendo archivo de instructores:', error);
      alert(`Error al procesar el archivo: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      setIsUploadingInstructor(false);
    }
  };

  const handleUploadAprendizFile = async (file: File) => {
    setIsUploadingAprendiz(true);
    try {
      const results = await excelTemplateService.uploadAprendizExcel(file);
      setUploadResults(results);
      setResultType('aprendiz');
      setShowResultModal(true);
    } catch (error) {
      console.error('Error subiendo archivo de aprendices:', error);
      alert(`Error al procesar el archivo: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      setIsUploadingAprendiz(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center w-full py-8">
      {/* Encabezado */}
      <div className="flex flex-col items-center w-full">
        <h1 className="font-bold text-3xl text-gray-800 mb-2">Registro Masivo de Datos</h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl">
          Descarga las plantillas de Excel correspondientes, llénalas con los datos y súbelas para realizar el registro masivo en la base de datos.
        </p>
      </div>

      {/* Instrucciones */}
      <div className="bg-[#fffaea] rounded-[10px] w-full max-w-4xl p-6 flex flex-col items-center">
        <div className="flex flex-col font-medium text-[20px] text-black mb-2">
          <span className="text-2xl mb-2">📋 <span className="font-semibold">Instrucciones Importantes</span></span>
        </div>
        <ul className="list-disc text-gray-700 text-base ml-8">
          <li>Descarga primero la plantilla correspondiente (Instructores o Aprendices)</li>
          <li>Llena todos los campos obligatorios marcados en rojo</li>
          <li>No modifiques los nombres de las columnas</li>
          <li>Guarda el archivo en formato .xlsx o .xls antes de subirlo</li>
          <li>Verifica que los datos estén completos antes de la carga</li>
          <li>Los usuarios registrados quedan activos automáticamente</li>
          <li>Revisa el resumen de resultados después de cada carga</li>
        </ul>
      </div>

      {/* Descargar plantillas */}
      <div className="bg-white rounded-[10px] w-full max-w-4xl p-10 flex flex-col gap-5 items-start">
        <div className="flex gap-2.5 items-center mb-4">
          <img alt="download" className="w-[30px] h-[30px]" src={img6} />
          <span className="font-semibold text-[22px] text-black">Descargar Plantillas</span>
        </div>
        <div className="flex gap-8 w-full">
          <TarjetaExcel onDownload={handleDownloadInstructorTemplate} />
          <TarjetaExcel property1="aprendices" onDownload={handleDownloadAprendizTemplate} />
        </div>
      </div>

      {/* Subir archivos */}
      <div className="bg-white rounded-[10px] w-full max-w-4xl p-10 flex flex-col gap-5 items-start">
        <div className="flex gap-2.5 items-center mb-4">
          <img alt="upload" className="w-[30px] h-[30px]" src={img7} />
          <span className="font-semibold text-[22px] text-black">Subir Archivos con Datos</span>
        </div>
        <div className="flex gap-8 w-full">
          <div className="flex flex-col gap-5 items-start w-1/2">
            <div className="flex gap-2.5 items-center">
              <img alt="people" className="w-[50px] h-[50px]" src={img5} />
              <span className="font-semibold text-[22px] text-[#055e09]">Cargar Instructores</span>
            </div>
            <TarjetaExcel
              property1="Variant3"
              onUpload={handleUploadInstructorFile}
              isUploading={isUploadingInstructor}
            />
          </div>
          <div className="flex flex-col gap-5 items-start w-1/2">
            <div className="flex gap-2.5 items-center">
              <img alt="person" className="w-[50px] h-[50px]" src={img3} />
              <span className="font-semibold text-[22px] text-[#154fef]">Cargar Aprendices</span>
            </div>
            <TarjetaExcel
              property1="Variant4"
              onUpload={handleUploadAprendizFile}
              isUploading={isUploadingAprendiz}
            />
          </div>
        </div>
      </div>
      
      {/* Indicador de carga para descargas */}
      {isDownloading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span>Descargando plantilla...</span>
          </div>
        </div>
      )}

      {/* Modal de resultados */}
      <ResultModal
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
        results={uploadResults}
        type={resultType}
      />
    </div>
  );
}