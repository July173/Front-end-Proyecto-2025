
/**
 * Hook personalizado para obtener y gestionar los datos del usuario autenticado desde localStorage.
 * Permite acceder al usuario, saber si está autenticado, controlar el estado de carga y cerrar sesión.
 *
 * Uso:
 * - Llama a `useUserData()` en tus componentes para acceder a los datos del usuario y funciones de logout.
 * - El estado `isLoading` indica si los datos están siendo cargados.
 * - La función `logout` elimina los datos de sesión y tokens.
 */
import { useState, useEffect } from 'react';

interface UserData {
  id: string;
  email: string;
  role?: number;
  person?: string; // id de la persona asociada
  access_token: string;
}

/**
 * Hook useUserData
 * Proporciona acceso y gestión de los datos del usuario autenticado.
 *
 * @returns {Object} Estado y funciones para el usuario autenticado.
 */
export const useUserData = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = () => {
      try {
        const storedData = localStorage.getItem('user_data');
        if (storedData) {
          const parsed = JSON.parse(storedData);
          setUserData(parsed);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const logout = () => {
    localStorage.removeItem('user_data');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUserData(null);
  };

  return {
    userData,
    isLoading,
    isAuthenticated: !!userData,
    logout
  };
};