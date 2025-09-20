import { ENDPOINTS } from "../config/ConfigApi";
import { ValidateLoginResponse ,UserStatus} from "../types/entities/user.types";


// Servicio para solicitar código de recuperación de contraseña
// Obtener todos los usuarios
/**
 * Obtiene la lista de todos los usuarios registrados.
 * @returns Promesa con el array de usuarios
 */
export async function getUsers() {
	const response = await fetch(ENDPOINTS.user.getUser);
	if (!response.ok) throw new Error('Error al obtener usuarios');
	return response.json();
}

/**
 * Cambia el estado de un usuario (habilitar o inhabilitar) usando el endpoint de soft-delete.
 * Si el usuario está habilitado, lo inhabilita; si está inhabilitado, lo habilita.
 * @param id ID del usuario a modificar
 * @returns Promesa con la respuesta de la API
 */
/**
 * Cambia el estado de un usuario (habilitar o inhabilitar) usando el endpoint de soft-delete.
 * Si el usuario está habilitado, lo inhabilita; si está inhabilitado, lo habilita.
 * @param id - ID del usuario a modificar
 * @returns Promesa con la respuesta de la API (true si éxito)
 */
export async function deleteUser(id: string) {
	const url = ENDPOINTS.user.deleteUser.replace('{id}', id);
	const response = await fetch(url, { method: "DELETE" });
	if (!response.ok) throw new Error('Error al cambiar el estado del usuario');
	// Si la respuesta es 204 No Content, no intentes hacer response.json()
	if (response.status === 204) return true;
	try {
		return await response.json();
	} catch {
		return true;
	}
}

/**
 * Solicita el código de recuperación de contraseña para un correo institucional.
 * Solo permite correos @soy.sena.edu.co.
 * @param email - Correo institucional del usuario
 * @returns Promesa con el resultado (success, code, message)
 */
export async function requestPasswordResetCode(email: string): Promise<{ success: boolean; code?: string; message?: string }> {
	// Validar correo institucional en frontend
	if (!email.endsWith('@soy.sena.edu.co')) {
		return { success: false, message: 'Solo se permiten correos institucionales (@soy.sena.edu.co)' };
	}

	const response = await fetch(ENDPOINTS.user.requestPasswordReset, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email }),
	});
	const data = await response.json();
	if (response.ok && data.code) {
		// Guardar el código en localStorage
		localStorage.setItem('reset_code', data.code);
		return { success: true, code: data.code };
	}
	return { success: false, message: data.error || 'No se pudo enviar el código' };
}

/**
 * Valida el login institucional de un usuario.
 * @param email - Correo institucional
 * @param password - Contraseña
 * @returns Promesa con la respuesta de validación (tokens y datos de usuario)
 */
export async function validateInstitutionalLogin(email: string, password: string): Promise<ValidateLoginResponse> {
	const response = await fetch(ENDPOINTS.user.validateLogin, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});
	if (!response.ok) {
		throw new Error("Credenciales inválidas o error de validación");
	}
	return response.json();
}

/**
 * Verifica si el código de recuperación de contraseña es válido para el usuario.
 * @param email - Correo institucional
 * @param code - Código de recuperación
 * @returns Promesa con el resultado (success, message)
 */
export async function verifyResetCode(email: string, code: string): Promise<{ success: boolean; message?: string }> {
	console.log('Verificando código con:', { email, code }); // DEBUG
	// Consultar a la BD si el código es correcto
	const requestBody = { email, code, new_password: "dummy" };
	console.log('Enviando al backend:', requestBody); // DEBUG
	const response = await fetch(ENDPOINTS.user.resetPassword, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(requestBody)
	});
	const data = await response.json();
	if (response.ok && !data.error) {
		return { success: true };
	}
	return { success: false, message: data.error || "Código incorrecto o expirado" };
}

/**
 * Actualiza la contraseña de un usuario usando el código de recuperación.
 * @param email - Correo institucional
 * @param code - Código de recuperación
 * @param new_password - Nueva contraseña
 * @returns Promesa con el resultado (success, message)
 */
export async function resetPassword(email: string, code: string, new_password: string): Promise<{ success: boolean; message?: string }> {
	const response = await fetch(ENDPOINTS.user.resetPassword, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, code, new_password })
	});
	const data = await response.json();
	if (response.ok && data.success) {
		return { success: true };
	}
	return { success: false, message: data.error || "No se pudo actualizar la contraseña" };
}


/**
 * Obtiene el estado textual de un usuario (activo/inhabilitado) según sus propiedades.
 * @param user - Objeto UserStatus con propiedades de estado
 * @returns 'activo' o 'inhabilitado'
 */
export function getUserStatus(user: UserStatus) {
	return typeof user.is_active === 'boolean'
		? (user.is_active ? 'activo' : 'inhabilitado')
		: ((user.estado || '').toLowerCase().includes('habilitado') ? 'activo' : 'inhabilitado');
}


