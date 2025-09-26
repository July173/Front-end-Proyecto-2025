import AdminDashboardView from "../components/Dashboard/AdminDashboardView";
import AprendizDashboardView from "../components/Dashboard/AprendizDashboardView";
import InstructorDashboard from "../components/Dashboard/InstructorDashboard";
import GenericDashboardView from "../components/Dashboard/GenericDashboardView";
import { useUserData } from "../hook/useUserData";

export const Home = () => {
  const { userData, isLoading } = useUserData();
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
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Mapeo de roles
  // 1: admin, 2: aprendiz, 3: instructor, 4: coordinator
  const roleMap: Record<string | number, "admin" | "coordinator" | "instructor" | "aprendiz"> = {
    1: "admin",
    2: "aprendiz",
    3: "instructor",
    4: "coordinator",
    "admin": "admin",
    "aprendiz": "aprendiz",
    "instructor": "instructor",
    "coordinator": "coordinator"
  };

  const roleRaw = userData?.role;
  const role = roleMap[roleRaw] || null;

  // Renderizar vista según el rol
  if (role === "admin") {
    return <AdminDashboardView />;
  }
  if (role === "aprendiz") {
    return <AprendizDashboardView nombre={getUserName()} />;
  }
  if (role === "instructor") {
    return <InstructorDashboard />;
  }
  if (role === "coordinator") {
    // Si tienes una vista específica para coordinador, ponla aquí
    // return <CoordinatorDashboardView nombre={getUserName()} />;
    return <AdminDashboardView/>;
  }

  // Vista genérica para roles no reconocidos
  return <GenericDashboardView nombre={getUserName()} />;
};

export default Home;
