import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { Lock, ArrowLeft } from 'lucide-react';
import SenaLogo from './SenaLogo';
import FooterLinks from './FooterLinks';
import NotificationModal from './NotificationModal';
import useNotification from '../hook/useNotification';
import { isValidPassword } from '../hook/validationlogin';
import { resetPassword } from '../Api/Services/User';

interface ResetPasswordFormProps {
  onNavigate: (view: string) => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onNavigate }) => {
  const {
    notification,
    hideNotification,
    showPasswordChanged,
    showNotification
  } = useNotification();
  
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Obtener email desde localStorage (guardado desde ForgotPasswordForm)
  const email = localStorage.getItem('recovery_email') || '';

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswords({ ...passwords, newPassword: value });
    setPasswordError(!isValidPassword(value) ? 'La contraseña debe tener al menos 8 caracteres.' : '');
    setConfirmError(passwords.confirmPassword && value !== passwords.confirmPassword ? 'Las contraseñas no coinciden' : '');
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswords({ ...passwords, confirmPassword: value });
    setConfirmError(passwords.newPassword !== value ? 'Las contraseñas no coinciden' : '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordError || confirmError) return;
    setLoading(true);
    setErrorMsg('');
    const code = localStorage.getItem('reset_code') || '';
    const result = await resetPassword(email, code, passwords.newPassword);
    setLoading(false);
    if (result.success) {
      // Mostrar notificación de éxito
      showPasswordChanged();
      // Limpiar sesión
      localStorage.removeItem('user_data');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('recovery_email');
      localStorage.removeItem('reset_code');
    } else {
      // Mostrar notificación de error
      showNotification('warning', 'Error', result.message || 'No se pudo actualizar la contraseña.');
    }
  };

  return (
    <div className="sena-form-panel">
      <div className="sena-form">
        <button
          onClick={() => onNavigate('verify-code')}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          disabled={loading}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a inicio de sesión
        </button>

        <SenaLogo />

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Actualizar Contraseña
          </h2>
          <p className="sena-text-muted">
            Ingresa tu nueva contraseña
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mostrar el email de solo lectura */}
          {/* <div className="sena-input-group">
            <Mail className="sena-input-icon" />
            <input
              type="email"
              placeholder="Correo institucional"
              value={email}
              readOnly
              className="sena-input bg-gray-50 text-gray-600"
              disabled
            />
            <span className="text-xs text-gray-500 mt-1 block">
              Código de recuperación enviado a este correo
            </span>
          </div> */}
          <div className="sena-input-group">
            <Lock className="sena-input-icon" />
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              className="sena-input"
              required
              disabled={loading}
            />
            {passwordError && <span className="text-red-500 text-xs">{passwordError}</span>}
          </div>

          <div className="sena-input-group">
            <Lock className="sena-input-icon" />
            <input
              type="password"
              placeholder="Confirmar nueva contraseña"
              value={passwords.confirmPassword}
              onChange={handleConfirmChange}
              className="sena-input"
              required
              disabled={loading}
            />
            {confirmError && <span className="text-red-500 text-xs">{confirmError}</span>}
          </div>
          {errorMsg && <div className="text-red-500 text-sm mb-2">{errorMsg}</div>}
          <button type="submit" className="sena-button" disabled={!!passwordError || !!confirmError || loading}>
            {loading ? 'Procesando...' : 'Actualizar contraseña'}
          </button>
        </form>

        <FooterLinks />
        
        {/* Modal de notificación */}
        <NotificationModal
          isOpen={notification.isOpen}
          onClose={() => {
            hideNotification();
            // Si la contraseña se cambió exitosamente, ir al login
            if (notification.type === 'password-changed') {
              onNavigate('login');
            }
          }}
          type={notification.type}
          title={notification.title}
          message={notification.message}
        />
      </div>
    </div>
  );
};

export default ResetPasswordForm;
