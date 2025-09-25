import React from "react";

const img = "https://figma-alpha-api.s3.us-west-2.amazonaws.com/mcp/get_code/assets/e8c8e637-91e5-43a8-8032-fa58e83adf96/figma%3Aasset/9ea55d6af497549059fe7b32b4da49054ca582ea.svg";

function Formulario() {
  return (
    <div className="relative rounded-[5px] size-full" data-name="formulario" data-node-id="418:4492">
      <div className="content-stretch flex flex-col items-start overflow-clip relative size-full">
        <div className="bg-gray-100 relative shrink-0 w-full" data-node-id="418:4484">
          <div className="box-border content-stretch flex font-['Roboto:Regular',_sans-serif] font-normal gap-[20px] items-end leading-[0] overflow-clip px-[42px] py-[9px] relative text-[#686868] text-[14px] w-full">
            <div className="flex flex-col justify-center relative shrink-0 w-[30px]" data-node-id="418:4485" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[32px] whitespace-pre-wrap">#</p>
            </div>
            <div className="flex flex-col justify-center relative shrink-0 w-[134px]" data-node-id="418:4486" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[32px] whitespace-pre-wrap">Nombre</p>
            </div>
            <div className="flex flex-col justify-center relative shrink-0 w-[162px]" data-node-id="418:4487" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[var(--line-height/21,21px)] whitespace-pre-wrap">Tipo de identificación</p>
            </div>
            <div className="flex flex-col justify-center relative shrink-0 w-[162px]" data-node-id="418:4488" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[32px] whitespace-pre-wrap">Número de identificación</p>
            </div>
            <div className="flex flex-col justify-center relative shrink-0 w-[162px]" data-node-id="418:4489" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[32px] whitespace-pre-wrap">Fecha Solicitud</p>
            </div>
            <div className="flex flex-col justify-center relative shrink-0 w-[162px]" data-node-id="418:4490" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[32px] whitespace-pre-wrap">Estados</p>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-b border-gray-200 border-l-0 border-r-0 border-solid border-t-0 inset-0 pointer-events-none" />
        </div>
        {/* Aquí van las tarjetas, puedes mapear datos si lo deseas */}
        {/* ...tarjetas... */}
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(199,199,199,0.7)] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

export default function AssignTableView() {
  return (
    <div className="relative rounded-[5px] size-full" data-name="formulario" data-node-id="418:4687">
      <Formulario />
    </div>
  );
}
