
import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import SenaLogo from './SenaLogo';
import FooterLinks from './FooterLinks';

interface ForgotPasswordFormProps {
  onNavigate: (view: string) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password recovery for:', email);
    // Simulate sending recovery code
    onNavigate('verify-code');
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
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
              onChange={(e) => setEmail(e.target.value)}
              className="sena-input"
              required
            />
          </div>

          <button type="submit" className="sena-button">
            Enviar Código
          </button>
        </form>

        <FooterLinks />
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
