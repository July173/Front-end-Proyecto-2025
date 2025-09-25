import React, { useState } from "react";

export interface ReassignTableRow {
  id: number;
  nombre: string;
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  fechaSolicitud: string;
  telefono?: string;
  correo?: string;
  empresa?: string;
  nitEmpresa?: string;
  jefeInmediato?: string;
  correoJefe?: string;
  ubicacionEmpresa?: string;
  instructor?: string;
  correoInstructor?: string;
  ficha?: string;
  programa?: string;
  regional?: string;
  centro?: string;
  telefonoJefe?: string;
  fechaInicioPractica?: string;
}

interface ReassignTableViewProps {
  rows: ReassignTableRow[];
  onAction?: (row: ReassignTableRow) => void;
  actionLabel?: string;
}

const ReassignTableView: React.FC<ReassignTableViewProps> = ({ rows, onAction, actionLabel = 'Reasignar' }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full rounded-[5px] outline outline-1 outline-offset-[-1px] outline-stone-300/70 flex flex-col justify-start items-start overflow-hidden">
      <div className="self-stretch h-12 relative bg-gray-100 border-b border-gray-200 overflow-hidden">
        <div className="w-7 left-[32px] top-[9px] absolute justify-center text-stone-500 text-sm font-normal font-['Roboto'] leading-loose">#</div>
        <div className="w-40 left-[62px] top-[9px] absolute justify-center text-stone-500 text-sm font-normal font-['Roboto'] leading-loose">Nombre</div>
        <div className="w-40 left-[240px] top-[15px] absolute justify-center text-stone-500 text-sm font-normal font-['Roboto'] leading-tight">Tipo de identificación</div>
        <div className="w-40 left-[421px] top-[9px] absolute justify-center text-stone-500 text-sm font-normal font-['Roboto'] leading-loose">Número de identificación</div>
        <div className="w-32 left-[605px] top-[9px] absolute justify-center text-stone-500 text-sm font-normal font-['Roboto'] leading-loose">Fecha Solicitud</div>
        <div className="w-24 left-[789px] top-[9px] absolute justify-center text-stone-500 text-sm font-normal font-['Roboto'] leading-loose">Acciones</div>
      </div>
      <div className="w-full px-2.5 flex flex-col justify-start items-start gap-4">
        {rows.map((row) => (
          <div key={row.id} className="self-stretch border-b border-gray-200">
            <button
              className="w-full py-3 inline-flex justify-start items-center gap-5 overflow-hidden focus:outline-none"
              onClick={() => handleExpand(row.id)}
              aria-expanded={expandedId === row.id}
              data-node-id="row-expandable"
            >
              <div className="w-7 flex justify-between items-center">
                <div className="justify-center text-black text-sm font-normal font-['Roboto'] leading-loose">{row.id}</div>
              </div>
              <div className="w-40 justify-center text-black text-sm font-normal font-['Roboto'] leading-loose">{row.nombre}</div>
              <div className="w-40 justify-center text-black text-sm font-normal font-['Roboto'] leading-loose">{row.tipoIdentificacion}</div>
              <div className="w-40 justify-center text-black text-sm font-normal font-['Roboto'] leading-loose">{row.numeroIdentificacion}</div>
              <div className="w-40 justify-center text-black text-sm font-normal font-['Roboto'] leading-loose">{row.fechaSolicitud}</div>
              <div
                className="w-24 h-8 relative bg-orange-600 rounded-[3px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden flex items-center justify-center cursor-pointer"
                onClick={e => {
                  e.stopPropagation();
                  if (onAction) {
                    onAction(row);
                  }
                }}
              >
                <span className="text-white text-xs font-medium font-['Roboto']">{actionLabel}</span>
              </div>
              <span className={`ml-2 transition-transform ${expandedId === row.id ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {expandedId === row.id && (
              <div className="bg-gray-50 px-8 py-4 rounded-b-[5px] animate-fade-in" data-node-id="row-details">
                <div className="grid grid-cols-2 gap-y-2 gap-x-8">
                  <div>
                    <span className="text-gray-500">Teléfono:</span>
                    <span className="ml-2 text-black">{row.telefono}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Correo:</span>
                    <span className="ml-2 text-black">{row.correo}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Empresa:</span>
                    <span className="ml-2 text-black">{row.empresa}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Nit Empresa:</span>
                    <span className="ml-2 text-black">{row.nitEmpresa}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Jefe Inmediato:</span>
                    <span className="ml-2 text-black">{row.jefeInmediato}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Correo Jefe:</span>
                    <span className="ml-2 text-black">{row.correoJefe}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Ubicación Empresa:</span>
                    <span className="ml-2 text-black">{row.ubicacionEmpresa}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Instructor designado:</span>
                    <span className="ml-2 text-black">{row.instructor}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Correo instructor:</span>
                    <span className="ml-2 text-black">{row.correoInstructor}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Regional:</span>
                    <span className="ml-2 text-black">{row.regional}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Centro:</span>
                    <span className="ml-2 text-black">{row.centro}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Ficha:</span>
                    <span className="ml-2 text-black">{row.ficha}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Programa:</span>
                    <span className="ml-2 text-black">{row.programa}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Teléfono Jefe:</span>
                    <span className="ml-2 text-black">{row.telefonoJefe}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Fecha inicio etapa práctica:</span>
                    <span className="ml-2 text-black">{row.fechaInicioPractica}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReassignTableView;
