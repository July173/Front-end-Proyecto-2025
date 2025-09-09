// imagenes de figma exportadas a public/reportmass
const img = "../../public/massRegistartions/tarjeta_excel.svg";
const img1 = "../../public/massRegistartions/upload.svg";
const img2 = "../../public/massRegistartions/tarjeta_excel_azul.svg";
const img3 = "../../public/massRegistartions/person.svg";
const img4 = "../../public/massRegistartions/download_B.svg";
const img5 = "../../public/massRegistartions/people.svg";
const img6 = "../../public/massRegistartions/download.svg";
const img7 = "../../public/massRegistartions/upload_N.svg";

function TarjetaExcel({ property1 = "instructor" }) {
  if (property1 === "Variant3") {
    return (
      <div className="relative rounded-[10px] w-full h-[252px] bg-[#c0fbcd]">
        <div className="flex flex-col gap-4 px-[15px] py-[9px] h-full">
          <div className="h-[185px] relative rounded-[10px] w-full">
            <div className="flex flex-col gap-5 h-[185px] items-center justify-center w-full">
              <div className="relative w-[50px] h-[50px]">
                <img alt="excel" className="absolute inset-0 w-full h-full" src={img} />
              </div>
              <div className="flex flex-col font-semibold text-[#055e09] text-[16px] text-center">
                <p className="mb-0">Seleccionar archivo Excel</p>
                <p className="text-[#7bcc7f]">Formatos soportados: .xlsx, .xls</p>
              </div>
            </div>
            <div aria-hidden="true" className="absolute border border-dashed border-green-600 inset-0 pointer-events-none rounded-[10.5px]" />
          </div>
          <div className="bg-green-600 flex gap-3 items-center justify-center py-1.5 rounded-[10px] w-full">
            <img alt="upload" className="w-4 h-4" src={img1} />
            <span className="font-semibold text-[14px] text-white">Subir instructores</span>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border-2 border-[#7bcc7f] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
    );
  }
  if (property1 === "Variant4") {
    return (
      <div className="relative rounded-[10px] w-full h-[252px] bg-[#eaf5ff]">
        <div className="flex flex-col gap-4 px-[15px] py-[9px] h-full">
          <div className="h-[185px] relative rounded-[10px] w-full">
            <div className="flex flex-col gap-5 h-[185px] items-center justify-center w-full">
              <div className="relative w-[50px] h-[50px]">
                <img alt="excel" className="absolute inset-0 w-full h-full" src={img2} />
              </div>
              <div className="flex flex-col font-semibold text-[#055e09] text-[16px] text-center">
                <p className="mb-0 text-[#154fef]">Seleccionar archivo Excel</p>
                <p className="text-[rgba(37,99,235,0.7)]">Formatos soportados: .xlsx, .xls</p>
              </div>
            </div>
            <div aria-hidden="true" className="absolute border border-[#154fef] border-dashed inset-0 pointer-events-none rounded-[10.5px]" />
          </div>
          <div className="bg-[#154fef] flex gap-3 items-center justify-center py-1.5 rounded-[10px] w-full">
            <img alt="upload" className="w-4 h-4" src={img1} />
            <span className="font-semibold text-[14px] text-white">Subir Aprendices</span>
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
          <div className="bg-[#154fef] flex gap-3 items-center justify-center py-1.5 rounded-[10px] w-full">
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
            <p className="text-[12px] text-[rgba(67,160,71,0.9)]">Incluye campos adicionales para funcionarios del gobierno</p>
          </div>
        </div>
        <div className="flex flex-col font-semibold text-[12px] text-[rgba(46,125,50,0.9)]">
          <p className="mb-0 text-[#055e09]">Campos incluidos:</p>
          <ul className="list-disc ml-5">
            <li>Datos personales básicos</li>
            <li>Información académica</li>
            <li>Datos laborales gubernamentales</li>
            <li>Escalafón y grado</li>
            <li>Dependencia y cargo</li>
          </ul>
        </div>
        <div className="bg-green-600 flex gap-3 items-center justify-center py-1.5 rounded-[10px] w-full">
          <img alt="download" className="w-4 h-4" src={img4} />
          <span className="font-semibold text-[14px] text-white">Descargar plantilla para instructores</span>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#7bcc7f] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

export const MassRegistration = () => {
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
          <li>La plantilla de instructores incluye campos adicionales para funcionarios públicos</li>
        </ul>
      </div>

      {/* Descargar plantillas */}
      <div className="bg-white rounded-[10px] w-full max-w-4xl p-10 flex flex-col gap-5 items-start">
        <div className="flex gap-2.5 items-center mb-4">
          <img alt="download" className="w-[30px] h-[30px]" src={img6} />
          <span className="font-semibold text-[22px] text-black">Descargar Plantillas</span>
        </div>
        <div className="flex gap-8 w-full">
          <TarjetaExcel />
          <TarjetaExcel property1="aprendices" />
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
            <TarjetaExcel property1="Variant3" />
          </div>
          <div className="flex flex-col gap-5 items-start w-1/2">
            <div className="flex gap-2.5 items-center">
              <img alt="person" className="w-[50px] h-[50px]" src={img3} />
              <span className="font-semibold text-[22px] text-[#154fef]">Cargar Aprendices</span>
            </div>
            <TarjetaExcel property1="Variant4" />
          </div>
        </div>
      </div>
    </div>
  );
}

