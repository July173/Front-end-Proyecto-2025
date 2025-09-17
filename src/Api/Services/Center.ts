/**
 * Servicio para operaciones relacionadas con la entidad Centro.
 * Incluye obtención de centros.
 */
import { ENDPOINTS } from '../config/ConfigApi';

/**
 * Obtiene la lista de centros disponibles.
 * @returns Promesa con el array de centros
 */
export async function getCenters() {
  const response = await fetch(ENDPOINTS.center.getCenters);
  if (!response.ok) throw new Error('Error al obtener centros');
  return response.json();
}