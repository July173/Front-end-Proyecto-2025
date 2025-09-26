/**
 * Componente MainLayout
 * Estructura principal de la aplicación con menú lateral, header, contenido y footer.
 *
 * Características:
 * - Muestra el menú lateral con datos del usuario.
 * - Incluye header, área principal (Outlet) y footer.
 * - Muestra pantalla de carga mientras se obtienen los datos del usuario.
 *
 * @returns {JSX.Element} Layout principal renderizado.
 */

import React, { useState } from "react";
import { BsList } from "react-icons/bs";
import { Outlet } from "react-router-dom";
import Header from "../components/MainLayout/Header";
import Menu from "../components/MainLayout/Menu";
import Footer from "../components/MainLayout/Footer";
import { useUserData } from "../hook/useUserData";

export default function MainLayout() {
  const { userData, isLoading } = useUserData();
  const [activeModule, setActiveModule] = useState<string>("");
  const [activeFormName, setActiveFormName] = useState<string>("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Función para obtener el nombre del usuario
  const getUserName = () => {
    if (userData?.email) {
      const emailPart = userData.email.split("@")[0];
      const nameParts = emailPart.split(".");
      return nameParts
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
    }
    return "Usuario";
  };

  // Recibe el click del menú y actualiza el breadcrumb
  const handleMenuItemClick = (form) => {
    setActiveModule(form.moduleName); // Asegúrate que el objeto form tiene moduleName
    setActiveFormName(form.name);
    setShowMobileMenu(false); // Cierra el menú en móvil al seleccionar
  };

  if (isLoading) {
    // 👇 mientras carga, muestra un loading simple
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  // Layout responsive con menú hamburguesa en móvil
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#D9D9D9]">
      {/* Header con botón hamburguesa en móvil */}
      {/* Nav hamburguesa móvil: sticky y siempre visible encima del contenido */}
      <nav className="md:hidden flex items-center justify-between px-4 py-2 bg-white shadow z-50 w-full sticky top-0 left-0">
        <button
          className="text-green-700 text-3xl p-2"
          onClick={() => setShowMobileMenu(true)}
          aria-label="Abrir menú"
        >
          <BsList />
        </button>
        {/* Notificaciones */}
        <div className="flex items-center gap-2">
          <span className="inline-block w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-bold">!</span>
        </div>
      </nav>
      {/* Header normal en desktop */}
      <div className="hidden md:block">
        <Header moduleName={activeModule} formName={activeFormName} />
      </div>

      {/* Menú lateral en desktop */}
      <div className="flex flex-1 w-full">
        <div className="hidden md:block h-screen">
          <Menu
            className="h-screen flex-shrink-0"
            userId={userData!.id}
            userName={getUserName()}
            onMenuItemClick={handleMenuItemClick}
          />
        </div>

        {/* Menú hamburguesa en móvil (deslizable) */}
        {showMobileMenu && (
          <div className="fixed inset-0 z-50 bg-black/40 flex">
            <div className="w-64 bg-gradient-to-br from-green-700 to-green-900 h-full shadow-xl animate-slide-in relative">
              <button
                className="absolute top-4 right-4 text-white text-2xl"
                onClick={() => setShowMobileMenu(false)}
                aria-label="Cerrar menú"
              >
                ×
              </button>
              <Menu
                className="h-full"
                userId={userData!.id}
                userName={getUserName()}
                onMenuItemClick={handleMenuItemClick}
              />
            </div>
            {/* Clic fuera cierra el menú */}
            <div className="flex-1" onClick={() => setShowMobileMenu(false)} />
          </div>
        )}

        {/* Contenido principal */}
        <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
          {/* Header en móvil (breadcrumb, etc) */}
          <div className="md:hidden px-4 py-2">
            <Header moduleName={activeModule} formName={activeFormName} />
          </div>
          <main className="flex-1 p-2 md:p-4 overflow-x-auto">
            {/* Permite scroll horizontal en móvil para tarjetas */}
            <div className="w-full flex flex-col md:flex-row gap-4 md:gap-6 overflow-x-auto">
              <Outlet />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
