import React from 'react';
import { Bell, ChevronRight } from 'lucide-react';

/**
 * Componente Header
 * Renderiza la barra superior de la aplicación con navegación de migas de pan y botón de notificaciones.
 *
 * Estructura:
 * - Contenedor principal con estilos de fondo, sombra y borde.
 * - Navegación de migas de pan (actualmente vacía, se puede expandir).
 * - Botón de notificaciones con icono y efecto hover.
 *
 * @returns {JSX.Element} Elemento visual del header.
 */
const Header = () => {
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl m-2">
      {/* Contenedor de ancho máximo y padding responsivo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-4">
        <div className="flex items-center justify-between h-16">
          {/* Navegación de migas de pan (Breadcrumb) */}
          <nav className="flex items-center space-x-2 text-sm">
            {/* Aquí se pueden agregar los elementos de navegación */}
          </nav>

          {/* Botón de notificaciones */}
          <button
            className="relative inline-flex items-end px-4 py-2 text-gray-600 hover:text-[#43A047] hover:bg-gray-50 rounded-lg transition-colors duration-200 group"
            /* El botón muestra el icono de campana y el texto 'Notificaciones'. */
          >
            {/* Icono de campana */}
            <Bell className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Notificaciones</span>

            {/* Indicador visual al hacer hover */}
            <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-[#43A047] transition-colors duration-200 opacity-20"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;