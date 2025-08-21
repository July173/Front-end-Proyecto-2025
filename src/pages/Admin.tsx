import React from 'react'
import SidebarMenu from "../components/Menu"; 
import { useUserData } from "../hook/useUserData";


export const Admin = () => {
  const { userData, isLoading } = useUserData();

  // Función para obtener el nombre del usuario
  const getUserName = () => {
    if (userData?.email) {
      const emailPart = userData.email.split('@')[0];
      const nameParts = emailPart.split('.');
      return nameParts
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
    }
    return 'Usuario';
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar dinámico */}
      <SidebarMenu 
        userId={userData!.id}
        userName={getUserName()}
      />
      <main className="flex-1 bg-white p-8">
        <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
        <p>Aquí puedes gestionar usuarios, roles y permisos.</p>
      </main>
    </div>
  )
}

