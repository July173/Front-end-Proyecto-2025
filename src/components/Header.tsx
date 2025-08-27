import React from 'react';
import { Bell, ChevronRight } from 'lucide-react';

const Header = () => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-sm">
            
          </nav>

          {/* Notifications Button */}
          <button
            className="relative inline-flex items-center px-4 py-2 text-gray-600 hover:text-[#43A047] hover:bg-gray-50 rounded-lg transition-colors duration-200 group"
          >
            <Bell className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Notificaciones</span>
            
          
            {/* Hover indicator */}
            <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-[#43A047] transition-colors duration-200 opacity-20"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;