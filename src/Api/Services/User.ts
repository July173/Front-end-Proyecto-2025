import { ENDPOINTS } from "../config/ConfigApi";
import { ValidateLoginResponse } from "../types";

// Servicio para solicitar código de recuperación de contraseña
// Obtener todos los usuarios
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

export async function validateInstitutionalLogin(email: string, password: string): Promise<ValidateLoginResponse> {
	const response = await fetch(ENDPOINTS.user.validateLogin, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});
	if (!response.ok) {
		// Puedes mejorar el manejo de errores según la respuesta del backend
		throw new Error("Credenciales inválidas o error de validación");
	}
	return response.json();
}

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

// Define a User type with the relevant properties
interface User {
	is_active?: boolean;
	estado?: string;
}

// Para aprendices/instructores:
export function getUserStatus(user: User) {
	return typeof user.is_active === 'boolean'
		? (user.is_active ? 'activo' : 'inhabilitado')
		: ((user.estado || '').toLowerCase().includes('habilitado') ? 'activo' : 'inhabilitado');
}


