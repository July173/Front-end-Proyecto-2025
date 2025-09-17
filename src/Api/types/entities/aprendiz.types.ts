/**
 * Tipos e interfaces para la entidad Aprendiz.
 * Incluye estructura y datos de registro de aprendices.
 */
/**
 * Tipos e interfaces para la entidad Aprendiz.
 * Incluye estructura y datos de registro de aprendices.
 */
export interface Aprendiz {
  id: string;
  person: number;
  ficha?: number;
  active: boolean;
}

export interface CreateAprendiz {
  type_identification: string;
  number_identification: string;
  first_name: string;
  second_name?: string;
  first_last_name: string;
  second_last_name?: string;
  phone_number: string;
  email: string;
  program_id: number;
  ficha_id: string;
  role_id?: number;
}
