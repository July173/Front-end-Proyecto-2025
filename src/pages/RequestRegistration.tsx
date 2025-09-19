import React from "react";
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
  green3: "#7BCC7F",
  white: "#FFFFFF",
  grey: "#686868",
  black: "#000000",
  error: "#DC395F",
};

export const RequestRegistration = () => {
  return (
    <div className="w-full flex flex-col items-center py-8" style={{ background: COLORS.white }}>
      {/* Encabezado */}
      <div className="w-full max-w-3xl mx-auto mb-4">
        <div className="flex items-center gap-3 mb-2 justify-center">
            <div className="bg-green-600 p-2 rounded-full flex items-center justify-center">
              <JournalText size={32} color={COLORS.white} />
            </div>
            <h1 className="font-bold text-2xl" style={{ color: COLORS.green }}>Formulario de Asignación</h1>
        </div>
        <h2 className="font-semibold text-lg mb-2" style={{ color: COLORS.green2 }}>Asignación instructor acompañamiento etapa práctica</h2>
        <p className="text-sm text-gray-700 mb-2">
          Unicamente para la alternativa de Contrato de Aprendizaje. Acepto el tratamiento de mis datos personales conforme a lo consagrado en el artículo 15 Constitución Política y en la Resolución No. 0924 del MINTIC.
        </p>
      </div>
      {/* Términos y condiciones */}
      <div className="w-full max-w-3xl mx-auto mb-4 bg-white rounded shadow p-4">
        <div className="flex items-center gap-2 mb-2">
          <input type="checkbox" id="terms" className="accent-green-600" required />
          <label htmlFor="terms" className="font-medium text-sm">Acepto los términos y condiciones <span style={{ color: COLORS.error }}>*</span></label>
        </div>
        <p className="text-xs text-gray-600">LOS DATOS PROPORCIONADOS SERÁN TRATADOS DE ACUERDO A LA POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES DEL SENA Y A LA LEY 1581 DE 2012</p>
      </div>
      {/* Regional, Centro, Sede */}
      <div className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: COLORS.green }}>Regional <span style={{ color: COLORS.error }}>*</span></label>
          <select className="w-full border rounded px-3 py-2" style={{ borderColor: COLORS.green3 }} required>
            <option value="">Seleccione...</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: COLORS.green }}>Centro de formación <span style={{ color: COLORS.error }}>*</span></label>
          <select className="w-full border rounded px-3 py-2" style={{ borderColor: COLORS.green3 }} required>
            <option value="">Seleccione...</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: COLORS.green }}>Sede centro de formación <span style={{ color: COLORS.error }}>*</span></label>
          <select className="w-full border rounded px-3 py-2" style={{ borderColor: COLORS.green3 }} required>
            <option value="">Seleccione...</option>
          </select>
        </div>
      </div>
      {/* Datos del Aprendiz */}
      <div className="w-full max-w-3xl mx-auto bg-green-50 rounded-lg p-4 mb-4 border" style={{ borderColor: COLORS.green3 }}>
        <div className="flex items-center gap-2 mb-2">
          <Person size={22} color={COLORS.green} />
          <span className="font-semibold text-lg" style={{ color: COLORS.green }}>Datos del Aprendiz</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Número de identificación <span style={{ color: COLORS.error }}>*</span></label>
            <input type="text" className="w-full border rounded px-3 py-2" required placeholder="Ingrese el número de identificación" />
          </div>
          <div>
            <label className="block text-sm font-medium">Nombre <span style={{ color: COLORS.error }}>*</span></label>
            <input type="text" className="w-full border rounded px-3 py-2" required placeholder="Ingrese los nombres" />
          </div>
          <div>
            <label className="block text-sm font-medium">Programa de Formación <span style={{ color: COLORS.error }}>*</span></label>
            <select className="w-full border rounded px-3 py-2" required>
              <option value="">Seleccione...</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Primer Apellido <span style={{ color: COLORS.error }}>*</span></label>
            <input type="text" className="w-full border rounded px-3 py-2" required placeholder="Ingrese el primer apellido" />
          </div>
          <div>
            <label className="block text-sm font-medium">Correo Electrónico <span style={{ color: COLORS.error }}>*</span></label>
            <input type="email" className="w-full border rounded px-3 py-2" required placeholder="Ingrese el correo" />
          </div>
          <div>
            <label className="block text-sm font-medium">Segundo Apellido <span style={{ color: COLORS.error }}>*</span></label>
            <input type="text" className="w-full border rounded px-3 py-2" required placeholder="Ingrese el segundo apellido" />
          </div>
          <div>
            <label className="block text-sm font-medium">Confirmar correo electrónico <span style={{ color: COLORS.error }}>*</span></label>
            <input type="email" className="w-full border rounded px-3 py-2" required placeholder="Confirme el correo" />
          </div>
          <div>
            <label className="block text-sm font-medium">Número de teléfono móvil <span style={{ color: COLORS.error }}>*</span></label>
            <input type="tel" className="w-full border rounded px-3 py-2" required placeholder="Ingrese el número de teléfono" />
          </div>
          <div>
            <label className="block text-sm font-medium">Número de Ficha <span style={{ color: COLORS.error }}>*</span></label>
            <input type="text" className="w-full border rounded px-3 py-2" required placeholder="Ingrese el número de ficha" />
          </div>
          <div>
            <label className="block text-sm font-medium">Fecha de inicio de contrato de aprendizaje <span style={{ color: COLORS.error }}>*</span></label>
            <input type="date" className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Tipo de identificación <span style={{ color: COLORS.error }}>*</span></label>
            <select className="w-full border rounded px-3 py-2" required>
              <option value="">Seleccione...</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Fecha de fin de contrato de aprendizaje <span style={{ color: COLORS.error }}>*</span></label>
            <input type="date" className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Tipo de contrato <span style={{ color: COLORS.error }}>*</span></label>
            <select className="w-full border rounded px-3 py-2" required>
              <option value="">Seleccione...</option>
            </select>
          </div>
        </div>
      </div>
      {/* Datos de la Empresa */}
      <div className="w-full max-w-3xl mx-auto bg-green-50 rounded-lg p-4 mb-4 border" style={{ borderColor: COLORS.green3 }}>
        <div className="flex items-center gap-2 mb-2">
          <Buildings size={22} color={COLORS.green} />
          <span className="font-semibold text-lg" style={{ color: COLORS.green }}>Datos de la Empresa</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Nombre de la empresa <span style={{ color: COLORS.error }}>*</span></label>
            <input type="text" className="w-full border rounded px-3 py-2" required placeholder="Ingrese el nombre de la empresa" />
          </div>
          <div>
            <label className="block text-sm font-medium">Ubicación empresa y/o proyecto donde realiza su etapa productiva (Dirección, Ciudad.) <span style={{ color: COLORS.error }}>*</span></label>
            <input type="text" className="w-full border rounded px-3 py-2" required placeholder="Ingrese la dirección ciudad" />
          </div>
          <div>
            <label className="block text-sm font-medium">NIT de la empresa <span style={{ color: COLORS.error }}>*</span></label>
            <input type="text" className="w-full border rounded px-3 py-2" required placeholder="Ingrese el NIT de la empresa" />
          </div>
          <div>
            <label className="block text-sm font-medium">Correo de la empresa <span style={{ color: COLORS.error }}>*</span></label>
            <input type="email" className="w-full border rounded px-3 py-2" required placeholder="Empresa@gmail.com" />
          </div>
        </div>
      </div>
      {/* Datos del Jefe Inmediato */}
      <div className="w-full max-w-3xl mx-auto bg-green-50 rounded-lg p-4 mb-4 border" style={{ borderColor: COLORS.green3 }}>
        <div className="flex items-center gap-2 mb-2">
          <Person size={22} color={COLORS.green} />
          <span className="font-semibold text-lg" style={{ color: COLORS.green }}>Datos del Jefe Inmediato</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Nombre completo <span style={{ color: COLORS.error }}>*</span></label>
            <input type="text" className="w-full border rounded px-3 py-2" required placeholder="Ingrese el nombre de la empresa" />
          </div>
          <div>
            <label className="block text-sm font-medium">Número de teléfono <span style={{ color: COLORS.error }}>*</span></label>
            <input type="tel" className="w-full border rounded px-3 py-2" required placeholder="Ingrese el número de teléfono" />
          </div>
          <div>
            <label className="block text-sm font-medium">Correo electrónico <span style={{ color: COLORS.error }}>*</span></label>
            <input type="email" className="w-full border rounded px-3 py-2" required placeholder="Ingrese el correo" />
          </div>
          <div>
            <label className="block text-sm font-medium">Cargo <span style={{ color: COLORS.error }}>*</span></label>
            <input type="text" className="w-full border rounded px-3 py-2" required placeholder="Cargo del jefe" />
          </div>
        </div>
      </div>
      {/* Datos del Encargado de contratación */}
      <div className="w-full max-w-3xl mx-auto bg-green-50 rounded-lg p-4 mb-4 border" style={{ borderColor: COLORS.green3 }}>
        <div className="flex items-center gap-2 mb-2">
          <Person size={22} color={COLORS.green} />
          <span className="font-semibold text-lg" style={{ color: COLORS.green }}>Datos del Encargado de contratación o área de Talento Humano</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Nombre completo <span style={{ color: COLORS.error }}>*</span></label>
            <input type="text" className="w-full border rounded px-3 py-2" required placeholder="Ingrese el nombre de la empresa" />
          </div>
          <div>
            <label className="block text-sm font-medium">Número de teléfono <span style={{ color: COLORS.error }}>*</span></label>
            <input type="tel" className="w-full border rounded px-3 py-2" required placeholder="Ingrese el número de teléfono" />
          </div>
          <div>
            <label className="block text-sm font-medium">Correo electrónico <span style={{ color: COLORS.error }}>*</span></label>
            <input type="email" className="w-full border rounded px-3 py-2" required placeholder="Ingrese el correo" />
          </div>
        </div>
      </div>
      {/* Archivo PDF */}
      <div className="w-full max-w-3xl mx-auto bg-green-50 rounded-lg p-4 mb-4 border" style={{ borderColor: COLORS.green3 }}>
        <div className="flex items-center gap-2 mb-2">
          <FileEarmarkPdf size={22} color={COLORS.green} />
          <span className="font-semibold text-lg" style={{ color: COLORS.green }}>Cargue aquí un solo archivo en PDF con el documento que soporte su solicitud (máximo 1MB)<span style={{ color: COLORS.error }}>*</span></span>
        </div>
        <p className="text-xs text-gray-600 mb-2">
          Favor tenga en cuenta que, para Contrato de Aprendizaje debe cargar la copia del contrato celebrado con la empresa. Para las modalidades de Desempeño a través de vinculación laboral o contractual, Participación en un proyecto productivo, De apoyo a una unidad productiva familiar o Pasantías, debe cargar la evidencia mediante la cual el Coordinador Académico le Aprobó realizar su etapa práctica bajo algunas de estas modalidades. Si aún no cuenta con dicha autorización puede ingresar al siguiente enlace y solicitar la aprobación. <a href="#" className="text-green-700 underline">1-2-2 Autorización Modalidad Etapa Práctica Aprendiz, diferente a Contrato de Aprendizaje.</a>
        </p>
        <div className="w-full flex flex-col items-center border-2 border-dashed rounded-lg py-6 mb-2" style={{ borderColor: COLORS.green3 }}>
          <BoxArrowUp size={32} color={COLORS.green} />
          <span className="font-medium mb-2">Seleccionar archivo PDF</span>
          <input type="file" accept="application/pdf" className="w-full max-w-xs" required />
          <span className="text-xs text-gray-500 mt-2">Arrastra y suelta tu archivo aquí o haz clic para seleccionar</span>
        </div>
      </div>
      {/* Botón enviar */}
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center mb-4">
        <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg text-lg flex items-center justify-center gap-2 hover:bg-green-700 transition">
          <Send size={22} /> Enviar Formulario
        </button>
        <span className="text-xs text-gray-600 mt-2">Asegúrate de completar todos los campos obligatorios (<span style={{ color: COLORS.error }}>*</span>)</span>
      </div>
    </div>
  );
};
