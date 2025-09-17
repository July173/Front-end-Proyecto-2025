/**
 * Servicio para operaciones relacionadas con la entidad Permiso.
 * Incluye obtención de permisos.
 */
import { ENDPOINTS } from '../config/ConfigApi';

/**
 * Obtiene la lista de permisos disponibles.
 * @returns Promesa con el array de permisos
 */
export async function getPermissions() {
	const response = await fetch(ENDPOINTS.permission.getPermissions);
	if (!response.ok) throw new Error('Error al obtener los permisos');
	return response.json();
}
