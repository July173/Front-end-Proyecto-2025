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