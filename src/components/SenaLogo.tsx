

import React from 'react';
import LogoSena from '/public/logoSenaVerde.png';

/**
 * Componente SenaLogo
 * Muestra el logo institucional del SENA junto al título de la plataforma.
 *
 * Características:
 * - Presenta el logo SENA y el nombre 'AutoGestión CIES'.
 * - Utilizado en formularios y paneles principales.
 *
 * @returns {JSX.Element} Elemento visual del logo y título.
 */
const SenaLogo = () => {
  return (
    <div className="flex items-center gap-3 mb-8">
      {/* Logo SENA */}
      <div >
         <img src={LogoSena} alt="Carta" className="w-20 h-auto -ml-4" />

      </div>
      <div>
        <h1 className="text-2xl font-bold text-[#01AF01]">AutoGestión CIES</h1>
      </div>
    </div>
  );
};

export default SenaLogo;
