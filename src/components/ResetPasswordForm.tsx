import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { useValidationEmail } from '../hook/ValidationEmail';
import { Lock, ArrowLeft } from 'lucide-react';
import SenaLogo from './SenaLogo';
import FooterLinks from './FooterLinks';
import { isValidPassword } from '../hook/validationlogin';
import { resetPassword } from '../Api/Services/User';

interface ResetPasswordFormProps {
  onNavigate: (view: string) => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onNavigate }) => {
  const [passwords, setPasswords] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
    const email = localStorage.getItem('recovery_email') || '';
    const code = localStorage.getItem('reset_code') || '';
    const result = await resetPassword(email, code, passwords.newPassword);
    setLoading(false);
    if (result.success) {
      onNavigate('login');
    } else {
      setErrorMsg(result.message || 'No se pudo actualizar la contraseña.');
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
          <div className="sena-input-group">
            <Mail className="sena-input-icon" />
            <input
              type="email"
              placeholder="Correo institucional · ejemplo@soy.sena.edu.co"
              value={passwords.email}
              onChange={(e) => setPasswords({...passwords, email: e.target.value})}
              className="sena-input"
              required
            />
            {/* Mensaje de error si el correo no es válido */}
            {!isEmailValid && passwords.email && (
              <span className="text-red-500 text-xs mt-1 block">{emailError}</span>
            )}
          </div>
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
      </div>
    </div>
  );
};

export default ResetPasswordForm;
