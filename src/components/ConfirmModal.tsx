
/**
 * Componente ConfirmModal
 * -----------------------
 * Modal de confirmación reutilizable para acciones importantes (eliminar, habilitar, inhabilitar, etc).
 * Muestra un mensaje, título y dos botones: confirmar y cancelar.
 *
 * Props:
 * - isOpen: boolean           // Si el modal está abierto o cerrado
 * - title?: string            // Título del modal (opcional, por defecto "Confirmar acción")
 * - message: string           // Mensaje principal a mostrar
 * - confirmText?: string      // Texto del botón de confirmar (opcional, por defecto "Confirmar")
 * - cancelText?: string       // Texto del botón de cancelar (opcional, por defecto "Cancelar")
 * - onConfirm: () => void     // Función a ejecutar al confirmar
 * - onCancel: () => void      // Función a ejecutar al cancelar/cerrar
 *
 * Uso:
 * <ConfirmModal
 *   isOpen={modalAbierto}
 *   title="¿Eliminar usuario?"
 *   message="Esta acción no se puede deshacer."
 *   confirmText="Sí, eliminar"
 *   cancelText="Cancelar"
 *   onConfirm={handleEliminar}
 *   onCancel={handleCerrar}
 * />
 */

// Props del modal de confirmación
interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title = "Confirmar acción",
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="mb-6 text-gray-700">{message}</p>
        <div className="flex gap-4">
          <button
            className="flex-1 bg-red-300 hover:bg-red-400 text-gray-700 py-2 rounded font-semibold"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;