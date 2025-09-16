/**
 * Servicio para operaciones relacionadas con la entidad Aprendiz.
 * Incluye obtención, registro, actualización y consulta por ID.
 */
import { ENDPOINTS } from '../config/ConfigApi';
import { CreateAprendiz} from '../types';

/**
 * Obtiene la lista de todos los aprendices.
 * @returns Promesa con el array de aprendices
 */
export async function getAprendices() {
  const response = await fetch(ENDPOINTS.aprendiz.getAllAprendiz);
  if (!response.ok) throw new Error('Error al obtener aprendices');
  return response.json();
}

/**
 * Registra un nuevo aprendiz en el sistema.
 * @param data - Datos del aprendiz a registrar
 * @returns Promesa con la respuesta de la API
 */
export async function postAprendiz(data: CreateAprendiz) {
  const response = await fetch(ENDPOINTS.aprendiz.allAprendiz, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Error al registrar aprendiz');
  return response.json();
}

/**
 * Actualiza los datos de un aprendiz existente.
 * @param id - ID del aprendiz
 * @param data - Datos actualizados del aprendiz
 * @returns Promesa con la respuesta de la API
 */
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
/**
 * Obtiene los datos de un aprendiz por su ID.
 * @param id - ID del aprendiz
 * @returns Promesa con el objeto aprendiz
 */
export async function getAprendizById(id: string) {
  const url = ENDPOINTS.aprendiz.getIdAprendiz.replace('{id}', id);
  const response = await fetch(url);
  if (!response.ok) throw new Error('Error al obtener aprendiz');
  return response.json();
}