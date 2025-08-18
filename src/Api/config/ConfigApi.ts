// configuracion generica del los enpoints

const API_BASE_URL = "http://localhost:8000/api/security";

// Endpoints agrupados por entidad/tabla
export const ENDPOINTS = {
  person: {
    registerAprendiz: `${API_BASE_URL}/persons/register-aprendiz/`,
    // Otros endpoints de persona
  },
  user: {
    validateLogin: `${API_BASE_URL}/users/validate-institutional-login/`,
    requestPasswordReset: `${API_BASE_URL}/users/request-password-reset/`,
    // Otros endpoints de usuario
  },
  // Más entidades...
};

export default API_BASE_URL;