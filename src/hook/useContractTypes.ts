import { useState, useEffect } from 'react';
import { DocumentType, getContractTypesWithEmpty } from '../Api/Services/Enums';

/**
 * Hook optimizado para manejar los tipos de contrato
 * Solo usa la función del backend, el fallback se gestiona en Enums.ts
 */
export const useContractTypes = () => {
  const [contractTypes, setContractTypes] = useState<DocumentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getContractTypesWithEmpty()
      .then(setContractTypes)
      .catch(() => setError('No se pudieron cargar los tipos desde el servidor'))
      .finally(() => setLoading(false));
  }, []);

  return {
    contractTypes,
    loading,
    error
  };
};
