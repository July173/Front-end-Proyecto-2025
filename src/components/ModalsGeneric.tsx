
import React from 'react';
import ModalFormGeneric from './ModalFormGeneric';
import ConfirmModal from './ConfirmModal';

export interface FieldConfig {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string | number; label: string }>;
  customSelect?: boolean;
}

export interface ModalFormProps<T = Record<string, unknown>> {
  isOpen: boolean;
  title: string;
  fields: FieldConfig[];
  onClose: () => void;
  onSubmit: (values: T) => void;
  submitText: string;
  cancelText: string;
  initialValues?: T;
  customRender?: React.ReactNode;
  onProgramChange?: (value: string | number) => void;
}

export interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ModalForm<T = Record<string, unknown>>(props: ModalFormProps<T>) {
  return <ModalFormGeneric {...props} />;
}

export const ModalConfirm: React.FC<ConfirmModalProps> = (props) => (
  <ConfirmModal {...props} />
);

// Ejemplo de uso:
// <ModalForm<Ficha> {...modalFormProps} />
// <ModalConfirm {...confirmModalProps} />
