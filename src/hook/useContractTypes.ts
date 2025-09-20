import { useState, useEffect } from 'react';
import { DocumentType, getContractTypesWithEmpty } from '../Api/Services/Enums';
import { tiposContrato } from '../constants/selectOptions';

/**
 * Hook personalizado para manejar los tipos de contrato
 * Prioriza obtener los datos del backend, pero usa constantes locales como fallback
 */
export const useContractTypes = () => {
  const [contractTypes, setContractTypes] = useState<DocumentType[]>(tiposContrato);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContractTypes = async () => {
      setLoading(true);
      setError(null);
      try {
        const types = await getContractTypesWithEmpty();
        setContractTypes(types);
      } catch (err) {
        console.warn('Error cargando tipos de contrato del backend, usando constantes locales:', err);
        setError('No se pudieron cargar los tipos desde el servidor');
        // Los tipos ya están inicializados con las constantes locales
      } finally {
        setLoading(false);
      }
    };
    loadContractTypes();
  }, []);

  return {
    contractTypes,
    loading,
    error
  };
};
