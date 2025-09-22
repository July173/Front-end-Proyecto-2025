/**
 * Hook y utilidades para la lógica de recuperación de contraseña.
 * Permite guardar, obtener y limpiar el código de recuperación en localStorage.
 * Utilizado en el flujo de recuperación y cambio de contraseña.
 */

/**
 * Guarda el código de recuperación y su expiración en localStorage.
 * @param {string} code - Código de recuperación.
 * @param {string} expiration - Fecha/hora de expiración.
 */

import { isSenaEmail, isValidPassword, isValidResetCode, isCodeNotExpired } from './validationlogin';

export function saveResetCode(code: string, expiration: string) {
  localStorage.setItem('reset_code', code);
  localStorage.setItem('reset_code_exp', expiration);
}

/**
 * Obtiene el código de recuperación y su expiración desde localStorage.
 * @returns {{ code: string | null, expiration: string | null }} Código y expiración.
 */
export function getResetCode(): { code: string | null; expiration: string | null } {
  return {
    code: localStorage.getItem('reset_code'),
    expiration: localStorage.getItem('reset_code_exp'),
  };
}

/**
 * Elimina el código de recuperación y su expiración de localStorage.
 */
export function clearResetCode() {
  localStorage.removeItem('reset_code');
  localStorage.removeItem('reset_code_exp');
}
