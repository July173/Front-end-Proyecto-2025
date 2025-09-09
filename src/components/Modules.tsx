import React, { useEffect, useState } from 'react';
import { getModules } from '../Api/Services/Module';
import { InfoCard } from './CardSecurity';
import type { InfoCardProps } from '../Api/types';

interface Module {
  id: number;
  name: string;
  description: string;
  active: boolean;
}

const Modules = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getModules()
      .then(setModules)
      .catch(() => setError('Error al cargar los módulos'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8">Cargando...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Módulos</h2>
      <div className="flex gap-4 flex-wrap">
        {modules.map((mod) => {
          const cardProps: InfoCardProps = {
            title: mod.name,
            statusLabel: mod.active ? 'Activo' : 'Inhabilitado',
            statusColor: mod.active ? 'green' : 'red',
            description: mod.description,
            count: undefined, // No mostrar usuarios asignados
            buttonText: 'Ajustar',
            onButtonClick: () => alert(`Ajustar ${mod.name}`),
            actionLabel: mod.active ? 'Inhabilitar' : 'Habilitar',
            actionType: mod.active ? 'disable' : 'enable',
            onActionClick: () => alert(`${mod.active ? 'Inhabilitar' : 'Habilitar'} módulo ${mod.name}`),
          };
          return <InfoCard key={mod.id} {...cardProps} />;
        })}
      </div>
    </div>
  );
};

export default Modules;
