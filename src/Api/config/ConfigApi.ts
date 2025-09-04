// configuracion generica del los enpoints

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://django:8000/api/";


// Endpoints agrupados por entidad/tabla
export const ENDPOINTS = {
  person: {
    registerAprendiz: `${API_BASE_URL}security/persons/register-aprendiz/`,
    // Otros endpoints de persona

    getPerson: `${API_BASE_URL}security/persons/{id}/`,
    patchPerson: `${API_BASE_URL}security/persons/{id}/`,
  },
  user: {
    validateLogin: `${API_BASE_URL}security/users/validate-institutional-login/`,
    requestPasswordReset: `${API_BASE_URL}security/users/request-password-reset/`, // Envia el código y lo compara
    resetPassword: `${API_BASE_URL}security/users/reset-password/`, // Actualiza la contraseña
    // Otros endpoints de usuario
    getUser: `${API_BASE_URL}security/users/`,
  },
  menu: {
    getMenuItems: `${API_BASE_URL}security/rol-form-permissions/{id}/get-menu/`,
  },
  rol: {
    getRoles: `${API_BASE_URL}security/roles/`,
    deleteRole: `${API_BASE_URL}security/roles/{id}/`,
  },
  form : {
    getForm: `${API_BASE_URL}security/forms/`,
    deleteForm: `${API_BASE_URL}security/forms/{id}/`,
  },
  module:{
    getModule: `${API_BASE_URL}security/modules/`,
    deleteModule: `${API_BASE_URL}security/modules/{id}/`,
  }
  // Más entidades...
};

export default API_BASE_URL;