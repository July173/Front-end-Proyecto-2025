import React, { useEffect, useState } from 'react';
import { getRolesUser, toggleRoleActive, postRolPermissions } from '../Api/Services/Rol';
import ConfirmModal from './ConfirmModal';
import CardSecurity, { InfoCard } from './CardSecurity';
import type { InfoCardProps } from '../Api/types';
import ModalFormGeneric from './ModalFormGeneric';
import { getForms } from '../Api/Services/Form';

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
  const [showCreate, setShowCreate] = useState(false);
  const [forms, setForms] = useState([]);
  const [loadingForms, setLoadingForms] = useState(true);

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

  useEffect(() => {
    getForms().then(setForms).finally(() => setLoadingForms(false));
  }, []);

  if (loading) return <div className="p-8">Cargando...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  // Campos para el modal de crear rol
  const roleFields = [
    { name: 'type_role', label: 'Nombre del Rol', type: 'text', placeholder: 'Ej: coordinador, aprendiz.' },
    { name: 'description', label: 'Descripcion', type: 'text', placeholder: 'Describe que es lo que va a administrar ese rol' },
    {
      name: 'formularios',
      label: 'Formularios',
      type: 'select',
      options: forms.map(f => ({ value: f.id, label: f.name })),
    },
    // Aquí podrías agregar un checkbox-group para permisos si tienes los ids y nombres
  ];

  const handleCreateRole = async (values) => {
    // Construir el body según el formato requerido
    const data = {
      type_role: values.type_role,
      description: values.description,
      active: true,
      formularios: [
        {
          form_id: Number(values.formularios),
          permission_ids: [], // Aquí deberías mapear los permisos seleccionados
        },
      ],
    };
    try {
      await (data);
      setShowCreate(false);
      // Refrescar lista de roles
      const updated = await getRolesUser();
      setRoles(updated);
    } catch (e) {
      alert(e.message || 'Error al crear el rol');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow">
      <div className="flex justify-end mb-4">
        <button
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded font-semibold shadow"
          onClick={() => setShowCreate(true)}
        >
          <span className="text-xl font-bold">+</span> Registro Rol
        </button>
      </div>
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
      <ModalFormGeneric
        isOpen={showCreate}
        title="Registrar Nuevo Rol-Sena"
        fields={roleFields}
        onClose={() => setShowCreate(false)}
        onSubmit={handleCreateRole}
        submitText="Registrar Rol"
        cancelText="Cancelar"
      />
    </div>
  );
};


export default Roles;
