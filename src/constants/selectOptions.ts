// Tipos de documento sincronizados con el enum DocumentType del backend
// Los valores deben coincidir exactamente con: apps/security/entity/enums/document_type_enum.py
export const typesDocument = [
  { value: "", label: "Tipo de documento" },
  { value: "CC", label: "Cédula de Ciudadanía" },
  { value: "TI", label: "Tarjeta de Identidad" },
  { value: "CE", label: "Cédula de Extranjería" },
  { value: "PASSPORT", label: "Pasaporte" },
  { value: "NUMERO_CIEGO_SENA", label: "Número ciego - SENA" },
  { value: "DNI", label: "Documento Nacional de Identificación" },
  { value: "NIT", label: "Número de Identificación Tributaria" },
  { value: "PERMISO_TEMPORAL", label: "Permiso por Protección Temporal" },
];

// Tipos de contrato sincronizados con el enum ContractType del backend
// Los valores deben coincidir exactamente con: apps/security/entity/enums/contract_type_enum.py
export const typesContract = [
  { value: "", label: "Seleccione tipo de contrato" },
  { value: "PLANTA", label: "Planta" },
  { value: "CONTRATO", label: "Contrato" },
  { value: "OPS", label: "OPS" },
  { value: "PROVISIONAL", label: "Provisional" },
  { value: "TEMPORAL", label: "Temporal" },
  { value: "PRESTACION_SERVICIOS", label: "Prestación de Servicios" },
];
