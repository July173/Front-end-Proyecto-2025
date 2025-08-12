import React from "react";
import { EmailRegistroPendiente, EmailRecuperacionContrasena, EmailCuentaActivada, EmailCuentaDesactivada} from "./Emails";


interface EmailsViewProps {
  onNavigate: (view: string) => void;
}

const EmailsView: React.FC<EmailsViewProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <button
        onClick={() => onNavigate("login")}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
      >
        Volver al login
      </button>
      <EmailRegistroPendiente />
      <EmailRecuperacionContrasena />
      <EmailCuentaActivada />
      <EmailCuentaDesactivada />
    </div>
  );
};

export default EmailsView;
