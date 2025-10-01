import React from "react";

interface SessionExpiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SessionExpiredModal: React.FC<SessionExpiredModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 text-center">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Sesión expirada</h2>
        <p className="text-gray-700 mb-6">Tu sesión ha expirado por inactividad.</p>
        <button
          className="bg-[#43A047] text-white px-4 py-2 rounded hover:bg-[#388E3C] transition-colors w-full"
          onClick={onClose}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default SessionExpiredModal;
