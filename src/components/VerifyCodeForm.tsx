import React, { useState } from 'react';
import { Lock, ArrowLeft } from 'lucide-react';
import SenaLogo from './SenaLogo';
import FooterLinks from './FooterLinks';
import { isValidResetCode } from '../hook/validationlogin';

interface VerifyCodeFormProps {
  onNavigate: (view: string) => void;
}

const VerifyCodeForm: React.FC<VerifyCodeFormProps> = ({ onNavigate }) => {
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCode(value);
    setCodeError(!isValidResetCode(value) ? 'El código debe ser de 6 dígitos numéricos.' : '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (codeError) return;
    setLoading(true);
    // Simulate code verification
    setTimeout(() => {
      setLoading(false);
      onNavigate('reset-password');
    }, 1500);
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
              onChange={handleCodeChange}
              className="sena-input"
              required
            />
            {codeError && <span className="text-red-500 text-xs">{codeError}</span>}
          </div>

          <button type="submit" className="sena-button" disabled={!!codeError || loading}>
            {loading ? 'Procesando...' : 'Verificar Código'}
          </button>
        </form>

        <FooterLinks />
      </div>
    </div>
  );
};

export default VerifyCodeForm;
