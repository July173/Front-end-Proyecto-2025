// Tipos de documento sincronizados con el enum DocumentType del backend
// Los valores deben coincidir exactamente con: apps/security/entity/enums/document_type_enum.py
export const tiposDocumento = [
  { value: '', label: 'Tipo de documento' },
  { value: 'CC', label: 'Cédula de Ciudadanía' },
  { value: 'TI', label: 'Tarjeta de Identidad' },
  { value: 'CE', label: 'Cédula de Extranjería' },
  { value: 'PASSPORT', label: 'Pasaporte' },
  { value: 'NUMERO_CIEGO_SENA', label: 'Número ciego - SENA' },
  { value: 'DNI', label: 'Documento Nacional de Identificación' },
  { value: 'NIT', label: 'Número de Identificación Tributaria' },
  { value: 'PERMISO_TEMPORAL', label: 'Permiso por Protección Temporal' },
];