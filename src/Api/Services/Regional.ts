import { ENDPOINTS } from '../config/ConfigApi';

export async function getRegionales() {
  const response = await fetch(ENDPOINTS.regional.getRegionales);
  if (!response.ok) throw new Error('Error al obtener regionales');
  return response.json();
}