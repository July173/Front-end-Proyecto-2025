// Hook para lógica de recuperación de contraseña
import { isSenaEmail, isValidPassword, isValidResetCode, isCodeNotExpired } from './validationlogin';

export function saveResetCode(code: string, expiration: string) {
  localStorage.setItem('reset_code', code);
  localStorage.setItem('reset_code_exp', expiration);
}

export function getResetCode(): { code: string | null; expiration: string | null } {
  return {
    code: localStorage.getItem('reset_code'),
    expiration: localStorage.getItem('reset_code_exp'),
  };
}

export function clearResetCode() {
  localStorage.removeItem('reset_code');
  localStorage.removeItem('reset_code_exp');
}
