import React from 'react';
import { CheckCircle2, Mail, AlertCircle, Lock, X } from 'lucide-react';
import { Button } from './ui/button';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'info' | 'warning' | 'password-changed' | 'email-sent' | 'pending' | 'completed';
  title: string;
  message: string;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  type,
  title,
  message
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
      case 'completed':
        return <CheckCircle2 className="w-12 h-12 text-green-500" />;
      case 'password-changed':
        return <Lock className="w-12 h-12 text-green-500" />;
      case 'email-sent':
      case 'info':
        return <Mail className="w-12 h-12 text-green-500" />;
      case 'pending':
      case 'warning':
        return <AlertCircle className="w-12 h-12 text-yellow-500" />;
      default:
        return <CheckCircle2 className="w-12 h-12 text-green-500" />;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
      case 'completed':
      case 'password-changed':
      case 'email-sent':
      case 'info':
        return 'border-green-400';
      case 'pending':
      case 'warning':
        return 'border-yellow-400';
      default:
        return 'border-green-400';
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
      case 'completed':
      case 'password-changed':
      case 'email-sent':
      case 'info':
        return 'bg-green-50';
      case 'pending':
      case 'warning':
        return 'bg-yellow-50';
      default:
        return 'bg-green-50';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`
        relative max-w-md w-full mx-4 p-8 rounded-lg shadow-lg border-2 
        ${getBorderColor()} ${getBackgroundColor()}
      `}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            {getIcon()}
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800">
            {title}
          </h2>

          {/* Message */}
          <p className="text-gray-600 leading-relaxed">
            {message}
          </p>

          {/* Accept button */}
          <Button 
            onClick={onClose}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-md font-medium"
          >
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
