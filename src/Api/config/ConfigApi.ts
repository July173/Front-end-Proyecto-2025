// configuracion generica del los enpoints

import { get } from "http";
import { permission } from "process";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://django:8000/api/";


// Endpoints agrupados por entidad/tabla
export const ENDPOINTS = {
  person: {
    registerAprendiz: `${API_BASE_URL}security/persons/register-aprendiz/`,
    // Otros endpoints de persona

    IdPerson: `${API_BASE_URL}security/persons/{id}/`,
  },
  user: {
    validateLogin: `${API_BASE_URL}security/users/validate-institutional-login/`,
    requestPasswordReset: `${API_BASE_URL}security/users/request-password-reset/`, // Envia el código y lo compara
    resetPassword: `${API_BASE_URL}security/users/reset-password/`, // Actualiza la contraseña
    // Otros endpoints de usuario
    getUser: `${API_BASE_URL}security/users/`,
    deleteUser: `${API_BASE_URL}security/users/{id}/soft-delete/`,
  },
  menu: {
    getMenuItems: `${API_BASE_URL}security/rol-form-permissions/{id}/get-menu/`,
  },
  rol: {
    getRoles: `${API_BASE_URL}security/roles/`,
    deleteRole: `${API_BASE_URL}security/roles/{id}/soft-delete/`,
    getRolUser: `${API_BASE_URL}security/roles/roles-with-user-count/`,
    postRolPermissions: `${API_BASE_URL}security/rol-form-permissions/create-role-with-permissions/`,
    getRolPermissions: `${API_BASE_URL}security/rol-form-permissions/{id}/get-role-with-permissions/`,
    getRolesFormsPerms: `${API_BASE_URL}security/rol-form-permissions/permission-matrix/`,
  },
  
  form: {
    getForm: `${API_BASE_URL}security/forms/`,
    deleteForm: `${API_BASE_URL}security/forms/{id}/`,
    post :`${API_BASE_URL}security/forms/`,
  },
  module: {
    getModule: `${API_BASE_URL}security/modules/`,
    deleteModule: `${API_BASE_URL}security/modules/{id}/`,
    post: `${API_BASE_URL}security/form-modules/create-module-with-forms/`,
  },
  
  aprendiz: {
    AllAprendiz: `${API_BASE_URL}general/create-aprendices/`,
    IdAprendiz: `${API_BASE_URL}general/create-aprendices/{id}/`,
  },
  instructor: {
    AllInstructores: `${API_BASE_URL}general/create-instructors/`,
    IdInstructor: `${API_BASE_URL}general/create-instructors/{id}/`,

  },
  regional: {
    getRegionales: `${API_BASE_URL}general/regionals/`,
  },
  center: {
    getCenters: `${API_BASE_URL}general/centers/`,
  },
  sede: {
    getSedes: `${API_BASE_URL}general/sedes/`,
  },
  program: {
    getPrograms: `${API_BASE_URL}general/programs/`,
  },
  KnowledgeArea: {
    getKnowledgeAreas: `${API_BASE_URL}general/knowledge-areas/`,
  },
  ficha: {
    getFichas: `${API_BASE_URL}general/fichas/`,
  },
  permission: {
    getPermissions: `${API_BASE_URL}security/permissions/`,
  },
  // Plantillas Excel para registro masivo
  excelTemplates: {
    instructorTemplate: `${API_BASE_URL}security/excel-templates/instructor-template/`,
    aprendizTemplate: `${API_BASE_URL}security/excel-templates/aprendiz-template/`,
    templateInfo: `${API_BASE_URL}security/excel-templates/template-info/`,
    uploadInstructorExcel: `${API_BASE_URL}security/excel-templates/upload-instructor-excel/`,
    uploadAprendizExcel: `${API_BASE_URL}security/excel-templates/upload-aprendiz-excel/`,
  },
  // Otros grupos de endpoints...
  // Más entidades...
};

export default API_BASE_URL;