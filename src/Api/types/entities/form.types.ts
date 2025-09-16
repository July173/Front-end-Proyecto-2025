/**
 * Tipos e interfaces para la entidad Formulario.
 * Incluye estructura de formularios, módulos y permisos relacionados.
 */
/**
 * Tipos e interfaces para la entidad Formulario.
 * Incluye estructura de formularios, módulos y permisos relacionados.
 */
export interface Form {
  id: string;
  name: string;
  description: string;
  path: string;
  active: boolean;
}

export interface FormModule {
  id: string;
  form: number;
  module: number;
}

export interface RolFormPermission {
  id: string;
  role: number;
  form: number;
  permission: number;
}

export interface FormItem {
  name: string;
  path: string;
}
