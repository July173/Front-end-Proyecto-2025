
import React from 'react';

const SenaLogo = () => {
  return (
    <div className="flex items-center gap-3 mb-8">
      {/* Logo SENA */}
      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
        <div className="relative">
          <div className="w-8 h-8 border-3 border-white rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-white transform rotate-45"></div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-green-600">AutoGestión CIES</h1>
      </div>
    </div>
  );
};

export default SenaLogo;
