
import React, { useState } from 'react';
import WelcomePanel from '../components/WelcomePanel';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import VerifyCodeForm from '../components/VerifyCodeForm';
import ResetPasswordForm from '../components/ResetPasswordForm';
import EmailsView from '@/components/EmailsView';
import InicioAprendiz from './Home';

const Index = () => {
  const [currentView, setCurrentView] = useState('login');

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
      case 'Emails':
        return <EmailsView onNavigate={setCurrentView} />;
      case 'inicioAprendiz':
        return <InicioAprendiz />;
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
