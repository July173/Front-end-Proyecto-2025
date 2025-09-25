import React from "react";

// Imágenes extraídas de Figma
const imgImage31 = "https://s3-alpha-sig.figma.com/img/bde7/571d/9e0feab99778a3e3017fe3efe25e681c?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dLhGfxQpeFi8yc0P4Yd0aNdPok4oehwk9G6iaga-Cpu-Viwjq-LwFoms9jh-YkLvvgC4jdphbbYFvcp7yriM7VWgUnUd0C3xcY-qYQcpvjIXtEY3rzt0LALFiHzUqjKfoSzu27wWV65WXtoupiIVOdxxpbzYOhWgxwxh5J3T8z7w20f~8uh7s~PFwF~RU3zO6NnGlHjGZGQIm3DOKq9KZaftDDUlwHPOyKss8eVLSI~kZqy1JfjpIllkZdbGA0n8jCDgJBJoo-1bxXMaScQeAe9MvHADxHmjmwXIv7uZMgSBJ97uaksrsJQBkD6qifdYKOZ4H8ZB3JdcoXxB3sVC4w__";
const imgImage29 = "https://s3-alpha-sig.figma.com/img/7f35/4ca1/855641084dcb17b6bed398079ede9772?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Eeztgz3mX8-xJYCz2MZZFj-XGGC4zspx7APZXsOgVerdd5NTEkSrY089ISzUHTBIo4XLEeuUN3ZWJeZsbHDP-IQXwCsex3nMekLZHhTqH79W3toKpR0bXExhIs50yMHXF-co1vnV3T3sXcCTZDcDBWh9QPQrFLeNqFe0Jw3E5s3a~bwktyT9o6tf5Hwe8Yg1JmMK2Qslg05dOxbL-zO1VRx0Ia9ZvTJg0oQdDZbFS9tKiPD62IkAQePnwpv3iSdPawRHDphKPwGUP4xXB9WuV6plyZJNNHoYeJTPvSIsvdGH5VPIe8o7bZ65ZCauraNx3JUI~AeCXRo23L8pkhe0rQ__";
const imgImage30 = "https://s3-alpha-sig.figma.com/img/8ec9/a731/b3c0a2a0e49e8b703cdd9bf3268c2cd1?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=n9GuPWpVnnc4uLRcqLYpJv3UbKgvc08EWm86otVLbM3x96tzHf2-wdXCEBHmmYIJR4FiXaRocgkKAu277RJ5nMm4zKQBNT3Hz4BPsJxSFhqk2PRAJeI3ztMc5zvJv9mNabKAMGWOzCJM0HOJrypYAbERIyicNeMJQk--l1jG4OE3O7g4rgJL8ZzPTg~5XQkhzwf3i6c6e6uBjWeCaE2KyueDOvSHiiUJc~N4P0APkPf31yFZibWbqjL4g~R1L2i1oZO0mp~BhG8FTWnJPsUtyAJ86bg7KN5hDZp2s1lNWjvGDRLFvmaArLGq5opPgWZI4lv4D1OqMk9QGWDVFZlvGw__";
const imgImage32 = "https://s3-alpha-sig.figma.com/img/02d2/a66d/70b15153ce01f7902c0c9e4eab6e70f2?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ia5OFAUhRL-M2CmgysNXPcPtSHOvZBWbSIEaYxE-R19J5AYJX2fyfKmwsgc3eSshZQrw6jiZOmePck51KlRTm6K~wPSSVi8ajm37NHg7SnzUGbc642mJjcpTIDNUD7ktOnZ9W7muwo8sMwURDveCcC4eZ4Rg~tE~DOqBOzo9hpBNzDpMbn~7Ge8x8aRynTQfJmG~h16jr~EYX1CsMBD1yY4tOKYoaZRoxZUpVTyLfcckM1lNENuLrc5dFtKRSSjI3ZRPMadHpRFU1cdHUoDo9F70Q48l2fjGgODxKprLoYO2aA0JcuGoLHQez0-B00t6-tbNtt7WTtDSRAG~aVc9PQ__";
const imgPerson = "https://figma-alpha-api.s3.us-west-2.amazonaws.com/mcp/get_code/assets/4d1ba11d-c4a1-42ec-951a-315ac1c7f4a7/figma%3Aasset/e48edc6bb82e5d52e5fb4cbcd27bb57748dde62d.svg";
const img = "https://figma-alpha-api.s3.us-west-2.amazonaws.com/mcp/get_code/assets/4d1ba11d-c4a1-42ec-951a-315ac1c7f4a7/figma%3Aasset/9773f549533c58fc968c70db0c581589cdca9243.svg";
const img1 = "https://figma-alpha-api.s3.us-west-2.amazonaws.com/mcp/get_code/assets/4d1ba11d-c4a1-42ec-951a-315ac1c7f4a7/figma%3Aasset/848dd0e0e65892590736c4208ef897fdc5ba2435.svg";
const img2 = "https://figma-alpha-api.s3.us-west-2.amazonaws.com/mcp/get_code/assets/4d1ba11d-c4a1-42ec-951a-315ac1c7f4a7/figma%3Aasset/3db3d7c8decc3dc603a3d5a1cb6f0568d64fd82e.svg";
const img3 = "https://figma-alpha-api.s3.us-west-2.amazonaws.com/mcp/get_code/assets/4d1ba11d-c4a1-42ec-951a-315ac1c7f4a7/figma%3Aasset/c92ff6fb4ef469ea8b3e9e7453f91ecba255b58b.svg";
const imgLine3 = "https://figma-alpha-api.s3.us-west-2.amazonaws.com/mcp/get_code/assets/4d1ba11d-c4a1-42ec-951a-315ac1c7f4a7/figma%3Aasset/4e8e35b02f2cb8f478548ba7b354de8694fb152b.svg";
const img4 = "https://figma-alpha-api.s3.us-west-2.amazonaws.com/mcp/get_code/assets/210fabb55f9c331df503d29607d20b22212e2c8e.svg";

interface ModalReasignarInstructorProps {
  onCancel?: () => void;
}

const ModalReasignarInstructor: React.FC<ModalReasignarInstructorProps> = ({ onCancel }) => {
  return (
  <div className="bg-white overflow-y-auto fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[10px] shadow-lg p-0 w-full max-w-5xl max-h-[90vh] z-50 border border-[#ffa577]">
      {/* Título y descripción */}
      <div className="border-b border-dashed border-[#ffa577] px-8 pt-6 pb-2">
        <h2 className="text-2xl font-extrabold text-black mb-1">Reasignar Instructor de seguimiento</h2>
        <p className="text-base text-gray-600">Selecciona un nuevo instructor para el seguimiento del aprendiz</p>
      </div>
      <div className="flex flex-row gap-4 px-8 py-6">
        {/* Columna izquierda: Información actual y motivo */}
        <div className="flex flex-col gap-4 w-1/2">
          <div className="border border-dashed border-[#ffa577] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-orange-700 mb-2 flex items-center gap-2">
              <span className="inline-block w-5 h-5 bg-[#ffd2a2] rounded-full flex items-center justify-center">
                <img src={img} alt="icono" className="w-3 h-3" />
              </span>
              Información actual
            </h3>
            <div className="text-sm text-gray-700 mb-1"><span className="font-semibold">Tipo:</span> Tarjeta de identidad</div>
            <div className="text-sm text-gray-700 mb-1"><span className="font-semibold">Aprendiz:</span> Daniela Polania Quintero</div>
            <div className="text-sm text-gray-700 mb-1"><span className="font-semibold">Identificación:</span> 10234564504</div>
            <div className="text-sm text-gray-700 mb-1"><span className="font-semibold">Ficha:</span> 2901817</div>
            <div className="text-sm text-gray-700 mb-1"><span className="font-semibold">Fecha de solicitud:</span> 10/05/2025</div>
            <div className="text-sm text-gray-700 mb-1"><span className="font-semibold">Fecha inicio de etapa práctica:</span> 10/05/2025</div>
            <div className="text-sm text-gray-700 mb-1"><span className="font-semibold">Instructor actual:</span> Carlos Bonilla</div>
            <div className="text-sm text-gray-700 mb-1"><span className="font-semibold">Programa:</span> Análisis y desarrollo de software</div>
          </div>
          <div className="border border-dashed border-[#ffa577] rounded-lg p-4">
            <label className="block text-orange-700 font-semibold mb-2">Motivo de Reasignación*</label>
            <textarea className="w-full rounded-lg border border-[#ffa577] p-2 text-sm" rows={4} placeholder="Escribe el motivo de la reasignación..." />
          </div>
        </div>
        {/* Columna derecha: Selección de instructor */}
        <div className="flex flex-col gap-4 w-1/2">
          <div className="border border-dashed border-[#ffa577] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-black mb-2">Seleccionar instructor</h3>
            <p className="text-sm text-gray-600 mb-4">Busca y selecciona un instructor disponible para el seguimiento</p>
            <select className="mb-4 px-3 py-2 border border-[#ffa577] rounded-lg text-sm">
              <option>Todos los programas</option>
            </select>
            <div className="flex flex-col gap-3 max-h-[265px] overflow-y-auto pr-2">
              {/* Ejemplo de instructor */}
              <div className="bg-white rounded-lg border border-[#e0e0e0] shadow p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={imgPerson} alt="Instructor" className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-semibold text-black">Paola Guerrero Mendoza</p>
                    <p className="text-sm text-gray-600">Desarrollo de software</p>
                    <p className="text-sm text-gray-600">paola_guerrero@sena.edu.co</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#7bcc7f] text-[#2a4c36]">8/80 Asignados</span>
              </div>
              <div className="bg-white rounded-lg border border-[#e0e0e0] shadow p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={imgPerson} alt="Instructor" className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-semibold text-black">Paola Guerrero Mendoza</p>
                    <p className="text-sm text-gray-600">Desarrollo de software</p>
                    <p className="text-sm text-gray-600">paola_guerrero@sena.edu.co</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#ffe9a2] text-[#af4209]">54/80 Asignados</span>
              </div>
              <div className="bg-white rounded-lg border border-[#e0e0e0] shadow p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={imgPerson} alt="Instructor" className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-semibold text-black">Paola Guerrero Mendoza</p>
                    <p className="text-sm text-gray-600">Desarrollo de software</p>
                    <p className="text-sm text-gray-600">paola_guerrero@sena.edu.co</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#ffe9a2] text-[#af4209]">54/80 Asignados</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Botones */}
      <div className="flex justify-end gap-4 px-8 pb-6">
        <button
          className="bg-gray-200 text-black px-6 py-2 rounded-lg font-medium border border-[#ababab]"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button className="bg-[#ffa577] text-white px-6 py-2 rounded-lg font-medium border border-[#ffa577]">Reasignar Instructor</button>
      </div>
    </div>
  );
};

export default ModalReasignarInstructor;
