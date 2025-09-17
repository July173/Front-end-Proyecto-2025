import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import { useUserData } from "../hook/useUserData";

export default function MainLayout() {
  const { userData, isLoading } = useUserData();
  console.log("MainLayout renderizado", { userData, isLoading });
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

  if (isLoading) {
    // 👇 mientras carga, muestra un loading simple
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  // 👇 ahora sí el layout siempre devuelve la estructura
  return (
    <div className="flex h-screen w-full">
      <Menu className="h-screen flex-shrink-0" userId={userData!.id} userName={getUserName()} />
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <Header />
        <main className="flex-1 p-4 bg-[#D9D9D9]">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
