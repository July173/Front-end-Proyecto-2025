import React, { useState } from "react";
import { 
  JournalText,
  Person,
  Buildings,
  FileEarmarkPdf,
  BoxArrowUp,
  Send
} from 'react-bootstrap-icons';

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
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('pdf-upload').click();
  };

  return (
    <div className="min-h-screen py-8" style={{ background: '#f8f9fa' }}>
      <div className="w-full max-w-4xl mx-auto px-4">
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

        {/* Regional, Centro, Sede */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Regional", placeholder: "Seleccione" },
            { label: "Centro de formación", placeholder: "Seleccione..." },
            { label: "Sede centro de formación", placeholder: "Seleccione..." }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
              <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green }}>
                {item.label} <span style={{ color: COLORS.error }}>*</span>
              </label>
              <select 
                className="w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" 
                style={{ borderColor: COLORS.green3 }} 
                required
              >
                <option value="">{item.placeholder}</option>
              </select>
            </div>
          ))}
        </div>

        {/* Datos del Aprendiz */}
        <div className="mb-6 bg-white rounded-lg shadow-sm border-2" style={{ borderColor: COLORS.green3 }}>
          <div className="flex items-center gap-3 px-6 py-4 rounded-t-lg border-b  " style={{ backgroundColor: COLORS.green4, borderBottomColor: COLORS.green3 }}>
            <Person size={24} color={COLORS.green} />
            <span className="font-semibold text-xl" style={{ color: COLORS.green }}>
              Datos del Aprendiz
            </span>
          </div>
          <div className="p-6 bg-white rounded-b-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Número de identificación", type: "text", placeholder: "Ingrese el número de identificación" },
                { label: "Nombre", type: "text", placeholder: "Ingrese los nombres" },
                { label: "Programa de Formación", type: "select", placeholder: "Seleccione..." },
                { label: "Primer Apellido", type: "text", placeholder: "Ingrese el primer apellido" },
                { label: "Correo Electrónico", type: "email", placeholder: "Ingrese el correo" },
                { label: "Segundo Apellido", type: "text", placeholder: "Ingrese el segundo apellido" },
                { label: "Confirmar correo electrónico", type: "email", placeholder: "Confirme el correo" },
                { label: "Número de teléfono móvil", type: "tel", placeholder: "Ingrese el número de teléfono" },
                { label: "Número de Ficha", type: "text", placeholder: "Ingrese el número de ficha" },
                { label: "Fecha de inicio de contrato de aprendizaje", type: "date", placeholder: "" },
                { label: "Tipo de identificación", type: "select", placeholder: "Seleccione..." },
                { label: "Fecha de fin de contrato de aprendizaje", type: "date", placeholder: "" },
                { label: "Tipo de contrato", type: "select", placeholder: "Seleccione..." }
              ].map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green2 }}>
                    {field.label} <span style={{ color: COLORS.error }}>*</span>
                  </label>
                  {field.type === 'select' ? (
                    <select 
                      className="w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" 
                      style={{ borderColor: COLORS.green3 }} 
                      required
                    >
                      <option value="">{field.placeholder}</option>
                    </select>
                  ) : (
                    <input 
                      type={field.type} 
                      className="w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" 
                      style={{ borderColor: COLORS.green3 }} 
                      required 
                      placeholder={field.placeholder} 
                    />
                  )}
                </div>
              ))}
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
              {[
                { label: "Nombre de la empresa", type: "text", placeholder: "Ingrese el nombre de la empresa" },
                { label: "Ubicación empresa y/o proyecto donde realiza su etapa productiva (Dirección, Ciudad.)", type: "text", placeholder: "Ingrese la dirección ciudad" },
                { label: "NIT de la empresa", type: "text", placeholder: "Ingrese el NIT de la empresa" },
                { label: "Correo de la empresa", type: "email", placeholder: "Empresa@gmail.com" }
              ].map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green }}>
                    {field.label} <span style={{ color: COLORS.error }}>*</span>
                  </label>
                  <input 
                    type={field.type} 
                    className="w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" 
                    style={{ borderColor: COLORS.green3 }} 
                    required 
                    placeholder={field.placeholder} 
                  />
                </div>
              ))}
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
              {[
                { label: "Nombre completo", type: "text", placeholder: "Ingrese el nombre completo" },
                { label: "Número de teléfono", type: "tel", placeholder: "Ingrese el número de teléfono" },
                { label: "Correo electrónico", type: "email", placeholder: "Ingrese el correo" },
                { label: "Cargo", type: "text", placeholder: "Cargo del jefe" }
              ].map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green }}>
                    {field.label} <span style={{ color: COLORS.error }}>*</span>
                  </label>
                  <input 
                    type={field.type} 
                    className="w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" 
                    style={{ borderColor: COLORS.green3 }} 
                    required 
                    placeholder={field.placeholder} 
                  />
                </div>
              ))}
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
              {[
                { label: "Nombre completo", type: "text", placeholder: "Ingrese el nombre completo" },
                { label: "Número de teléfono", type: "tel", placeholder: "Ingrese el número de teléfono" },
                { label: "Correo electrónico", type: "email", placeholder: "Ingrese el correo" }
              ].map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.green }}>
                    {field.label} <span style={{ color: COLORS.error }}>*</span>
                  </label>
                  <input 
                    type={field.type} 
                    className="w-full border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" 
                    style={{ borderColor: COLORS.green3 }} 
                    required 
                    placeholder={field.placeholder} 
                  />
                </div>
              ))}
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
              className="w-full flex flex-col items-center border-2 border-dashed rounded-lg py-8 cursor-pointer hover:bg-gray-50 transition-colors duration-200" 
              style={{ borderColor: COLORS.green3 }}
              onClick={triggerFileInput}
            >
              <BoxArrowUp size={40} color={COLORS.green} className="mb-3" />
              <span className="font-medium text-lg mb-2" style={{ color: COLORS.green }}>
                {selectedFile ? selectedFile.name : 'Seleccionar archivo PDF'}
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
                required
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
          </div>
        </div>

        {/* Botón enviar */}
        <div className="flex flex-col items-center">
          <button 
            type="submit" 
            className="w-full max-w-md font-bold py-4 rounded-lg text-lg flex items-center justify-center gap-3 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1"
            style={{ 
              backgroundColor: COLORS.green,
              color: COLORS.white 
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = COLORS.green2;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = COLORS.green;
            }}
          >
            <Send size={24} /> 
            Enviar Formulario
          </button>
          <p className="text-sm text-gray-600 mt-3 text-center">
            Asegúrate de completar todos los campos obligatorios (<span style={{ color: COLORS.error }}>*</span>)
          </p>
        </div>
      </div>
    </div>
  );
}