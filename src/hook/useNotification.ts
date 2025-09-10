import { useState } from 'react';

export type NotificationType = 'success' | 'info' | 'warning' | 'password-changed' | 'email-sent' | 'pending' | 'completed';

interface NotificationState {
  isOpen: boolean;
  type: NotificationType;
  title: string;
  message: string;
}

const useNotification = () => {
  const [notification, setNotification] = useState<NotificationState>({
    isOpen: false,
    type: 'success',
    title: '',
    message: ''
  });

  const showNotification = (type: NotificationType, title: string, message: string) => {
    setNotification({
      isOpen: true,
      type,
      title,
      message
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isOpen: false }));
  };

  // Funciones específicas para cada tipo de notificación
  const showPasswordChanged = () => {
    showNotification(
      'password-changed',
      'Contraseña cambiada',
      'Se ha restablecido con éxito tu contraseña.'
    );
  };

  const showEmailSent = () => {
    showNotification(
      'email-sent',
      'Correo enviado con éxito',
      'Por favor revisa tu correo electrónico, te hemos enviado un código de seguridad para el cambio de tu contraseña.'
    );
  };

  const showRegistrationPending = () => {
    showNotification(
      'pending',
      'Pendiente de revisión',
      'Proceso pendiente de revisión, por favor espera, se te notificará cuando se complete el proceso.'
    );
  };

  const showRegistrationSuccess = () => {
    showNotification(
      'success',
      'Registro exitoso',
      'Se ha llevado acabo con éxito tu solicitud de registro de datos personales para el ingreso a la plataforma.'
    );
  };

  const showActionCompleted = () => {
    showNotification(
      'completed',
      'Acción completada',
      'Se ha llevado acabo con éxito tu solicitud.'
    );
  };

  return {
    notification,
    showNotification,
    hideNotification,
    showPasswordChanged,
    showEmailSent,
    showRegistrationPending,
    showRegistrationSuccess,
    showActionCompleted
  };
};

export default useNotification;
