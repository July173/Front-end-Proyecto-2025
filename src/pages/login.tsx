import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de login aquí
    console.log('Login:', { email, password });
  };

  return (
    <div className="min-h-screen flex">
      {/* Panel izquierdo */}
      <div className="w-1/2 bg-white flex flex-col justify-center px-12 py-8">
        {/* Header */}
        <div className="flex items-center mb-12">
          <img 
            src="/sena-logo.png" 
            alt="SENA" 
            className="w-16 h-16 mr-4"
          />
          <h1 className="text-2xl font-bold text-green-600">AutoGestión CIES</h1>
        </div>

        {/* Formulario */}
        <div className="max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Iniciar Sesión</h2>
          <p className="text-gray-600 mb-8">
            Ingresa tus credenciales para acceder a tu cuenta.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@soy.sena.edu.co"
                  className="w-full px-12 py-4 bg-blue-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••••"
                  className="w-full px-12 py-4 bg-blue-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-center">
              <Link 
                to="/restore-password" 
                className="text-green-600 hover:text-green-700 text-sm font-medium"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition duration-200"
            >
              Iniciar Sesión
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center mt-6">
            <span className="text-gray-600">¿No tienes una cuenta? </span>
            <Link 
              to="/register" 
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Regístrate aquí
            </Link>
          </div>

          {/* Footer Links */}
          <div className="flex justify-center space-x-6 mt-8 text-sm text-gray-400">
            <a href="#" className="hover:text-gray-600">Soporte</a>
            <a href="#" className="hover:text-gray-600">Términos de Uso</a>
            <a href="#" className="hover:text-gray-600">Política de Privacidad</a>
          </div>
        </div>
      </div>

      {/* Panel derecho */}
      <div className="w-1/2 bg-gradient-to-br from-green-500 to-green-700 flex flex-col justify-center items-center text-white relative overflow-hidden">
        {/* Patrón de fondo */}
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

export default Login;