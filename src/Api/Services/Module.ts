/**
 * Servicio para operaciones relacionadas con la entidad Módulo.
 * Incluye obtención, registro, actualización y consulta por ID.
 */
import { ENDPOINTS } from '../config/ConfigApi';

/**
 * Obtiene los datos de un módulo con sus formularios asociados.
 * @param id - ID del módulo
 * @returns Promesa con los datos del módulo
 */
export async function getModuleForms(id) {
	const url = ENDPOINTS.module.getModuleForms.replace('{id}', id.toString());
	const response = await fetch(url);
	if (!response.ok) throw new Error('Error al obtener datos del módulo');
	return response.json();
}

/**
 * Actualiza los datos de un módulo y sus formularios asociados.
 * @param id - ID del módulo
 * @param data - Datos actualizados del módulo
 * @returns Promesa con la respuesta de la API
 */
export async function putModuleForms(id, data) {
	const url = ENDPOINTS.module.putModuleForms.replace('{id}', id.toString());
	const response = await fetch(url, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	if (!response.ok) throw new Error('Error al actualizar el módulo');
	return response.json();
}
/**
 * Crea un nuevo módulo en el sistema.
 * @param data - Datos del módulo a crear
 * @returns Promesa con la respuesta de la API
 */
export async function postModule(data) {
	const response = await fetch(ENDPOINTS.module.post, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	if (!response.ok) throw new Error('Error al crear el módulo');
	return response.json();
}

/**
 * Obtiene la lista de todos los módulos.
 * @returns Promesa con el array de módulos
 */
export async function getModules() {
	const response = await fetch(ENDPOINTS.module.getModule);
	if (!response.ok) throw new Error('Error al obtener módulos');
	return response.json();
}
