// Obtener datos de un módulo con sus formularios
export async function getModuleForms(id) {
	const url = ENDPOINTS.module.getModuleForms.replace('{id}', id.toString());
	const response = await fetch(url);
	if (!response.ok) throw new Error('Error al obtener datos del módulo');
	return response.json();
}

// Actualizar un módulo con sus formularios
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
// Crear módulo
export async function postModule(data) {
	const response = await fetch(ENDPOINTS.module.post, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	if (!response.ok) throw new Error('Error al crear el módulo');
	return response.json();
}
import { ENDPOINTS } from '../config/ConfigApi';

export async function getModules() {
	const response = await fetch(ENDPOINTS.module.getModule);
	if (!response.ok) throw new Error('Error al obtener módulos');
	return response.json();
}
//obtener todos los modulos con fetch-get