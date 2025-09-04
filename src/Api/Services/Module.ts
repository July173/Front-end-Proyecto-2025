import { ENDPOINTS } from '../config/ConfigApi';

export async function getModules() {
	const response = await fetch(ENDPOINTS.module.getModule);
	if (!response.ok) throw new Error('Error al obtener módulos');
	return response.json();
}
//obtener todos los modulos con fetch-get