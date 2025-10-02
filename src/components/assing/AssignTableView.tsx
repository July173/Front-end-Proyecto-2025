import React, { useState } from "react";
import { getAllRequests } from "@/Api/Services/RequestAssignaton";
import AssignButton from "./AssignButton";
import { AssignTableRow, DetailData } from "@/Api/types/Modules/assign.types";
import { getFormRequestById } from "@/Api/Services/RequestAssignaton";
import { Document, Page } from 'react-pdf';

interface AssignTableViewProps {
  onAction: (row: AssignTableRow) => void;
  actionLabel?: string;
}

const AssignTableView: React.FC<AssignTableViewProps> = ({ onAction, actionLabel }) => {
  const [rows, setRows] = React.useState<AssignTableRow[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [detail, setDetail] = useState<DetailData | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [pdfFullscreen, setPdfFullscreen] = useState(false);

  React.useEffect(() => {
    setLoading(true);
    getAllRequests()
      .then(result => {
        if (result && Array.isArray(result)) {
          setRows(result);
        } else {
          setRows([]);
        }
      })
      .catch(err => {
        setError(err.message);
        setRows([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Elimina el useEffect y el fetch interno

  return (
    <div className="w-full rounded-[10px] border border-stone-300/70 bg-white overflow-hidden">
      <div className="w-full">
        <div className="bg-gray-100 flex items-center h-12 border-b border-gray-200">
          <div className="w-12 px-2 text-center text-stone-500 text-sm font-normal font-['Roboto']">#</div>
          <div className="w-56 px-2 text-center text-stone-500 text-sm font-normal font-['Roboto']">Nombre</div>
          <div className="w-44 px-2 text-center text-stone-500 text-sm font-normal font-['Roboto']">Tipo de identificación</div>
          <div className="w-44 px-2 text-center text-stone-500 text-sm font-normal font-['Roboto']">Número</div>
          <div className="w-40 px-2 text-center text-stone-500 text-sm font-normal font-['Roboto']">Fecha Solicitud</div>
          <div className="w-32 px-2 text-center text-stone-500 text-sm font-normal font-['Roboto']">Acción</div>
        </div>
      </div>
      <div className="w-full">
        {loading ? (
          <div className="w-full text-center py-4 text-gray-600">Cargando...</div>
        ) : error ? (
          <div className="w-full text-center py-4 text-red-500">{error}</div>
        ) : rows.length === 0 ? (
          <div className="w-full text-center py-4 text-gray-600">No hay datos disponibles en la tabla</div>
        ) : (
          rows.map((row, idx) => (
            <React.Fragment key={idx}>
              <div className={`flex items-center border-b border-gray-200 h-12 hover:bg-gray-50 transition-all cursor-pointer ${expandedIdx === idx ? 'bg-gray-50' : ''}`}
                onClick={async () => {
                  if (expandedIdx === idx) {
                    setExpandedIdx(null);
                    setDetail(null);
                  } else {
                    setExpandedIdx(idx);
                    setLoadingDetail(true);
                    try {
                      const data = await getFormRequestById(row.id!);
                      setDetail(data.data || null);
                    } catch {
                      setDetail(null);
                    } finally {
                      setLoadingDetail(false);
                    }
                  }
                }}>
                <div className="w-12 px-2 text-center text-black text-sm font-normal font-['Roboto']">{idx + 1}</div>
                <div className="w-56 px-2 text-center text-black text-sm font-normal font-['Roboto']">{row.nombre}</div>
                <div className="w-44 px-2 text-center text-black text-sm font-normal font-['Roboto']">{row.tipo_identificacion}</div>
                <div className="w-44 px-2 text-center text-black text-sm font-normal font-['Roboto']">{row.numero_identificacion}</div>
                <div className="w-40 px-2 text-center text-black text-sm font-normal font-['Roboto']">{row.fecha_solicitud}</div>
                <div className="w-32 px-2 text-center flex items-center justify-center">
                  <AssignButton
                    state={["Asignar", "Asignado", "Rechazado"].includes(actionLabel ?? "") ? (actionLabel as "Asignar" | "Asignado" | "Rechazado") : "Asignar"}
                    requestId={row.id}
                    onClick={() => {
                      onAction(row);
                    }}
                  />
                </div>
              </div>
              {expandedIdx === idx && (
                <div className="bg-gray-50 px-8 py-6 border-b border-gray-200 animate-fade-in">
                  {loadingDetail ? (
                    <div className="text-center text-gray-600">Cargando información...</div>
                  ) : detail ? (
                    <>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                        <div><span className="font-semibold">Nombre Aprendiz</span><br />{detail.nombre_aprendiz}</div>
                        <div><span className="font-semibold">Tipo Identificación</span><br />{detail.tipo_identificacion}</div>
                        <div><span className="font-semibold">Número Identificación</span><br />{detail.numero_identificacion}</div>
                        <div><span className="font-semibold">Teléfono Aprendiz</span><br />{detail.telefono_aprendiz}</div>
                        <div><span className="font-semibold">Correo Aprendiz</span><br />{detail.correo_aprendiz}</div>
                        <div><span className="font-semibold">Número Ficha</span><br />{detail.numero_ficha}</div>
                        <div><span className="font-semibold">Programa</span><br />{detail.programa}</div>
                        <div><span className="font-semibold">Empresa</span><br />{detail.empresa_nombre}</div>
                        <div><span className="font-semibold">Nit Empresa</span><br />{detail.empresa_nit}</div>
                        <div><span className="font-semibold">Ubicación Empresa</span><br />{detail.empresa_ubicacion}</div>
                        <div><span className="font-semibold">Correo Empresa</span><br />{detail.empresa_correo}</div>
                        <div><span className="font-semibold">Jefe Inmediato</span><br />{detail.jefe_nombre}</div>
                        <div><span className="font-semibold">Teléfono Jefe</span><br />{detail.jefe_telefono}</div>
                        <div><span className="font-semibold">Correo Jefe</span><br />{detail.jefe_correo}</div>
                        <div><span className="font-semibold">Cargo Jefe</span><br />{detail.jefe_cargo}</div>
                        <div><span className="font-semibold">Regional</span><br />{detail.regional}</div>
                        <div><span className="font-semibold">Centro</span><br />{detail.center}</div>
                        <div><span className="font-semibold">Sede</span><br />{detail.sede}</div>
                        <div><span className="font-semibold">Fecha Solicitud</span><br />{detail.fecha_solicitud}</div>
                        <div><span className="font-semibold">Fecha inicio etapa práctica</span><br />{detail.fecha_inicio_etapa_practica}</div>
                        <div><span className="font-semibold">Fecha fin etapa práctica</span><br />{detail.fecha_fin_etapa_practica}</div>
                        <div><span className="font-semibold">Modalidad etapa productiva</span><br />{detail.modality_productive_stage}</div>
                        <div><span className="font-semibold">Estado solicitud</span><br />{detail.request_state}</div>
                        {detail.talento_humano && (
                          <>
                            <div><span className="font-semibold">Talento Humano</span><br />{detail.talento_humano.nombre}</div>
                            <div><span className="font-semibold">Correo Talento Humano</span><br />{detail.talento_humano.correo}</div>
                            <div><span className="font-semibold">Teléfono Talento Humano</span><br />{detail.talento_humano.telefono}</div>
                          </>
                        )}
                      </div>
                      {detail.pdf_url && (
                        <div className={pdfFullscreen ? "fixed inset-0 z-50 flex items-center justify-center bg-black/80" : "relative w-full h-[800px] flex items-center justify-center bg-[#f6f5f5] rounded-[10px] overflow-hidden mt-4"}>
                          <button
                            className={pdfFullscreen
                              ? "absolute top-6 right-6 bg-[#dbdbdb] border border-green-600 px-6 py-2 rounded-[10px] flex items-center gap-2 z-50 cursor-pointer"
                              : "absolute top-0 left-1/2 -translate-x-1/2 bg-[#dbdbdb] border border-green-600 px-10 py-3 rounded-[10px] flex items-center gap-2 z-10 w-[728px] cursor-pointer"}
                            onClick={() => setPdfFullscreen(!pdfFullscreen)}
                            title={pdfFullscreen ? "Cerrar pantalla completa" : "Abrir PDF en pantalla completa"}
                          >
                            <svg width="25" height="25" fill="none" viewBox="0 0 25 25">
                              <path d="M5 5h7M5 5v7M20 20h-7M20 20v-7" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <span className="text-black text-[14px] font-normal">{pdfFullscreen ? "Cerrar PDF" : "Click en el PDF para ampliar"}</span>
                          </button>
                          <Document file={detail.pdf_url.startsWith("/") ? "http://127.0.0.1:8000" + detail.pdf_url : detail.pdf_url}>
                            <Page pageNumber={1} width={pdfFullscreen ? 1100 : 800} />
                          </Document>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center text-gray-600">No hay información disponible</div>
                  )}
                </div>
              )}
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default AssignTableView;