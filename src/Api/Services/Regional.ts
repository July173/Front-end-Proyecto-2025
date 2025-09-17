/**
 * Servicio para operaciones relacionadas con la entidad Regional.
 * Incluye obtención de regionales.
 */
import { ENDPOINTS } from '../config/ConfigApi';

/**
 * Obtiene la lista de regionales disponibles.
 * @returns Promesa con el array de regionales
 */
export async function getRegionales() {
  const response = await fetch(ENDPOINTS.regional.getRegionales);
  if (!response.ok) throw new Error('Error al obtener regionales');
  return response.json();
}