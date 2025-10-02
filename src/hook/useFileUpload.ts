import { useState } from "react";

export function useFileUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [notification, setNotification] = useState<{
    isOpen: boolean;
    type: 'info' | 'warning' | 'success' | 'password-changed' | 'email-sent' | 'pending' | 'completed';
    title: string;
    message: string;
    key?: number;
  }>({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    key: 0
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setNotification({
          isOpen: true,
          type: 'warning',
          title: 'Archivo inválido',
          message: 'Solo se permiten archivos PDF.'
        });
        return;
      }
      const maxSizeInBytes = 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        setNotification({
          isOpen: true,
          type: 'warning',
          title: 'Archivo demasiado grande',
          message: 'El archivo no puede ser mayor a 1MB.'
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('pdf-upload')?.click();
  };

  return { selectedFile, setSelectedFile, notification, setNotification, handleFileSelect, triggerFileInput };
}
