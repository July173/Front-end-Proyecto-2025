/**
 * Tipos e interfaces para la entidad Instructor.
 * Incluye estructura y datos de registro de instructores.
 */
/**
 * Tipos e interfaces para la entidad Instructor.
 * Incluye estructura y datos de registro de instructores.
 */
export interface Instructor {
  id: number;
  person: number;
  active: boolean;
  contractType: string;
  contractStartDate: string;
  contractEndDate: string;
  knowledgeArea: number;
}

export interface CreateInstructor {
  first_name: string;
  second_name?: string;
  first_last_name: string;
  second_last_name?: string;
  phone_number: string;
  type_identification: string;
  number_identification: string;
  email: string;
  role_id: number;
  contractType: string;
  contractStartDate: string;
  contractEndDate: string;
  knowledgeArea: number;
  center_id?: number;
  sede_id: number;
  regional_id?: number;
}

export interface InstructorCustomList {
  id: number;
  nombre: string;
  especialidad?: string;
  email?: string;
  asignados?: number;
  maxAsignados?: number;
}

/**
 * Interfaz para los datos del instructor que vienen del backend
 * en el endpoint /api/general/instructors/custom-list/
 */
export interface InstructorBackendResponse {
  id: number;
  first_name: string;
  second_name?: string;
  first_last_name: string;
  second_last_name?: string;
  phone_number: number;
  type_identification: number;
  number_identification: string;
  email: string;
  role_id: number;
  contractType: number;
  contractStartDate: string;
  contractEndDate: string;
  knowledgeArea: number;
  sede_id: number | null;
  active: boolean;
}
