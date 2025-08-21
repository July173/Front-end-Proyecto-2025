import { useState, useEffect } from 'react';

interface UserData {
  id: string;
  email: string;
  role?: number;
  access_token: string;
}

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