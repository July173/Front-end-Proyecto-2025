// imagenes de figma exportadas a public/reportmass
import { excelTemplateService, UploadResult } from '../Api/Services/ExcelTemplate';
import { useState } from 'react';
import { TarjetaExcel } from '../components/MassRegistration/TarjetaExcel';
import { ResultModal } from '../components/MassRegistration/ResultModal';

const img = "../../public/massRegistartions/tarjeta_excel.svg";
const img1 = "../../public/massRegistartions/upload.svg";
const img2 = "../../public/massRegistartions/tarjeta_excel_azul.svg";
const img3 = "../../public/massRegistartions/person.svg";
const img4 = "../../public/massRegistartions/download_B.svg";
const img5 = "../../public/massRegistartions/people.svg";
const img6 = "../../public/massRegistartions/download.svg";
const img7 = "../../public/massRegistartions/upload_N.svg";

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
          <TarjetaExcel
            variant="instructores"
            isUploading={isDownloading}
            onDownload={handleDownloadInstructorTemplate}
            img5={img5}
            img4={img4}
          />
          <TarjetaExcel
            variant="aprendices"
            isUploading={isDownloading}
            onDownload={handleDownloadAprendizTemplate}
            img3={img3}
            img4={img4}
          />
        </div>
      </div>

      {/* Subir archivos */}
      <div className="bg-white rounded-[10px] w-full max-w-4xl p-10 flex flex-col gap-5 items-start">
        <div className="flex gap-2.5 items-center mb-4">
          <img alt="upload" className="w-[30px] h-[30px]" src={img7} />
          <span className="font-semibold text-[22px] text-black">Subir Archivos con Datos</span>
        </div>
        <div className="flex gap-8 w-full">
          <TarjetaExcel
            variant="Variant3"
            isUploading={isUploadingInstructor}
            onFileSelect={handleUploadInstructorFile}
            img={img}
            img1={img1}
          />
          <TarjetaExcel
            variant="Variant4"
            isUploading={isUploadingAprendiz}
            onFileSelect={handleUploadAprendizFile}
            img2={img2}
            img1={img1}
          />
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
      {showResultModal && uploadResults && (
        <ResultModal
          isOpen={showResultModal}
          onClose={() => setShowResultModal(false)}
          results={uploadResults}
          type={resultType}
        />
      )}
    </div>
  );
}


