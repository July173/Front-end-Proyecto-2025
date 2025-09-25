import { useEffect, useState } from 'react';
import { Person } from '../Api/types/entities/person.types';
import { getPersonById } from '../Api/Services/Person';
import { useUserData } from './useUserData';

export const useAprendizData = () => {
  const { userData } = useUserData();
  const [person, setPerson] = useState<Person | null>(null);
  const [aprendizId, setAprendizId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    setLoading(true);
    
    if (userData && userData.person) {
      getPersonById(userData.person)
        .then(async (personData) => {
          setPerson(personData);
          // Consultar aprendices por id de person usando el servicio
          try {
            const aprendizList = await import('../Api/Services/Aprendiz').then(m => m.getAprendicesByPerson(personData.id));
            if (Array.isArray(aprendizList) && aprendizList.length > 0) {
              // Buscar el aprendiz cuyo campo person sea igual al id de la persona actual
              const aprendizCorrecto = aprendizList.find((a: any) => Number(a.person) === Number(personData.id));
              if (aprendizCorrecto) {
                setAprendizId(aprendizCorrecto.id);
              } else {
                setError('No se encontró registro de aprendiz para esta persona');
              }
            } else {
              setError('No se encontró registro de aprendiz para esta persona');
            }
          } catch (err) {
            setError('Error consultando aprendiz');
          }
        })
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
    aprendizId,
    loading,
    error,
  };
};