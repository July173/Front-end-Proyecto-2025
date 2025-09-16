/**
 * Tipos e interfaces para entidades generales del sistema.
 * Incluye Sede, Regional, Program, KnowledgeArea, Ficha y Center.
 * Usados para modelar la estructura de datos de módulos generales.
 */
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

export interface Regional {
  id: number;
  codeRegional: number;
  name: string;
  description: string;
  address: string;
  active: boolean;
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

export interface Center {
  id: number;
  name?: string;
  codeCenter: number;
  address?: string;
  active: boolean;
  regional: number;
}
