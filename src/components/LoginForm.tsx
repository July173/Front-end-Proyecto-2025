import React, { useState } from 'react';
import { useValidationEmail } from '../hook/ValidationEmail';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import SenaLogo from './SenaLogo';
import FooterLinks from './FooterLinks';

interface LoginFormProps {
  onNavigate: (view: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    // Validación de correo soy.sena.edu.co
    const { isValid, error } = useValidationEmail(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="sena-form-panel">
      <div className="sena-form">
        <button
          onClick={() => onNavigate('welcome')}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a inicio de sesión
        </button>

        <SenaLogo />

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Iniciar Sesión
          </h2>
          <p className="sena-text-muted">
            Ingresa tus credenciales para acceder a tu cuenta.
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
              {/* Mensaje de error si el correo no es soy.sena y el campo no está vacío */}
              {!isValid && email && (
                <span className="text-red-500 text-xs mt-1 block">{error}</span>
              )}
          </div>

          <div className="sena-input-group">
            <Lock className="sena-input-icon" />
            <input
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="sena-input"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => onNavigate('forgot-password')}
              className="sena-link text-sm"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button type="submit" className="sena-button">
            Iniciar Sesión
          </button>

          <div className="text-center">
            <span className="sena-text-muted">¿No tienes una cuenta? </span>
            <button
              type="button"
              onClick={() => onNavigate('register')}
              className="sena-link"
            >
              Regístrate aquí
            </button>
          </div>
        </form>

        <FooterLinks />
      </div>
    </div>
  );
};

export default LoginForm;
