import { ENDPOINTS } from '../config/ConfigApi';

export async function getAprendices() {
  const response = await fetch(ENDPOINTS.aprendiz.getAprendices);
  if (!response.ok) throw new Error('Error al obtener aprendices');
  return response.json();
}
