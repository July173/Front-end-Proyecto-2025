import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ValidationCodeSecurity: React.FC = () => {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para verificar el código
    console.log('Verification code:', code);
  };

  return (
    <div className="min-h-screen flex">
      {/* Panel izquierdo */}
      <div className="w-1/2 bg-white flex flex-col justify-center px-12 py-8">
        {/* Back Button */}
        <Link to="/restore-password" className="flex items-center text-gray-600 hover:text-gray-800 mb-8">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </Link>

        {/* Header */}
        <div className="flex items-center mb-12">
          <img 
            src="/sena-logo.png" 
            alt="SENA" 
            className="w-12 h-12 mr-3"
          />
          <h1 className="text-xl font-bold text-green-600">AutoGestión CIES</h1>
        </div>

        {/* Formulario */}
        <div className="max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Código de verificación</h2>
          <p className="text-gray-600 mb-8">
            Ingresa tu código de recuperación que se te envío al correo electrónico{' '}
            <span className="font-semibold">ejemplo@soy.sena.edu.co</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Code */}
            <div>
              <div className="relative">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Código de recuperación"
                  className="w-full px-12 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-center tracking-widest text-lg"
                  maxLength={6}
                  required
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition duration-200"
            >
              Verificar Código
            </button>
          </form>

          {/* Footer Links */}
          <div className="flex justify-center space-x-6 mt-12 text-sm text-gray-400">
            <a href="#" className="hover:text-gray-600">Soporte</a>
            <a href="#" className="hover:text-gray-600">Términos de Uso</a>
            <a href="#" className="hover:text-gray-600">Política de Privacidad</a>
          </div>
        </div>
      </div>

      {/* Panel derecho */}
      <div className="w-1/2 bg-gradient-to-br from-green-500 to-green-700 flex flex-col justify-center items-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="text-center z-10">
          <h2 className="text-4xl font-bold mb-4">Bienvenido a AutoGestión CIES</h2>
          <p className="text-xl opacity-90">Tu plataforma de gestión educativa</p>
        </div>
      </div>
    </div>
  );
};

export default ValidationCodeSecurity;