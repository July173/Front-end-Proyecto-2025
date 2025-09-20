/**
 * Tipos e interfaces para la entidad Usuario.
 * Incluye datos de usuario, respuesta de registro y validación de login.
 */
/**
 * Tipos e interfaces para la entidad Usuario.
 * Incluye datos de usuario, respuesta de registro y validación de login.
 */
export interface User {
  id: number;
  email: string;
  password: string;
  is_active: boolean;
  is_staff?: boolean;
  is_superuser?: boolean;
  role: number;
  person: string;
  registered: boolean;
}

export interface RegisterResponse {
  person: import('./person.types').Person;
  user: User;
  success: string;
}

export interface ValidateLoginResponse {
  access: string;
  refresh: string;
  user?: {
    email: string;
    id: string;
    role?: number;
    person: string;
    registered?: boolean;
  };
  user_id?: string;
  email?: string;
  role?: number;
  person?: string;
}

export interface UserStatus {
  is_active?: boolean;
  estado?: string;
}
