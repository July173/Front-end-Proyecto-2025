import React, { useEffect, useState } from 'react';
import { getModules, postModule, getModuleForms, putModuleForms } from '../Api/Services/Module';
import { getForms } from '../Api/Services/Form';
import { postForm } from '../Api/Services/Form';
import { InfoCard } from './CardSecurity';
import ModalFormGeneric from './ModalFormGeneric';
import ConfirmModal from './ConfirmModal';
import NotificationModal from './NotificationModal';
import type { InfoCardProps } from '../Api/types/entities/misc.types';

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
  const [showFormModal, setShowFormModal] = useState(false);
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [forms, setForms] = useState([]);
  const [loadingForms, setLoadingForms] = useState(true);
  // Para confirmación
  const [pendingFormData, setPendingFormData] = useState(null);
  const [showFormConfirm, setShowFormConfirm] = useState(false);
  const [pendingModuleData, setPendingModuleData] = useState(null);
  const [showModuleConfirm, setShowModuleConfirm] = useState(false);
  // Edición de módulo
  const [editModule, setEditModule] = useState(null); // datos completos del módulo a editar
  const [showEdit, setShowEdit] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [showEditConfirm, setShowEditConfirm] = useState(false);
  const [pendingEditData, setPendingEditData] = useState(null);

  // Notificación
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState<
    'success' | 'info' | 'warning' | 'password-changed' | 'email-sent' | 'pending' | 'completed'
  >('success');
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    getModules()
      .then(setModules)
      .catch(() => setError('Error al cargar los módulos'))
      .finally(() => setLoading(false));
    getForms()
      .then(setForms)
      .finally(() => setLoadingForms(false));
  }, []);

  useEffect(() => {
    if (showEdit && editModule?.name?.toLowerCase() === 'seguridad') {
      // Forzar que el formulario de administración (id=1) esté siempre presente
      if (editModule.form_ids && !editModule.form_ids.includes('1')) {
        setEditModule(prev => ({
          ...prev,
          form_ids: [...prev.form_ids, '1']
        }));
      }
    }
  }, [showEdit, editModule]);

  if (loading) return <div className="p-8">Cargando...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  // Campos para el modal de crear formulario
  const formFields = [
    { name: 'name', label: 'Nombre del Formulario', type: 'text', placeholder: 'Ej : gestion.' },
    { name: 'path', label: 'Direccion del Formulario', type: 'text', placeholder: 'Ej : src/user/.formulario a' },
    { name: 'description', label: 'Descripcion', type: 'text', placeholder: 'Describe que es lo que va  a hacer' },
  ];

  // Campos para el modal de crear/editar módulo
  const moduleFields = [
    { name: 'name', label: 'Nombre del Modulo', type: 'text', placeholder: 'Ej : seguridad' },
    { name: 'description', label: 'Descripcion', type: 'text', placeholder: 'Describe que es lo que va  a hacer' },
    {
      name: 'form_ids',
      label: 'Formularios',
      type: 'checkbox-group',
      options: forms.filter(f => f.active).map(f => ({
        value: String(f.id),
        label: f.name,
        disabled: (editModule?.name?.toLowerCase() === 'seguridad' && String(f.id) === '1') // Deshabilita administración en seguridad
      })),
    },
  ];

  // Crear formulario: primero mostrar confirmación
  const handleCreateForm = (values) => {
    const data = {
      name: values.name,
      path: values.path,
      description: values.description,
      active: true,
    };
    setPendingFormData(data);
    setShowFormConfirm(true);
  };

  // Si confirma, hacer el POST
  const handleConfirmCreateForm = async () => {
    if (!pendingFormData) return;
    try {
      await postForm(pendingFormData);
      setShowFormModal(false);
      setShowFormConfirm(false);
      setPendingFormData(null);
      setNotificationType('success');
      setNotificationTitle('Formulario creado');
      setNotificationMessage('El formulario se ha creado exitosamente.');
      setShowNotification(true);
      // Opcional: refrescar forms si se usan en otro lado
    } catch (e) {
      setNotificationType('warning');
      setNotificationTitle('Error al crear formulario');
      setNotificationMessage(e.message || 'Error al crear el formulario');
      setShowNotification(true);
    }
  };

  // Crear módulo: primero mostrar confirmación
  const handleCreateModule = (values) => {
    let selectedForms = [];
    if (Array.isArray(values.form_ids)) {
      selectedForms = values.form_ids.map(Number);
    }
    const data = {
      name: values.name,
      description: values.description,
      form_ids: selectedForms,
    };
    setPendingModuleData(data);
    setShowModuleConfirm(true);
  };

  // Editar módulo: primero mostrar confirmación
  const handleEditModule = (values) => {
    let selectedForms = [];
    if (Array.isArray(values.form_ids)) {
      selectedForms = values.form_ids.map(Number);
      // Si es seguridad, fuerza el id 1
      if (editModule?.name?.toLowerCase() === 'seguridad' && !selectedForms.includes(1)) {
        selectedForms.push(1);
      }
    }
    const data = {
      name: values.name,
      description: values.description,
      form_ids: selectedForms,
    };
    setPendingEditData(data);
    setShowEditConfirm(true);
  };

  // Si confirma, hacer el POST (crear)
  const handleConfirmCreateModule = async () => {
    if (!pendingModuleData) return;
    try {
      await postModule(pendingModuleData);
      setShowModuleModal(false);
      setShowModuleConfirm(false);
      setPendingModuleData(null);
      setNotificationType('success');
      setNotificationTitle('Módulo creado');
      setNotificationMessage('El módulo se ha creado exitosamente.');
      setShowNotification(true);
      // Refrescar lista de módulos
      const updated = await getModules();
      setModules(updated);
    } catch (e) {
      setNotificationType('warning');
      setNotificationTitle('Error al crear módulo');
      setNotificationMessage(e.message || 'Error al crear el módulo');
      setShowNotification(true);
    }
  };

  // Si confirma, hacer el PUT (editar)
  const handleConfirmEditModule = async () => {
    if (!pendingEditData || !editModule) return;
    try {
      await putModuleForms(editModule.id, pendingEditData);
      setShowEdit(false);
      setShowEditConfirm(false);
      setPendingEditData(null);
      setEditModule(null);
      setNotificationType('success');
      setNotificationTitle('Módulo actualizado');
      setNotificationMessage('El módulo se ha actualizado exitosamente.');
      setShowNotification(true);
      // Refrescar lista de módulos
      const updated = await getModules();
      setModules(updated);
    } catch (e) {
      setNotificationType('warning');
      setNotificationTitle('Error al actualizar módulo');
      setNotificationMessage(e.message || 'Error al actualizar el módulo');
      setShowNotification(true);
    }
  };

  return (
    <>
      <div className="bg-white p-8 rounded-lg shadow animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        <div className="flex items-center gap-4 mb-6 justify-between">
          <h2 className="text-2xl font-bold">Gestión de Módulos - Sena</h2>
          <div className="flex gap-4">
            <button
              className="flex items-center gap-2 text-white px-4 py-2 rounded font-semibold shadow transition-all duration-300 bg-[linear-gradient(to_bottom_right,_#43A047,_#2E7D32)] hover:bg-green-700 hover:shadow-lg animate-in slide-in-from-right delay-200"
              onClick={() => setShowFormModal(true)}
            >
              <span className="text-xl font-bold">+</span>  Formulario
            </button>
            <button
              className="flex items-center gap-2 text-white px-4 py-2 rounded font-semibold shadow transition-all duration-300 bg-[linear-gradient(to_bottom_right,_#43A047,_#2E7D32)] hover:bg-green-700 hover:shadow-lg animate-in slide-in-from-right delay-300"
              onClick={() => setShowModuleModal(true)}
            >
              <span className="text-xl font-bold">+</span>  Modulo
            </button>
          </div>
        </div>
        <div className="flex gap-4 flex-wrap">
          {modules.map((mod, index) => {
            const cardProps: InfoCardProps = {
              title: mod.name,
              statusLabel: mod.active ? 'Activo' : 'Inhabilitado',
              statusColor: mod.active ? 'green' : 'red',
              description: mod.description,
              count: undefined, // No mostrar usuarios asignados
              buttonText: 'Ajustar',
              onButtonClick: async () => {
                setEditLoading(true);
                try {
                  const data = await getModuleForms(mod.id);
                  const selectedFormIds = (data.form_ids || []).map(String);
                  setEditModule({
                    id: mod.id,
                    name: data.name,
                    description: data.description,
                    form_ids: selectedFormIds, // IDs de forms seleccionados como string
                  });
                  setShowEdit(true);
                } catch (e) {
                  alert(e.message || 'No se pudo cargar el módulo');
                } finally {
                  setEditLoading(false);
                }
              },
              // No pasar actionLabel, actionType ni onActionClick
            };
            return (
              <div 
                key={mod.id}
                className={`transform transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <InfoCard {...cardProps} />
              </div>
            );
          })}
        {/* Modal de edición de módulo */}
        <ModalFormGeneric
          isOpen={showEdit}
          title="Editar Modulo-Sena"
          fields={moduleFields}
          onClose={() => { setShowEdit(false); setEditModule(null); setPendingEditData(null); }}
          onSubmit={handleEditModule}
          submitText="Actualizar Modulo"
          cancelText="Cancelar"
          initialValues={editModule ? { ...editModule, form_ids: (editModule.form_ids || []).map(String) } : {}}
          customRender={undefined}
          onProgramChange={undefined}
        />
        <ConfirmModal
          isOpen={showEditConfirm}
          title="¿Confirmar actualización de módulo?"
          message="¿Estás seguro de que deseas actualizar este módulo?"
          confirmText="Sí, actualizar módulo"
          cancelText="Cancelar"
          onConfirm={handleConfirmEditModule}
          onCancel={() => { setShowEditConfirm(false); setPendingEditData(null); }}
        />
        </div>
        <ModalFormGeneric
          isOpen={showFormModal}
          title="Registrar Nuevo Formulario-Sena"
          fields={formFields}
          onClose={() => setShowFormModal(false)}
          onSubmit={handleCreateForm}
          submitText="Registrar Formulario"
          cancelText="Cancelar"
          customRender={undefined}
          onProgramChange={undefined}
        />
        <ModalFormGeneric
          isOpen={showModuleModal}
          title="Registrar Nuevo Modulo-Sena"
          fields={moduleFields}
          onClose={() => setShowModuleModal(false)}
          onSubmit={handleCreateModule}
          submitText="Registrar Modulo"
          cancelText="Cancelar"
          customRender={undefined}
          onProgramChange={undefined}
        />
        <ConfirmModal
          isOpen={showFormConfirm}
          title="¿Confirmar registro de formulario?"
          message="¿Estás seguro de que deseas crear este nuevo formulario?"
          confirmText="Sí, crear formulario"
          cancelText="Cancelar"
          onConfirm={handleConfirmCreateForm}
          onCancel={() => { setShowFormConfirm(false); setPendingFormData(null); }}
        />
        <ConfirmModal
          isOpen={showModuleConfirm}
          title="¿Confirmar registro de módulo?"
          message="¿Estás seguro de que deseas crear este nuevo módulo?"
          confirmText="Sí, crear módulo"
          cancelText="Cancelar"
          onConfirm={handleConfirmCreateModule}
          onCancel={() => { setShowModuleConfirm(false); setPendingModuleData(null); }}
        />
      </div>
      <NotificationModal
        isOpen={showNotification}
        onClose={() => setShowNotification(false)}
        type={notificationType}
        title={notificationTitle}
        message={notificationMessage}
      />
    </>
  );
};

export default Modules;
