import { ENDPOINTS } from '../config/ConfigApi';

export async function getPrograms() {
  const response = await fetch(ENDPOINTS.program.getPrograms);
  if (!response.ok) throw new Error('Error al obtener programas');
  return response.json();
}