import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';
import { fetchActivePrivacyDocument, fetchSectionsByDocumentId } from '../../Api/Services/LegalDocument';
import type { LegalDocument, LegalSection } from '../../Api/types/entities/legalDocument.types';

/**
 * Props para el componente PrivacyModal.
 * @property {boolean} isOpen - Indica si el modal está visible.
 * @property {() => void} onClose - Función para cerrar el modal.
 */
interface PrivacyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * Componente PrivacyModal
 * Muestra un modal con la política de privacidad del SENA.
 *
 * Características:
 * - Utiliza React Portal para renderizar el modal fuera del árbol principal.
 * - Permite cerrar el modal haciendo clic en el fondo o en el botón de cierre.
 * - Presenta la política de privacidad en secciones claras y estructuradas.
 *
 * @param {PrivacyModalProps} props - Propiedades del modal.
 * @returns {JSX.Element | null} Modal de política de privacidad renderizado.
 */

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
    const [document, setDocument] = useState<LegalDocument | null>(null);
    const [sections, setSections] = useState<LegalSection[]>([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (!isOpen) return;
        setLoading(true);
        (async () => {
            const doc = await fetchActivePrivacyDocument();
            setDocument(doc);
            if (doc) {
                const secs = await fetchSectionsByDocumentId(doc.id);
                setSections(secs);
            }
            setLoading(false);
        })();
    }, [isOpen]);

    // Agrupa las secciones por parentId
    const groupedSections = React.useMemo(() => {
        const parents = sections.filter(s => s.parentId === null);
        const children = sections.filter(s => s.parentId !== null);
        const map: Record<number, LegalSection[]> = {};
        children.forEach(child => {
            if (!map[child.parentId!]) map[child.parentId!] = [];
            map[child.parentId!].push(child);
        });
        return parents.map(parent => ({
            parent,
            children: map[parent.id] || []
        }));
    }, [sections]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white  w-full max-w-3xl max-h-[95vh] flex flex-col shadow-2xl rounded-sm">
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
                            <h2 className="text-3xl font-semibold text-gray-900 text-center">{document?.title || "Política de privacidad"}</h2>
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
                    {loading ? (
                        <div className="text-center text-gray-500">Cargando...</div>
                    ) : (
                        groupedSections.length > 0 ? (
                            groupedSections.map(({ parent, children }) => (
                                <div key={parent.id} className="bg-white shadow rounded-lg p-6">
                                    <h3 className="text-xl font-bold mb-3">
                                        {parent.code ? `${parent.code}. ` : ""}{parent.title}
                                    </h3>
                                    <p className="text-sm text-gray-700 leading-relaxed">{parent.content}</p>
                                    {children.length > 0 && (
                                        <div className="mt-4 space-y-4">
                                            {children.map(child => (
                                                <div key={child.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                                    <h4 className="text-base font-semibold mb-2">
                                                        {child.code ? `${child.code}. ` : ""}{child.title}
                                                    </h4>
                                                    <p className="text-sm text-gray-700 leading-relaxed">{child.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500">No hay información disponible.</div>
                        )
                    )}
                    {/* Footer */}
                    <div className="text-xs text-gray-500 text-center pt-6">
                        <strong>Última actualización:</strong> {document?.last_update ? new Date(document.last_update).toLocaleDateString("es-CO", { year: "numeric", month: "long" }) : "-"}
                    </div>
                </div>
            </div>
        </div>,
        window.document.body
    );
};
export default PrivacyModal;