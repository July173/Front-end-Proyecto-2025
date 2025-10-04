import React, { useState } from "react";
import { InstructorCustomList } from "@/Api/types/entities/instructor.types";

interface ModalOtroInstructorProps {
    onClose: () => void;
    onAssign: (instructor: InstructorCustomList) => void;
    instructores: InstructorCustomList[];
}

// Iconos de ejemplo
const iconUser = "https://s3-alpha-sig.figma.com/img/a708/7aa7/17283d6d4d69e211b0556a79d6c7d4d2?Expires=1760313600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=UQuP7M8bNwVFw0y4ncxMkSbdOxRrO3yFWcTN5bSPfArBvGd4iRL~3rI~s9pIbEOo194CLV4o0uYK1~d~SoACapO7Sr5IePVLXDH7-~z~p7SnGyT~Ck3AXTOFifdTN5imYfTu1ys0~POylTmCv8~Sjk8qJsukfMRFTEuKxcAAFRW0~PapjqanI6Ol0Lsi4DRIqpleGFW~4EUoavP1PVAGYTp956zjxkvOqwliN7fbf8rIEdVzMMc2JJE7EXkARlJmHm7T4qWptcXtzrcW~GqDI4tJPfkMna2PGLPGX89eWmtm78P7gQiYC-dVnpofXVeLZP4c~AyYfgx5ry0immLr4A__";

export default function ModalOtroInstructor({ onClose, onAssign, instructores }: ModalOtroInstructorProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProgram, setSelectedProgram] = useState("Todos los programas");

    const getAssignmentColor = (assigned: number, max: number) => {
        const percentage = (assigned / max) * 100;
        if (percentage <= 30) return { bg: "bg-green-400", text: "text-green-900" };
        if (percentage <= 70) return { bg: "bg-amber-200", text: "text-yellow-700" };
        return { bg: "bg-rose-400", text: "text-red-600" };
    };

    const filteredInstructores = instructores.filter(inst =>
        (inst.nombre && inst.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (inst.especialidad && inst.especialidad.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
            <div className="w-[996px] h-[612px] relative bg-white rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden z-[71]">
                {/* Header */}
                <img className="w-8 h-8 left-[22px] top-[33px] absolute" src={iconUser} alt="icon" />
                <div className="left-[66px] top-[34px] absolute text-black text-2xl font-extrabold font-['Roboto'] leading-loose">
                    Seleccionar instructor
                </div>
                <div className="left-[66px] top-[66px] absolute text-black text-base font-normal font-['Roboto'] leading-loose">
                    Busca y selecciona un instructor disponible para el seguimiento
                </div>

                {/* Barra de búsqueda */}
                <div className="w-[558px] h-9 left-[66px] top-[111px] absolute bg-white rounded-[10px] border-2 border-stone-300 flex items-center px-4">
                    <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Buscar por nombre o por especialización..."
                        className="flex-1 ml-3 text-lg font-normal font-['Roboto'] text-neutral-400 focus:outline-none"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Selector de programa */}
                <div className="w-72 left-[661px] top-[110px] absolute">
                    <select
                        className="w-full px-6 py-2.5 rounded-[10px] border border-neutral-500 text-black text-lg font-normal font-['Inter'] focus:outline-none"
                        value={selectedProgram}
                        onChange={e => setSelectedProgram(e.target.value)}
                    >
                        <option>Todos los programas</option>
                        <option>Desarrollo de software</option>
                        <option>Administración</option>
                        <option>Diseño gráfico</option>
                    </select>
                </div>

                {/* Lista de instructores */}
                <div className="w-[927px] h-96 px-4 py-11 left-[39px] top-[160px] absolute flex flex-col gap-2.5 overflow-y-auto">
                    {filteredInstructores.length === 0 ? (
                        <div className="text-center text-gray-500 py-8">
                            No se encontraron instructores
                        </div>
                    ) : (
                        filteredInstructores.map(inst => {
                            const assigned = inst.asignados || 0;
                            const max = inst.maxAsignados || 80;
                            const colors = getAssignmentColor(assigned, max);
                            
                            return (
                                <div key={inst.id} className="h-32 relative rounded-[10px] border border-neutral-500 flex items-center px-4">
                                    {/* Avatar */}
                                    <div className="w-20 h-20 bg-green-200/90 rounded-full flex items-center justify-center overflow-hidden">
                                        <img src={iconUser} alt="avatar" className="w-10 h-10" />
                                    </div>

                                    {/* Información del instructor */}
                                    <div className="ml-6 flex-1">
                                        <div className="text-black text-2xl font-semibold font-['Roboto'] leading-loose">
                                            {inst.nombre || "Sin nombre"}
                                        </div>
                                        <div className="text-neutral-500 text-base font-normal font-['Roboto'] leading-loose">
                                            {inst.especialidad || "Sin especialidad"}
                                        </div>
                                        <div className="text-neutral-500 text-base font-normal font-['Roboto'] leading-loose">
                                            {inst.email || "Sin correo"}
                                        </div>
                                    </div>

                                    {/* Badge de asignados */}
                                    <div className={`w-40 h-7 ${colors.bg} rounded-[20px] flex items-center justify-center mr-6`}>
                                        <div className={`${colors.text} text-base font-normal font-['Roboto']`}>
                                            {assigned}/{max} Asignados
                                        </div>
                                    </div>

                                    {/* Botón seleccionar */}
                                    <button
                                        className="w-40 h-11 rounded-[10px] border-2 border-stone-300 hover:bg-gray-100"
                                        onClick={() => onAssign(inst)}
                                    >
                                        <div className="text-black text-xl font-medium font-['Roboto']">
                                            Seleccionar
                                        </div>
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
