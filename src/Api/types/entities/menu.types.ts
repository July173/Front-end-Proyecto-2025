/**
 * Tipos e interfaces para la entidad Menú y navegación.
 * Incluye estructura de menú, usuario y datos procesados para el sidebar.
 */
/**
 * Tipos e interfaces para la entidad Menú y navegación.
 * Incluye estructura de menú, usuario y datos procesados para el sidebar.
 */
import { ReactNode } from 'react';

export interface MenuApiResponse {
  rol: string;
  moduleForm: import('./module.types').ModuleForm[];
}

export interface MenuItem {
  children: MenuItem[];
  title: ReactNode;
  id: string;
  name: string;
  path: string;
  icon: string;
  module: string;
  isActive?: boolean;
}

export interface MenuUserInfo {
  name: string;
  role: string;
  avatar?: string;
  email?: string;
}

export interface ProcessedMenuData {
  menuItems: MenuItem[];
  userInfo: MenuUserInfo;
}

export interface AppSidebarProps {
  user: MenuUserInfo;
  menuItems: MenuItem[];
  collapsed?: boolean;
}

export interface SidebarMenuProps {
  userId: string | number;
  userName?: string;
  onMenuItemClick?: (item: MenuItem) => void;
  className?: string;
  onNavigate?: (view: string) => void;
}
