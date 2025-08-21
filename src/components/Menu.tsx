import React, { useState, useEffect } from 'react';
import { Home, Shield, UserCheck, User, BarChart, Settings, ChevronDown, LogOut } from 'lucide-react';
import { menu } from '../Api/Services/Menu';
import { MenuItem, MenuUserInfo, SidebarMenuProps } from '../Api/types/index';
import { useNavigate } from "react-router-dom";

// Mapeo de iconos
const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  'home': Home,
  'inicio': Home,
  'security': Shield,
  'seguridad': Shield,
  'user-check': UserCheck,
  'administración': UserCheck,
  'user': User,
  'chart': BarChart,
  'reportes': BarChart,
  'settings': Settings,
  'configuración': Settings,
};

const Menu: React.FC<SidebarMenuProps> = ({ 
  userId, 
  userName,
  onMenuItemClick,
  className = '',
  onNavigate
}) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [userInfo, setUserInfo] = useState<MenuUserInfo>({ name: 'Cargando...', role: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await menu.getMenuItems(userId, userName);
        
        setMenuItems(data.menuItems);
        setUserInfo(data.userInfo);
        
      } catch (err) {
        setError('Error al cargar el menú');
        console.error('Error loading menu:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchMenuData();
    }
  }, [userId, userName]);

  const handleMenuItemClick = (item: MenuItem) => {
    setActiveItem(item.id);
    onMenuItemClick?.(item);
    navigate(item.path); 
  };

  const toggleModule = (moduleName: string) => {
    setOpenModules(prev => ({
      ...prev,
      [moduleName]: !prev[moduleName]
    }));
  };

  const handleLogout = () => {
    localStorage.clear();
    if (onNavigate) {
      onNavigate('login');
    } else {
      navigate("/login");
    }
  };

  // Agrupar por módulos
  const groupedModules = menuItems.reduce<Record<string, MenuItem[]>>((acc, item) => {
    if (!acc[item.module]) acc[item.module] = [];
    acc[item.module].push(item);
    return acc;
  }, {});

  if (loading) return <div className="w-64 bg-[#43A047] text-white flex items-center justify-center min-h-screen">Cargando...</div>;
  if (error) return <div className="w-64 bg-[#43A047] text-white flex items-center justify-center min-h-screen">Error</div>;

  return (
    <div className={`w-64 bg-[#43A047] text-white min-h-screen flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-[#43A047]">
            <path d="M12 2L2 7V10C2 16 12 22 12 22S22 16 22 10V7L12 2Z"/>
          </svg>
        </div>
        <h1 className="text-white font-semibold text-lg">Autogestión CIES</h1>
      </div>

      {/* Menu con módulos y formularios */}
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {Object.entries(groupedModules).map(([moduleName, forms]) => {
            const IconComponent = iconMap[moduleName.toLowerCase()] || Home;
            const isOpen = openModules[moduleName] || false;

            return (
              <li key={moduleName}>
                {/* Botón del módulo */}
                <button
                  onClick={() => toggleModule(moduleName)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-left hover:bg-white/10"
                >
                  <span className="flex items-center gap-2">
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{moduleName}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 transform transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Formularios dentro */}
                {isOpen && (
                  <ul className="ml-8 mt-2 space-y-1">
                    {forms.map(form => {
                      const FormIcon = iconMap[form.icon] || Home;
                      const isActive = activeItem === form.id;
                      return (
                        <li key={form.id}>
                          <button
                            onClick={() => handleMenuItemClick(form)}
                            className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm ${
                              isActive ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10"
                            }`}
                          >
                            <FormIcon className="w-4 h-4" />
                            {form.name}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info + Logout */}
      <div className="p-4 border-t border-white/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {userInfo.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium truncate">{userInfo.name}</p>
            <p className="text-white/70 text-sm truncate">{userInfo.role}</p>
          </div>
        </div>

        {/* Botón cerrar sesión */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Menu;
