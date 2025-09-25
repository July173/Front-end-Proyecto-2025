
import React, { useState } from "react";
import AssignTableView from "../components/AssignTableView";
const imgImage20 = "https://s3-alpha-sig.figma.com/img/2712/cdb5/93cbedadaf4e066ac94723684d3273d2?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XI9qzOVUoW9bGbGpNsIbrP3y0F9EUFsXg35692raAHHqgCPkDhSX3nTLunekEirN0D9ezHvJ7C-BVVJod7nUdocs92q0RoZALnmJ3YhYdOKMdtEYNlrOIvkS5NLsIhuSMFoIN1aghU1H6~i6cjU7krdufeSIvziVybFpthxg6Lbdn06qlLQ60aSmcEDDa0eIg1XPq6dvEKIBzRE9q75FmHqueb006th1yuVEpcXG2b9UF3c43gtkdgrM7j0b8YtyR0VwHtSc9D2AA2hKJu~8JPjUM9Lsf5pQK-OrmT2fPtfz1xN8vuoC~SCzCrOet-6g1z~fF4ihDCbIqculQsfAiQ__";
const imgImage22 = "https://s3-alpha-sig.figma.com/img/142f/1139/0ec1ac7e295b075860d02dc99b69724f?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=W9F0qBupHx0LIFd41a~RsQqUWmv9TaaUUho7nkvZDxKKjXfmoMDXIJOhropM0PJtIa~TxzXDqMDDJb84B704T-o12bEHIYAnNJ47ITykdltFN2-a-j8Ih6CxcXDHbjH~Nzoz34jtqpxqf7YAn8h7Y9aoX3Adtb0CRNl7XN5s5pWR63Fzq96OIywr8txRO9Ta2jaLNjrL7efWxRJUXHtrE40BRb~2b~xvcqSMiy8Nsok0h2CpbGW40RXaXbuOpX4SWU1n4~yC2PZZQqIPa7KXdWEzlR2xqLY3xOlXYpWz90axN-DuLt2rcnD2x-7E4kEyAnuexJtqmMxhlca4AsXdzg__";
const imgVector = "https://figma-alpha-api.s3.us-west-2.amazonaws.com/mcp/get_code/assets/3e4747be-8822-47ca-a4d1-39acf4b6e53a/figma%3Aasset/c92ff6fb4ef469ea8b3e9e7453f91ecba255b58b.svg";

function ListaTodosLosEstados() {
  return (
    <div className="relative rounded-[10px] size-full" data-name="lista Todos los estados" data-node-id="409:3561">
      <div className="box-border content-stretch flex gap-[25px] items-center overflow-clip px-[23px] py-[10px] relative size-full">
        <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[18.9px] text-black w-[191px]" data-node-id="409:3553">
          <p className="leading-[normal] whitespace-pre-wrap">Todos los estados</p>
        </div>
        <div className="flex items-center justify-center relative shrink-0">
          <div className="flex-none rotate-[180deg]">
            <div className="h-[6.25px] opacity-[var(--opacity/100,1)] relative w-[12.5px]" data-name="Vector" data-node-id="409:3555">
              <div className="absolute inset-[-10%_-5%]">
                <img alt="" className="block max-w-none size-full" src={imgVector} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#757575] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function ListaEstados() {
  return (
    <button className="box-border content-stretch cursor-pointer flex flex-col gap-px items-center justify-center p-0 relative size-full" data-name="Property 1=Default" data-node-id="409:3615">
      <div className="relative rounded-[10px] shrink-0" data-name="lista Todos los estados" data-node-id="409:3564">
        <ListaTodosLosEstados />
      </div>
    </button>
  );
}

function ListaProgramas() {
  return (
    <button className="box-border content-stretch flex flex-col gap-px items-center justify-center p-0 relative size-full" data-name="Property 1=Default" data-node-id="409:3634">
      <div className="relative rounded-[10px] shrink-0 w-full" data-name="lista Todos los estados" data-node-id="409:3635">
        <div className="box-border content-stretch flex items-center justify-between overflow-clip px-[23px] py-[10px] relative w-full">
          <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[18.9px] text-black w-[191px]" data-node-id="I409:3635;409:3553">
            <p className="leading-[normal] whitespace-pre-wrap">Todos los programas</p>
          </div>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-[180deg]">
              <div className="h-[6.25px] opacity-[var(--opacity/100,1)] relative w-[12.5px]" data-name="Vector" data-node-id="I409:3635;409:3555">
                <div className="absolute inset-[-10%_-5%]">
                  <img alt="" className="block max-w-none size-full" src={imgVector} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#757575] border-solid inset-0 pointer-events-none rounded-[10px]" />
      </div>
    </button>
  );
}

export const Assign = () => {
  const [showTableView, setShowTableView] = useState(false);
  return (
    <div className="bg-white relative rounded-[10px] size-full" data-name="contenedor" data-node-id="408:4482">
      <div className="box-border content-stretch flex flex-col gap-[61px] items-end overflow-clip px-[17px] py-[27px] relative size-full">
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-[950px]" data-name="titulo y buscar" data-node-id="408:4483">
          <div className="capitalize flex flex-col font-[var(--font-family/font-1,'Roboto:SemiBold',_sans-serif)] font-[var(--font-weight/600,600)] h-[26px] justify-center leading-[0] relative shrink-0 text-[#263238] text-[24px] w-[286px]" data-node-id="408:4484" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[var(--line-height/26,26px)] whitespace-pre-wrap">Asignar seguimiento</p>
          </div>
          <div className="bg-white h-[30px] relative rounded-[4px] shrink-0 w-[229px]" data-name="buscar" data-node-id="408:4485">
            <div className="h-[30px] overflow-clip relative w-[229px]">
              <div className="absolute flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] left-[9px] text-[16px] text-white top-[15px] translate-y-[-50%] whitespace-nowrap" data-node-id="408:4486" style={{ fontVariationSettings: "'wdth' 100" }}>
                <p className="leading-[32px]">Buscar...</p>
              </div>
              <div className="absolute flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] left-[40px] text-[#ababab] text-[16px] top-[15px] translate-y-[-50%] whitespace-nowrap" data-node-id="408:4487" style={{ fontVariationSettings: "'wdth' 100" }}>
                <p className="leading-[32px]">Buscar...</p>
              </div>
              <div className="absolute left-[11px] size-[20px] top-[4px]" data-name="image 20" data-node-id="408:4488">
                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage20} />
              </div>
            </div>
            <div aria-hidden="true" className="absolute border border-[#c5c5c5] border-solid inset-0 pointer-events-none rounded-[4px]" />
          </div>
        </div>
        <div className="content-stretch cursor-pointer flex gap-[10px] h-[36px] items-center relative shrink-0 w-[965px]" data-node-id="478:4017">
          <button className="box-border content-stretch flex flex-col gap-px items-center justify-center overflow-visible p-0 relative shrink-0 w-[288px]" data-name="Lista programas" data-node-id="478:4019">
            <ListaProgramas />
          </button>
          <button className="box-border content-stretch flex flex-col gap-px items-center justify-center overflow-visible p-0 relative shrink-0 w-[288px]" data-name="Lista estados" data-node-id="823:8435">
            <ListaEstados />
          </button>
        </div>
        {/* Solo la tabla cambia */}
        <div className="h-[115px] relative rounded-[5px] shrink-0 w-[960px]" data-node-id="408:2816">
          {showTableView ? (
            <AssignTableView />
          ) : (
            <div className="h-[115px] overflow-clip relative w-[960px]">
              <div className="absolute bg-gray-100 h-[53px] left-0 top-px w-[960px]" data-node-id="408:2817">
                <div className="font-['Roboto:Regular',_sans-serif] font-normal h-[53px] leading-[0] overflow-clip relative text-[#686868] text-[14px] w-[960px]">
                  <div className="absolute flex flex-col justify-center left-[71px] top-[27px] translate-y-[-50%] whitespace-nowrap" data-node-id="408:2818" style={{ fontVariationSettings: "'wdth' 100" }}>
                    <p className="leading-[32px]">Nombre</p>
                  </div>
                  <div className="absolute flex flex-col justify-center left-[42px] top-[28px] translate-y-[-50%] whitespace-nowrap" data-node-id="408:2819" style={{ fontVariationSettings: "'wdth' 100" }}>
                    <p className="leading-[32px]">#</p>
                  </div>
                  <div className="absolute flex flex-col justify-center left-[442px] top-[28px] translate-y-[-50%] whitespace-nowrap" data-node-id="408:2820" style={{ fontVariationSettings: "'wdth' 100" }}>
                    <p className="leading-[32px]">Número de identificación</p>
                  </div>
                  <div className="absolute flex flex-col justify-center left-[658px] top-[28px] translate-y-[-50%] whitespace-nowrap" data-node-id="408:2821" style={{ fontVariationSettings: "'wdth' 100" }}>
                    <p className="leading-[32px]">Fecha Solicitud</p>
                  </div>
                  <div className="absolute flex flex-col justify-center left-[833px] top-[28px] translate-y-[-50%] whitespace-nowrap" data-node-id="408:2822" style={{ fontVariationSettings: "'wdth' 100" }}>
                    <p className="leading-[32px]">Acciones</p>
                  </div>
                  <div className="absolute flex flex-col justify-center left-[269px] top-[28.5px] translate-y-[-50%] w-[162px]" data-node-id="408:2823" style={{ fontVariationSettings: "'wdth' 100" }}>
                    <p className="leading-[var(--line-height/21,21px)] whitespace-pre-wrap">Tipo de identificación</p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-b border-gray-200 border-l-0 border-r-0 border-solid border-t-0 inset-0 pointer-events-none" />
              </div>
              <div className="absolute bg-white h-[61px] left-0 overflow-clip top-[54px] w-[960px]" data-node-id="408:2824">
                <a
                  className="absolute cursor-pointer flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] left-[365px] text-[14px] text-black top-[31px] translate-y-[-50%] whitespace-nowrap"
                  data-node-id="358:1678"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                  onClick={() => setShowTableView(true)}
                >
                  <p className="leading-[32px]"> No hay datos disponibles en la tabla </p>
                </a>
              </div>
            </div>
          )}
          <div aria-hidden="true" className="absolute border border-[rgba(199,199,199,0.7)] border-solid inset-0 pointer-events-none rounded-[5px]" />
        </div>
        {/* Fin solo la tabla cambia */}
        <div className="content-stretch flex gap-[15px] items-center justify-end relative shrink-0 w-[950px]" data-name="botones" data-node-id="408:4493">
          <div className="relative rounded-[5px] shrink-0 w-[78px]" data-node-id="408:4494">
            <div className="box-border content-stretch flex gap-[3px] items-center overflow-clip px-[7px] py-0 relative w-[78px]">
              <div className="relative shrink-0 size-[10px]" data-name="image 22" data-node-id="408:4495">
                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage22} />
              </div>
              <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#686868] text-[12px] whitespace-nowrap" data-node-id="408:4496" style={{ fontVariationSettings: "'wdth' 100" }}>
                <p className="leading-[32px]">Anterior</p>
              </div>
            </div>
            <div aria-hidden="true" className="absolute border border-[#a19b9b] border-solid inset-0 pointer-events-none rounded-[5px]" />
          </div>
          <div className="relative rounded-[5px] shrink-0" data-node-id="408:4497">
            <div className="box-border content-stretch flex gap-[2px] items-center overflow-clip px-[8px] py-0 relative">
              <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#686868] text-[12px] whitespace-nowrap" data-node-id="408:4498" style={{ fontVariationSettings: "'wdth' 100" }}>
                <p className="leading-[32px]">Siguiente</p>
              </div>
              <div className="flex items-center justify-center relative shrink-0">
                <div className="flex-none rotate-[180deg]">
                  <div className="relative size-[10px]" data-name="image 22" data-node-id="408:4499">
                    <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage22} />
                  </div>
                </div>
              </div>
            </div>
            <div aria-hidden="true" className="absolute border border-[#a19b9b] border-solid inset-0 pointer-events-none rounded-[5px]" />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(229,227,227,0.9)] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}
