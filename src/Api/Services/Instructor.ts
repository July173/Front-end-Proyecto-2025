import { ENDPOINTS } from '../config/ConfigApi';
import { CreateInstructor } from '../types';

export async function getInstructores() {
  const response = await fetch(ENDPOINTS.instructor.AllInstructores);
  if (!response.ok) throw new Error('Error al obtener instructores');
  return response.json();
}

export async function postInstructor(data: CreateInstructor) {
  const response = await fetch(ENDPOINTS.instructor.AllInstructores, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Error al registrar instructor');
  return response.json();
}

export async function putInstructor(id: string, data: CreateInstructor) {
  const url = ENDPOINTS.instructor.IdInstructor.replace('{id}', id);
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Error al actualizar instructor');
  return response.json();
}

// src/Api/Services/Instructor.ts
export async function getInstructorById(id: string) {
  const url = ENDPOINTS.instructor.IdInstructor.replace('{id}', id);
  const response = await fetch(url);
  if (!response.ok) throw new Error('Error al obtener instructor');
  return response.json();
}   