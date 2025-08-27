import React, { useState, useEffect } from 'react';
import { Home, Shield, UserCheck, User, BarChart, Settings, ChevronDown, LogOut } from 'lucide-react';
import { menu } from '../Api/Services/Menu';
import { MenuItem, MenuUserInfo, SidebarMenuProps } from '../Api/types/index';
import { useNavigate } from "react-router-dom";
import logo from '/public/logo.png'; // Asegúrate de tener una imagen de logo en esta ruta


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
  // Hook para limpiar sesión
  const handleLogout = () => {
    localStorage.removeItem('user_data');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    if (onNavigate) {
      onNavigate('login');
    } else {
      navigate('/login');
    }
  };

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

  // Agrupar los menuItems por módulo
  const groupedModules: Record<string, MenuItem[]> = {};
  menuItems.forEach(item => {
    if (!groupedModules[item.module]) groupedModules[item.module] = [];
    groupedModules[item.module].push(item);
  });

  // Ordenar los módulos para que 'Inicio' aparezca primero
  const orderedModules = Object.entries(groupedModules).sort(([a], [b]) => {
    if (a.toLowerCase() === 'inicio') return -1;
    if (b.toLowerCase() === 'inicio') return 1;
    return a.localeCompare(b);
  });

  return (
  <div className={`w-64 rounded-xl bg-[#16A34A] text-white flex flex-col   ${className}`}> 
      {/* Header */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-12 h-12  rounded-lg flex items-center justify-center">
          <img src={logo} alt="Logo" className="w-8 h-8" />
        </div>
        <h1 className="text-white font-semibold ">Autogestión CIES</h1>
      </div>

      {/* Menu con módulos y formularios */}
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {orderedModules.map(([moduleName, forms]) => {
            const IconComponent = iconMap[moduleName.toLowerCase()] || Home;
            const isOpen = openModules[moduleName] || false;
            return (
              <li key={moduleName}>
                {/* Botón del módulo */}
                <button
                  onClick={() => {
                    setOpenModules(prev => ({ ...prev, [moduleName]: !prev[moduleName] }));
                  }}
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
                            onClick={() => {
                              setActiveItem(form.id);
                              if (onMenuItemClick) onMenuItemClick(form);
                              if (onNavigate) {
                                onNavigate(form.path);
                              } else {
                                navigate(form.path);
                              }
                            }}
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
