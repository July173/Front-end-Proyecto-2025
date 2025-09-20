/**
 * Servicio para operaciones relacionadas con la entidad Ficha.
 * Incluye obtención de fichas.
 */
import { ENDPOINTS } from '../config/ConfigApi';


/**
 * Obtiene la lista de fichas disponibles.
 * @returns Promesa con el array de fichas
 */
export async function getFichas() {
  const response = await fetch(ENDPOINTS.ficha.allFichas);
  if (!response.ok) throw new Error('Error al obtener fichas');
  return response.json();
}

/**
 * Crea una nueva ficha.
 * @param data - Datos de la ficha
 * @returns Promesa con la ficha creada
 */
export async function createFicha(data) {
  const response = await fetch(ENDPOINTS.ficha.allFichas, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al crear ficha');
  return response.json();
}

/**
 * Elimina una ficha existente.
 * @param id - ID de la ficha a eliminar
 * @returns Promesa con la respuesta de la eliminación
 */
export async function deleteFicha(id: number | string) {
  const url = ENDPOINTS.ficha.deleteIdFicha.replace('{id}', String(id));
  const response = await fetch(url, { method: 'DELETE' });
  if (!response.ok) throw new Error('Error al deshabilitar ficha');
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

/**
 * Actualiza una ficha existente.
 * @param id - ID de la ficha a actualizar
 * @param data - Nuevos datos para la ficha
 * @returns Promesa con la ficha actualizada
 */
export async function updateFicha(id: number | string, data) {
  const url = ENDPOINTS.ficha.IdFicha.replace('{id}', String(id));
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al actualizar ficha');
  return response.json();
}