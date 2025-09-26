import React from 'react';
import { Bell, ChevronRight } from 'lucide-react';

interface HeaderProps {
  moduleName?: string;
  formName?: string;
}

const Header: React.FC<HeaderProps> = ({ moduleName, formName }) => {
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl m-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-4">
        <div className="flex items-center justify-between h-16">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            {moduleName && (
              <>
                <span>{moduleName}</span>
                {formName && (
                  <>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span>{formName}</span>
                  </>
                )}
              </>
            )}
          </nav>

          {/* Botón de notificaciones */}
          <button
            className="relative inline-flex items-end px-4 py-2 text-gray-600 hover:text-[#43A047] hover:bg-gray-50 rounded-lg transition-colors duration-200 group"
          >
            <Bell className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Notificaciones</span>
            <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-[#43A047] transition-colors duration-200 opacity-20"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;