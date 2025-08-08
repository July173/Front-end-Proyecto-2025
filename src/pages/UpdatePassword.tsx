import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UpdatePassword: React.FC = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    // Lógica para actualizar contraseña
    console.log('Update password:', formData);
  };

  return (
    <div className="min-h-screen flex">
      {/* Panel izquierdo */}
      <div className="w-1/2 bg-white flex flex-col justify-center px-12 py-8">
        {/* Back Button */}
        <Link to="/validation-code" className="flex items-center text-gray-600 hover:text-gray-800 mb-8">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a inicio de sesión
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
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Actualizar Contraseña</h2>
          <p className="text-gray-600 mb-8">
            Ingresa tu nueva contraseña
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nueva Contraseña */}
            <div>
              <div className="relative">
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder="Nueva contraseña"
                  className="w-full px-12 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                  minLength={8}
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            {/* Confirmar Contraseña */}
            <div>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirmar nueva contraseña"
                  className="w-full px-12 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                  minLength={8}
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
              Actualizar contraseña
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

export default UpdatePassword;