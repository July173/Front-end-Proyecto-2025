import { ENDPOINTS } from '../config/ConfigApi';

export async function getInstructores() {
  const response = await fetch(ENDPOINTS.instructor.getInstructores);
  if (!response.ok) throw new Error('Error al obtener instructores');
  return response.json();
}
