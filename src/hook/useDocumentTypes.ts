import { useState, useEffect } from 'react';
import { DocumentType, getDocumentTypesWithEmpty } from '../Api/Services/TypeDocument';

/**
 * Hook optimizado para manejar los tipos de documento
 * Solo usa la función del backend, el fallback se gestiona en Enums.ts
 */
export const useDocumentTypes = () => {
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getDocumentTypesWithEmpty()
      .then(setDocumentTypes)
      .catch(() => setError('No se pudieron cargar los tipos desde el servidor'))
      .finally(() => setLoading(false));
  }, []);

  return {
    documentTypes,
    loading,
    error
  };
};