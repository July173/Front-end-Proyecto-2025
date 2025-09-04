import React, { useState, useEffect, useRef } from 'react';
import { Home, Shield, UserCheck, User, BarChart, Settings, ChevronDown, LogOut } from 'lucide-react';
import { menu } from '../Api/Services/Menu';
import { MenuItem, MenuUserInfo, SidebarMenuProps } from '../Api/types/index';
import { useUserData } from '../hook/useUserData';
import { useNavigate } from "react-router-dom";
import logo from '/public/logo.png';

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
  const [showModal, setShowModal] = useState(false);
  const [modalPos, setModalPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  // Obtener email real del usuario
  const { userData } = useUserData();

  const userBtnRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user_data');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    if (onNavigate) {
      onNavigate('login');
    } else {
      navigate('/');
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

  const groupedModules: Record<string, MenuItem[]> = {};
  menuItems.forEach(item => {
    if (!groupedModules[item.module]) groupedModules[item.module] = [];
    groupedModules[item.module].push(item);
  });

  const orderedModules = Object.entries(groupedModules).sort(([a], [b]) => {
    if (a.toLowerCase() === 'inicio') return -1;
    if (b.toLowerCase() === 'inicio') return 1;
    return a.localeCompare(b);
  });

  // 👉 abre el modal justo encima del botón
  const handleOpenModal = () => {
    if (userBtnRef.current) {
      const rect = userBtnRef.current.getBoundingClientRect();
      setModalPos({
        top: rect.top + window.scrollY - 200, // ajusta 200 según el alto real de tu modal
        left: rect.left + window.scrollX,
      });
      setShowModal(true);
    }
  };

  // 👉 cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        !userBtnRef.current?.contains(e.target as Node)
      ) {
        setShowModal(false);
      }
    };
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  return (
    <div className={`w-64 rounded-xl bg-[#16A34A] text-white flex flex-col m-2 relative ${className}`}> 
      {/* Header */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center">
          <img src={logo} alt="Logo" className="w-10 h-10" />
        </div>
        <h1 className="text-white font-semibold">Autogestión CIES</h1>
      </div>

      {/* Menu principal */}
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {orderedModules.map(([moduleName, forms]) => {
            const IconComponent = iconMap[moduleName.toLowerCase()] || Home;
            const isOpen = openModules[moduleName] || false;
            return (
              <li key={moduleName}>
                <button
                  onClick={() =>
                    setOpenModules(prev => ({ ...prev, [moduleName]: !prev[moduleName] }))
                  }
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-left hover:bg-white/10"
                >
                  <span className="flex items-center gap-2">
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{moduleName}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transform transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
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
                              isActive
                                ? "bg-white/20 text-white"
                                : "text-white/80 hover:bg-white/10"
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

      {/* User Info -> abre modal */}
      <div
        ref={userBtnRef}
        onClick={handleOpenModal}
        className="p-4 border-t border-white/20 cursor-pointer hover:bg-white/10"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#D9D9D9] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {userInfo.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium truncate">{userInfo.name}</p>
            <p className="text-white/70 text-sm truncate">{userInfo.role}</p>
          </div>
        </div>
      </div>

      {/* Modal estilo popover */}
      {showModal && (
        <div
          ref={modalRef}
          className="absolute z-50 bg-white rounded-xl shadow-lg w-72 p-4"
          style={{ top: modalPos.top, left: modalPos.left }}
        >
          {/* Info usuario: nombre y correo */}
          <div className="flex flex-col items-start mb-4">
            <span className="text-gray-800 font-semibold text-base leading-tight">
              {userInfo.name}
            </span>
            <span className="text-gray-500 text-sm leading-tight break-all">
              {userData?.email || ''}
            </span>
          </div>

          {/* Botón ver perfil */}
          <button
            onClick={() => {
              navigate("/perfil");
              setShowModal(false);
            }}
            className="w-full flex items-center gap-2 py-2 px-3 rounded-lg text-gray-700 hover:bg-green-50 mb-2"
          >
            <User className="w-4 h-4" />
            Ver perfil
          </button>

          {/* Rol */}
          <div className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-4 pl-1">
            <UserCheck className="w-4 h-4" />
            {userInfo.role}
            {userInfo.role && (
              <span className="ml-1 w-2 h-2 bg-green-500 rounded-full inline-block"></span>
            )}
          </div>

          {/* Botón cerrar sesión */}
          <button
            onClick={handleLogout}
            className="w-full py-2 px-3 rounded-lg bg-[#EE7878] hover:bg-red-600 flex items-center gap-2 text-black"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
