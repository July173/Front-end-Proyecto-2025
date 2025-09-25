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
const img4 = "https://figma-alpha-api.s3.us-west-2.amazonaws.com/mcp/get_code/assets/4d1ba11d-c4a1-42ec-951a-315ac1c7f4a7/figma%3Aasset/210fabb55f9c331df503d29607d20b22212e2c8e.svg";

// ...aquí va el componente ModalAsignarInstructor basado en el diseño Figma extraído
// Puedes copiar la estructura del ModalReasignar y adaptarla para "Asignar"

const ModalAsignarInstructor: React.FC = () => {
  return (
    <div className="bg-white overflow-clip relative rounded-[10px] shadow-lg p-8 w-full max-w-4xl mx-auto">
      {/* Título y descripción */}
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-black">Asignar Instructor de seguimiento</h2>
        <p className="text-lg text-gray-600 mt-2">Selecciona un instructor para el seguimiento del aprendiz</p>
      </div>
      {/* Información actual del aprendiz */}
      <div className="bg-orange-100 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-orange-700 mb-2">Información actual</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <img src={imgImage31} alt="Tipo" className="w-6 h-6 mr-2" />
            <span className="text-gray-700">Tipo: Tarjeta de identidad</span>
          </div>
          <div className="flex items-center">
            <img src={imgImage29} alt="Aprendiz" className="w-6 h-6 mr-2" />
            <span className="text-gray-700">Aprendiz: Daniela Polania Quintero</span>
          </div>
          <div className="flex items-center">
            <img src={imgImage29} alt="Identificación" className="w-6 h-6 mr-2" />
            <span className="text-gray-700">Identificación: 10234564504</span>
          </div>
          <div className="flex items-center">
            <img src={imgImage30} alt="Ficha" className="w-6 h-6 mr-2" />
            <span className="text-gray-700">Ficha: 2901817</span>
          </div>
          <div className="flex items-center">
            <img src={imgImage32} alt="Fecha solicitud" className="w-6 h-6 mr-2" />
            <span className="text-gray-700">Fecha de solicitud: 10/05/2025</span>
          </div>
          <div className="flex items-center">
            <img src={imgImage32} alt="Fecha inicio" className="w-6 h-6 mr-2" />
            <span className="text-gray-700">Fecha inicio de etapa práctica: 10/05/2025</span>
          </div>
        </div>
      </div>
      {/* Motivo de asignación */}
      <div className="mb-6">
        <label className="block text-orange-700 font-semibold mb-2">Motivo de Asignación*</label>
        <textarea className="w-full rounded-lg border-2 border-orange-300 p-2" rows={4} placeholder="Escribe el motivo de la asignación..." />
      </div>
      {/* Selección de instructor */}
      <div className="bg-gray-100 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-black mb-2">Seleccionar instructor</h3>
        <p className="text-sm text-gray-600 mb-4">Busca y selecciona un instructor disponible para el seguimiento</p>
        {/* Aquí iría la lista de instructores, puedes mapear instructores disponibles */}
        <div className="grid grid-cols-2 gap-4">
          {/* Ejemplo de instructor */}
          <div className="bg-white rounded-lg shadow p-4 flex items-center">
            <img src={imgPerson} alt="Instructor" className="w-12 h-12 rounded-full mr-4" />
            <div>
              <p className="font-semibold text-black">Paola Guerrero Mendoza</p>
              <p className="text-sm text-gray-600">Desarrollo de software</p>
              <p className="text-sm text-gray-600">paola_guerrero@sena.edu.co</p>
            </div>
          </div>
          {/* ...más instructores */}
        </div>
      </div>
      {/* Botones */}
      <div className="flex justify-end gap-4 mt-8">
        <button className="bg-gray-200 text-black px-6 py-2 rounded-lg font-medium">Cancelar</button>
        <button className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium">Asignar Instructor</button>
      </div>
    </div>
  );
};

export default ModalAsignarInstructor;
