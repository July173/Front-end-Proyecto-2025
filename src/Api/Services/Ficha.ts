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
  const response = await fetch(ENDPOINTS.ficha.getFichas);
  if (!response.ok) throw new Error('Error al obtener fichas');
  return response.json();
}