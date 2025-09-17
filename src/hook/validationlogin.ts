// Validaciones genéricas para login y formularios

export function isSenaEmail(email: string): boolean {
  return email.endsWith('@soy.sena.edu.co') ;
}

export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}

export function isValidNames(names: string): string | null {
  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(names)) return 'Solo letras y espacios';
  if (names.trim().length === 0) return 'Campo obligatorio';
  return null;
}

export function isValidSurnames(surnames: string): string | null {
  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(surnames)) return 'Solo letras y espacios';
  if (surnames.trim().length === 0) return 'Campo obligatorio';
  return null;
}

export function isValidDocumentNumber(doc: string): string | null {
  if (!/^\d+$/.test(doc)) return 'Dato no válido';
  return null;
}

export function isValidPhone(phone: string): string | null {
  if (!/^\d{10}$/.test(phone)) return 'Dato no válido';
  return null;
}

export function isValidResetCode(code: string): boolean {
  return /^[0-9]{6}$/.test(code);
}

export function isCodeNotExpired(expiration: string): boolean {
  // expiration en formato 'dd/MM/yyyy HH:mm'
  const [date, time] = expiration.split(' ');
  const [day, month, year] = date.split('/').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  const expDate = new Date(year, month - 1, day, hour, minute);
  return expDate > new Date();
}

export function capitalizeWords(text: string): string {
  return text.replace(/\b\w+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
}
