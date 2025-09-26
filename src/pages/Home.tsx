import AdminDashboardView from "../components/Dashboard/AdminDashboardView";
import AprendizDashboardView from "../components/Dashboard/AprendizDashboardView";
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

  // Mostrar dashboard de aprendiz si el rol es aprendiz
  if (
    userData &&
    (String(userData.role) === "2" || String(userData.role) === "aprendiz" || String(userData.role) === "4")
  ) {
    return <AprendizDashboardView nombre={userData.email || userData.person || "Aprendiz"} />;
  }

  const roleMap: Record<number, "admin" | "coordinator" | "instructor" | "aprendiz"> = {
    1: "admin",
    2: "aprendiz",
    3: "instructor",
    4: "coordinator"
  };

  // Si el rol no existe, muestra admin por defecto
  const role =
    userData && userData.role ? roleMap[Number(userData.role)] ?? "admin" : "admin";

  // Vista por defecto para otros roles
  return (
    <div className="w-full h-full flex items-center justify-center">
      {role === "admin" ? (
        <AdminDashboardView />
      ) : role === "aprendiz" ? (
        <AprendizDashboardView nombre={userData?.email || userData?.person || "Aprendiz"} />
      ) : (
        <div className="text-center text-gray-500">
          No hay vista definida para el rol: {role}
        </div>
      )}
    </div>
  );
};

export default Home;
