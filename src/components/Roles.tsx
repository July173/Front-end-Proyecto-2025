import React, { useEffect, useState } from 'react';
import { getRolesUser, toggleRoleActive, postRolPermissions, getRolPermissions, putRolFormPerms } from '../Api/Services/Rol';
import ConfirmModal from './ConfirmModal';
import { InfoCard } from './CardSecurity';
import type { InfoCardProps } from '../Api/types/entities/misc.types';
import type {  RolUsuario } from '../Api/types/entities/role.types';
import ModalFormGeneric from './ModalFormGeneric';
import { getForms } from '../Api/Services/Form';
import { getPermissions } from '../Api/Services/Permission';
import NotificationModal from './NotificationModal';

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
  // Edición de rol
  const [editRole, setEditRole] = useState(null); // datos completos del rol a editar
  const [showEdit, setShowEdit] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [showEditConfirm, setShowEditConfirm] = useState(false);
  const [pendingEditData, setPendingEditData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState<'success' | 'warning' | 'info' | 'completed'>('success');
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');


  const handleActionClick = (rol: RolUsuario) => {
    setPendingRole(rol);
    setShowConfirm(true);
  };

  // Abrir modal de edición y cargar datos del rol
  const handleEditClick = async (rol: RolUsuario) => {
    setEditLoading(true);
    try {
      const data = await getRolPermissions(rol.id);
      // Adaptar datos para el formulario
      // data: { type_role, description, active, formularios: [{form_id, permission_ids:[]} ...] }
      const formularios_permisos = {};
      (data.formularios || []).forEach(f => {
        formularios_permisos[f.form_id] = f.permission_ids;
      });
      setEditRole({
        id: rol.id,
        type_role: data.type_role,
        description: data.description,
        active: data.active,
        formularios_permisos,
      });
      setShowEdit(true);
    } catch (e) {
      alert(e.message || 'No se pudo cargar el rol');
    } finally {
      setEditLoading(false);
    }
  };

  const handleConfirmAction = async () => {
    if (!pendingRole) return;
    setShowConfirm(false);
    try {
      await toggleRoleActive(pendingRole.id, pendingRole.active);
      const updated = await getRolesUser();
      setRoles(updated);
      showNotif(
        'success',
        pendingRole.active ? 'Rol inhabilitado' : 'Rol habilitado',
        pendingRole.active
          ? `El rol "${pendingRole.nombre}" ha sido inhabilitado exitosamente.`
          : `El rol "${pendingRole.nombre}" ha sido habilitado exitosamente.`
      );
    } catch (e) {
      showNotif('warning', 'Error al cambiar estado', e.message || 'No se pudo cambiar el estado del rol');
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

  // Campos para el modal de crear/editar rol (permite asignar permisos por formulario)
  const roleFields = [
    { name: 'type_role', label: 'Nombre del Rol', type: 'text', placeholder: 'Ej: coordinador, aprendiz.' },
    { name: 'description', label: 'Descripcion', type: 'text', placeholder: 'Describe que es lo que va a administrar ese rol' },
    {
      name: 'formularios_permisos',
      label: 'Formularios y Permisos',
      type: 'custom-permissions',
      forms: forms.filter(f => f.active), // solo formularios activos
      permissions: permissions.filter(p => p.active), // solo permisos activos si aplica
    },
  ];


  // Al enviar el form de crear, primero mostrar confirmación
  const handleCreateRole = (values) => {
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

  // Al enviar el form de edición, primero mostrar confirmación
  const handleEditRole = (values) => {
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
    setPendingEditData(data);
    setShowEditConfirm(true);
  };


  // Si confirma, hacer el POST (crear)
  const handleConfirmCreateRole = async () => {
    if (!pendingRoleData) return;
    try {
      await postRolPermissions(pendingRoleData);
      setShowCreate(false);
      setShowCreateConfirm(false);
      setPendingRoleData(null);
      const updated = await getRolesUser();
      setRoles(updated);
      showNotif('success', 'Rol creado', 'El rol se ha creado exitosamente.');
    } catch (e) {
      showNotif('warning', 'Error al crear rol', e.message || 'Error al crear el rol');
    }
  };

  // Si confirma, hacer el PUT (editar)
  const handleConfirmEditRole = async () => {
    if (!pendingEditData || !editRole) return;
    try {
      await putRolFormPerms(editRole.id, pendingEditData);
      setShowEdit(false);
      setShowEditConfirm(false);
      setPendingEditData(null);
      setEditRole(null);
      const updated = await getRolesUser();
      setRoles(updated);
      showNotif('success', 'Rol actualizado', 'El rol se ha actualizado exitosamente.');
    } catch (e) {
      showNotif('warning', 'Error al actualizar rol', e.message || 'Error al actualizar el rol');
    }
  };

  // Componente reutilizable para el renderizado de formularios y permisos
  const renderFormPermissions = ({ values, setValues }) => {
    // Detecta si el rol es administrador
    const isAdminRole = (editRole?.type_role?.toLowerCase() === 'administrador');

    return (
      <div className="space-y-4">
        {forms.map(form => {
          const formChecked = Array.isArray(values.formularios_permisos?.[form.id]) && values.formularios_permisos[form.id].length > 0;
          const allPermsChecked = permissions.length > 0 && Array.isArray(values.formularios_permisos?.[form.id]) && permissions.every(perm => values.formularios_permisos[form.id].includes(perm.id));
          const isOpen = openFormId === form.id;
          const isAdminForm = form.name?.toLowerCase().includes('administración') || form.id === 1; // Ajusta el id si es necesario

          return (
            <div key={form.id} className="border rounded-lg mb-2 bg-gray-50">
              <div className="flex items-center p-4 cursor-pointer select-none" onClick={() => setOpenFormId(isOpen ? null : form.id)}>
                <span className={`mr-2 transition-transform ${isOpen ? 'rotate-90' : ''}`}>▶</span>
                <input
                  type="checkbox"
                  checked={formChecked}
                  disabled={isAdminRole && isAdminForm}
                  onClick={e => e.stopPropagation()}
                  onChange={e => {
                    if (isAdminRole && isAdminForm) return; // No permitir cambios
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
                  disabled={isAdminRole && isAdminForm}
                  onClick={e => {
                    if (isAdminRole && isAdminForm) return;
                    e.stopPropagation();
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
                        disabled={!formChecked || (isAdminRole && isAdminForm)}
                        onChange={e => {
                          if (isAdminRole && isAdminForm) return;
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
  );
  };

  const showNotif = (type, title, message) => {
    setNotificationType(type);
    setNotificationTitle(title);
    setNotificationMessage(message);
    setShowNotification(true);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="flex items-center gap-4 mb-6 justify-between">
        <h2 className="text-2xl font-bold">Gestión de Roles - Sena</h2>
        <button
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded font-semibold shadow transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-in slide-in-from-right delay-200"
          onClick={() => setShowCreate(true)}
        >
          <span className="text-xl font-bold">+</span> Registro Rol
        </button>
      </div>
      <div className="flex gap-4 flex-wrap">
        {roles.map((rol, index) => {
          const isAdministrador = rol.nombre?.toLowerCase() === 'administrador';
          const cardProps: InfoCardProps = {
            title: rol.nombre,
            statusLabel: rol.active ? rol.cantidad_usuarios.toString() : 'Inhabilitado',
            statusColor: rol.active ? 'green' : 'red',
            description: rol.descripcion,
            count: rol.cantidad_usuarios,
            buttonText: 'Ajustar',
            onButtonClick: () => handleEditClick(rol),
            actionLabel: rol.active ? 'Inhabilitar' : 'Habilitar',
            actionType: rol.active ? 'disable' : 'enable',
            onActionClick: isAdministrador ? undefined : () => handleActionClick(rol),
          };
          return (
            <div 
              key={rol.id}
              className={`transform transition-all duration-300 hover:scale-105 animate-in slide-in-from-left`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <InfoCard {...cardProps} />
            </div>
          );
        })}
      </div>

      {/* Modal de edición de rol */}
      <ModalFormGeneric
        isOpen={showEdit}
        title="Editar Rol-Sena"
        fields={roleFields}
        onClose={() => { setShowEdit(false); setEditRole(null); setPendingEditData(null); }}
        onSubmit={handleEditRole}
        submitText="Actualizar Rol"
        cancelText="Cancelar"
        initialValues={editRole || {}}
        customRender={renderFormPermissions}
        onProgramChange={undefined}
      />

      <ConfirmModal
        isOpen={showEditConfirm}
        title="¿Confirmar actualización de rol?"
        message="¿Estás seguro de que deseas actualizar este rol?"
        confirmText="Sí, actualizar rol"
        cancelText="Cancelar"
        onConfirm={handleConfirmEditRole}
        onCancel={() => { setShowEditConfirm(false); setPendingEditData(null); }}
      />

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
        customRender={renderFormPermissions}
        onProgramChange={undefined}
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

      <NotificationModal
        isOpen={showNotification}
        onClose={() => setShowNotification(false)}
        type={notificationType}
        title={notificationTitle}
        message={notificationMessage}
      />
    </div>
  );
};


export default Roles;
