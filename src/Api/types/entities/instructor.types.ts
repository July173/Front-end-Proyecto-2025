/**
 * Tipos e interfaces para la entidad Instructor.
 * Incluye estructura y datos de registro de instructores.
 */
/**
 * Tipos e interfaces para la entidad Instructor.
 * Incluye estructura y datos de registro de instructores.
 */
export interface Instructor {
  id: string;
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
  center_id: number;
  sede_id: number;
  regional_id: number;
}
