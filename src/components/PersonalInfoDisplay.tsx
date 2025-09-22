import React from 'react';

/**
 * Props para el componente PersonalInfoDisplay.
 * Muestra los datos personales de la persona actual.
 *
 * @property {object} person - Datos de la persona.
 * @property {string} person.first_name - Primer nombre.
 * @property {string} [person.second_name] - Segundo nombre (opcional).
 * @property {string} person.first_last_name - Primer apellido.
 * @property {string} [person.second_last_name] - Segundo apellido (opcional).
 * @property {string} person.number_identification - Número de identificación.
 * @property {string} person.type_identification - Tipo de documento.
 * @property {string} person.phone_number - Teléfono.
 * @property {string} email - Correo electrónico de la persona.
 */
interface PersonalInfoDisplayProps {
  person: {
    first_name: string;
    second_name?: string;
    first_last_name: string;
    second_last_name?: string;
    number_identification: string;
    type_identification: string;
    phone_number: string;
  };
  email: string;
}

/**
 * Componente para mostrar los datos personales de la persona actual.
 * Renderiza campos como nombres, apellidos, documento, tipo y teléfono.
 */
const PersonalInfoDisplay: React.FC<PersonalInfoDisplayProps> = ({ person, email }) => (
  <>
    <h2 className="text-2xl font-bold mb-2 text-[#263238]">Información Personal</h2>
    <p className="font-semibold mb-4 text-gray-700">Datos Personales</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Nombres */}
      <fieldset className="relative border-2 border-gray-500 rounded-tl-xl rounded-tr-none rounded-br-xl rounded-bl-xl px-4 pt-3 pb-2">
        <legend className="px-1 text-xs font-semibold text-[#1976d2]">Nombres</legend>
        <div className="flex items-center">
          <input value={person.first_name + (person.second_name ? ' ' + person.second_name : '')} readOnly className="w-full bg-transparent outline-none text-gray-700" />
          <span className="ml-2 text-gray-400">
            <i className="fa fa-user" />
          </span>
        </div>
      </fieldset>
      {/* Apellidos */}
      <fieldset className="relative border-2 border-gray-500 rounded-tl-xl rounded-tr-none rounded-br-xl rounded-bl-xl px-4 pt-3 pb-2">
        <legend className="px-1 text-xs font-semibold text-[#1976d2]">Apellidos</legend>
        <div className="flex items-center">
          <input value={person.first_last_name + (person.second_last_name ? ' ' + person.second_last_name : '')} readOnly className="w-full bg-transparent outline-none text-gray-700" />
          <span className="ml-2 text-gray-400">
            <i className="fa fa-user" />
          </span>
        </div>
      </fieldset>
      {/* Documento */}
      <fieldset className="relative border-2 border-gray-500 rounded-tl-xl rounded-tr-none rounded-br-xl rounded-bl-xl px-4 pt-3 pb-2">
        <legend className="px-1 text-xs font-semibold text-[#1976d2]">Documento</legend>
        <div className="flex items-center">
          <input value={person.number_identification} readOnly className="w-full bg-transparent outline-none text-gray-700" />
          <span className="ml-2 text-gray-400">
            <i className="fa fa-id-card" />
          </span>
        </div>
      </fieldset>
      {/* Tipo Documento */}
      <fieldset className="relative border-2 border-gray-500 rounded-tl-xl rounded-tr-none rounded-br-xl rounded-bl-xl px-4 pt-3 pb-2">
        <legend className="px-1 text-xs font-semibold text-[#1976d2]">Tipo Documento</legend>
        <div className="flex items-center">
          <input value={person.type_identification} readOnly className="w-full bg-transparent outline-none text-gray-700" />
          <span className="ml-2 text-gray-400">
            <i className="fa fa-id-card" />
          </span>
        </div>
      </fieldset>
      {/* Correo */}
      <fieldset className="relative border-2 border-gray-500 rounded-tl-xl rounded-tr-none rounded-br-xl rounded-bl-xl px-4 pt-3 pb-2">
        <legend className="px-1 text-xs font-semibold text-[#1976d2]">Correo</legend>
        <div className="flex items-center">
          <input value={email} readOnly className="w-full bg-transparent outline-none text-gray-700" />
          <span className="ml-2 text-gray-400">
            <i className="fa fa-envelope" />
          </span>
        </div>
      </fieldset>
      {/* Teléfono */}
      <fieldset className="relative border-2 border-gray-500 rounded-tl-xl rounded-tr-none rounded-br-xl rounded-bl-xl px-4 pt-3 pb-2">
        <legend className="px-1 text-xs font-semibold text-[#1976d2]">Teléfono</legend>
        <div className="flex items-center">
          <input value={person.phone_number} readOnly className="w-full bg-transparent outline-none text-gray-700" />
          <span className="ml-2 text-gray-400">
            <i className="fa fa-phone" />
          </span>
        </div>
      </fieldset>
    </div>
  </>
);

export default PersonalInfoDisplay;
