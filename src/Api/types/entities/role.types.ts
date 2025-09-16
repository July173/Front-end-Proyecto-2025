/**
 * Tipos e interfaces para la entidad Rol y permisos.
 * Incluye estructura de roles, conteo de usuarios y permisos por rol.
 */
/**
 * Tipos e interfaces para la entidad Rol y permisos.
 * Incluye estructura de roles, conteo de usuarios y permisos por rol.
 */
export interface Role {
  id: string;
  type_role: string;
  description: string;
  active: boolean;
}

export interface RolUsuario {
  id: number;
  nombre: string;
  descripcion: string;
  active: boolean;
  cantidad_usuarios: number;
}

export interface RolUserCount {
  id: number;
  nombre: string;
  descripcion: string;
  cantidad_usuarios: number;
}

export interface Permiso {
  rol: string;
  formulario: string;
  Ver: boolean;
  Editar: boolean;
  Registrar: boolean;
  Eliminar: boolean;
  Activar: boolean;
}
