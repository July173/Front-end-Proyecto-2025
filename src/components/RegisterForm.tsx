
import React, { useState } from 'react';
import { Mail, User, Phone, FileText, Lock, ArrowLeft } from 'lucide-react';
import SenaLogo from './SenaLogo';
import FooterLinks from './FooterLinks';

interface RegisterFormProps {
  onNavigate: (view: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    documentType: '',
    documentNumber: '',
    phone: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState({
    email: '',
    firstName: '',
    lastName: '',
    documentNumber: '',
    phone: ''
  });

  const validate = () => {
    let valid = true;
    const newErrors: typeof errors = {
      email: '',
      firstName: '',
      lastName: '',
      documentNumber: '',
      phone: ''
    };

    // Validar correo
    if (!formData.email.match(/^\S+@soy\.sena\.edu\.co$/)) {
      newErrors.email = 'El correo debe terminar en @soy.sena.edu.co';
      valid = false;
    }

    // Validar nombres (solo letras)
    if (!formData.firstName.match(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/)) {
      newErrors.firstName = 'Dato no válido';
      valid = false;
    }

    // Validar apellidos (solo letras)
    if (!formData.lastName.match(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/)) {
      newErrors.lastName = 'Dato no válido';
      valid = false;
    }

    // Validar número de documento (solo números)
    if (!formData.documentNumber.match(/^\d+$/)) {
      newErrors.documentNumber = 'Dato no válido';
      valid = false;
    }

    // Validar teléfono (solo números y longitud 10)
    if (!formData.phone.match(/^\d{10}$/)) {
      newErrors.phone = 'Dato no válido';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Register attempt:', formData);
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Crear cuenta
          </h2>
          <p className="sena-text-muted">
            Ingresa tus datos para registrarte en la plataforma. Solo se deben registrar aprendices.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="sena-input-group">
            <Mail className="sena-input-icon" />
            <input
              type="email"
              placeholder="Correo institucional · ejemplo@soy.sena.edu.co"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="sena-input"
              required
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="sena-input-group">
              <User className="sena-input-icon" />
              <input
                type="text"
                placeholder="Nombres"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="sena-input"
                required
              />
              {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName}</span>}
            </div>
            <div className="sena-input-group">
              <User className="sena-input-icon" />
              <input
                type="text"
                placeholder="Apellidos"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="sena-input"
                required
              />
              {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName}</span>}
            </div>
          </div>

          <div className="sena-input-group">
            <FileText className="sena-input-icon" />
            <select
              value={formData.documentType}
              onChange={(e) => setFormData({...formData, documentType: e.target.value})}
              className="sena-input"
              required
            >
              <option value="">Tipo de documento</option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="CE">Cédula de Extranjería</option>
              <option value="PAS">Pasaporte</option>
              <option value="PAS">Número ciego - SENA</option>
              <option value="PAS">Documento Nacional de Identificación</option>
              <option value="PAS">Número de Identificación Tributaria</option>
              <option value="PAS">Permiso por Protección Temporal</option>

            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="sena-input-group">
              <Lock className="sena-input-icon" />
              <input
                type="text"
                placeholder="Numero de documento"
                value={formData.documentNumber}
                onChange={(e) => setFormData({...formData, documentNumber: e.target.value})}
                className="sena-input"
                required
              />
              {errors.documentNumber && <span className="text-red-500 text-xs">{errors.documentNumber}</span>}
            </div>
            <div className="sena-input-group">
              <Phone className="sena-input-icon" />
              <input
                type="tel"
                placeholder="Teléfono"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="sena-input"
                required
                maxLength={10}
              />
              {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              checked={formData.acceptTerms}
              onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})}
              className="mt-1 w-4 h-4 text-[#43A047] border-gray-300 rounded focus:ring-green-500"
              required
            />
            <label htmlFor="terms" className="text-sm sena-text-muted">
              Acepto los{' '}
              <a href="#" className="sena-link">
                términos y condiciones
              </a>
            </label>
          </div>

          <button type="submit" className="sena-button">
            Registrarse
          </button>

          <div className="text-center">
            <span className="sena-text-muted">¿Ya tienes una cuenta? </span>
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="sena-link"
            >
              Inicia sesión
            </button>
          </div>
        </form>

        <FooterLinks />
      </div>
    </div>
  );
};

export default RegisterForm;
