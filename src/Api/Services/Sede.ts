/**
 * Servicio para operaciones relacionadas con la entidad Sede.
 * Incluye obtención de sedes.
 */
import { ENDPOINTS } from '../config/ConfigApi';

/**
 * Obtiene la lista de sedes disponibles.
 * @returns Promesa con el array de sedes
 */
export async function getSedes() {
  const response = await fetch(ENDPOINTS.sede.getSedes);
  if (!response.ok) throw new Error('Error al obtener sedes');
  return response.json();
}