import React, { useState, useEffect } from 'react';
import WelcomePanel from '../components/WelcomePanel';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import VerifyCodeForm from '../components/VerifyCodeForm';
import ResetPasswordForm from '../components/ResetPasswordForm';
// ✅ Home ya no se importa aquí

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