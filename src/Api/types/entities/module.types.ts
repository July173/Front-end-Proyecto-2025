/**
 * Tipos e interfaces para la entidad Módulo.
 * Incluye estructura de módulos y relación con formularios.
 */
/**
 * Tipos e interfaces para la entidad Módulo.
 * Incluye estructura de módulos y relación con formularios.
 */
export interface Module {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

export interface ModuleForm {
  name: string;
  form: import('./form.types').FormItem[];
}
