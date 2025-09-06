import { ENDPOINTS } from '../config/ConfigApi';
import { CreateInstructorPayload } from '../types';

export async function getInstructores() {
  const response = await fetch(ENDPOINTS.instructor.getInstructores);
  if (!response.ok) throw new Error('Error al obtener instructores');
  return response.json();
}

export async function postInstructor(data: CreateInstructorPayload) {
  const response = await fetch(ENDPOINTS.instructor.postInstructor, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Error al registrar instructor');
  return response.json();
}
