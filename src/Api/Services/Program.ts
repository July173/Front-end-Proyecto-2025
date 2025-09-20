/**
 * Servicio para operaciones relacionadas con la entidad Programa.
 * Incluye obtención de programas y fichas asociadas a un programa.
 */
import { ENDPOINTS } from '../config/ConfigApi';

/**
 * Obtiene la lista de programas disponibles.
 * @returns Promesa con el array de programas
 */
export async function getPrograms() {
  const response = await fetch(ENDPOINTS.program.allPrograms);
  if (!response.ok) throw new Error('Error al obtener programas');
  return response.json();
}

/**
 * Obtiene las fichas asociadas a un programa específico.
 * @param programId - ID del programa
 * @returns Promesa con el array de fichas del programa
 */
export async function getProgramFichas(programId: number | string) {
  const url = ENDPOINTS.program.getProgramFicha.replace('{id}', String(programId));
  const response = await fetch(url);
  if (!response.ok) throw new Error('Error al obtener fichas del programa');
  return response.json();
}

/**
 * Crea un nuevo programa.
 * @param data - Datos del programa
 * @returns Promesa con el programa creado
 */
export async function createProgram(data) {
  const response = await fetch(ENDPOINTS.program.allPrograms, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al crear programa');
  return response.json();
}

/**
 * Elimina (deshabilita) un programa existente.
 * @param id - ID del programa a eliminar
 * @returns Promesa con el programa eliminado
 */
export async function deleteProgram(id: number | string) {
  const url = ENDPOINTS.program.deleteIdProgram.replace('{id}', String(id));
  const response = await fetch(url, { method: 'DELETE' });
  if (!response.ok) throw new Error('Error al deshabilitar programa');
  // Solo intenta leer JSON si hay contenido
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

/**
 * Actualiza un programa existente.
 * @param id - ID del programa a actualizar
 * @param data - Nuevos datos del programa
 * @returns Promesa con el programa actualizado
 */
export async function updateProgram(id: number | string, data) {
  const url = ENDPOINTS.program.IdProgram.replace('{id}', String(id));
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al actualizar programa');
  return response.json();
}