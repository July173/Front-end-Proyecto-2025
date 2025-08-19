import React from 'react';
import { X } from 'lucide-react';

interface TermsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
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
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v12a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-semibold text-gray-900 text-center">Términos y Condiciones</h2>
                        </div>
                        <p className="text-sm text-gray-500 mt-1 text-center">
                            Condiciones de uso de los servicios del SENA - Servicio Nacional de Aprendizaje
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

                    {/* 1. Aceptación */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-3">1. Aceptación de los Términos</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            Al acceder y utilizar los servicios del SENA (Servicio Nacional de Aprendizaje), usted acepta estar sujeto a estos términos y condiciones de uso. Si no está de acuerdo con alguno de estos términos, no debe utilizar nuestros servicios.
                            El SENA se reserva el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en este sitio web.
                        </p>
                    </div>

                    {/* 2. Descripción */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-3">2. Descripción de los Servicios</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            El SENA ofrece formación profesional integral gratuita en los siguientes servicios:
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            <li>Programas de formación técnica y tecnológica</li>
                            <li>Cursos complementarios virtuales y presenciales</li>
                            <li>Servicios de empleabilidad y emprendimiento</li>
                            <li>Plataformas educativas digitales (Sofia Plus, LMS SENA)</li>
                            <li>Servicios de bienestar al aprendiz</li>
                            <li>Certificación de competencias laborales</li>

                        </ul>
                    </div>

                    {/* 3. Obligaciones */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-3">3. Obligaciones del Usuario</h3>
                        <h4 className="text-base font-semibold mb-2 mt-2">3.1 Requisitos de Registro</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-4">
                            <li>Proporcionar información verdadera, precisa y completa</li>
                            <li>Mantener actualizada su información personal</li>
                            <li>Ser responsables de la confidencialidad de sus credenciales</li>
                            <li>Cumplir con los requisitos académicos establecidos</li>
                        </ul>
                        <h4 className="text-base font-semibold mb-2 mt-2">3.2 Conducta del Usuario</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            <li>Respetar las normas de convivencia institucional</li>
                            <li>No utilizar los servicios para fines ilegales o no autorizados</li>
                            <li>Mantener un comportamiento ético y profesional</li>
                            <li>Respetar los derechos de propiedad intelectual</li>
                            <li>No compartir contenido inapropiado o ofensivo</li>
                        </ul>
                    </div>

                    {/* 4. Propiedad Intelectual */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-3">4. Derechos de Propiedad Intelectual</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            Todo el contenido disponible en las plataformas del SENA, incluyendo pero no limitado a textos, gráficos, logotipos, iconos, imágenes, clips de audio, descargas digitales y compilaciones de datos, es propiedad del SENA o de sus proveedores de contenido y está protegido por las leyes de derechos de autor de Colombia e internacionales.
                            Los usuarios pueden utilizar el contenido únicamente para fines educativos personales y no comerciales, respetando siempre los créditos correspondientes.
                        </p>
                    </div>

                    {/* 5. Protección de Datos */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-3">5. Protección de Datos Personales</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            El SENA se compromete a proteger la privacidad de los usuarios conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013 sobre Protección de Datos Personales en Colombia.
                            Para más información sobre cómo recopilamos, utilizamos y protegemos sus datos personales, consulte nuestra Política de Privacidad.
                        </p>
                    </div>

                    {/* 6. Responsabilidad */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-3">6. Limitación de Responsabilidad</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            El SENA no será responsable por daños directos, indirectos, incidentales, especiales o consecuenciales que resulten del uso o la imposibilidad de uso de nuestros servicios.
                            Nos esforzamos por mantener la disponibilidad continua de nuestros servicios, pero no garantizamos que estén libres de interrupciones, errores o virus.
                        </p>
                    </div>

                    {/* 7. Terminación del Servicio */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-3">7. . Terminación del Servicio</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            El SENA se reserva el derecho de suspender o terminar el acceso a sus servicios a cualquier usuario que viole estos términos y condiciones, sin previo aviso.
                            Los usuarios pueden solicitar la terminación de su cuenta en cualquier momento contactando a nuestro servicio de soporte.
                        </p>
                    </div>

                    {/* 8. Ley Aplicable y Jurisdicción */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-3">8. Ley Aplicable y Jurisdicción</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                           Estos términos y condiciones se rigen por las leyes de la República de Colombia. Cualquier disputa que surja en relación con estos términos será sometida a la jurisdicción exclusiva de los tribunales competentes de Bogotá D.C., Colombia.
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="text-xs text-gray-500 text-center pt-6">
                        <strong>Última actualización:</strong> Agosto 2025
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsModal;
