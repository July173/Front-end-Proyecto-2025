
import React from 'react';
import { Person } from '../Api/types/entities/person.types';
import { Camera } from 'lucide-react';

/**
 * Props para el componente ProfileImageUploader.
 * Permite mostrar y actualizar la imagen de perfil de una persona.
 *
 * @property {Person} person - Datos de la persona actual.
 * @property {(file: File) => void} onImageChange - Callback al seleccionar nueva imagen.
 * @property {boolean} editImgLoading - Estado de carga al actualizar imagen.
 * @property {string} editImgError - Mensaje de error al actualizar imagen.
 * @property {boolean} showImgConfirm - Si se muestra el modal de confirmación.
 * @property {File | null} pendingImgFile - Archivo de imagen pendiente de confirmación.
 * @property {(show: boolean) => void} setShowImgConfirm - Cambia visibilidad del modal de confirmación.
 * @property {(file: File | null) => void} setPendingImgFile - Cambia el archivo pendiente.
 * @property {(id: string, file: File) => Promise<Person>} patchPersonImage - Función para actualizar imagen en backend.
 * @property {(person: Person) => void} setPerson - Actualiza el estado de la persona.
 */
interface ProfileImageUploaderProps {
  person: Person;
  onImageChange: (file: File) => void;
  editImgLoading: boolean;
  editImgError: string;
  showImgConfirm: boolean;
  pendingImgFile: File | null;
  setShowImgConfirm: (show: boolean) => void;
  setPendingImgFile: (file: File | null) => void;
  patchPersonImage: (id: string, file: File) => Promise<Person>;
  setPerson: (person: Person) => void;
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({
/**
 * Componente para mostrar y actualizar la imagen de perfil de una persona.
 * Incluye input de archivo, botón de edición y modal de confirmación.
 */
  person,
  onImageChange,
  editImgLoading,
  editImgError,
  showImgConfirm,
  pendingImgFile,
  setShowImgConfirm,
  setPendingImgFile,
  patchPersonImage,
  setPerson,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-end ">
      <div className="w-28 h-28 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center overflow-hidden relative">
        {person.image ? (
          <img src={`http://localhost:8000${person.image}`} alt="Foto de perfil" className="object-cover w-full h-full" />
        ) : (
          <span className="text-4xl font-bold text-gray-600">
            {person.first_name.charAt(0).toUpperCase()}
          </span>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            onImageChange(file);
          }}
        />
      </div>
      <button
        className="bg-green-600 rounded-full p-2 shadow hover:bg-green-700 flex items-center justify-center mb-2"
        title="Editar imagen"
        onClick={() => fileInputRef.current?.click()}
        disabled={editImgLoading}
        style={{ width: '32px', height: '32px' }}
      >
        <Camera className="text-white" />
      </button>
      {/* Modal de confirmación de cambio de imagen */}
      {showImgConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 relative">
            <button className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-xl" onClick={() => setShowImgConfirm(false)}>&times;</button>
            <h2 className="text-xl font-bold mb-2 text-[#263238]">¿Cambiar imagen de perfil?</h2>
            <p className="mb-4 text-gray-700">¿Estás seguro que deseas cambiar tu imagen de perfil?</p>
            <div className="flex gap-4 mt-4">
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow w-full"
                onClick={async () => {
                  if (!pendingImgFile) return;
                  try {
                    const updated = await patchPersonImage(person.id, pendingImgFile);
                    setPerson(updated);
                  } catch (err) {
                    // handle error in parent
                  } finally {
                    setShowImgConfirm(false);
                    setPendingImgFile(null);
                  }
                }}
                disabled={editImgLoading}
              >Sí, cambiar</button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded shadow w-full"
                onClick={() => {
                  setShowImgConfirm(false);
                  setPendingImgFile(null);
                }}
                disabled={editImgLoading}
              >Cancelar</button>
            </div>
          </div>
        </div>
      )}
      {editImgError && <div className="text-red-500 text-xs mt-2">{editImgError}</div>}
      {editImgLoading && <div className="text-gray-500 text-xs mt-2">Actualizando imagen...</div>}
    </div>
  );
};

export default ProfileImageUploader;
