/**
 * Deshabilita (soft-delete) un color
 * @param id - ID del color a deshabilitar
 * @returns Promesa con la respuesta del backend
 */
export async function softDeleteColor(id) {
  const url = ENDPOINTS.Colors.softDeleteColors.replace('{id}', String(id));
  const response = await fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Error al deshabilitar color');
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
}
/**
 * Servicio para operaciones relacionadas con la entidad Colors.
 * Incluye obtención, creación, actualización y eliminación de colores.
 */
import { ENDPOINTS } from '../config/ConfigApi';

/**
 * Obtiene la lista de colores disponibles.
 * @returns Promesa con el array de colores
 */
export async function getColors() {
  const response = await fetch(ENDPOINTS.Colors.allColors);
  if (!response.ok) throw new Error('Error al obtener colores');
  return response.json();
}

/**
 * Crea un nuevo color.
 * @param data - Datos del color
 * @returns Promesa con el color creado
 */
export async function createColor(data) {
  const response = await fetch(ENDPOINTS.Colors.createColors, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al crear color');
  return response.json();
}

/**
 * Actualiza un color existente.
 * @param id - ID del color a actualizar
 * @param data - Nuevos datos para el color
 * @returns Promesa con el color actualizado
 */
export async function updateColor(id, data) {
  const url = ENDPOINTS.Colors.updateColors.replace('{id}', String(id));
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al actualizar color');
  return response.json();
}
