import { ENDPOINTS } from '../config/ConfigApi';
import { CreateAprendizPayload } from '../types';

export async function getAprendices() {
  const response = await fetch(ENDPOINTS.aprendiz.getAprendices);
  if (!response.ok) throw new Error('Error al obtener aprendices');
  return response.json();
}

export async function postAprendiz(data: CreateAprendizPayload) {
  const response = await fetch(ENDPOINTS.aprendiz.postAprendiz, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Error al registrar aprendiz');
  return response.json();
}
