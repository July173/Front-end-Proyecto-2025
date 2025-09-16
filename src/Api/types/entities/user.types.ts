export interface User {
  id: string;
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
