import { ENDPOINTS } from "../config/ConfigApi";
import {
     ValidateLoginResponse, 
    } from "../types";

// Servicio para solicitar código de recuperación de contraseña
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
  // Consultar a la BD si el código es correcto
  const response = await fetch(ENDPOINTS.user.resetPassword, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code, new_password: "dummy" }) // new_password dummy para solo validar
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
