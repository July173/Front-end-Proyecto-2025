import { ENDPOINTS } from '../config/ConfigApi';

export async function getSedes() {
  const response = await fetch(ENDPOINTS.sede.getSedes);
  if (!response.ok) throw new Error('Error al obtener sedes');
  return response.json();
}