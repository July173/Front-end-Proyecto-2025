// src/hooks/useIdleTimer.ts
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useIdleTimer(timeout: number = 1 * 60 * 1000) {
  const navigate = useNavigate();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const logout = () => {
      localStorage.removeItem("user_data"); // limpia sesión
      alert("Tu sesión ha expirado por inactividad");
      navigate("/"); // redirige al login
    };

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(logout, timeout);
    };

    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer(); // iniciar temporizador

    return () => {
      clearTimeout(timer);
      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [navigate, timeout]);
}
