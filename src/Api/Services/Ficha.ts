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