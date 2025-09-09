import React, { useEffect, useState } from 'react';
import { getRolesUser, toggleRoleActive } from '../Api/Services/Rol';
import ConfirmModal from './ConfirmModal';
import CardSecurity, { InfoCard } from './CardSecurity';
import type { InfoCardProps } from '../Api/types';

interface RolUsuario {
  id: number;
  nombre: string;
  descripcion: string;
  active: boolean;
  cantidad_usuarios: number;
}

const Roles = () => {
  const [roles, setRoles] = useState<RolUsuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingRole, setPendingRole] = useState<RolUsuario | null>(null);

  const handleActionClick = (rol: RolUsuario) => {
    setPendingRole(rol);
    setShowConfirm(true);
  };

  const handleConfirmAction = async () => {
    if (!pendingRole) return;
    setShowConfirm(false);
    try {
      await toggleRoleActive(pendingRole.id, pendingRole.active);
      // Refrescar lista
      const updated = await getRolesUser();
      setRoles(updated);
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert(e.message || 'No se pudo cambiar el estado del rol');
      } else {
        alert('No se pudo cambiar el estado del rol');
      }
    }
    setPendingRole(null);
  };

  useEffect(() => {
    getRolesUser()
      .then(setRoles)
      .catch(() => setError('Error al cargar los roles'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8">Cargando...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Gestión de Roles - Sena</h2>
      <div className="flex gap-4 flex-wrap">
        {roles.map((rol) => {
          const cardProps: InfoCardProps = {
            title: rol.nombre,
            statusLabel: rol.active ? rol.cantidad_usuarios.toString() : 'Inhabilitado',
            statusColor: rol.active ? 'green' : 'red',
            description: rol.descripcion,
            count: rol.cantidad_usuarios,
            buttonText: 'Ajustar',
            onButtonClick: () => alert(`Ajustar ${rol.nombre}`),
            actionLabel: rol.active ? 'Inhabilitar' : 'Habilitar',
            actionType: rol.active ? 'disable' : 'enable',
            onActionClick: () => handleActionClick(rol),
          };
          return <InfoCard key={rol.id} {...cardProps} />;
        })}
      </div>
      <ConfirmModal
        isOpen={showConfirm}
        title={pendingRole?.active ? '¿Inhabilitar rol?' : '¿Habilitar rol?'}
        message={pendingRole?.active
          ? `¿Seguro que deseas inhabilitar el rol "${pendingRole?.nombre}"?`
          : `¿Seguro que deseas habilitar el rol "${pendingRole?.nombre}"?`}
        confirmText="Sí, confirmar"
        cancelText="Cancelar"
        onConfirm={handleConfirmAction}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
};


export default Roles;
