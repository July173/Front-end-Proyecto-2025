import React, { useEffect } from 'react';
import ReactDOM from 'react-dom'; // <-- Importa ReactDOM
import { X, Mail, Phone, Clock, Send, ExternalLink, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import useSupportForm from '../hook/useSupportForm'; // Ajusta la ruta según tu estructura
import CustomSelect from './CustomSelect'; // importa el componente

const SupportModal = ({ isOpen, onClose }) => {
    const {
        formData,
        isLoading,
        error,
        success,
        handleInputChange,
        submitForm,
        setSuccess,
    } = useSupportForm();

    const [localError, setLocalError] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validar correo
        const email = formData.email || '';
        const validEmail = /^[\w.-]+@(sena\.edu\.co|soy\.sena\.edu\.co)$/i.test(email);
        if (!validEmail) {
            setSuccess(false);
            setLocalError('El correo debe terminar en @sena.edu.co o @soy.sena.edu.co');
            return;
        }
        setLocalError('');
        const wasSuccessful = await submitForm();
        if (wasSuccessful) {
            // Mostrar mensaje de éxito por 2 segundos y luego cerrar
            setTimeout(() => {
                setSuccess(false);
                onClose();
            }, 2000);
        }
    };

    const handleMailtoFallback = (e) => {
        e.preventDefault();
        setTimeout(() => {
            setSuccess(false);
            onClose();
        }, 1000);
    };

    // Resetear estado cuando se cierra el modal
    useEffect(() => {
        if (!isOpen) {
            setSuccess(false);
        }
    }, [isOpen, setSuccess]);

    if (!isOpen) return null;

    // Usa portal aquí
    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[95vh] overflow-y-auto">
                {/* Header */}
                <div className="flex flex-col items-center p-6 border-b border-gray-200 relative">
                    <button
                        onClick={onClose}
                        className="absolute right-6 top-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-[#43A047] rounded-full flex items-center justify-center">
                            <span className="text-white text-2xl font-bold">?</span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 text-center">Centro de Soporte</h2>
                    </div>
                    <p className="text-gray-600 text-center mt-2">Estamos aquí para ayudarte. Encuentra respuestas rápidas o contáctanos directamente.</p>
                </div>

                <h3 className="font-semibold text-gray-900 mb-4 text-center mt-4 text-xl">Formas de contactarnos</h3>
                {/* Content */}
                <div className="p-6 space-y-6 pt-1">

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Email falta editar el correo por uno real */}
                        <div className="bg-white shadow rounded-lg p-6 text-center">
                            <Mail className="w-8 h-8 mx-auto text-orange-600 mb-3" />
                            <h3 className="font-semibold text-lg">Email</h3>
                            <p className="text-gray-600 text-sm">Soporte por correo electrónico</p>
                            <p className="font-semibold text-lg mt-2">servicio@sena.edu.co</p>
                            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mt-3">
                                <Clock className="w-4 h-4" />
                                <span>Respuesta en 24-48 horas</span>
                            </div>
                        </div>

                        {/* Teléfono falta editar el numero por uno real */}
                        <div className="bg-white shadow rounded-lg p-6 text-center">
                            <Phone className="w-8 h-8 mx-auto text-green-600 mb-3" />
                            <h3 className="font-semibold text-lg">Teléfono</h3>
                            <p className="text-gray-600 text-sm">Línea gratuita nacional</p>
                            <p className="font-semibold text-lg mt-2">01 8000 910 270</p>
                            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mt-3">
                                <Clock className="w-4 h-4" />
                                <span>Lunes a viernes: 7:00 AM - 7:00 PM</span>
                            </div>
                        </div>
                    </div>


                    {/* Schedule */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-xl">
                            <Clock className="w-5 h-5 text-[#43A047]" />
                            Horarios de Atención
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between border-b border-gray-300 py-2">
                                <span className="text-black font-semibold">Lunes a Viernes</span>
                                <span className="text-[#43A047]">7:00 AM - 7:00 PM</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-300 py-2">
                                <span className="text-black font-semibold">Sábados</span>
                                <span className="text-[#43A047]">8:00 AM - 4:00 PM</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-300 py-2">
                                <span className="text-black font-semibold">Domingos y festivos</span>
                                <span className="text-gray-400">Cerrado</span>
                            </div>
                        </div>
                        <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-md">
                            <p className="text-sm text-orange-800">
                                <strong>Nota:</strong> Los tiempos de respuesta pueden variar durante períodos de alta demanda como matrículas masivas.
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900  text-xl">Envíanos un Mensaje</h3>
                        <h4 className='mb-6 text-gray-500'>Complete el formulario y nos pondremos en contacto con usted dentro de 24 horas.</h4>

                        {/* Estados de éxito y error */}
                        {success && (
                            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                <div>
                                    <p className="text-green-800 font-medium">¡Mensaje enviado correctamente!</p>
                                    <p className="text-green-700 text-sm">Te contactaremos pronto a tu email.</p>
                                </div>
                            </div>
                        )}

                        {(error || localError) && (
                            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-red-800 font-medium">Error al enviar</p>
                                        <p className="text-red-700 text-sm">{error || localError}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nombre Completo *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#43A047] focus:border-transparent transition-all"
                                    placeholder="Ingresa tu nombre completo"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Correo Electrónico *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#43A047] focus:border-transparent transition-all"
                                    placeholder="correo@soy.sena.edu.co"
                                />
                            </div>

                            <div>
                                <CustomSelect
                                    value={formData.category}
                                    onChange={(val) => handleInputChange({ target: { name: "category", value: val } })}
                                    options={[
                                        { value: "tecnico", label: "Soporte Técnico" },
                                        { value: "academico", label: "Consulta Académica" },
                                        { value: "plataforma", label: "Problemas con la Plataforma" },
                                        { value: "otros", label: "Otros" },
                                    ]}
                                    label="Categoría de Consulta *"
                                    placeholder="Selecciona una categoría"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mensaje *
                                </label>
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#43A047] focus:border-transparent transition-all resize-none"
                                    placeholder="Describe detalladamente tu consulta o problema..."
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={isLoading || success}
                                    className="flex-1 bg-[#43A047] hover:bg-[#388E3C] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#43A047] focus:ring-offset-2 flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader className="w-5 h-5 animate-spin" />
                                            Enviando...
                                        </>
                                    ) : success ? (
                                        <>
                                            <CheckCircle className="w-5 h-5" />
                                            Enviado
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Enviar Mensaje
                                        </>
                                    )}
                                </button>


                            </div>
                        </form>
                    </div>

                    {/* Useful Links */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-4 text-xl">Enlaces Útiles</h3>
                        <div className="space-y-3">
                            <a
                                href="https://betowa.sena.edu.co/"
                                target="_blank"
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                            >
                                <span className="text-gray-700 group-hover:text-gray-900">
                                    Sofia Plus - Oferta Educativa
                                </span>
                                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default SupportModal;