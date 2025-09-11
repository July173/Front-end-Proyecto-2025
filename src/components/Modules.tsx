import React, { useEffect, useState } from 'react';
import { getModules, postModule } from '../Api/Services/Module';
import { getForms } from '../Api/Services/Form';
import { postForm } from '../Api/Services/Form';
import { InfoCard } from './CardSecurity';
import ModalFormGeneric from './ModalFormGeneric';
import ConfirmModal from './ConfirmModal';
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
  const [showFormModal, setShowFormModal] = useState(false);
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [forms, setForms] = useState([]);
  const [loadingForms, setLoadingForms] = useState(true);
  // Para confirmación
  const [pendingFormData, setPendingFormData] = useState(null);
  const [showFormConfirm, setShowFormConfirm] = useState(false);
  const [pendingModuleData, setPendingModuleData] = useState(null);
  const [showModuleConfirm, setShowModuleConfirm] = useState(false);

  useEffect(() => {
    getModules()
      .then(setModules)
      .catch(() => setError('Error al cargar los módulos'))
      .finally(() => setLoading(false));
    getForms()
      .then(setForms)
      .finally(() => setLoadingForms(false));
  }, []);

  if (loading) return <div className="p-8">Cargando...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  // Campos para el modal de crear formulario
  const formFields = [
    { name: 'name', label: 'Nombre del Formulario', type: 'text', placeholder: 'Ej : gestion.' },
    { name: 'path', label: 'Direccion del Formulario', type: 'text', placeholder: 'Ej : src/user/.formulario a' },
    { name: 'description', label: 'Descripcion', type: 'text', placeholder: 'Describe que es lo que va  a hacer' },
  ];

  // Campos para el modal de crear módulo
  const moduleFields = [
    { name: 'name', label: 'Nombre del Modulo', type: 'text', placeholder: 'Ej : seguridad' },
    { name: 'description', label: 'Descripcion', type: 'text', placeholder: 'Describe que es lo que va  a hacer' },
    {
      name: 'form_ids',
      label: 'Formularios',
      type: 'checkbox-group',
      options: forms.map(f => ({ value: f.id, label: f.name })),
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
      // Opcional: refrescar forms si se usan en otro lado
    } catch (e) {
      alert(e.message || 'Error al crear el formulario');
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

  // Si confirma, hacer el POST
  const handleConfirmCreateModule = async () => {
    if (!pendingModuleData) return;
    try {
      await postModule(pendingModuleData);
      setShowModuleModal(false);
      setShowModuleConfirm(false);
      setPendingModuleData(null);
      // Refrescar lista de módulos
      const updated = await getModules();
      setModules(updated);
    } catch (e) {
      alert(e.message || 'Error al crear el módulo');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow">
      <div className="flex gap-4 mb-4 justify-end">
        <button
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded font-semibold shadow"
          onClick={() => setShowFormModal(true)}
        >
          <span className="text-xl font-bold">+</span>  Formulario
        </button>
        <button
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded font-semibold shadow"
          onClick={() => setShowModuleModal(true)}
        >
          <span className="text-xl font-bold">+</span>  Modulo
        </button>
      </div>
      <h2 className="text-2xl font-semibold mb-6">Gestión de Módulos - Sena</h2>
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
            // Botón de habilitar/deshabilitar removido
          };
          return <InfoCard key={mod.id} {...cardProps} />;
        })}
      </div>
      <ModalFormGeneric
        isOpen={showFormModal}
        title="Registrar Nuevo Formulario-Sena"
        fields={formFields}
        onClose={() => setShowFormModal(false)}
        onSubmit={handleCreateForm}
        submitText="Registrar Formulario"
        cancelText="Cancelar"
      />
      <ModalFormGeneric
        isOpen={showModuleModal}
        title="Registrar Nuevo Modulo-Sena"
        fields={moduleFields}
        onClose={() => setShowModuleModal(false)}
        onSubmit={handleCreateModule}
        submitText="Registrar Modulo"
        cancelText="Cancelar"
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
  );
};

export default Modules;
