import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import * as Icons from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";
import { MenuItem, MenuUserInfo, AppSidebarProps } from "@/Api/types";
import { FC, SVGProps } from "react";

export function AppSidebar({ user, menuItems, collapsed = false }: AppSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["main"]);

  const isActive = (path: string) => currentPath === path;

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const getIconComponent = (iconName: string): FC<SVGProps<SVGSVGElement>> => {
    return (Icons[iconName as keyof typeof Icons] as FC<SVGProps<SVGSVGElement>>) || Icons.Circle;
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const Icon = getIconComponent(item.icon);
    const hasChildren = item.children && Array.isArray(item.children) && item.children.length > 0;
    const isExpanded = expandedGroups.includes(item.id);
    const isCurrentActive = item.path ? isActive(item.path) : false;

    if (hasChildren) {
      return (
        <div key={item.id} className="space-y-1">
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => toggleGroup(item.id)}
              className={cn(
                "w-full justify-between transition-all duration-200",
                "hover:bg-sidebar-accent/20 text-sidebar-foreground",
                isExpanded && "bg-sidebar-accent/30"
              )}
            >
              <div className="flex items-center">
                <Icon className="mr-3 h-4 w-4 flex-shrink-0" />
                {!collapsed && <span className="font-medium">{item.title || item.name}</span>}
              </div>
              {!collapsed && (
                <Icons.ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    isExpanded && "rotate-180"
                  )}
                />
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
          {!collapsed && isExpanded && (
            <div className="ml-4 space-y-1 animate-fade-in">
              {Array.isArray(item.children) &&
                item.children.map((child: MenuItem) => renderMenuItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <SidebarMenuItem key={item.id}>
        <SidebarMenuButton asChild>
          <NavLink
            to={item.path || "#"}
            className={({ isActive }) => cn(
              "flex items-center w-full transition-all duration-200",
              "hover:bg-sidebar-accent/20 text-sidebar-foreground",
              level > 0 && "text-sm pl-2",
              isActive && "bg-sidebar-accent font-semibold shadow-sm"
            )}
          >
            <Icon className="mr-3 h-4 w-4 flex-shrink-0" />
            {!collapsed && <span>{item.title || item.name}</span>}
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar className={cn("border-r-0 transition-all duration-300", collapsed ? "w-16" : "w-64")}> 
      <SidebarContent className="bg-sidebar">
        {/* Header con logo y trigger */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border/20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-sidebar-accent rounded-lg flex items-center justify-center">
              <Icons.TreePine className="w-5 h-5 text-sidebar-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-sidebar-foreground font-bold text-sm">Autogestion CIES</h2>
              </div>
            )}
          </div>
          <SidebarTrigger className="text-sidebar-foreground hover:bg-sidebar-accent/20" />
        </div>

        {/* Menú principal */}
        <SidebarGroup>
          <SidebarGroupContent className="px-2">
            <SidebarMenu className="space-y-2">
              {menuItems.map(item => renderMenuItem(item))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Usuario en la parte inferior */}
        <div className="mt-auto p-4 border-t border-sidebar-border/20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-sidebar-accent rounded-full flex items-center justify-center">
              <Icons.User className="w-4 h-4 text-sidebar-foreground" />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sidebar-foreground font-medium text-sm truncate">
                  {user.name}
                </p>
                <p className="text-sidebar-foreground/70 text-xs truncate">
                  {user.role}
                </p>
              </div>
            )}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}