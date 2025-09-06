import { ENDPOINTS } from '../config/ConfigApi';

export async function getCenters() {
  const response = await fetch(ENDPOINTS.center.getCenters);
  if (!response.ok) throw new Error('Error al obtener centros');
  return response.json();
}