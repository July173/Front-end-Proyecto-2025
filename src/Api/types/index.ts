// Card reutilizable para dashboard, roles, módulos, etc.
export interface InfoCardProps {
  title: string;
  statusLabel: string;
  statusColor: 'green' | 'red';
  description: string;
  count: number;
  buttonText: string;
  onButtonClick?: () => void;
  actionLabel?: string;
  actionType?: 'enable' | 'disable';
  onActionClick?: () => void;
}
import { ReactNode } from 'react';

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
  image?: string; // Nuevo campo opcional para imagen
}

export interface Person {
  id: string;
  first_name: string;
  second_name?: string;
  first_last_name: string;
  second_last_name?: string;
  phone_number: string;
  type_identification: string;
  number_identification: string;
  active: boolean;
  image?: string; // URL de la imagen de perfil (opcional)
}

// User
export interface User {
  id: string;
  email: string;
  password: string;
  is_active: boolean;
  is_staff?: boolean;
  is_superuser?: boolean;
  role: number; // id del rol
  person: string; // id de la persona asociada
  registered :boolean
}

export interface RegisterResponse {
  person: Person;
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
    person: string; // id de la persona asociada
    registered ?:boolean;
  };
  // Para compatibilidad con backend antiguo/campos planos
  user_id?: string;
  email?: string;
  role?: number;
  person?: string;
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
  path: string;
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
  form: number; // id del form
  module: number; // id del module
}

// RolFormPermission
export interface RolFormPermission {
  id: string;
  role: number; // id del role
  form: number; // id del form
  permission: number; // id del permission
}

// Elemento individual del formulario/menú 
export interface FormItem {
  name: string;    // Nombre del formulario
  path: string;    // Ruta del formulario
}

// Módulo que contiene varios formularios 
export interface ModuleForm {
  name: string;        // Nombre del módulo
  form: FormItem[];    // Array de formularios dentro del módulo
}


// Respuesta completa del endpoint del menú 
export interface MenuApiResponse {
  rol: string;                    // Nombre del rol del usuario
  moduleForm: ModuleForm[];       // Array de módulos con sus formularios
}

// Elemento procesado para mostrar en el sidebar  
export interface MenuItem {
  children: MenuItem[]; // Sub-items para menús anidados
  title: ReactNode;
  id: string;          // ID generado único
  name: string;        // Nombre a mostrar
  path: string;        // Ruta de navegación
  icon: string;        // Icono asignado
  module: string;      // Módulo al que pertenece
  isActive?: boolean;  // Si está activo
}


// Información del usuario para el sidebar
export interface MenuUserInfo {
  name: string;        // Nombre completo del usuario
  role: string;        // Rol del usuario
  avatar?: string;     // URL del avatar (opcional)
  email?: string;      // Email del usuario (opcional)
}

//Datos procesados para el componente sidebar
export interface ProcessedMenuData {
  menuItems: MenuItem[];      // Items procesados para el menú
  userInfo: MenuUserInfo;     // Información del usuario
}

export interface AppSidebarProps {
  user: MenuUserInfo;
  menuItems: MenuItem[];
  collapsed?: boolean;
}
// Props del componente SidebarMenu
export interface SidebarMenuProps {
  userId: string | number;                    // ID del usuario
  userName?: string;                          // Nombre del usuario (opcional)
  onMenuItemClick?: (item: MenuItem) => void; // Callback al hacer clic
  className?: string;                         // Clases CSS adicionales
  onNavigate?: (view: string) => void;        // Navegación entre vistas (login, home, etc.)
}

export interface Aprendiz {
  id: string;
  person: number;
  ficha?: number;
  active: boolean;
}

export interface Instructor {
  id: string;
  person: number;
  active: boolean;
  contractType: string;
  contractStartDate: string;
  contractEndDate: string;
  knowledgeArea: number;

}

export interface UsuarioRegistrado {
  id: string;
  email: string;
  estado: string;
  role: number;
  registered?: boolean;
  person: {
    id: string;
    first_name: string;
    second_name?: string;
    first_last_name: string;
    second_last_name?: string;
    phone_number: string;
    type_identification: string;
    number_identification: string;
    image?: string;
  };
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

export interface Regional {
  id: number;
  codeRegional: number;
  name: string;
  description: string;
  address : string;
  active: boolean;
}

export interface Sede {
  id: number;
  name?: string;
  codeSede: number;
  active: boolean;
  address?: string;
  phoneSede?: number;
  emailContact?: string;
  center: number;
}

export interface Center {
  id: number;
  name?: string;
  codeCenter: number;
  address?: string;
  active: boolean;
  regional: number;
}

export interface Program {
  id: number;
  codeProgram: number;
  typeProgram?: string;
  name?: string;
  description?: string;
  active: boolean;
}


export interface KnowledgeArea {
  id: number;
  description?: string;
  name?: string;
  active: boolean;
}

export interface Ficha {
  id: number;
  file_number?: number;
  programa?: number;
  active: boolean;

}

export interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface FieldDef {
  name: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'email';
  placeholder?: string;
  options?: Array<{ value: string | number; label: string }>;
  colSpan?: number;
}