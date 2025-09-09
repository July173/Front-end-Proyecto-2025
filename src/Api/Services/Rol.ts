// Obtener la matriz de permisos de roles y formularios
export async function getRolesFormsPerms() {
	const response = await fetch(ENDPOINTS.rol.getRolesFormsPerms);
	if (!response.ok) throw new Error('Error al obtener la matriz de permisos');
	return response.json();
}
import { ENDPOINTS } from '../config/ConfigApi';

export async function toggleRoleActive(id: number, active: boolean) {
	// Si está activo, desactiva (DELETE); si está inactivo, reactiva (PATCH)
	const url = ENDPOINTS.rol.deleteRole.replace('{id}', id.toString());
		const options: RequestInit = active
			? { method: 'DELETE' }
			: { method: 'PATCH' };
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

export async function getRoles() {
	const response = await fetch(ENDPOINTS.rol.getRoles);
	if (!response.ok) throw new Error('Error al obtener roles');
	return response.json();
}


export async function getRolesUser() {
	const response = await fetch(ENDPOINTS.rol.getRolUser);
	if (!response.ok) throw new Error('Error al obtener roles con los usuarios');
	return response.json();
}

// Crear rol con permisos
export async function postRolPermissions(data) {
  const response = await fetch(ENDPOINTS.rol.postRolPermissions, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al crear el rol');
  return response.json();
}