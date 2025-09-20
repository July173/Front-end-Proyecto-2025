import React from 'react';
import ReactDOM from 'react-dom'; // <-- Importa ReactDOM
import { X } from 'lucide-react';

interface PrivacyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex flex-col items-center w-full">
                        <div className="flex items-center gap-3 mb-1 justify-center">
                            <div className="w-10 h-10 bg-[#43A047] rounded-full flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-semibold text-gray-900 text-center">Política de privacidad</h2>
                        </div>
                        <p className="text-sm text-gray-500 mt-1 text-center">
                            Cómo el SENA protege y utiliza su información personal
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 ml-4"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* 1. Información que recopilamos */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-3">1. Información que recopilamos</h3>
                        <h4 className="text-base font-semibold mb-2">1.1 Información personal</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-4">
                            <li>Nombres y apellidos completos</li>
                            <li>Número de identificación (cédula, tarjeta de identidad, etc.)</li>
                            <li>Fecha de nacimiento</li>
                            <li>Dirección de residencia</li>
                            <li>Correo electrónico</li>
                            <li>Número de teléfono</li>
                            <li>Información académica y profesional</li>
                            <li>Estado socioeconómico (cuando aplique)</li>
                        </ul>
                        <h4 className="text-base font-semibold mb-2">1.2 Información técnica</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            <li>Dirección IP</li>
                            <li>Tipo de navegador y versión</li>
                            <li>Sistema operativo</li>
                            <li>Páginas visitadas y tiempo de permanencia</li>
                            <li>Cookies y tecnologías similares</li>
                        </ul>
                    </div>

                    {/* 2. Uso de la Información */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-3">2. Uso de la información</h3>
                        <h4 className="text-base font-semibold mb-2">2.1 Servicios educativos</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-4">
                            <li>Gestión de inscripciones y matrículas</li>
                            <li>Seguimiento académico y evaluación</li>
                            <li>Emisión de certificados y títulos</li>
                            <li>Comunicación sobre programas y cursos</li>
                        </ul>
                        <h4 className="text-base font-semibold mb-2">2.2 Servicios administrativos</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-4">
                            <li>Verificación de identidad</li>
                            <li>Gestión de pagos (cuando aplique)</li>
                            <li>Soporte técnico y atención al usuario</li>
                            <li>Cumplimiento de obligaciones legales</li>
                        </ul>
                        <h4 className="text-base font-semibold mb-2">2.3 Mejora de servicios</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            <li>Análisis estadístico y de rendimiento</li>
                            <li>Personalización de la experiencia educativa</li>
                            <li>Desarrollo de nuevos programas formativos</li>
                            <li>Investigación educativa institucional</li>
                        </ul>
                    </div>

                    {/* 3. Protección de datos */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-3">3. Protección de datos</h3>
                        <h4 className="text-base font-semibold mb-2">3.1 Medidas técnicas</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-4">
                            <li>Cifrado de datos en tránsito y en reposo</li>
                            <li>Firewalls y sistemas de detección de intrusiones</li>
                            <li>Copias de seguridad regulares</li>
                            <li>Actualizaciones de seguridad constantes</li>
                            <li>Control de acceso basado en roles</li>
                        </ul>
                        <h4 className="text-base font-semibold mb-2">3.2 Medidas organizativas</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            <li>Políticas internas de manejo de datos</li>
                            <li>Capacitación del personal en protección de datos</li>
                            <li>Procedimientos de respuesta a incidentes</li>
                            <li>Auditorías regulares de seguridad</li>
                            <li>Acuerdos de confidencialidad con terceros</li>
                        </ul>
                    </div>

                    {/* 4. Derechos sobre los datos */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-3">4. Derechos sobre los datos</h3>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            <li><strong>Acceso:</strong> Conocer qué datos tenemos sobre usted</li>
                            <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
                            <li><strong>Actualización:</strong> Mantener sus datos actualizados</li>
                            <li><strong>Supresión:</strong> Solicitar la eliminación de sus datos (cuando sea legalmente posible)</li>
                            <li><strong>Oposición:</strong> Oponerse al tratamiento de sus datos en ciertos casos</li>
                            <li><strong>Portabilidad:</strong> Obtener una copia de sus datos en formato estructurado</li>
                        </ul>
                        <p className="text-sm text-gray-700 mt-2">
                            Para ejercer estos derechos, puede contactarnos a través de los canales indicados al final de esta política.
                        </p>
                    </div>

                    {/* 5. Compartir información */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-3">5. Compartir información</h3>
                        <h4 className="text-base font-semibold mb-2">5.1 Entidades Gubernamentales</h4>
                        <p className="text-sm text-gray-700 mb-2">Con entidades del gobierno colombiano cuando sea requerido por ley o para cumplir con obligaciones regulatorias.</p>
                        <h4 className="text-base font-semibold mb-2">5.2 Proveedores de Servicios</h4>
                        <p className="text-sm text-gray-700 mb-2">Con proveedores de servicios tecnológicos que nos ayudan a operar nuestras plataformas, bajo estrictos acuerdos de confidencialidad.</p>
                        <h4 className="text-base font-semibold mb-2">5.3 Instituciones Educativas</h4>
                        <p className="text-sm text-gray-700 mb-2">Con otras instituciones educativas para fines de articulación académica y reconocimiento de estudios.</p>
                        <h4 className="text-base font-semibold mb-2">5.4 Empleadores</h4>
                        <p className="text-sm text-gray-700">Con empleadores potenciales, con su consentimiento expreso, para fines de empleabilidad.</p>
                    </div>

                    {/* 6. Retención de datos    */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-3">6. Retención de datos</h3>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            <li><strong>Datos académicos:</strong> De forma permanente para efectos de certificación</li>
                            <li><strong>Datos de contacto:</strong> Mientras mantenga una relación activa con el SENA</li>
                            <li><strong>Datos técnicos:</strong> Por un período máximo de 2 años</li>
                            <li><strong>Datos financieros:</strong> Según lo requiera la legislación contable y tributaria</li>
                        </ul>
                    </div>

                    {/* 7. Menores de edad */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-3">7. Menores de edad</h3>
                        <p className="text-sm text-gray-700 leading-relaxed mb-2">
                            Los menores de edad pueden utilizar nuestros servicios con el consentimiento de sus padres o tutores legales. Implementamos medidas adicionales de protección para los datos de menores:
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            <li>Verificación del consentimiento parental</li>
                            <li>Limitación en la recopilación de datos personales</li>
                            <li>Supervisión adicional en el procesamiento de datos</li>
                            <li>Derechos especiales de eliminación de datos</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default PrivacyModal;