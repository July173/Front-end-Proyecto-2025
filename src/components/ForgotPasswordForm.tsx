
/**
 * Componente ForgotPasswordForm
 * -----------------------------
 * Formulario para recuperación de contraseña por correo institucional.
 * Permite al usuario solicitar un código de recuperación, valida el correo y muestra notificaciones de éxito o error.
 *
 * Props:
 * - onNavigate: (view: string) => void // Función para navegar entre vistas (login, verify-code, etc)
 *
 * Uso:
 * <ForgotPasswordForm onNavigate={handleNavigate} />
 *
 * Flujo:
 * 1. El usuario ingresa su correo institucional.
 * 2. Se valida el formato del correo.
 * 3. Al enviar, se solicita el código de recuperación al backend.
 * 4. Se muestra una notificación según el resultado.
 * 5. Si el correo se envió correctamente, navega a la pantalla de verificación de código.
 */

import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import SenaLogo from './SenaLogo';
import FooterLinks from './FooterLinks';
import NotificationModal from './NotificationModal';
import useNotification from '../hook/useNotification';
import { isSenaEmail } from '../hook/validationlogin';
import { requestPasswordResetCode } from '../Api/Services/User';


interface ForgotPasswordFormProps {
  onNavigate: (view: string) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onNavigate }) => {
  const {
    notification,
    hideNotification,
    showEmailSent,
    showNotification
  } = useNotification();
  
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(!isSenaEmail(value) ? 'El correo debe ser institucional (@soy.sena.edu.co o @sena.edu.co)' : '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailError) return;
    setLoading(true);
    setErrorMsg('');
    localStorage.setItem('recovery_email', email);
    const result = await requestPasswordResetCode(email);
    setLoading(false);
    if (result.success) {
      // Mostrar notificación de correo enviado
      showEmailSent();
    } else {
      // Mostrar notificación de error
      showNotification('warning', 'Error', result.message || 'No se pudo enviar el correo. Por favor verifica el correo e inténtalo de nuevo.');
    }
  };

  return (
    <div className="sena-form-panel">
      <div className="sena-form">
        <button
          onClick={() => onNavigate('login')}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a inicio de sesión
        </button>

        <SenaLogo />

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-600 mb-2">
            Recuperar Contraseña
          </h2>
          <p className="sena-text-muted">
            Ingresa tu correo electrónico para recibir un código de recuperación.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="sena-input-group">
            <Mail className="sena-input-icon" />
            <input
              type="email"
              placeholder="ejemplo@soy.sena.edu.co"
              value={email}
              onChange={handleEmailChange}
              className="sena-input"
              required
            />
            {emailError && <span className="text-red-500 text-xs">{emailError}</span>}
          </div>
          {errorMsg && <div className="text-red-500 text-sm mb-2">{errorMsg}</div>}
          <button type="submit" className="sena-button" disabled={!!emailError || loading}>
            {loading ? 'Procesando...' : 'Enviar Código'}
          </button>
        </form>

        <FooterLinks />
        
        {/* Modal de notificación */}
        <NotificationModal
          isOpen={notification.isOpen}
          onClose={() => {
            hideNotification();
            // Si el correo se envió exitosamente, ir a verify-code
            if (notification.type === 'email-sent') {
              onNavigate('verify-code');
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

export default ForgotPasswordForm;
