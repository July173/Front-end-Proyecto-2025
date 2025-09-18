import { ENDPOINTS } from '../config/ConfigApi';

/**
 * Obtiene los datos de un rol con sus permisos y formularios.
 * @param id - ID del rol
 * @returns Promesa con los datos del rol
 */
export async function getRolPermissions(id) {
	const url = ENDPOINTS.rol.getRolPermissions.replace('{id}', id.toString());
	const response = await fetch(url);
	if (!response.ok) throw new Error('Error al obtener datos del rol');
	return response.json();
}

/**
 * Actualiza un rol con sus formularios y permisos.
 * @param id - ID del rol
 * @param data - Datos actualizados del rol
 * @returns Promesa con la respuesta de la API
 */
export async function putRolFormPerms(id, data) {
	const url = ENDPOINTS.rol.putRolFormPerms.replace('{id}', id.toString());
	const response = await fetch(url, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	if (!response.ok) throw new Error('Error al actualizar el rol');
	return response.json();
}
/**
 * Obtiene la matriz de permisos de roles y formularios.
 * @returns Promesa con la matriz de permisos
 */
export async function getRolesFormsPerms() {
	const response = await fetch(ENDPOINTS.rol.getRolesFormsPerms);
	if (!response.ok) throw new Error('Error al obtener la matriz de permisos');
	return response.json();
}

/**
 * Cambia el estado de un rol (habilitar o inhabilitar) usando el endpoint de soft-delete.
 * Si el rol está activo, lo desactiva; si está inactivo, lo reactiva.
 * @param id - ID del rol
 * @param active - Estado actual del rol
 * @returns Promesa con la respuesta de la API (true si éxito)
 */
export async function toggleRoleActive(id: number, active: boolean) {
		// Si está activo, desactiva (DELETE); si está inactivo, reactiva (DELETE)
		const url = ENDPOINTS.rol.deleteRolUsers.replace('{id}', id.toString());
		const options: RequestInit = { method: 'DELETE' };
	const response = await fetch(url, options);
	if (!response.ok) {
		let errorMsg = 'Error al cambiar el estado del rol';
		try {
			const data = await response.json();
			if (data && (data.detail || data.error)) {
				errorMsg = data.detail || data.error;
			} else {
				// Si no hay detail/error, muestra el JSON completo
				errorMsg = JSON.stringify(data);
			}
		} catch {
			// Si no es JSON, intenta mostrar como texto plano
			try {
				const text = await response.text();
				if (text) errorMsg = text;
			} catch {
				// Intentionally left blank: no further error handling needed here
			}
		}
		throw new Error(errorMsg);
	}
	if (response.status === 204) return true;
	try {
		return await response.json();
	} catch {
		return true;
	}
}
//obtener todos los roles con fetch-get

/**
 * Obtiene la lista de todos los roles.
 * @returns Promesa con el array de roles
 */
export async function getRoles() {
	const response = await fetch(ENDPOINTS.rol.getRoles);
	if (!response.ok) throw new Error('Error al obtener roles');
	return response.json();
}


/**
 * Obtiene la lista de roles junto con la cantidad de usuarios asignados a cada uno.
 * @returns Promesa con el array de roles y usuarios
 */
export async function getRolesUser() {
	const response = await fetch(ENDPOINTS.rol.getRolUser);
	if (!response.ok) throw new Error('Error al obtener roles con los usuarios');
	return response.json();
}

/**
 * Crea un nuevo rol con permisos asociados.
 * @param data - Datos del rol y permisos
 * @returns Promesa con la respuesta de la API
 */
export async function postRolPermissions(data) {
	const response = await fetch(ENDPOINTS.rol.postRolPermissions, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	if (!response.ok) throw new Error('Error al crear el rol');
	return response.json();
}