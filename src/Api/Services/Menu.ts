
import { ENDPOINTS } from '../config/ConfigApi';
import { MenuApiResponse, ProcessedMenuData, MenuItem } from '../types/entities/menu.types'; // Importa desde tu archivo principal de tipos

/**
 * Servicio para operaciones relacionadas con el menú dinámico del usuario.
 * Incluye obtención y procesamiento de los elementos del menú.
 */
export const menu = {
  /**
   * Obtiene los elementos del menú para un usuario específico y los procesa.
   * @param userId - ID del usuario
   * @param userName - Nombre del usuario (opcional)
   * @returns Promesa con los datos procesados del menú
   */
  async getMenuItems(userId: string | number, userName?: string): Promise<ProcessedMenuData> {
    try {
      const url = ENDPOINTS.menu.getMenuItems.replace('{id}', userId.toString());
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Agregar token de autorización si es necesario
          // 'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const apiData: MenuApiResponse[] = await response.json();
      
      // Procesar la respuesta del API para convertirla en el formato que necesita el componente
      return this.processApiResponse(apiData, userName);
    } catch (error) {
      console.error('Error al obtener elementos del menú:', error);
      throw error;
    }
  },

  /**
   * Procesa la respuesta de la API y la convierte al formato necesario para el componente.
   * @param apiData - Respuesta de la API
   * @param userName - Nombre del usuario (opcional)
   * @returns Datos procesados para el menú y usuario
   */
  processApiResponse(apiData: MenuApiResponse[], userName?: string): ProcessedMenuData {
    if (!apiData || apiData.length === 0) {
      return {
        menuItems: [],
        userInfo: { name: userName || 'Usuario', role: 'Sin rol' }
      };
    }

    const userData = apiData[0]; // Asumiendo que siempre viene un elemento
    const menuItems: MenuItem[] = [];

    // Mapeo de módulos a iconos
    const moduleIconMap: Record<string, string> = {
      'inicio': 'home',
      'seguridad': 'security', 
      'administración': 'user-check',
      'Asignar seguimientos': 'chart',
      'configuración': 'settings',
      // Agregar más mapeos según tus módulos
    };

    // Procesar cada módulo y sus formularios
    userData.moduleForm.forEach((module) => {
      const moduleIcon = moduleIconMap[module.name.toLowerCase()] || 'home';
      
      module.form.forEach((formItem, index) => {
        // Generar un ID único combinando módulo y formulario
        const id = `${module.name.toLowerCase().replace(/\s+/g, '-')}-${formItem.name.toLowerCase().replace(/\s+/g, '-')}`;
        
        menuItems.push({
          id,
          name: formItem.name,
          title: formItem.name, // o el valor que corresponda
          path: formItem.path || `/${module.name.toLowerCase()}/${formItem.name.toLowerCase().replace(/\s+/g, '-')}`,
          icon: moduleIcon,
          module: module.name,
          isActive: false,
          children: [] // Si no tiene hijos, usa un array vacío
        });
      });
    });

    return {
      menuItems,
      userInfo: {
        name: userName || 'Usuario',
        role: userData.rol
      }
    };
  }
};