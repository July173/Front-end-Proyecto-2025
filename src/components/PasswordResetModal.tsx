import React from 'react';
import ResetPasswordForm from './ResetPasswordForm';

/**
 * Props para el componente PasswordResetModal.
 * Modal para recuperación de contraseña por correo institucional.
 *
 * @property {boolean} showModal - Si el modal está visible.
 * @property {'send' | 'verify' | 'reset'} modalStep - Paso actual del proceso.
 * @property {string} modalMsg - Mensaje informativo del modal.
 * @property {string} modalError - Mensaje de error del modal.
 * @property {boolean} modalLoading - Estado de carga del modal.
 * @property {string} code - Código de verificación ingresado.
 * @property {string} codeError - Mensaje de error del código.
 * @property {string} userEmail - Correo institucional del usuario.
 * @property {(show: boolean) => void} setShowModal - Cambia visibilidad del modal.
 * @property {(step: 'send' | 'verify' | 'reset') => void} setModalStep - Cambia el paso del proceso.
 * @property {(msg: string) => void} setModalMsg - Cambia el mensaje informativo.
 * @property {(err: string) => void} setModalError - Cambia el mensaje de error.
 * @property {(code: string) => void} setCode - Cambia el código ingresado.
 * @property {(err: string) => void} setCodeError - Cambia el mensaje de error del código.
 * @property {(email: string, code: string) => Promise<{ success: boolean; message?: string }>} verifyResetCode - Función para verificar el código.
 */
interface PasswordResetModalProps {
  showModal: boolean;
  modalStep: 'send' | 'verify' | 'reset';
  modalMsg: string;
  modalError: string;
  modalLoading: boolean;
  code: string;
  codeError: string;
  userEmail: string;
  setShowModal: (show: boolean) => void;
  setModalStep: (step: 'send' | 'verify' | 'reset') => void;
  setModalMsg: (msg: string) => void;
  setModalError: (err: string) => void;
  setCode: (code: string) => void;
  setCodeError: (err: string) => void;
  verifyResetCode: (email: string, code: string) => Promise<{ success: boolean; message?: string }>;
}

/**
 * Modal para recuperación de contraseña por correo institucional.
 * Permite enviar código, verificarlo y mostrar formulario de cambio de contraseña.
 */
const PasswordResetModal: React.FC<PasswordResetModalProps> = ({
  showModal,
  modalStep,
  modalMsg,
  modalError,
  modalLoading,
  code,
  codeError,
  userEmail,
  setShowModal,
  setModalStep,
  setModalMsg,
  setModalError,
  setCode,
  setCodeError,
  verifyResetCode,
}) => {
  if (!showModal) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-xl" onClick={() => {
          localStorage.removeItem('recovery_email');
          localStorage.removeItem('reset_code');
          setShowModal(false);
        }}>&times;</button>
        {modalStep === 'verify' && (
          <>
            <h2 className="text-xl font-bold mb-2 text-[#263238]">Verifica tu correo</h2>
            <p className="mb-4 text-gray-700">{modalMsg}<br /><span className="font-semibold">{userEmail}</span></p>
            <form onSubmit={async e => {
              e.preventDefault();
              setModalError('');
              if (!code.match(/^\d{6}$/)) {
                setCodeError('El código debe ser de 6 dígitos numéricos.');
                return;
              }
              setCodeError('');
              const res = await verifyResetCode(userEmail, code);
              if (res.success) {
                localStorage.setItem('recovery_email', userEmail);
                localStorage.setItem('reset_code', code);
                setModalStep('reset');
              } else {
                setModalError(res.message || 'Código incorrecto o expirado.');
              }
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-[#1976d2]">Código de verificación</label>
                <input
                  type="text"
                  value={code}
                  onChange={e => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setCode(value);
                  }}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Ingresa el código"
                  maxLength={6}
                  inputMode="numeric"
                  pattern="\\d*"
                />
                {codeError && <span className="text-red-500 text-xs">{codeError}</span>}
              </div>
              {modalError && <div className="text-red-500 text-sm mb-2">{modalError}</div>}
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow w-full">
                Verificar Código
              </button>
            </form>
          </>
        )}
        {modalStep === 'send' && (
          <div className="flex flex-col items-center justify-center min-h-[180px]">
            <span className="text-gray-700 mb-2">{modalMsg}</span>
            {modalError && <span className="text-red-500 text-sm">{modalError}</span>}
            {modalLoading && <span className="text-gray-400 text-sm mt-2">Enviando...</span>}
          </div>
        )}
        {modalStep === 'reset' && (
          <ResetPasswordForm onNavigate={() => {
            localStorage.removeItem('recovery_email');
            localStorage.removeItem('reset_code');
            localStorage.removeItem('user_data');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/?view=login';
          }} />
        )}
      </div>
    </div>
  );
};

export default PasswordResetModal;
