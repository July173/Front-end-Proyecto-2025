import React, { useState } from 'react';
import TermsModal from './TermsModal';
import NotificationModal from '../NotificationModal';
import useNotification from '../../hook/useNotification';
import { Mail, User, Phone, FileText, Lock, ArrowLeft } from 'lucide-react';
import SenaLogo from '../SenaLogo';
import FooterLinks from './FooterLinks';
import CustomSelect from '../CustomSelect';
import { registerAprendiz } from '../../Api/Services/Person';
import { RegisterPayload } from '../../Api/types/entities/person.types';
import {
  isSenaEmail,
  isValidNames,
  isValidSurnames,
  isValidDocumentNumber,
  isValidPhone,
  capitalizeWords
} from '../../hook/validationlogin';
import { useDocumentTypes } from '../../hook/useDocumentTypes';
/**
 * Props para el componente RegisterForm.
 * @property {(view: string) => void} onNavigate - Función para navegar entre vistas (login, etc.).
 */
interface RegisterFormProps {
  onNavigate: (view: string) => void;
}

/**
 * Componente RegisterForm
 * Renderiza el formulario de registro de aprendices con validaciones y manejo de notificaciones.
 *
 * Características:
 * - Validación en tiempo real de los campos del formulario.
 * - Modal de términos y condiciones.
 * - Notificaciones de éxito, pendiente y error.
 * - Navegación entre registro e inicio de sesión.
 * - Uso de hooks personalizados para tipos de documento y notificaciones.
 *
 * @param {RegisterFormProps} props - Propiedades del formulario.
 * @returns {JSX.Element} Formulario de registro renderizado.
 */
const RegisterForm: React.FC<RegisterFormProps> = ({ onNavigate }) => {
  const {
    notification,
    hideNotification,
    showRegistrationSuccess,
    showRegistrationPending,
    showNotification
  } = useNotification();
  
  // Hook para obtener tipos de documento dinámicamente
  const { documentTypes, loading: documentTypesLoading } = useDocumentTypes();
  
  const [formData, setFormData] = useState({
    email: '',
    names: '',
    surnames: '',
    documentType: '',
    documentNumber: '',
    phone: '',
    acceptTerms: false,
    image: '' // Nuevo campo para imagen, opcional
  });

  const [errors, setErrors] = useState({
    email: '',
    names: '',
    surnames: '',
    documentNumber: '',
    phone: ''
  });

  const [loading, setLoading] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [showPending, setShowPending] = useState(false);

  const validate = () => {
    let valid = true;
    const newErrors: typeof errors = {
      email: '',
      names: '',
      surnames: '',
      documentNumber: '',
      phone: ''
    };

    newErrors.email = !isSenaEmail(formData.email) ? 'El correo debe ser institucional (@soy.sena.edu.co )' : '';
    newErrors.names = isValidNames(formData.names) || '';
    newErrors.surnames = isValidSurnames(formData.surnames) || '';
    newErrors.documentNumber = isValidDocumentNumber(formData.documentNumber) || '';
    newErrors.phone = isValidPhone(formData.phone) || '';

    Object.values(newErrors).forEach((err) => { if (err) valid = false; });
    setErrors(newErrors);
    return valid;
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Validación en tiempo real
    let error = '';
    if (field === 'email') error = !isSenaEmail(value) ? 'El correo debe ser institucional (@soy.sena.edu.co o @sena.edu.co)' : '';
    if (field === 'names') error = isValidNames(value) || '';
    if (field === 'surnames') error = isValidSurnames(value) || '';
    if (field === 'documentNumber') error = isValidDocumentNumber(value) || '';
    if (field === 'phone') error = isValidPhone(value) || '';
    setErrors({ ...errors, [field]: error });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      // Separar nombres y apellidos y capitalizar
      const [first_name, ...restNames] = capitalizeWords(formData.names.trim()).split(' ');
      const second_name = restNames.join(' ');
      const [first_last_name, ...restSurnames] = capitalizeWords(formData.surnames.trim()).split(' ');
      const second_last_name = restSurnames.join(' ');
      const payload: RegisterPayload = {
        email: formData.email,
        first_name,
        second_name,
        first_last_name,
        second_last_name,
        type_identification: formData.documentType,
        number_identification: formData.documentNumber,
        phone_number: formData.phone,
        password: formData.documentNumber, // Por ahora, usar número de documento como password
        image: formData.image || undefined,
      };
      try {
        const response = await registerAprendiz(payload);
        // Mostrar notificación de éxito
        showRegistrationSuccess();
        setShowPending(true); // Para mostrar la de pendiente después
      } catch (error) {
        // Mostrar notificación de error
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        showNotification('warning', 'Error en el registro', errorMessage);
      } finally {
        setLoading(false);
      }
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
              onChange={(e) => handleChange('email', e.target.value)}
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
                placeholder="Nombres (Ej: Brayan Stid)"
                value={formData.names}
                onChange={(e) => handleChange('names', e.target.value)}
                className="sena-input"
                required
              />
              {errors.names && <span className="text-red-500 text-xs">{errors.names}</span>}
            </div>
            <div className="sena-input-group">
              <User className="sena-input-icon" />
              <input
                type="text"
                placeholder="Apellidos (Ej: Cortes Lombana)"
                value={formData.surnames}
                onChange={(e) => handleChange('surnames', e.target.value)}
                className="sena-input"
                required
              />
              {errors.surnames && <span className="text-red-500 text-xs">{errors.surnames}</span>}
            </div>
          </div>

          <div className="sena-input-group">
            <FileText className="sena-input-icon" />
            <div className="relative">
              <CustomSelect
                value={formData.documentType}
                onChange={(value) => setFormData({...formData, documentType: value})}
                options={documentTypesLoading ? [] : documentTypes.filter(type => type.value !== '')}
                placeholder={documentTypesLoading ? "Cargando tipos de documento..." : "Selecciona tipo de documento"}
                classNames={{
                  trigger: "sena-input pl-10 pr-10 flex items-center justify-between",
                  label: "sr-only"
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="sena-input-group">
              <Lock className="sena-input-icon" />
              <input
                type="text"
                inputMode="numeric"
                pattern="\d*"
                placeholder="Numero de documento"
                value={formData.documentNumber}
                onChange={(e) => {
                  // Solo permite números
                  const value = e.target.value.replace(/\D/g, '');
                  handleChange('documentNumber', value);
                }}
                className="sena-input"
                required
              />
              {errors.documentNumber && <span className="text-red-500 text-xs">{errors.documentNumber}</span>}
            </div>
            <div className="sena-input-group">
              <Phone className="sena-input-icon" />
              <input
                type="tel"
                inputMode="numeric"
                pattern="\d*"
                placeholder="Teléfono"
                value={formData.phone}
                onChange={(e) => {
                  // Solo permite números
                  const value = e.target.value.replace(/\D/g, '');
                  handleChange('phone', value);
                }}
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
              <a
                href="#"
                className="sena-link"
                onClick={e => { e.preventDefault(); setIsTermsModalOpen(true); }}
              >
                términos y condiciones
              </a>
            </label>
          </div>

          <button type="submit" className="sena-button" disabled={loading}>
            {loading ? 'Procesando...' : 'Registrarse'}
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
      
      {/* Modales */}
      <TermsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />
      <NotificationModal
        isOpen={notification.isOpen}
        onClose={() => {
          hideNotification();
          // Si el registro fue exitoso, mostrar la de pendiente
          if (notification.type === 'success' && notification.title === 'Registro exitoso' && showPending) {
            showRegistrationPending();
            setShowPending(false);
            return;
          }
          // Si la de pendiente ya se mostró, navegar al login
          if (notification.type === 'pending' && notification.title === 'Pendiente de revisión') {
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

export default RegisterForm;
