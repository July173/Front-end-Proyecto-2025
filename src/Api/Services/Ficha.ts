import { ENDPOINTS } from '../config/ConfigApi';

export async function getFichas() {
  const response = await fetch(ENDPOINTS.ficha.getFichas);
  if (!response.ok) throw new Error('Error al obtener fichas');
  return response.json();
}