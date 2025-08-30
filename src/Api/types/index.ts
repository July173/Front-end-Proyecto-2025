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
  image?: string; // URL de la imagen de perfil (opcional)
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

// Elemento individual del formulario/menú (coincide con tu API)
export interface FormItem {
  name: string;    // Nombre del formulario
  path: string;    // Ruta del formulario
}

// Módulo que contiene varios formularios (estructura de tu API)
export interface ModuleForm {
  name: string;        // Nombre del módulo
  form: FormItem[];    // Array de formularios dentro del módulo
}


// Respuesta completa del endpoint del menú (estructura exacta de tu swagger)
export interface MenuApiResponse {
  rol: string;                    // Nombre del rol del usuario
  moduleForm: ModuleForm[];       // Array de módulos con sus formularios
}

// Elemento procesado para mostrar en el sidebar (lo que necesita el componente) 
export interface MenuItem {
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

// Props del componente SidebarMenu
export interface SidebarMenuProps {
  userId: string | number;                    // ID del usuario
  userName?: string;                          // Nombre del usuario (opcional)
  onMenuItemClick?: (item: MenuItem) => void; // Callback al hacer clic
  className?: string;                         // Clases CSS adicionales
  onNavigate?: (view: string) => void;        // Navegación entre vistas (login, home, etc.)
}