import { useEffect, useState } from 'react';
import { Person } from '../Api/types/entities/person.types';
import { getPersonById } from '../Api/Services/Person';
import { useUserData } from './useUserData';

export const useAprendizData = () => {
  const { userData } = useUserData();
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    setLoading(true);
    
    if (userData && userData.person) {
      getPersonById(userData.person)
        .then(setPerson)
        .catch(() => setError('No se pudo cargar la información del aprendiz'))
        .finally(() => setLoading(false));
    } else if (userData && !userData.person) {
      setError('No se encontró el id de persona en la sesión');
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [userData]);

  return {
    person,
    userData,
    loading,
    error
  };
};