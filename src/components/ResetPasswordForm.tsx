import React, { useState } from 'react';
import { Lock, ArrowLeft } from 'lucide-react';
import SenaLogo from './SenaLogo';
import FooterLinks from './FooterLinks';
import { isValidPassword } from '../hook/validationlogin';

interface ResetPasswordFormProps {
  onNavigate: (view: string) => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onNavigate }) => {
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [loading, setLoading] = useState(false);

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
    // Simulate password update (aquí iría la petición al backend)
    setTimeout(() => {
      setLoading(false);
      onNavigate('login');
    }, 1500);
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

          <button type="submit" className="sena-button" disabled={!!passwordError || !!confirmError || loading}>
            {loading ? 'Procesando...' : 'Actualizar contraseña'}
          </button>
        </form>

        <FooterLinks />
      </div>
    </div>
  );
};

export default ResetPasswordForm;
