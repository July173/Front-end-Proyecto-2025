
import React, { useState } from 'react';
import { Lock, ArrowLeft } from 'lucide-react';
import SenaLogo from './SenaLogo';
import FooterLinks from './FooterLinks';

interface VerifyCodeFormProps {
  onNavigate: (view: string) => void;
}

const VerifyCodeForm: React.FC<VerifyCodeFormProps> = ({ onNavigate }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Verification code:', code);
    // Simulate code verification
    onNavigate('reset-password');
  };

  return (
    <div className="sena-form-panel">
      <div className="sena-form">
        <button
          onClick={() => onNavigate('forgot-password')}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </button>

        <SenaLogo />

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Código de verificación
          </h2>
          <p className="sena-text-muted">
            Ingresa tu código de recuperación que se te envío al correo electrónico{' '}
            <span className="font-medium">ejemplo@soy.sena.edu.co</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="sena-input-group">
            <Lock className="sena-input-icon" />
            <input
              type="text"
              placeholder="Código de recuperación"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="sena-input"
              required
            />
          </div>

          <button type="submit" className="sena-button">
            Verificar Código
          </button>
        </form>

        <FooterLinks />
      </div>
    </div>
  );
};

export default VerifyCodeForm;
