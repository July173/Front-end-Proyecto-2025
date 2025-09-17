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

      // Crear blob y descargar archivo
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
}

// Exportar una instancia del servicio
export const excelTemplateService = new ExcelTemplateService();
export default ExcelTemplateService;