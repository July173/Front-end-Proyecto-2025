import { ENDPOINTS } from "../config/ConfigApi";

// Interfaz para los tipos de documento devueltos por el backend
export interface DocumentType {
  value: string;
  label: string;
}

/**
 * Obtiene todos los tipos de documento disponibles desde el backend
 * @returns Promise<DocumentType[]> - Lista de tipos de documento
 */
export async function getDocumentTypes(): Promise<DocumentType[]> {
  const response = await fetch(ENDPOINTS.enums.getDocumentTypes, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  if (!response.ok) {
    throw new Error("Error al obtener los tipos de documento");
  }
  
  return response.json();
}

/**
 * Obtiene los tipos de documento con una opción vacía por defecto para selects
 * @returns Promise<DocumentType[]> - Lista de tipos de documento con opción vacía
 */
export async function getDocumentTypesWithEmpty(): Promise<DocumentType[]> {
  try {
    const documentTypes = await getDocumentTypes();
    return [
      { value: '', label: 'Seleccione tipo de documento' },
      ...documentTypes
    ];
  } catch (error) {
    console.error('Error obteniendo tipos de documento:', error);
    // En caso de error, devolver las constantes locales como fallback
    return [
      { value: '', label: 'Seleccione tipo de documento' },
      { value: 'CC', label: 'Cédula de Ciudadanía' },
      { value: 'TI', label: 'Tarjeta de Identidad' },
      { value: 'CE', label: 'Cédula de Extranjería' },
      { value: 'PASSPORT', label: 'Pasaporte' },
      { value: 'NUMERO_CIEGO_SENA', label: 'Número ciego - SENA' },
      { value: 'DNI', label: 'Documento Nacional de Identificación' },
      { value: 'NIT', label: 'Número de Identificación Tributaria' },
      { value: 'PERMISO_TEMPORAL', label: 'Permiso por Protección Temporal' },
    ];
  }
}

/**
 * Obtiene todos los tipos de documento disponibles desde el backend
 * @returns Promise<DocumentType[]> - Lista de tipos de documento
 */
export async function getContractTypes(): Promise<DocumentType[]> {
  const response = await fetch(ENDPOINTS.enums.getContractTypes, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  if (!response.ok) {
    throw new Error("Error al obtener los tipos de contrato");
  }
  
  return response.json();
}

/**
 * Obtiene los tipos de documento con una opción vacía por defecto para selects
 * @returns Promise<DocumentType[]> - Lista de tipos de documento con opción vacía
 */
export async function getContractTypesWithEmpty(): Promise<DocumentType[]> {
  try {
    const documentTypes = await getContractTypes();
    return [
      { value: '', label: 'Seleccione tipo de documento' },
      ...documentTypes
    ];
  } catch (error) {
    console.error('Error obteniendo tipos de documento:', error);
    // En caso de error, devolver las constantes locales como fallback
    return [
      { value: '', label: 'Seleccione tipo de contrato' },
      { value: 'PLANTA', label: 'Planta' },
      { value: 'CONTRATO', label: 'Contrato' },
      { value: 'OPS', label: 'OPS' },
      { value: 'PROVISIONAL', label: 'Provisional' },
      { value: 'TEMPORAL', label: 'Temporal' },
      { value: 'PRESTACION_SERVICIOS', label: 'Prestación de Servicios' }
    ];
  }
}