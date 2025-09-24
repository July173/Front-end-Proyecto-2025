/**
 * Tipos e interfaces para la entidad Persona.
 * Incluye datos de registro y estructura de la persona en el sistema.
 */
/**
 * Tipos e interfaces para la entidad Persona.
 * Incluye datos de registro y estructura de la persona en el sistema.
 */
export interface RegisterPayload {
  email: string;
  first_name: string;
  second_name?: string;
  first_last_name: string;
  second_last_name?: string;
  type_identification: string;
  number_identification: string;
  phone_number: string;
  password: string;
  image?: string;
}

export interface Person {
  id: number;
  first_name: string;
  second_name?: string;
  first_last_name: string;
  second_last_name?: string;
  phone_number: string;
  type_identification: string;
  number_identification: string;
  active: boolean;
  image?: string;
}
