// Hook genérico para validar correos Gmail
export function useValidationEmail(email: string) {
	const senaRegex = /^[a-zA-Z0-9._%+-]+@soy\.sena\.edu\.co$/;
	const isValid = senaRegex.test(email);
	const error = isValid ? '' : 'Solo se permiten correos @soy.sena.edu.co y @sena.edu.co';
	return { isValid, error };
}
	