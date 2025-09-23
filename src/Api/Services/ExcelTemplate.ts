// Servicio para manejar las plantillas de Excel para registro masivo
import { ENDPOINTS } from '../config/ConfigApi';

export interface TemplateInfo {
  name: string;
  description: string;
  fields: string[];
  download_url: string;
  additional_sheets: string[];
}

export interface TemplatesInfo {
  instructor_template: TemplateInfo;
  aprendiz_template: TemplateInfo;
}

export interface UploadResult {
  success: Array<{
    row: number;
    message: string;
    email: string;
  }>;
  errors: Array<{
    row?: number;
    errors: string[];
    data?: Record<string, unknown>;
    general?: string;
  }>;
  total_processed: number;
  successful_registrations: number;
  error_report_url?: string;
  error_report_message?: string;
}

class ExcelTemplateService {
  
  /**
   * Obtiene información sobre las plantillas disponibles
   */
  async getTemplateInfo(): Promise<TemplatesInfo> {
    try {
      const response = await fetch(ENDPOINTS.excelTemplates.templateInfo, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error al obtener información de plantillas: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error obteniendo información de plantillas:', error);
      throw error;
    }
  }

  /**
   * Descarga la plantilla de Excel para instructores
   */
  async downloadInstructorTemplate(): Promise<void> {
    try {
      const response = await fetch(ENDPOINTS.excelTemplates.instructorTemplate, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
        },
      });

      if (!response.ok) {
        throw new Error(`Error al descargar plantilla de instructores: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'plantilla_instructores.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error descargando plantilla de instructores:', error);
      throw error;
    }
  }

  /**
   * Descarga la plantilla de Excel para aprendices
   */
  async downloadAprendizTemplate(): Promise<void> {
    try {
      const response = await fetch(ENDPOINTS.excelTemplates.aprendizTemplate, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
        },
      });

      if (!response.ok) {
        throw new Error(`Error al descargar plantilla de aprendices: ${response.statusText}`);
      }

      // Crear blob y descargar archivo
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'plantilla_aprendices.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error descargando plantilla de aprendices:', error);
      throw error;
    }
  }

  /**
   * Sube y procesa un archivo Excel de instructores para registro masivo
   */
  async uploadInstructorExcel(file: File): Promise<UploadResult> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(ENDPOINTS.excelTemplates.uploadInstructorExcel, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error al procesar archivo: ${response.status}`);
      }

      const result: UploadResult = await response.json();
      return result;
    } catch (error) {
      console.error('Error subiendo archivo de instructores:', error);
      throw error;
    }
  }

  /**
   * Sube y procesa un archivo Excel de aprendices para registro masivo
   */
  async uploadAprendizExcel(file: File): Promise<UploadResult> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(ENDPOINTS.excelTemplates.uploadAprendizExcel, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error al procesar archivo: ${response.status}`);
      }

      const result: UploadResult = await response.json();
      return result;
    } catch (error) {
      console.error('Error subiendo archivo de aprendices:', error);
      throw error;
    }
  }

  /**
   * Función genérica para descargar cualquier plantilla
   */
  async downloadTemplate(type: 'instructor' | 'aprendiz'): Promise<void> {
    if (type === 'instructor') {
      return this.downloadInstructorTemplate();
    } else if (type === 'aprendiz') {
      return this.downloadAprendizTemplate();
    } else {
      throw new Error('Tipo de plantilla no válido');
    }
  }

  /**
   * Función genérica para subir cualquier plantilla
   */
  async uploadTemplate(type: 'instructor' | 'aprendiz', file: File): Promise<UploadResult> {
    if (type === 'instructor') {
      return this.uploadInstructorExcel(file);
    } else if (type === 'aprendiz') {
      return this.uploadAprendizExcel(file);
    } else {
      throw new Error('Tipo de plantilla no válido');
    }
  }

  /**
   * Descarga reporte de errores desde URL
   */
  async downloadErrorReport(errorReportUrl: string): Promise<void> {
    try {
      // Construir URL completa del servidor
      const fullUrl = errorReportUrl.startsWith('http') 
        ? errorReportUrl 
        : `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${errorReportUrl}`;

      // Crear elemento temporal para descarga
      const link = document.createElement('a');
      link.href = fullUrl;
      link.download = errorReportUrl.split('/').pop() || 'error_report.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al descargar reporte de errores:', error);
      throw new Error('Error al descargar el reporte de errores');
    }
  }
}

// Exportar una instancia del servicio
export const excelTemplateService = new ExcelTemplateService();
export default ExcelTemplateService;