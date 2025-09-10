

import React from 'react';
import LogoSena from '/public/logoSenaVerde.png';

const SenaLogo = () => {
  return (
    <div className="flex items-center gap-3 mb-8">
      {/* Logo SENA */}
      <div >
         <img src={LogoSena} alt="Carta" className="w-20 h-auto -ml-4" />

      </div>
      <div>
        <h1 className="text-2xl font-bold text-[#43A047]">AutoGestión CIES</h1>
      </div>
    </div>
  );
};

export default SenaLogo;
