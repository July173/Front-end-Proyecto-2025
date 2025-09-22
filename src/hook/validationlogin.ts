
/**
 * Funciones de validación genéricas para login y formularios.
 * Incluye validaciones de correo, contraseña, nombres, apellidos, documento, teléfono y códigos de recuperación.
 * Uso: Importa y utiliza las funciones en los formularios para validar los datos del usuario.
 */

/**
 * Valida si el correo es institucional SENA (@soy.sena.edu.co o @sena.edu.co).
 * @param {string} email - Correo a validar.
 * @returns {boolean} True si es válido.
 */
export function isSenaEmail(email: string): boolean {
  return email.endsWith('@soy.sena.edu.co') || email.endsWith('@sena.edu.co');
}

/**
 * Valida si la contraseña tiene al menos 8 caracteres.
 * @param {string} password - Contraseña a validar.
 * @returns {boolean} True si es válida.
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}

/**
 * Valida nombres (solo letras y espacios, obligatorio).
 * @param {string} names - Nombres a validar.
 * @returns {string | null} Mensaje de error o null si es válido.
 */
export function isValidNames(names: string): string | null {
  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(names)) return 'Solo letras y espacios';
  if (names.trim().length === 0) return 'Campo obligatorio';
  return null;
}

/**
 * Valida apellidos (solo letras y espacios, obligatorio).
 * @param {string} surnames - Apellidos a validar.
 * @returns {string | null} Mensaje de error o null si es válido.
 */
export function isValidSurnames(surnames: string): string | null {
  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(surnames)) return 'Solo letras y espacios';
  if (surnames.trim().length === 0) return 'Campo obligatorio';
  return null;
}

/**
 * Valida número de documento (solo dígitos).
 * @param {string} doc - Documento a validar.
 * @returns {string | null} Mensaje de error o null si es válido.
 */
export function isValidDocumentNumber(doc: string): string | null {
  if (!/^\d+$/.test(doc)) return 'Dato no válido';
  return null;
}

/**
 * Valida número de teléfono (10 dígitos).
 * @param {string} phone - Teléfono a validar.
 * @returns {string | null} Mensaje de error o null si es válido.
 */
export function isValidPhone(phone: string): string | null {
  if (!/^\d{10}$/.test(phone)) return 'Dato no válido';
  return null;
}

/**
 * Valida código de recuperación (6 dígitos numéricos).
 * @param {string} code - Código a validar.
 * @returns {boolean} True si es válido.
 */
export function isValidResetCode(code: string): boolean {
  return /^[0-9]{6}$/.test(code);
}

/**
 * Valida si la fecha de expiración es posterior a la actual.
 * @param {string} expiration - Fecha/hora en formato 'dd/MM/yyyy HH:mm'.
 * @returns {boolean} True si no ha expirado.
 */
export function isCodeNotExpired(expiration: string): boolean {
  // expiration en formato 'dd/MM/yyyy HH:mm'
  const [date, time] = expiration.split(' ');
  const [day, month, year] = date.split('/').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  const expDate = new Date(year, month - 1, day, hour, minute);
  return expDate > new Date();
}

/**
 * Capitaliza cada palabra en un texto.
 * @param {string} text - Texto a capitalizar.
 * @returns {string} Texto capitalizado.
 */
export function capitalizeWords(text: string): string {
  return text.replace(/\b\w+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
}
