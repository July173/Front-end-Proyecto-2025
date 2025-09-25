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
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import { useUserData } from "../hook/useUserData";

export default function MainLayout() {
  const { userData, isLoading } = useUserData();
  const [activeModule, setActiveModule] = useState<string>("");
  const [activeFormName, setActiveFormName] = useState<string>("");

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
  };

  if (isLoading) {
    // 👇 mientras carga, muestra un loading simple
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  // 👇 ahora sí el layout siempre devuelve la estructura
  return (
    <div className="flex h-screen  w-full bg-[#D9D9D9]">
      <Menu
        className="h-screen flex-shrink-0 "
        userId={userData!.id}
        userName={getUserName()}
        onMenuItemClick={handleMenuItemClick}
      />
      <div className="flex-1 overflow-y-auto ">
        <Header moduleName={activeModule} formName={activeFormName} />
        <main className="flex-1 p-4 ">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
