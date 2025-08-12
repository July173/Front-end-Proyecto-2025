
import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { useValidationEmail } from '../hook/ValidationEmail';
import { Lock, ArrowLeft } from 'lucide-react';
import SenaLogo from './SenaLogo';
import FooterLinks from './FooterLinks';

interface ResetPasswordFormProps {
  onNavigate: (view: string) => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onNavigate }) => {
  const [passwords, setPasswords] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Validación de correo institucional
  const { isValid: isEmailValid, error: emailError } = useValidationEmail(passwords.email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwords.email) {
      alert('Completa el campo de correo');
      return;
    }
    if (!isEmailValid) {
      alert(emailError);
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    console.log('Password reset:', passwords.newPassword);
    // Simulate password update
    onNavigate('login');
  };

  return (
    <div className="sena-form-panel">
      <div className="sena-form">
        <button
          onClick={() => onNavigate('verify-code')}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
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
              onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
              className="sena-input"
              required
            />
          </div>

          <div className="sena-input-group">
            <Lock className="sena-input-icon" />
            <input
              type="password"
              placeholder="Confirmar nueva contraseña"
              value={passwords.confirmPassword}
              onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
              className="sena-input"
              required
            />
          </div>

          <button type="submit" className="sena-button">
            Actualizar contraseña
          </button>
        </form>

        <FooterLinks />
      </div>
    </div>
  );
};

export default ResetPasswordForm;
