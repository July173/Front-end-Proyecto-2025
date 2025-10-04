import React, { useState } from "react";
import ModalAsignar from "./ModalAsignar";
import { getFormRequestById } from "@/Api/Services/RequestAssignaton";

interface AssignButtonProps {
  state?: "Asignar" | "Asignado" | "Rechazado";
  onClick?: () => void;
  requestId?: number;
}

const AssignButton: React.FC<AssignButtonProps> = ({ state = "Asignar", onClick, requestId }) => {
  const [showModal, setShowModal] = useState(false);
  const [aprendizData, setAprendizData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  let style = "border-2 border-[#a39f9f] h-[26px] w-[90px] rounded-[10px] flex items-center justify-center relative cursor-pointer";
  let text = "text-black";
  const bg = "bg-transparent";
  let label = state;

  if (state === "Asignado") {
    style = "bg-[#7bcc7f] border border-[#c0fbcd] h-[26px] w-[90px] rounded-[10px] flex items-center justify-center relative cursor-default";
    text = "text-[#0c672d]";
    label = "Asignado";
  } else if (state === "Rechazado") {
    style = "bg-[#fb8383] border border-[#773939] h-[26px] w-[90px] rounded-[10px] flex items-center justify-center relative cursor-default";
    text = "text-[#5c1515]";
    label = "Rechazado";
  }

  const handleClick = async () => {
    if (state === "Asignar" && requestId) {
      setLoading(true);
      try {
        const res = await getFormRequestById(requestId);
        const d = res.data;
        setAprendizData({
          nombre: d.nombre_aprendiz,
          tipo_identificacion: d.tipo_identificacion,
          numero_identificacion: d.numero_identificacion,
          numero_ficha: d.numero_ficha?.toString() || "",
          fecha_inicio_etapa_practica: d.fecha_inicio_etapa_practica,
          programa: d.programa,
          fecha_solicitud: d.fecha_solicitud,
          aprendiz_id: d.aprendiz_id || d.id_aprendiz || d.aprendiz, // Agregar el ID del aprendiz
        });
        setShowModal(true);
      } catch (e) {
        setAprendizData(null);
      } finally {
        setLoading(false);
      }
      if (onClick) onClick();
    }
  };

  // Simulación de actualización de estado (debería llamar al endpoint real)
  const handleReject = async () => {
    // Aquí deberías llamar al endpoint patchDenialRequest con el id
    // await patchDenialRequest(requestId)
    setShowModal(false);
    // Opcional: mostrar notificación o refrescar datos
  };

  return (
    <>
      <button
        className={style}
        style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}
        onClick={handleClick}
        disabled={state !== "Asignar" || loading}
        data-node-id={state === "Asignar" ? "823:13305" : state === "Asignado" ? "823:13205" : "823:13209"}
      >
        <span className={`text-[14px] leading-[32px] ${text}`}>{loading ? "Cargando..." : label}</span>
      </button>
      {showModal && aprendizData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative">
            <ModalAsignar
              aprendiz={aprendizData}
              onClose={() => setShowModal(false)}
              onReject={handleReject}
            />
            <button
              className="absolute top-2 right-2 bg-gray-200 rounded-full px-3 py-1 text-black text-sm font-bold shadow hover:bg-gray-300"
              onClick={() => setShowModal(false)}
              title="Cerrar"
            >
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AssignButton;
