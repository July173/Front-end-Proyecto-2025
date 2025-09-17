import { useState, useEffect } from 'react';
import { DocumentType, getDocumentTypesWithEmpty } from '../Api/Services/Enums';
import { tiposDocumento } from '../constants/selectOptions';

/**
 * Hook personalizado para manejar los tipos de documento
 * Prioriza obtener los datos del backend, pero usa constantes locales como fallback
 */
export const useDocumentTypes = () => {
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>(tiposDocumento);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDocumentTypes = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const types = await getDocumentTypesWithEmpty();
        setDocumentTypes(types);
      } catch (err) {
        console.warn('Error cargando tipos de documento del backend, usando constantes locales:', err);
        setError('No se pudieron cargar los tipos desde el servidor');
        // Los tipos ya están inicializados con las constantes locales
      } finally {
        setLoading(false);
      }
    };

    loadDocumentTypes();
  }, []);

  return {
    documentTypes,
    loading,
    error
  };
};