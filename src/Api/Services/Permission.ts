import { ENDPOINTS } from '../config/ConfigApi';

// Obtener todos los permisos
export async function getPermissions() {
	const response = await fetch(ENDPOINTS.permission.getPermissions);
	if (!response.ok) throw new Error('Error al obtener los permisos');
	return response.json();
}
