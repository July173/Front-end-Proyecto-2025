/**
 * Servicio para operaciones relacionadas con la entidad Instructor.
 * Incluye obtención, registro, actualización y consulta por ID.
 */
import { ENDPOINTS } from '../config/ConfigApi';
import { CreateInstructor } from '../types';

/**
 * Obtiene la lista de todos los instructores.
 * @returns Promesa con el array de instructores
 */
export async function getInstructores() {
  const response = await fetch(ENDPOINTS.instructor.getAllInstructores);
  if (!response.ok) throw new Error('Error al obtener instructores');
  return response.json();
}

/**
 * Registra un nuevo instructor en el sistema.
 * @param data - Datos del instructor a registrar
 * @returns Promesa con la respuesta de la API
 */
export async function postInstructor(data: CreateInstructor) {
  const response = await fetch(ENDPOINTS.instructor.allInstructores, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Error al registrar instructor');
  return response.json();
}

/**
 * Actualiza los datos de un instructor existente.
 * @param id - ID del instructor
 * @param data - Datos actualizados del instructor
 * @returns Promesa con la respuesta de la API
 */
export async function putInstructor(id: string, data: CreateInstructor) {
  const url = ENDPOINTS.instructor.putIdInstructor.replace('{id}', id);
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Error al actualizar instructor');
  return response.json();
}

// src/Api/Services/Instructor.ts
/**
 * Obtiene los datos de un instructor por su ID.
 * @param id - ID del instructor
 * @returns Promesa con el objeto instructor
 */
export async function getInstructorById(id: string) {
  const url = ENDPOINTS.instructor.getIdInstructor.replace('{id}', id);
  const response = await fetch(url);
  if (!response.ok) throw new Error('Error al obtener instructor');
  return response.json();
}