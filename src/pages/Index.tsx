/**
 * Componente Index
 * Pantalla principal de autenticación y bienvenida.
 *
 * Características:
 * - Muestra los formularios de login, registro y recuperación de contraseña según la vista actual.
 * - Cambia la vista usando el estado y la URL.
 * - Incluye el panel de bienvenida.
 *
 * @returns {JSX.Element} Vista principal de autenticación renderizada.
 */

import React, { useState, useEffect } from 'react';
import WelcomePanel from '../components/Login/WelcomePanel';
import LoginForm from '../components/Login/LoginForm';
import RegisterForm from '../components/Login/RegisterForm';
import ForgotPasswordForm from '../components/Login/ForgotPasswordForm';
import VerifyCodeForm from '../components/Login/VerifyCodeForm';
import ResetPasswordForm from '../components/Login/ResetPasswordForm';

const getViewFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('view') || 'login';
};

const Index = () => {
  const [currentView, setCurrentView] = useState(getViewFromUrl());

  useEffect(() => {
    const onPopState = () => {
      setCurrentView(getViewFromUrl());
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const renderForm = () => {
    switch (currentView) {
      case 'login':
        return <LoginForm onNavigate={setCurrentView} />;
      case 'register':
        return <RegisterForm onNavigate={setCurrentView} />;
      case 'forgot-password':
        return <ForgotPasswordForm onNavigate={setCurrentView} />;
      case 'verify-code':
        return <VerifyCodeForm onNavigate={setCurrentView} />;
      case 'reset-password':
        return <ResetPasswordForm onNavigate={setCurrentView} />;
      default:
        return <LoginForm onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="sena-container">
      {renderForm()}
      <WelcomePanel />
    </div>
  );
};

export default Index;