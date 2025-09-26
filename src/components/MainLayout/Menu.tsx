/**
 * Props para el componente Menu.
 * @typedef SidebarMenuProps
 * @property {string} userId - ID del usuario autenticado.
 * @property {string} userName - Nombre del usuario autenticado.
 * @property {(form: MenuItem) => void} [onMenuItemClick] - Callback al seleccionar un formulario.
 * @property {string} [className] - Clases CSS adicionales para el menú.
 * @property {(path: string) => void} [onNavigate] - Callback para navegación personalizada.
 */
/**
 * Componente Menu
 * Renderiza el menú lateral principal de la aplicación, mostrando módulos y formularios disponibles para el usuario.
 *
 * Características:
 * - Agrupa formularios por módulo y permite expandir/cerrar módulos.
 * - Resalta el módulo y formulario activo.
 * - Muestra información del usuario y permite ver perfil/cerrar sesión.
 * - Modal popover para acciones de usuario.
 * - Utiliza iconos personalizados según el módulo.
 *
 * @param {SidebarMenuProps} props - Propiedades del menú.
 * @returns {JSX.Element} Menú lateral renderizado.
 */


import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, LogOut } from 'lucide-react';
import { 
  House, 
  Shield, 
  PersonCheck, 
  Person, 
  BarChart, 
  Gear,
  Fingerprint,
  PersonWorkspace
} from 'react-bootstrap-icons';
import { menu } from '../../Api/Services/Menu';
import { MenuItem, MenuUserInfo, SidebarMenuProps } from '../../Api/types/entities/menu.types';
import { useUserData } from '../../hook/useUserData';
import { useNavigate } from "react-router-dom";
import logo from '/public/logo.png';

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  'home': House,
  'inicio': House,
  'security': Fingerprint,
  'seguridad': Fingerprint,
  'user-check': PersonCheck,
  'administración': PersonCheck,
  'asignar seguimiento': PersonWorkspace,
  'asignar seguimientos': PersonWorkspace,
  'user': Person,
  'chart': BarChart,
  'reportes': BarChart,
  'settings': Gear,
  'configuración': Gear,
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
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});
  const [showModal, setShowModal] = useState(false);

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

  // abre el modal justo encima del botón, dentro del contenedor del menú
  const handleOpenModal = () => {
    setShowModal(true);
  };

  //  cerrar al hacer clic fuera
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
  <div className={`w-64 rounded-xl bg-[linear-gradient(to_bottom_right,_#43A047,_#2E7D32)] text-white flex flex-col m-2 relative ${className} md:h-screen h-auto`}> 
      {/* Header */}
      <div className="p-6 flex items-center gap-3 flex-shrink-0">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center">
          <img src={logo} alt="Logo" className="w-10 h-10" />
        </div>
        <h1 className="text-white font-semibold">Autogestión CIES</h1>
      </div>

      {/* Scrollable menu area */}
      <div className="flex-1 flex flex-col min-h-0">
        <nav className="flex-1 px-4 overflow-y-auto min-h-0 max-h-[calc(100vh-180px)] md:max-h-none">
          <ul className="space-y-2">
            {orderedModules.map(([moduleName, forms]) => {
              const IconComponent = iconMap[moduleName.toLowerCase()] || House;
              const isOpen = openModules[moduleName] || false;
              const isInicio = moduleName.toLowerCase() === 'inicio';
              const isActiveModule = activeModule === moduleName;
              
              // Si es "Inicio", renderizar como botón directo sin submódulos
              if (isInicio) {
                return (
                  <li key={moduleName}>
                    <button
                      onClick={() => {
                        setActiveModule(moduleName);
                        setActiveItem(null);
                        if (onMenuItemClick) onMenuItemClick({ moduleName, name: '' }); // <-- Solo módulo, sin formulario
                        if (onNavigate) {
                          onNavigate('/home');
                        } else {
                          navigate('/home');
                        }
                      }}
                      className={`w-full flex items-start gap-2 px-4 py-3 rounded-lg text-left transition-colors ${
                        isActiveModule 
                          ? "bg-white/20 text-white" 
                          : "hover:bg-white/10"
                      }`}
                    >
                      <IconComponent className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span className="font-medium leading-tight">{moduleName}</span>
                    </button>
                  </li>
                );
              }
              
              // Para otros módulos, mantener la funcionalidad expandible
              return (
                <li key={moduleName}>
                  <button
                    onClick={() => {
                      setOpenModules(prev => ({ ...prev, [moduleName]: !prev[moduleName] }));
                      setActiveModule(moduleName);
                    }}
                    className={`w-full flex items-start justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                      isActiveModule 
                        ? "bg-white/20 text-white" 
                        : "hover:bg-white/10"
                    }`}
                  >
                    <span className="flex items-start gap-2 flex-1">
                      <IconComponent className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span className="font-medium leading-tight">{moduleName}</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 transform transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <ul className="ml-8 mt-2 space-y-1">
                      {forms.map(form => {
                        const isActive = activeItem === form.id;
                        return (
                          <li key={form.id}>
                            <button
                              onClick={() => {
                                setActiveItem(form.id);
                                setActiveModule(moduleName); // Mantener módulo activo
                                if (onMenuItemClick) onMenuItemClick({ ...form, moduleName }); // <-- ENVÍA EL MÓDULO Y FORMULARIO
                                if (onNavigate) {
                                  onNavigate(form.path);
                                } else {
                                  navigate(form.path);
                                }
                              }}
                              className={`w-full flex items-center gap-2 px-2 py-1 rounded-lg text-xs md:text-sm whitespace-nowrap ${
                                isActive
                                  ? "bg-white/20 text-white"
                                  : "text-white/80 hover:bg-white/10"
                              }`}
                            >
                              <span className="w-4 h-4 flex items-center justify-center text-white/80">•</span>
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

        {/* User Info fijo abajo con borde superior */}
        <div
          ref={userBtnRef}
          onClick={handleOpenModal}
          className="p-4 border-t border-white/20 cursor-pointer hover:bg-white/10 flex-shrink-0"
          style={{
            background: '',
            zIndex: 10,
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
            position: 'sticky',
            bottom: 0,
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#D9D9D9] rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">
                {userInfo.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{userInfo.name}</p>
              <div className="inline-block bg-[#0F172A] text-[#61F659] text-xs px-2 py-1 rounded-full mt-1">
                {userInfo.role}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal estilo popover */}
      {showModal && (
        <div
          ref={modalRef}
          className="absolute bottom-20 left-4 right-4 z-50 bg-white rounded-xl shadow-lg p-4"
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
            <Person className="w-4 h-4" />
            Ver perfil
          </button>

          {/* Rol */}
          <div className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-4 pl-1">
            <PersonCheck className="w-4 h-4" />
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
