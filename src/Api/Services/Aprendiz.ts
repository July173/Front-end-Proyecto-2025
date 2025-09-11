import { ENDPOINTS } from '../config/ConfigApi';
import { CreateAprendiz} from '../types';

export async function getAprendices() {
  const response = await fetch(ENDPOINTS.aprendiz.allAprendiz);
  if (!response.ok) throw new Error('Error al obtener aprendices');
  return response.json();
}

export async function postAprendiz(data: CreateAprendiz) {
  const response = await fetch(ENDPOINTS.aprendiz.allAprendiz, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Error al registrar aprendiz');
  return response.json();
}

export async function putAprendiz(id: string, data: CreateAprendiz) {
  const url = ENDPOINTS.aprendiz.putIdAprendiz.replace('{id}', id);
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Error al actualizar aprendiz');
  return response.json();
}

// src/Api/Services/Aprendiz.ts
export async function getAprendizById(id: string) {
  const url = ENDPOINTS.aprendiz.getIdAprendiz.replace('{id}', id);
  const response = await fetch(url);
  if (!response.ok) throw new Error('Error al obtener aprendiz');
  return response.json();
}