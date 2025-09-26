import React, { useEffect, useState } from 'react';
import { getFichas,deleteFicha, createFicha,updateFicha } from '../../Api/Services/Ficha';
import { getPrograms , deleteProgram, createProgram,updateProgram} from '../../Api/Services/Program';
import { getKnowledgeAreas, deleteKnowledgeArea, createKnowledgeArea,updateKnowledgeArea } from '../../Api/Services/KnowledgeArea';
import type { Ficha, Program, KnowledgeArea } from '../../Api/types/Modules/general.types';
import { ChevronDown, ChevronUp, Plus, Settings, Power } from 'lucide-react';
import ModalFormGeneric from './ModalFormGeneric';
import ConfirmModal from '../ConfirmModal';

const General = () => {
  // Estados para los datos
  const [fichas, setFichas] = useState<Ficha[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [knowledgeAreas, setKnowledgeAreas] = useState<KnowledgeArea[]>([]);
  
  // Estados de carga
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Estados para secciones desplegables
  const [sectionsOpen, setSectionsOpen] = useState({
    fichas: true,
    programs: true,
    knowledgeAreas: true
  });

  // Estados para modales y datos
  const [showFichaModal, setShowFichaModal] = useState(false);
  const [pendingFichaData, setPendingFichaData] = useState(null);
  const [showFichaConfirm, setShowFichaConfirm] = useState(false);

  const [showProgramModal, setShowProgramModal] = useState(false);
  const [pendingProgramData, setPendingProgramData] = useState(null);
  const [showProgramConfirm, setShowProgramConfirm] = useState(false);

  const [showAreaModal, setShowAreaModal] = useState(false);
  const [pendingAreaData, setPendingAreaData] = useState(null);
  const [showAreaConfirm, setShowAreaConfirm] = useState(false);

  const [showDisableConfirm, setShowDisableConfirm] = useState(false);
  const [pendingDisable, setPendingDisable] = useState<{ type: string, id: number | string } | null>(null);

  const [editFicha, setEditFicha] = useState(null);
  const [showEditFicha, setShowEditFicha] = useState(false);
  const [pendingEditFicha, setPendingEditFicha] = useState(null);
  const [showEditFichaConfirm, setShowEditFichaConfirm] = useState(false);

  const [editProgram, setEditProgram] = useState(null);
  const [showEditProgram, setShowEditProgram] = useState(false);
  const [pendingEditProgram, setPendingEditProgram] = useState(null);
  const [showEditProgramConfirm, setShowEditProgramConfirm] = useState(false);

  const [editArea, setEditArea] = useState(null);
  const [showEditArea, setShowEditArea] = useState(false);
  const [pendingEditArea, setPendingEditArea] = useState(null);
  const [showEditAreaConfirm, setShowEditAreaConfirm] = useState(false);

  // Cargar datos al montar el componente
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [fichasData, programsData, areasData] = await Promise.all([
          getFichas(),
          getPrograms(),
          getKnowledgeAreas()
        ]);
        setFichas(fichasData);
        setPrograms(programsData);
        setKnowledgeAreas(areasData);
      } catch (err) {
        setError('Error al cargar los datos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Función para alternar secciones
  const toggleSection = (section: keyof typeof sectionsOpen) => {
    setSectionsOpen(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Componente Card reutilizable
  const InfoCard = ({ title, subtitle, isActive, onToggle, onEdit }: {
    title: string;
    subtitle?: string;
    isActive: boolean;
    onToggle: () => void;
    onEdit: () => void;
  }) => (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {isActive ? 'Activo' : 'Inactivo'}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
        >
          Ajustar
        </button>
        <button
          onClick={onToggle}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            isActive 
              ? 'bg-red-600 text-white hover:bg-red-700' 
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {isActive ? 'Deshabilitar' : 'Habilitar'}
        </button>
      </div>
    </div>
  );

  // Función placeholder para toggle
  const handleToggle = (type: string, id: number) => {
    setPendingDisable({ type, id });
    setShowDisableConfirm(true);
  };

  // Función placeholder para editar
  const handleEdit = (type: string, id: number) => {
    if (type === 'ficha') {
      const ficha = fichas.find(f => f.id === id);
      // Adaptar initialValues para el modal
      setEditFicha({
        ...ficha,
        programa: ficha.program, // para el select
      });
      setShowEditFicha(true);
    } else if (type === 'program') {
      const program = programs.find(p => p.id === id);
      setEditProgram(program);
      setShowEditProgram(true);
    } else if (type === 'knowledgeArea') {
      const area = knowledgeAreas.find(a => a.id === id);
      setEditArea(area);
      setShowEditArea(true);
    }
  };

  // Handlers para abrir modales
  const handleAddFicha = () => setShowFichaModal(true);
  const handleAddProgram = () => setShowProgramModal(true);
  const handleAddArea = () => setShowAreaModal(true);

  // Handlers para submit de formularios
  const handleSubmitFicha = (values) => {
    // Renombra 'programa' a 'program' para el backend
    const fichaData = {
      ...values,
      program: values.programa, // El backend espera 'program'
    };
    delete fichaData.programa; // Elimina el campo 'programa'
    setPendingFichaData(fichaData);
    setShowFichaConfirm(true);
  };
  const handleSubmitProgram = (values) => {
    setPendingProgramData(values);
    setShowProgramConfirm(true);
  };
  const handleSubmitArea = (values) => {
    setPendingAreaData(values);
    setShowAreaConfirm(true);
  };

  // Handlers para confirmar creación
  const handleConfirmFicha = async () => {
    try {
      await createFicha(pendingFichaData); // Aquí se envía el id del programa
      setShowFichaModal(false);
      setShowFichaConfirm(false);
      setPendingFichaData(null);
      const fichasData = await getFichas();
      setFichas(fichasData);
    } catch (e) {
      alert(e.message || 'Error al crear ficha');
    }
  };
  const handleConfirmProgram = async () => {
    try {
      await createProgram(pendingProgramData);
      setShowProgramModal(false);
      setShowProgramConfirm(false);
      setPendingProgramData(null);
      const programsData = await getPrograms();
      setPrograms(programsData);
    } catch (e) {
      alert(e.message || 'Error al crear programa');
    }
  };
  const handleConfirmArea = async () => {
    try {
      await createKnowledgeArea(pendingAreaData);
      setShowAreaModal(false);
      setShowAreaConfirm(false);
      setPendingAreaData(null);
      const areasData = await getKnowledgeAreas();
      setKnowledgeAreas(areasData);
    } catch (e) {
      alert(e.message || 'Error al crear área');
    }
  };

  const handleConfirmDisable = async () => {
    if (!pendingDisable) return;
    try {
      if (pendingDisable.type === 'ficha') {
        await deleteFicha(pendingDisable.id);
        setFichas(await getFichas());
      } else if (pendingDisable.type === 'program') {
        await deleteProgram(pendingDisable.id);
        setPrograms(await getPrograms());
      } else if (pendingDisable.type === 'knowledgeArea') {
        await deleteKnowledgeArea(pendingDisable.id);
        setKnowledgeAreas(await getKnowledgeAreas());
      }
      setShowDisableConfirm(false);
      setPendingDisable(null);
    } catch (e) {
      alert(e.message || 'Error al deshabilitar');
    }
  };

  const handleSubmitEditFicha = (values) => {
    // Renombrar programa a program
    const data = { ...values, program: values.programa };
    delete data.programa;
    setPendingEditFicha(data);
    setShowEditFichaConfirm(true);
  };
  const handleConfirmEditFicha = async () => {
    try {
      await updateFicha(editFicha.id, pendingEditFicha);
      setShowEditFicha(false);
      setShowEditFichaConfirm(false);
      setPendingEditFicha(null);
      setEditFicha(null);
      setFichas(await getFichas());
    } catch (e) {
      alert(e.message || 'Error al actualizar ficha');
    }
  };

  const handleSubmitEditProgram = (values) => {
    setPendingEditProgram(values);
    setShowEditProgramConfirm(true);
  };
  const handleConfirmEditProgram = async () => {
    try {
      await updateProgram(editProgram.id, pendingEditProgram);
      setShowEditProgram(false);
      setShowEditProgramConfirm(false);
      setPendingEditProgram(null);
      setEditProgram(null);
      setPrograms(await getPrograms());
    } catch (e) {
      alert(e.message || 'Error al actualizar programa');
    }
  };

  const handleSubmitEditArea = (values) => {
    setPendingEditArea(values);
    setShowEditAreaConfirm(true);
  };
  const handleConfirmEditArea = async () => {
    try {
      await updateKnowledgeArea(editArea.id, pendingEditArea);
      setShowEditArea(false);
      setShowEditAreaConfirm(false);
      setPendingEditArea(null);
      setEditArea(null);
      setKnowledgeAreas(await getKnowledgeAreas());
    } catch (e) {
      alert(e.message || 'Error al actualizar área');
    }
  };

  const fichaFields = [
    { 
      label: 'Número de Ficha', 
      name: 'file_number', 
      type: 'text', 
      placeholder: 'Ingrese el número de ficha', 
      required: true 
    },
    { 
      label: 'Programa', 
      name: 'programa', 
      type: 'select', 
      options: programs.filter(p => p.active).map(p => ({ value: p.id, label: p.name })), 
      required: true,
      customSelect: true // Indicador para usar CustomSelect
    },
  ];

  const getDisableText = (type: string) => {
    if (type === 'ficha') return 'deshabilitar la ficha';
    if (type === 'program') return 'deshabilitar el programa';
    if (type === 'knowledgeArea') return 'deshabilitar el área de conocimiento';
    return 'deshabilitar';
  };

  if (loading) return <div className="p-8">Cargando...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="bg-white p-8 rounded-lg shadow">
      <div className="flex items-center gap-4 mb-6 justify-between">
        <h2 className="text-2xl font-bold">Gestión General - Sena</h2>
        <div className="flex gap-3">
          <button onClick={handleAddFicha} className="flex items-center gap-2 text-white px-4 py-2 rounded font-semibold shadow transition-all duration-300 bg-[linear-gradient(to_bottom_right,_#43A047,_#2E7D32)] hover:bg-green-700 hover:shadow-lg">
            <Plus className="w-4 h-4" /> Agregar Ficha
          </button>
          <button onClick={handleAddProgram} className="flex items-center gap-2 text-white px-4 py-2 rounded font-semibold shadow transition-all duration-300 bg-[linear-gradient(to_bottom_right,_#43A047,_#2E7D32)] hover:bg-green-700 hover:shadow-lg">
            <Plus className="w-4 h-4" /> Agregar Programa
          </button>
          <button onClick={handleAddArea} className="flex items-center gap-2 text-white px-4 py-2 rounded font-semibold shadow transition-all duration-300 bg-[linear-gradient(to_bottom_right,_#43A047,_#2E7D32)] hover:bg-green-700 hover:shadow-lg">
            <Plus className="w-4 h-4" /> Agregar Área
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Sección Fichas */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('fichas')}
            className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-gray-900">Fichas</h3>
              <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                {fichas.length} registros
              </span>
            </div>
            {sectionsOpen.fichas ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          {sectionsOpen.fichas && (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fichas.map((ficha) => {
                // Buscar el programa por id
                const programObj = programs.find(p => p.id === ficha.program);
                const programName = programObj ? programObj.name : ficha.program;
                return (
                  <InfoCard
                    key={ficha.id}
                    title={`Ficha #${ficha.file_number || ficha.id}`}
                    subtitle={`Programa: ${programName}`}
                    isActive={ficha.active}
                    onToggle={() => handleToggle('ficha', ficha.id)}
                    onEdit={() => handleEdit('ficha', ficha.id)}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Sección Programas */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('programs')}
            className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-gray-900">Programas</h3>
              <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
                {programs.length} registros
              </span>
            </div>
            {sectionsOpen.programs ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          {sectionsOpen.programs && (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {programs.map((program) => (
                <InfoCard
                  key={program.id}
                  title={program.name || `Programa ${program.codeProgram}`}
                  subtitle={program.description || program.typeProgram}
                  isActive={program.active}
                  onToggle={() => handleToggle('program', program.id)}
                  onEdit={() => handleEdit('program', program.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sección Áreas de Conocimiento */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('knowledgeAreas')}
            className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-gray-900">Áreas de Conocimiento</h3>
              <span className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded-full">
                {knowledgeAreas.length} registros
              </span>
            </div>
            {sectionsOpen.knowledgeAreas ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          {sectionsOpen.knowledgeAreas && (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {knowledgeAreas.map((area) => (
                <InfoCard
                  key={area.id}
                  title={area.name || `Área ${area.id}`}
                  subtitle={area.description}
                  isActive={area.active}
                  onToggle={() => handleToggle('knowledgeArea', area.id)}
                  onEdit={() => handleEdit('knowledgeArea', area.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modales */}
      <ModalFormGeneric
        isOpen={showFichaModal}
        title="Agregar Ficha"
        fields={[
          { label: 'Número de Ficha', name: 'file_number', type: 'number', placeholder: 'Ingrese el número de ficha', required: true },
          { 
            label: 'Programa', 
            name: 'programa', 
            type: 'select', 
            options: programs.filter(p => p.active).map(p => ({ value: p.id, label: p.name })),
            required: true,
            customSelect: true
          },
        ]}
        onClose={() => setShowFichaModal(false)}
        onSubmit={handleSubmitFicha}
        submitText="Registrar Ficha"
        cancelText="Cancelar"
        customRender={undefined}
        onProgramChange={undefined}
      />
      <ModalFormGeneric
        isOpen={showProgramModal}
        title="Agregar Programa"
        fields={[
          { label: 'Nombre del Programa', name: 'name', type: 'text', placeholder: 'Ingrese el nombre del programa', required: true },
          { label: 'Código del Programa', name: 'codeProgram', type: 'text', placeholder: 'Ingrese el código del programa', required: true },
          { label: 'Descripción', name: 'description', type: 'text', placeholder: 'Ingrese una descripción', required: false },
          { label: 'Tipo de Programa', name: 'typeProgram', type: 'text', placeholder: 'Ingrese el tipo de programa', required: false },
        ]}
        onClose={() => setShowProgramModal(false)}
        onSubmit={handleSubmitProgram}
        submitText="Registrar Programa"
        cancelText="Cancelar"
        customRender={undefined}
        onProgramChange={undefined}
      />
      <ModalFormGeneric
        isOpen={showAreaModal}
        title="Agregar Área de Conocimiento"
        fields={[
          { label: 'Nombre del Área', name: 'name', type: 'text', placeholder: 'Ingrese el nombre del área', required: true },
          { label: 'Descripción', name: 'description', type: 'text', placeholder: 'Ingrese una descripción', required: false },
        ]}
        onClose={() => setShowAreaModal(false)}
        onSubmit={handleSubmitArea}
        submitText="Registrar Área"
        cancelText="Cancelar"
        customRender={undefined}
        onProgramChange={undefined}
      />

      {/* Confirmaciones */}
      <ConfirmModal
        isOpen={showFichaConfirm}
        title="¿Confirmar registro de ficha?"
        message="¿Estás seguro de que deseas crear esta ficha?"
        confirmText="Sí, crear ficha"
        cancelText="Cancelar"
        onConfirm={handleConfirmFicha}
        onCancel={() => { setShowFichaConfirm(false); setPendingFichaData(null); }}
      />
      <ConfirmModal
        isOpen={showProgramConfirm}
        title="¿Confirmar registro de programa?"
        message="¿Estás seguro de que deseas crear este programa?"
        confirmText="Sí, crear programa"
        cancelText="Cancelar"
        onConfirm={handleConfirmProgram}
        onCancel={() => { setShowProgramConfirm(false); setPendingProgramData(null); }}
      />
      <ConfirmModal
        isOpen={showAreaConfirm}
        title="¿Confirmar registro de área?"
        message="¿Estás seguro de que deseas crear esta área de conocimiento?"
        confirmText="Sí, crear área"
        cancelText="Cancelar"
        onConfirm={handleConfirmArea}
        onCancel={() => { setShowAreaConfirm(false); setPendingAreaData(null); }}
      />
      <ConfirmModal
        isOpen={showDisableConfirm}
        title="¿Confirmar acción?"
        message={`¿Estás seguro de que deseas ${pendingDisable && getDisableText(pendingDisable.type)} este registro?`}
        confirmText="Sí, continuar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDisable}
        onCancel={() => { setShowDisableConfirm(false); setPendingDisable(null); }}
      />
      <ModalFormGeneric
        isOpen={showEditFicha}
        title="Editar Ficha"
        fields={[
          { label: 'Número de Ficha', name: 'file_number', type: 'number', placeholder: 'Ingrese el número de ficha', required: true },
          { 
            label: 'Programa', 
            name: 'programa', 
            type: 'select', 
            options: [
              ...programs.filter(p => p.active).map(p => ({ value: p.id, label: p.name })),
              // Si el programa actual está inactivo, inclúyelo en las opciones
              ...(editFicha && !programs.find(p => p.id === editFicha.programa && p.active)
                ? programs.filter(p => p.id === editFicha.programa).map(p => ({ value: p.id, label: p.name }))
                : []
              )
            ],
            required: true,
            customSelect: true
          },
        ]}
        onClose={() => { setShowEditFicha(false); setEditFicha(null); setPendingEditFicha(null); }}
        onSubmit={handleSubmitEditFicha}
        submitText="Actualizar Ficha"
        cancelText="Cancelar"
        initialValues={editFicha || {}}
        customRender={undefined}
        onProgramChange={undefined}
      />
      <ConfirmModal
        isOpen={showEditFichaConfirm}
        title="¿Confirmar actualización de ficha?"
        message="¿Estás seguro de que deseas actualizar esta ficha?"
        confirmText="Sí, actualizar ficha"
        cancelText="Cancelar"
        onConfirm={handleConfirmEditFicha}
        onCancel={() => { setShowEditFichaConfirm(false); setPendingEditFicha(null); }}
      />

      <ModalFormGeneric
        isOpen={showEditProgram}
        title="Editar Programa"
        fields={[
          { label: 'Nombre del Programa', name: 'name', type: 'text', placeholder: 'Ingrese el nombre del programa', required: true },
          { label: 'Código del Programa', name: 'codeProgram', type: 'text', placeholder: 'Ingrese el código del programa', required: true },
          { label: 'Descripción', name: 'description', type: 'text', placeholder: 'Ingrese una descripción', required: false },
          { label: 'Tipo de Programa', name: 'typeProgram', type: 'text', placeholder: 'Ingrese el tipo de programa', required: false },
        ]}
        onClose={() => { setShowEditProgram(false); setEditProgram(null); setPendingEditProgram(null); }}
        onSubmit={handleSubmitEditProgram}
        submitText="Actualizar Programa"
        cancelText="Cancelar"
        initialValues={editProgram || {}}
        customRender={undefined}
        onProgramChange={undefined}
      />
      <ConfirmModal
        isOpen={showEditProgramConfirm}
        title="¿Confirmar actualización de programa?"
        message="¿Estás seguro de que deseas actualizar este programa?"
        confirmText="Sí, actualizar programa"
        cancelText="Cancelar"
        onConfirm={handleConfirmEditProgram}
        onCancel={() => { setShowEditProgramConfirm(false); setPendingEditProgram(null); }}
      />

      <ModalFormGeneric
        isOpen={showEditArea}
        title="Editar Área de Conocimiento"
        fields={[
          { label: 'Nombre del Área', name: 'name', type: 'text', placeholder: 'Ingrese el nombre del área', required: true },
          { label: 'Descripción', name: 'description', type: 'text', placeholder: 'Ingrese una descripción', required: false },
        ]}
        onClose={() => { setShowEditArea(false); setEditArea(null); setPendingEditArea(null); }}
        onSubmit={handleSubmitEditArea}
        submitText="Actualizar Área"
        cancelText="Cancelar"
        initialValues={editArea || {}}
        customRender={undefined}
        onProgramChange={undefined}
      />
      <ConfirmModal
        isOpen={showEditAreaConfirm}
        title="¿Confirmar actualización de área?"
        message="¿Estás seguro de que deseas actualizar esta área?"
        confirmText="Sí, actualizar área"
        cancelText="Cancelar"
        onConfirm={handleConfirmEditArea}
        onCancel={() => { setShowEditAreaConfirm(false); setPendingEditArea(null); }}
      />
    </div>
  );
};

export default General;
