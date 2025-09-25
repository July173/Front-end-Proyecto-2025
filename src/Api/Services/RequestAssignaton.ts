import { ENDPOINTS } from '../config/ConfigApi';
import { requestAsignation } from '../types/Modules/assign.types';

/**
 * Obtiene todas las solicitudes de asignación
 */
export const getAllRequests = async (): Promise<any[]> => {
  try {
    const response = await fetch(ENDPOINTS.requestAsignation.getFormRequest);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al obtener las solicitudes de asignación');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getAllRequests:', error);
    throw error;
  }
};

/**
 * Envía una solicitud de asignación
 */
export const postRequestAssignation = async (data: requestAsignation): Promise<any> => {
  try {
    const response = await fetch(ENDPOINTS.requestAsignation.postRequestAssignation, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al enviar la solicitud de asignación');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en postRequestAssignation:', error);
    throw error;
  }
};

/**
 * Sube un archivo PDF para la solicitud
 */
export const postPdfRequest = async (file: File, requestId?: number): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('pdf_file', file);
    if (requestId) {
      formData.append('request_id', requestId.toString());
    }

    const response = await fetch(ENDPOINTS.requestAsignation.postPdfRequest, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al subir el archivo PDF');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en postPdfRequest:', error);
    throw error;
  }
};