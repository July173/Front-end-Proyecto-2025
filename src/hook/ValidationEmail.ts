/**
 * Hook genérico para validar correos institucionales SENA.
 * Permite verificar si el correo tiene el formato correcto (@soy.sena.edu.co).
 *
 * Uso:
 * - Llama a `useValidationEmail(email)` y recibe si es válido y el mensaje de error.
 */
/**
 * Valida si el correo es institucional SENA (@soy.sena.edu.co).
 * @param {string} email - Correo a validar.
 * @returns {{ isValid: boolean, error: string }} Resultado de la validación.
 */
export function useValidationEmail(email: string) {
	const senaRegex = /^[a-zA-Z0-9._%+-]+@soy\.sena\.edu\.co$/;
	const isValid = senaRegex.test(email);
	const error = isValid ? '' : 'Solo se permiten correos @soy.sena.edu.co y @sena.edu.co';
	return { isValid, error };
}
	