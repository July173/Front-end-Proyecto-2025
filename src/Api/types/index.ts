// Person
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
}

export interface Persona {
  id: string;
  first_name: string;
  second_name?: string;
  first_last_name: string;
  second_last_name?: string;
  phone_number: string;
  type_identification: string;
  number_identification: string;
  active: boolean;
}

// User
export interface Usuario {
  id: string;
  email: string;
  password: string;
  is_active: boolean;
  is_staff?: boolean;
  is_superuser?: boolean;
  role: number; // id del rol
  person: string; // id de la persona asociada
}

export interface RegisterResponse {
  persona: Persona;
  usuario: Usuario;
  success: string;
}

export interface ValidateLoginResponse {
  access: string;
  refresh: string;
  user: {
    email: string;
    id: string;
    role?: number;
  };
}

// Role
export interface Role {
  id: string;
  type_role: string;
  description: string;
  active: boolean;
}

// Permission
export interface Permission {
  id: string;
  type_permission: string;
  description: string;
}

// Form
export interface Form {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

// Module
export interface Module {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

// FormModule
export interface FormModule {
  id: string;
  form: string; // id del form
  module: string; // id del module
}

// RolFormPermission
export interface RolFormPermission {
  id: string;
  role: string; // id del role
  form: string; // id del form
  permission: string; // id del permission
}
