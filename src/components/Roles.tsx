import React, { useEffect, useState } from 'react';
import { getRolesUser, toggleRoleActive, postRolPermissions } from '../Api/Services/Rol';
import ConfirmModal from './ConfirmModal';
import CardSecurity, { InfoCard } from './CardSecurity';
import type { InfoCardProps } from '../Api/types';
import ModalFormGeneric from './ModalFormGeneric';
import { getForms } from '../Api/Services/Form';
import { getPermissions } from '../Api/Services/Permission';

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
  const [permissions, setPermissions] = useState([]);
  const [loadingPermissions, setLoadingPermissions] = useState(true);
  const [pendingRoleData, setPendingRoleData] = useState(null);
  const [showCreateConfirm, setShowCreateConfirm] = useState(false);
  // Estado para el acordeón de formularios en el modal
  const [openFormId, setOpenFormId] = useState(null);

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
    getPermissions().then(setPermissions).finally(() => setLoadingPermissions(false));
  }, []);

  if (loading) return <div className="p-8">Cargando...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  // Campos para el modal de crear rol (permite asignar permisos por formulario)
  const roleFields = [
    { name: 'type_role', label: 'Nombre del Rol', type: 'text', placeholder: 'Ej: coordinador, aprendiz.' },
    { name: 'description', label: 'Descripcion', type: 'text', placeholder: 'Describe que es lo que va a administrar ese rol' },
    {
      name: 'formularios_permisos',
      label: 'Formularios y Permisos',
      type: 'custom-permissions',
      forms,
      permissions,
    },
  ];

  // Al enviar el form, primero mostrar confirmación
  const handleCreateRole = (values) => {
    // values.formularios_permisos = { [form_id]: [permission_id, ...], ... }
    const formularios = Object.entries(values.formularios_permisos || {})
      .filter(([formId, perms]) => Array.isArray(perms) && perms.length > 0)
      .map(([formId, perms]) => ({
        form_id: Number(formId),
        permission_ids: Array.isArray(perms) ? perms.map(Number) : []
      }));
    const data = {
      type_role: values.type_role,
      description: values.description,
      active: true,
      formularios,
    };
    setPendingRoleData(data);
    setShowCreateConfirm(true);
  };

  // Si confirma, hacer el POST
  const handleConfirmCreateRole = async () => {
    if (!pendingRoleData) return;
    try {
      await postRolPermissions(pendingRoleData);
      setShowCreate(false);
      setShowCreateConfirm(false);
      setPendingRoleData(null);
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
        customRender={({ values, setValues }) => (
          <div className="space-y-4">
            {forms.map(form => {
              const formChecked = Array.isArray(values.formularios_permisos?.[form.id]) && values.formularios_permisos[form.id].length > 0;
              const allPermsChecked = permissions.length > 0 && Array.isArray(values.formularios_permisos?.[form.id]) && permissions.every(perm => values.formularios_permisos[form.id].includes(perm.id));
              const isOpen = openFormId === form.id;
              return (
                <div key={form.id} className="border rounded-lg mb-2 bg-gray-50">
                  <div className="flex items-center p-4 cursor-pointer select-none" onClick={() => setOpenFormId(isOpen ? null : form.id)}>
                    <span className={`mr-2 transition-transform ${isOpen ? 'rotate-90' : ''}`}>▶</span>
                    <input
                      type="checkbox"
                      checked={formChecked}
                      onClick={e => e.stopPropagation()}
                      onChange={e => {
                        setValues(prev => {
                          let newPerms = [];
                          if (e.target.checked) {
                            newPerms = permissions.map(perm => perm.id);
                          }
                          return {
                            ...prev,
                            formularios_permisos: {
                              ...prev.formularios_permisos,
                              [form.id]: newPerms
                            }
                          };
                        });
                      }}
                    />
                    <span className="font-semibold ml-2">{form.name}</span>
                    <button
                      type="button"
                      className="ml-4 text-xs text-blue-600 underline"
                      onClick={e => {
                        e.stopPropagation();
                        // Toggle all permissions for this form
                        setValues(prev => {
                          const prevPerms = Array.isArray(prev.formularios_permisos?.[form.id]) ? prev.formularios_permisos[form.id] : [];
                          let newPerms = [];
                          if (prevPerms.length < permissions.length) {
                            newPerms = permissions.map(perm => perm.id);
                          }
                          return {
                            ...prev,
                            formularios_permisos: {
                              ...prev.formularios_permisos,
                              [form.id]: newPerms
                            }
                          };
                        });
                      }}
                    >{allPermsChecked ? 'Desmarcar todos' : 'Marcar todos'}</button>
                  </div>
                  {isOpen && (
                    <div className="flex flex-wrap gap-4 ml-10 pb-4">
                      {permissions.map(perm => (
                        <label key={perm.id} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={Array.isArray(values.formularios_permisos?.[form.id]) ? values.formularios_permisos[form.id].includes(perm.id) : false}
                            disabled={!formChecked}
                            onChange={e => {
                              setValues(prev => {
                                const prevPerms = Array.isArray(prev.formularios_permisos?.[form.id]) ? prev.formularios_permisos[form.id] : [];
                                let newPerms;
                                if (e.target.checked) {
                                  newPerms = [...prevPerms, perm.id];
                                } else {
                                  newPerms = prevPerms.filter(pid => pid !== perm.id);
                                }
                                return {
                                  ...prev,
                                  formularios_permisos: {
                                    ...prev.formularios_permisos,
                                    [form.id]: newPerms
                                  }
                                };
                              });
                            }}
                          />
                          <span>{perm.type_permission}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      />
      <ConfirmModal
        isOpen={showCreateConfirm}
        title="¿Confirmar registro de rol?"
        message="¿Estás seguro de que deseas crear este nuevo rol?"
        confirmText="Sí, crear rol"
        cancelText="Cancelar"
        onConfirm={handleConfirmCreateRole}
        onCancel={() => { setShowCreateConfirm(false); setPendingRoleData(null); }}
      />
    </div>
  );
};


export default Roles;
