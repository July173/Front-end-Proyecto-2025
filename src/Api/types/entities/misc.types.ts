/**
 * Tipos e interfaces misceláneos y utilitarios.
 * Incluye props de componentes y estructuras auxiliares.
 */
/**
 * Tipos e interfaces misceláneos y utilitarios.
 * Incluye props de componentes y estructuras auxiliares.
 */
export interface InfoCardProps {
  title: string;
  statusLabel: string;
  statusColor: 'green' | 'red';
  description: string;
  count: number;
  buttonText: string;
  onButtonClick?: () => void;
  actionLabel?: string;
  actionType?: 'enable' | 'disable';
  onActionClick?: () => void;
}

export interface UsuarioRegistrado {
  id: string;
  email: string;
  estado: string;
  role: number;
  registered?: boolean;
  person: {
    id: string;
    first_name: string;
    second_name?: string;
    first_last_name: string;
    second_last_name?: string;
    phone_number: string;
    type_identification: string;
    number_identification: string;
    image?: string;
  };
}

export interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}


