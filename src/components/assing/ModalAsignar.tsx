import React, { useEffect, useState } from "react";
import ModalOtroInstructor from "./ModalOtroInstructor";
import { getDocumentTypesWithEmpty } from "@/Api/Services/TypeDocument";
import { getInstructoresCustomList } from "@/Api/Services/Instructor";
import { assignInstructorToAprendiz } from "@/Api/Services/RequestAssignaton";
import { DocumentType } from "@/Api/types/entities/document.type";
import { InstructorCustomList } from "@/Api/types/entities/instructor.types";

interface AprendizData {
    nombre: string;
    tipo_identificacion: number; // id
    numero_identificacion: string;
    numero_ficha: string;
    fecha_inicio_etapa_practica: string;
    programa: string;
    fecha_solicitud: string;
    aprendiz_id?: number; // Necesitamos el ID del aprendiz para la asignación
}

interface ModalAsignarProps {
    aprendiz: AprendizData;
    onClose: () => void;
    onReject: () => void;
}

// Imágenes generadas por Figma
const imgImage27 = "https://s3-alpha-sig.figma.com/img/7dcd/c8b4/ba082e6fe13dd6fe70055d294639337e?Expires=1760313600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=mwny7NClyCELuaDwkSjhmOy1Z2~cR52CL48b3SjBlIWJm9XcCPW5g-J3ssoTKWAGFSzSjVG-5XDebw0rilvYcFMtob0WR9woDzAYFJDxSyMDW~M-p6c18HvHoxTYexGnrhuj0h6AfsrJ1iHYZhsENEQuQKNkpr-UbDp4cSWMwSOeBBrPn1iAe9vcahd1mMCZLHHcax4TOzQgzrzKGQn4ZN6AhiZtc8w0HCA3nukc6xfZYzj63W03J9JjCa~qZ3vvni1UiNLnwYJc4gsyNNcMh~LoaI7H29gHTzCZRbm3~EcjcjWz6SMTLGm~2le9FnaHviMUFhjvSdljRxIOtPFHHw__";
const imgImage28 = "https://s3-alpha-sig.figma.com/img/a708/7aa7/17283d6d4d69e211b0556a79d6c7d4d2?Expires=1760313600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=UQuP7M8bNwVFw0y4ncxMkSbdOxRrO3yFWcTN5bSPfArBvGd4iRL~3rI~s9pIbEOo194CLV4o0uYK1~d~SoACapO7Sr5IePVLXDH7-~z~p7SnGyT~Ck3AXTOFifdTN5imYfTu1ys0~POylTmCv8~Sjk8qJsukfMRFTEuKxcAAFRW0~PapjqanI6Ol0Lsi4DRIqpleGFW~4EUoavP1PVAGYTp956zjxkvOqwliN7fbf8rIEdVzMMc2JJE7EXkARlJmHm7T4qWptcXtzrcW~GqDI4tJPfkMna2PGLPGX89eWmtm78P7gQiYC-dVnpofXVeLZP4c~AyYfgx5ry0immLr4A__";
const imgImage29 = "https://s3-alpha-sig.figma.com/img/7f35/4ca1/855641084dcb17b6bed398079ede9772?Expires=1760313600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=L5A~ki91JCg4lKsmrFPKdjnyf60X-Cjhjycv8PXyUTZj24Dh~QkQ07MS8eVWvcM8~BJAGHJTZxGBR11CEfHPUoNGsv5jtZzUAVG4wBNLN2-b23N-pnKrJg2zXlt2TpVsHGc-w-xnPyt9p3St7mb7mu9CV4px~OKDeX3tBVRuur62PExyQeOyDSejX8IBChj1NqvPhtuQImVz~5ZuUm2iCbIG~IOXB0gh3qgNmecgAbpRdICQETCw5YHpmpV9VMlj5qCtJKZIzAgVAssl~aa4-9FgQmn~VJT17Ic~8qRU836338HYU5Ao~FlHBbd5vaSWR6fYt54QvWa6CYlxW0KbuQ__";
const imgImage30 = "https://s3-alpha-sig.figma.com/img/8ec9/a731/b3c0a2a0e49e8b703cdd9bf3268c2cd1?Expires=1760313600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=tEafjirTnVxClmAalgJULc6NT8yy0PC3NiNbY3SVf01EOdwnBbSMK36~BNi9BjgmSn1P-OLOUFNpa74Ve5VZFr5BTHixvv~WpUq4hxPF7IdyE67w6AQ6fH0kvL3SJv1lupmDnXEMjTJwIePoYODkOpicaATLeLQMW26dHp0g1atxqf4PQuXxSW8zg5cajb~aqmtXW1ziThTVRaF6c~e04lG-fiv5Ek593ZBwGpJZbOdx3omUf7hsM~bXF2jD1TTg8DenpZdxrtztTp3HZs1DkHD~3wprNh09NyIzN8~3gqZj6hC2FdWdGHi~eWNePlYq4vQUkyYRzWJ6RDWHd0Liug__";
const imgImage31 = "https://s3-alpha-sig.figma.com/img/bde7/571d/9e0feab99778a3e3017fe3efe25e681c?Expires=1760313600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QTOuvV~3kAC-PkGw-oSyqaKnErCZJb4qnQtarzeuK2fDcwM2a7g6vkWA6HFkN1Y3J2r1t0h9L-NkEGK7ci5rFufR1SCmOpU~E5n2R~7mjL0KQvZzYV88aHZFj6ldB075F1b5LXS4s~OM~YGA4CLEZ94ixFJ~YzkpofdvQ5r8CYGC5MBkmJwxyIwwcgBXlUuKE7KmVSSkOpwf01aBs-Gtw0yJki6QO-YLf4NEQdpgBHMqfMI5YtsjbfOSNo7eeMYPbI5xzCZT4OHseoqiXyBNkBJYS17uhBdoGrZw6nuXild4UojUkEw0FvKwvA7-tTvyECJElGfeKojuy9HVcJ5o4Q__";
const imgImage32 = "https://s3-alpha-sig.figma.com/img/02d2/a66d/70b15153ce01f7902c0c9e4eab6e70f2?Expires=1760313600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=rL9y4LC1mwtO6MQCrHgyz3yLKi1Oq~Nr7l8hkfTTbS~Yj-ZbndfDToaG87tBIiD7yERZCbvcM1rNHmKjjYz61in5DthNyAHeJMytPUYBfhbK91nHO6hQk22MyUPnpPbKX-eMX2Lr0jgWV1-XQsFCSevG1wGj2EszB2os6oIkNLJiDIeSZjHsnfH2iVy1wxlsIfeZYhd3JNgBYn45IdHzf5myhmmDaoQX4Klq2BH6A9sadYNc-GUgPHS7FzQLS1YaddspjKaEJgV65xqF60V8WhQ5TvSKKAF7z3R2~kqjQQVjjRZ3i5a7WrhXl0q7S46-uwBRxErSSKfWNCh2YqbZEQ__";

export default function ModalAsignar({ aprendiz, onClose, onReject }: ModalAsignarProps) {
    const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
    const [docTypeName, setDocTypeName] = useState<string>("");
    const [showOtherInstructorModal, setShowOtherInstructorModal] = useState(false);
    const [selectedInstructor, setSelectedInstructor] = useState<InstructorCustomList | null>(null);
    const [instructores, setInstructores] = useState<InstructorCustomList[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [assigning, setAssigning] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleConfirmAssignment = async () => {
        if (!selectedInstructor || !aprendiz.aprendiz_id) {
            alert('Debe seleccionar un instructor y tener un aprendiz válido');
            return;
        }

        setAssigning(true);
        setShowConfirmModal(false);
        try {
            await assignInstructorToAprendiz(selectedInstructor.id, aprendiz.aprendiz_id);
            alert('Instructor asignado exitosamente');
            onClose();
            // Aquí podrías agregar lógica para refrescar la lista o mostrar notificación
        } catch (error) {
            console.error('Error al asignar instructor:', error);
            alert('Error al asignar el instructor. Por favor intente nuevamente.');
        } finally {
            setAssigning(false);
        }
    };

    const handleAssignInstructor = () => {
        if (!selectedInstructor || !aprendiz.aprendiz_id) {
            alert('Debe seleccionar un instructor y tener un aprendiz válido');
            return;
        }
        setShowConfirmModal(true);
    };

    useEffect(() => {
        // Cargar tipos de documento
        getDocumentTypesWithEmpty().then((types) => {
            const validTypes: DocumentType[] = types
                .filter(t => typeof t.id === "number")
                .map(t => ({
                    id: t.id as number,
                    name: t.name
                }));
            setDocumentTypes(validTypes);
            const found = validTypes.find(t => t.id === aprendiz.tipo_identificacion);
            setDocTypeName(found ? found.name : "");
        });

        // Cargar instructores
        setLoading(true);
        setError("");
        getInstructoresCustomList()
            .then(data => {
                // Validar que data sea un array y filtrar elementos inválidos
                if (Array.isArray(data)) {
                    const validInstructores = data.filter(inst => 
                        inst && typeof inst === 'object' && inst.id && inst.nombre
                    );
                    setInstructores(validInstructores);
                } else {
                    setInstructores([]);
                    setError("Formato de datos incorrecto");
                }
            })
            .catch(error => {
                console.error("Error al cargar instructores:", error);
                setError("Error al cargar instructores");
                setInstructores([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [aprendiz.tipo_identificacion]);

    return (
        <>
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay oscuro */}
                <div className="absolute inset-0 bg-black bg-opacity-40" style={{ pointerEvents: 'none' }} />
            {/* Modal principal */}
                <div
                    className="bg-white rounded-[10px] shadow-lg max-w-2xl w-full mx-4 p-6 relative flex flex-col gap-6 z-10"
                    style={{ pointerEvents: 'auto' }}
                >
                {/* Header */}
                <div className="flex items-center gap-3 mb-2">
                    <img src={imgImage27} alt="icon" className="w-8 h-8" />
                    <div>
                        <div className="text-black text-2xl font-extrabold font-['Roboto'] leading-loose">Asignar Instructor de seguimiento</div>
                        <div className="text-black text-base font-normal font-['Roboto'] leading-loose">Selecciona un instructor para realizar el seguimiento del aprendiz</div>
                    </div>
                </div>
                {/* Card aprendiz */}
                <div className="border rounded-lg p-5 flex flex-col gap-2 bg-white">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-green-200/90 rounded-full w-12 h-12 flex items-center justify-center">
                            <img src={imgImage28} alt="avatar" className="w-7 h-7" />
                        </div>
                        <div>
                            <div className="text-black text-2xl font-semibold font-['Roboto'] leading-loose">{aprendiz.nombre}</div>
                            <div className="text-neutral-500 text-base font-normal font-['Roboto'] leading-loose">Información del aprendiz</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                        <div className="flex items-center gap-2">
                            <img src={imgImage29} alt="icon" className="w-6 h-6" />
                            <span className="text-neutral-500">Identificación:</span>
                            <span className="text-black font-medium">{aprendiz.numero_identificacion}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <img src={imgImage31} alt="icon" className="w-5 h-5" />
                            <span className="text-neutral-500">Tipo:</span>
                            <span className="text-black font-medium">{docTypeName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <img src={imgImage30} alt="icon" className="w-6 h-6" />
                            <span className="text-neutral-500">Ficha:</span>
                            <span className="text-black font-medium">{aprendiz.numero_ficha}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <img src={imgImage32} alt="icon" className="w-5 h-5" />
                            <span className="text-neutral-500">Fecha de solicitud:</span>
                            <span className="text-black font-medium">{aprendiz.fecha_solicitud}</span>
                        </div>
                        <div className="flex items-center gap-2 col-span-2">
                            <img src={imgImage32} alt="icon" className="w-5 h-5" />
                            <span className="text-neutral-500">Fecha inicio etapa práctica:</span>
                            <span className="text-black font-medium">{aprendiz.fecha_inicio_etapa_practica}</span>
                        </div>
                    </div>
                    <div className="mt-2 text-stone-500 text-base font-medium font-['Roboto'] leading-loose">
                        Programa: <span className="text-neutral-500 font-normal">{aprendiz.programa}</span>
                    </div>
                </div>
                {/* Selector de instructor */}
                <div>
                    <div className="text-black text-2xl font-medium font-['Roboto'] mb-2">Seleccionar Instructor</div>
                    {loading ? (
                        <div className="text-center py-4">Cargando instructores...</div>
                    ) : error ? (
                        <div className="text-center py-4 text-red-500">{error}</div>
                    ) : selectedInstructor ? (
                        // Si ya tiene instructor asignado, mostrar su nombre con opción de cambiar
                        <div className="flex items-center gap-4">
                            <div className="flex-1 border rounded-lg px-4 py-2 text-base font-normal font-['Roboto'] bg-gray-50">
                                {selectedInstructor.nombre}
                            </div>
                            <button 
                                className="bg-blue-500 text-white px-6 py-2 rounded-[10px] font-bold hover:bg-blue-600"
                                onClick={() => setShowOtherInstructorModal(true)}
                            >
                                Cambiar instructor
                            </button>
                        </div>
                    ) : (
                        // Si NO tiene instructor asignado, mostrar solo el botón de asignar
                        <button 
                            className="w-full bg-green-500 text-white px-6 py-3 rounded-[10px] font-bold text-lg hover:bg-green-600"
                            onClick={() => setShowOtherInstructorModal(true)}
                        >
                            Asignar Instructor
                        </button>
                    )}
                </div>
                {/* Botones de acción */}
                <div className="flex flex-row gap-4 justify-start mt-4">
                    <button className="bg-[#fb8383] border border-[#773939] text-[#5c1515] font-bold px-6 py-2 rounded-[10px] flex items-center gap-2 hover:bg-[#fbbcbc]" onClick={onReject}>
                        &#10006; Rechazar solicitud
                    </button>
                    <button className="bg-white border border-[#a39f9f] text-black font-bold px-6 py-2 rounded-[10px] flex items-center gap-2 hover:bg-gray-100" onClick={onClose}>
                        Cancelar
                    </button>
                    <button 
                        className="bg-[#7bcc7f] border border-[#c0fbcd] text-[#0c672d] font-bold px-6 py-2 rounded-[10px] flex items-center gap-2 hover:bg-[#a6e6ad] disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleAssignInstructor}
                        disabled={!selectedInstructor || assigning}
                    >
                        {assigning ? 'Asignando...' : 'Asignar Instructor'}
                    </button>
                </div>
            </div>
        </div>
        {/* Modal para 'Otro instructor' */}
        {showOtherInstructorModal && (
            <ModalOtroInstructor
                instructores={instructores}
                onClose={() => {
                    setShowOtherInstructorModal(false);
                }}
                onAssign={instructor => {
                    setSelectedInstructor(instructor);
                    setShowOtherInstructorModal(false);
                }}
            />
        )}
        
        {/* Modal de confirmación */}
        {showConfirmModal && selectedInstructor && (
            <div className="fixed inset-0 z-[80] flex items-center justify-center">
                <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowConfirmModal(false)} />
                <div className="bg-white rounded-[10px] shadow-lg max-w-md w-full mx-4 p-6 relative z-[81]">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-black mb-2">¿Confirmar asignación?</h3>
                            <p className="text-gray-700">
                                Se asignará el instructor <span className="font-bold">{selectedInstructor.nombre}</span> para el seguimiento de <span className="font-bold">{aprendiz.nombre}</span>.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3 justify-end mt-6">
                        <button
                            className="px-6 py-2 rounded-[10px] border border-gray-400 text-gray-700 font-bold hover:bg-gray-100"
                            onClick={() => setShowConfirmModal(false)}
                        >
                            Cancelar
                        </button>
                        <button
                            className="px-6 py-2 rounded-[10px] bg-green-500 text-white font-bold hover:bg-green-600 flex items-center gap-2"
                            onClick={handleConfirmAssignment}
                            disabled={assigning}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {assigning ? 'Confirmando...' : 'Confirmar asignación'}
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}
