import { useState, useEffect } from 'react';
import { getContractTypesWithEmpty } from '../Api/Services/TypeDocument';

/**
 * Hook optimizado para manejar los tipos de contrato
 */
export const useContractTypes = () => {
  const [contractTypes, setContractTypes] = useState<Array<{ id: number | ""; name: string }>>([]);
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
