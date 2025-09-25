import React, { useState, useEffect } from 'react';
import { putAprendiz, getAprendizById } from '../Api/Services/Aprendiz';
import { putInstructor, getInstructorById } from '../Api/Services/Instructor';
import { getRegionales } from '../Api/Services/Regional';
import { getSedes } from '../Api/Services/Sede';
import { getCenters } from '../Api/Services/Center';
import { getPrograms, getProgramFichas } from '../Api/Services/Program';
import { getRoles } from '../Api/Services/Rol';
import { getKnowledgeAreas } from '../Api/Services/KnowledgeArea';
import ConfirmModal from './ConfirmModal';
import CustomSelect from './CustomSelect';
import { useDocumentTypes } from '../hook/useDocumentTypes';
import { useContractTypes } from '../hook/useContractTypes';
import type { Regional, Sede, Center, Program, KnowledgeArea, Ficha } from '../Api/types/Modules/general.types';
import type { Role } from '../Api/types/entities/role.types';
import type { CreateAprendiz } from '../Api/types/entities/aprendiz.types';
import type { CreateInstructor } from '../Api/types/entities/instructor.types';

const validateAprendiz = (data) => {
  if (!data.type_identification || !data.number_identification || !data.first_name || !data.first_last_name || !data.phone_number || !data.email || !data.program_id || !data.ficha_id) {
    return 'Todos los campos con * son obligatorios.';
  }
  if (isNaN(Number(data.number_identification))) {
    return 'El número de documento debe ser numérico.';
  }
  if (!/^[0-9]{10}$/.test(data.phone_number)) {
    return 'El teléfono debe tener 10 dígitos.';
  }
  if (!data.email.endsWith('@soy.sena.edu.co')) {
    return 'El correo de aprendiz debe terminar en @soy.sena.edu.co';
  }
  return null;
};

const validateInstructor = (data) => {
  if (!data.type_identification || !data.number_identification || !data.first_name || !data.first_last_name || !data.phone_number || !data.email || !data.role_id || !data.contractType || !data.contractStartDate || !data.contractEndDate || !data.knowledgeArea || !data.center_id || !data.sede_id || !data.regional_id) {
    return 'Todos los campos son obligatorios excepto segundo nombre y segundo apellido.';
  }
  if (isNaN(Number(data.number_identification))) {
    return 'El número de documento debe ser numérico.';
  }
  if (!/^[0-9]{10}$/.test(data.phone_number)) {
    return 'El teléfono debe tener 10 dígitos.';
  }
  if (!data.email.endsWith('@sena.edu.co')) {
    return 'El correo de instructor debe terminar en @sena.edu.co';
  }
  return null;
};

const ModalEditUser = ({ userId, userRole, onClose, onSuccess }) => {
  // userRole: string ('aprendiz' o cualquier otro rol)
  const [tab, setTab] = useState<'aprendiz' | 'instructor'>(userRole === 'aprendiz' ? 'aprendiz' : 'instructor');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { documentTypes } = useDocumentTypes();
  const { contractTypes } = useContractTypes();
  const documentTypesOptions = documentTypes.filter(opt => opt.value !== '').map(opt => ({ value: String(opt.value), label: String(opt.label) }));
  const contractTypesOptions = contractTypes.filter(opt => opt.value !== '').map(opt => ({ value: String(opt.value), label: String(opt.label) }));

  // Estado para selects dinámicos
  const [regionales, setRegionales] = useState<Regional[]>([]);
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [centros, setCentros] = useState<Center[]>([]);
  const [programas, setProgramas] = useState<Program[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [areas, setAreas] = useState<KnowledgeArea[]>([]);
  const [fichas, setFichas] = useState<Ficha[]>([]);

  // Estado para aprendiz/instructor
  const [aprendiz, setAprendiz] = useState<CreateAprendiz | null>(null);
  const [instructor, setInstructor] = useState<CreateInstructor | null>(null);

  // Para selects dependientes
  const centrosFiltrados = centros.filter(c => instructor && c.regional === instructor.regional_id);
  const sedesFiltradas = sedes.filter(s => instructor && s.center === instructor.center_id);

  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState<'aprendiz' | 'instructor' | null>(null);

  useEffect(() => {
    // Cargar datos de selects al montar el modal
    getRegionales().then(setRegionales).catch(() => setRegionales([]));
    getSedes().then(setSedes).catch(() => setSedes([]));
    getCenters().then(setCentros).catch(() => setCentros([]));
    getPrograms().then(setProgramas).catch(() => setProgramas([]));
    getRoles().then(setRoles).catch(() => setRoles([]));
    getKnowledgeAreas().then(setAreas).catch(() => setAreas([]));
  }, []);

  // Cargar datos del usuario
  useEffect(() => {
    if (tab === 'aprendiz') {
      getAprendizById(userId).then(data => {
        console.log('Datos de aprendiz:', data); // <-- Depuración
        setAprendiz({
          ...data,
          program_id: data.program_id || 0,
          ficha_id: data.ficha_id ? String(data.ficha_id) : '',
        });
      });
    } else {
      getInstructorById(userId).then(data => {
        console.log('Datos de instructor:', data); // <-- Depuración
        setInstructor({
          ...data,
          role_id: data.role_id || 0,
          knowledgeArea: data.knowledgeArea || 0,
          center_id: data.center_id || 0,
          sede_id: data.sede_id || 0,
          regional_id: data.regional_id || 0,
          contractType: data.contractType ? String(data.contractType) : "",
        });
      });
    }
  }, [userId, tab]);

  // Actualizar fichas cuando cambia el programa seleccionado (solo para aprendiz)
  useEffect(() => {
    if (tab === 'aprendiz' && aprendiz && aprendiz.program_id) {
      getProgramFichas(aprendiz.program_id)
        .then(setFichas)
        .catch(() => setFichas([]));
    } else {
      setFichas([]);
    }
    // Limpiar ficha seleccionada si cambia el programa
    if (tab === 'aprendiz' && aprendiz) {
      setAprendiz(prev => prev ? { ...prev, ficha_id: '' } : prev);
    }
  }, [tab, aprendiz?.program_id]);

  // Cuando cargue el instructor, asegúrate de que los selects dependientes se actualicen
  useEffect(() => {
    if (tab === 'instructor' && instructor) {
      // Filtrar centros según la regional seleccionada
      const filteredCenters = centros.filter(c => c.regional === instructor.regional_id);
      if (!filteredCenters.some(c => c.id === instructor.center_id)) {
        setInstructor(prev => prev ? { ...prev, center_id: 0, sede_id: 0 } : prev);
      }

      // Filtrar sedes según el centro seleccionado
      const filteredSedes = sedes.filter(s => s.center === instructor.center_id);
      if (!filteredSedes.some(s => s.id === instructor.sede_id)) {
        setInstructor(prev => prev ? { ...prev, sede_id: 0 } : prev);
      }
    }
  }, [instructor?.regional_id, instructor?.center_id, centros, sedes]);

  const handleChange = (e, tipo) => {
    const { name, value } = e.target;
    if (tipo === 'aprendiz') {
      setAprendiz(prev => prev ? { ...prev, [name]: value } : prev);
    } else {
      setInstructor(prev => prev ? { ...prev, [name]: value } : prev);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPendingSubmit(tab);
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setShowConfirm(false);
    setLoading(true);
    setError('');
    let errorMsg = null;

    if (pendingSubmit === 'aprendiz' && aprendiz) {
      errorMsg = validateAprendiz(aprendiz);
      if (errorMsg) {
        setError(errorMsg);
        setLoading(false);
        setPendingSubmit(null);
        return;
      }
      // Separar nombres y apellidos
      const nombres = aprendiz.first_name.trim().split(' ');
      const apellidos = aprendiz.first_last_name.trim().split(' ');
      const payload = {
        ...aprendiz,
        first_name: nombres[0] || '',
        second_name: nombres.slice(1).join(' '),
        first_last_name: apellidos[0] || '',
        second_last_name: apellidos.slice(1).join(' '),
      };
      try {
        await putAprendiz(String(userId), payload);
      } catch (err) {
        setError(err?.message || 'Error al actualizar aprendiz');
        setLoading(false);
        setPendingSubmit(null);
        return;
      }
    } else if (pendingSubmit === 'instructor' && instructor) {
      errorMsg = validateInstructor(instructor);
      if (errorMsg) {
        setError(errorMsg);
        setLoading(false);
        setPendingSubmit(null);
        return;
      }
      // Separar nombres y apellidos para instructor
      const nombres = instructor.first_name.trim().split(' ');
      const apellidos = instructor.first_last_name.trim().split(' ');
      const payload = {
        ...instructor,
        first_name: nombres[0] || '',
        second_name: nombres.slice(1).join(' '),
        first_last_name: apellidos[0] || '',
        second_last_name: apellidos.slice(1).join(' '),
      };
      try {
        await putInstructor(String(userId), payload);
      } catch (err) {
        setError(err?.message || 'Error al actualizar instructor');
        setLoading(false);
        setPendingSubmit(null);
        return;
      }
    }
    if (onSuccess) onSuccess();
    if (onClose) onClose();
    setLoading(false);
    setPendingSubmit(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className={`bg-white rounded-xl p-6 w-full max-w-lg shadow-lg relative ${tab === 'instructor' ? 'max-h-[90vh] overflow-y-auto' : ''}`}>
        <h2 className="text-xl font-bold mb-4">Editar Usuario-Sena</h2>
        <form onSubmit={handleSubmit}>
          {tab === 'aprendiz' && aprendiz ? (
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm">Tipo de documento <span className="text-red-600">*</span></label>
                <CustomSelect
                  value={aprendiz.type_identification}
                  onChange={value => setAprendiz(prev => prev ? { ...prev, type_identification: value } : prev)}
                  options={documentTypesOptions}
                  placeholder="Seleccionar ..."
                  classNames={{
                    trigger: "w-full border rounded-lg px-2 py-2 text-xs flex items-center justify-between bg-white",
                    label: "hidden",
                  }}
                />
              </div>
              <div>
                <label className="block text-sm">Número de documento <span className="text-red-600">*</span></label>
                <input name="number_identification" value={aprendiz.number_identification} onChange={e => handleChange(e, 'aprendiz')} className="w-full border rounded-lg px-2 py-1 placeholder:text-xs" placeholder="ej: 12324224" />
              </div>
              <div>
                <label className="block text-sm">Nombres <span className="text-red-600">*</span></label>
                <input name="first_name" value={aprendiz.first_name} onChange={e => handleChange(e, 'aprendiz')} className="w-full border rounded-lg px-2 py-1 placeholder:text-xs" placeholder="Nombres completos" />
              </div>
              <div>
                <label className="block text-sm">Apellidos <span className="text-red-600">*</span></label>
                <input name="first_last_name" value={aprendiz.first_last_name} onChange={e => handleChange(e, 'aprendiz')} className="w-full border rounded-lg px-2 py-1 placeholder:text-xs" placeholder="Apellidos completos" />
              </div>
              <div>
                <label className="block text-sm">Correo Electrónico <span className="text-red-600">*</span></label>
                <input name="email" value={aprendiz.email} onChange={e => handleChange(e, 'aprendiz')} className="w-full border rounded-lg px-2 py-1 placeholder:text-xs" placeholder="ej: ejemplo@soy.sena.edu.co" />
              </div>
              <div>
                <label className="block text-sm">Teléfono <span className="text-red-600">*</span></label>
                <input 
                  type="tel"
                  inputMode="numeric"
                  pattern="\d*"
                  name="phone_number" 
                  value={aprendiz.phone_number} 
                  onChange={e => {
                    const onlyNumbers = e.target.value.replace(/\D/g, '');
                    setAprendiz(prev => prev ? { ...prev, phone_number: onlyNumbers } : prev);
                  }} 
                  className="w-full border rounded-lg px-2 py-1 placeholder:text-xs" 
                  placeholder="ej: 3102936537" 
                  maxLength={10}
                />
              </div>
              <div>
                <label className="block text-sm">Programa de formación <span className="text-red-600">*</span></label>
                <CustomSelect
                  value={aprendiz.program_id ? String(aprendiz.program_id) : ""}
                  onChange={value => setAprendiz(prev => prev ? { ...prev, program_id: Number(value) } : prev)}
                  options={programas.filter(opt => opt.active).map(opt => ({ value: String(opt.id), label: String(opt.name) }))}
                  placeholder="Seleccionar ..."
                  classNames={{
                    trigger: "w-full border rounded-lg px-2 py-2 text-xs flex items-center justify-between bg-white",
                    label: "hidden",
                  }}
                />
              </div>
              <div>
                <label className="block text-sm">Ficha <span className="text-red-600">*</span></label>
                <CustomSelect
                  value={aprendiz.ficha_id}
                  onChange={value => setAprendiz(prev => prev ? { ...prev, ficha_id: value } : prev)}
                  options={fichas.filter(opt => opt.active).map(opt => ({ value: String(opt.id), label: String(opt.file_number || opt.id) }))}
                  placeholder="Seleccionar ..."
                  classNames={{
                    trigger: "w-full border rounded-lg px-2 py-2 text-xs flex items-center justify-between bg-white",
                    label: "hidden",
                  }}
                />
              </div>
            </div>
          ) : tab === 'instructor' && instructor ? (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm">Tipo de documento <span className="text-red-600">*</span></label>
                <CustomSelect
                  value={instructor.type_identification}
                  onChange={value => setInstructor(prev => prev ? { ...prev, type_identification: value } : prev)}
                  options={documentTypesOptions}
                  placeholder="Seleccionar ..."
                  classNames={{
                    trigger: "w-full border rounded-lg px-2 py-2 text-xs flex items-center justify-between bg-white",
                    label: "hidden",
                  }}
                />
              </div>
              <div>
                <label className="block text-sm">Número de documento <span className="text-red-600">*</span></label>
                <input name="number_identification" value={instructor.number_identification} onChange={e => handleChange(e, 'instructor')} className="w-full border rounded px-2 py-1 placeholder:text-xs" placeholder="ej: 12324224" />
              </div>
              <div>
                <label className="block text-sm">Nombres <span className="text-red-600">*</span></label>
                <input name="first_name" value={instructor.first_name} onChange={e => handleChange(e, 'instructor')} className="w-full border rounded px-2 py-1 placeholder:text-xs" placeholder="Nombres completos" />
              </div>
              <div>
                <label className="block text-sm">Apellidos <span className="text-red-600">*</span></label>
                <input name="first_last_name" value={instructor.first_last_name} onChange={e => handleChange(e, 'instructor')} className="w-full border rounded px-2 py-1 placeholder:text-xs" placeholder="Apellidos completos" />
              </div>
              <div>
                <label className="block text-sm">Correo Electrónico <span className="text-red-600">*</span></label>
                <input name="email" value={instructor.email} onChange={e => handleChange(e, 'instructor')} className="w-full border rounded px-2 py-1 placeholder:text-xs" placeholder="ej: user@sena.edu.co" />
              </div>
              <div>
                <label className="block text-sm">Teléfono <span className="text-red-600">*</span></label>
                <input 
                  type="tel"
                  inputMode="numeric"
                  pattern="\d*"
                  name="phone_number" 
                  value={instructor.phone_number} 
                  onChange={e => {
                    const onlyNumbers = e.target.value.replace(/\D/g, '');
                    setInstructor(prev => prev ? { ...prev, phone_number: onlyNumbers } : prev);
                  }} 
                  className="w-full border rounded px-2 py-1 placeholder:text-xs" 
                  placeholder="ej: 3102936537" 
                  maxLength={10}
                />
              </div>
              <div>
                <label className="block text-sm">Regional <span className="text-red-600">*</span></label>
                <CustomSelect
                  value={instructor.regional_id ? String(instructor.regional_id) : ""}
                  onChange={value => setInstructor(prev => prev ? { ...prev, regional_id: Number(value), center_id: 0, sede_id: 0 } : prev)}
                  options={regionales
                    .filter(opt => opt.active)
                    .map(opt => ({ value: String(opt.id), label: String(opt.name) }))
                  }
                  placeholder="Seleccionar ..."
                  classNames={{
                    trigger: "w-full border rounded-lg px-2 py-2 text-xs flex items-center justify-between bg-white",
                    label: "hidden",
                  }}
                />
              </div>
              <div>
                <label className="block text-sm">Centro <span className="text-red-600">*</span></label>
                <CustomSelect
                  value={instructor.center_id ? String(instructor.center_id) : ""}
                  onChange={value => setInstructor(prev => prev ? { ...prev, center_id: Number(value), sede_id: 0 } : prev)}
                  options={centros
                    .filter(c => c.active && c.regional === instructor.regional_id)
                    .map(opt => ({ value: String(opt.id), label: String(opt.name) }))
                  }
                  placeholder="Seleccionar ..."
                  classNames={{
                    trigger: "w-full border rounded-lg px-2 py-2 text-xs flex items-center justify-between bg-white",
                    label: "hidden",
                  }}
                  disabled={!instructor.regional_id}
                />
              </div>
              <div>
                <label className="block text-sm">Sede <span className="text-red-600">*</span></label>
                <CustomSelect
                  value={instructor.sede_id ? String(instructor.sede_id) : ""}
                  onChange={value => setInstructor(prev => prev ? { ...prev, sede_id: Number(value) } : prev)}
                  options={sedes
                    .filter(s => s.active && s.center === instructor.center_id)
                    .map(opt => ({ value: String(opt.id), label: String(opt.name) }))
                  }
                  placeholder="Seleccionar ..."
                  classNames={{
                    trigger: "w-full border rounded-lg px-2 py-2 text-xs flex items-center justify-between bg-white",
                    label: "hidden",
                  }}
                  disabled={!instructor.center_id}
                />
              </div>
              <div>
                <label className="block text-sm">Área de conocimiento <span className="text-red-600">*</span></label>
                <CustomSelect
                  value={instructor.knowledgeArea ? String(instructor.knowledgeArea) : ""}
                  onChange={value => setInstructor(prev => prev ? { ...prev, knowledgeArea: Number(value) } : prev)}
                  options={areas.filter(opt => opt.active).map(opt => ({ value: String(opt.id), label: String(opt.name) }))}
                  placeholder="Seleccionar ..."
                  classNames={{
                    trigger: "w-full border rounded-lg px-2 py-2 text-xs flex items-center justify-between bg-white",
                    label: "hidden",
                  }}
                />
              </div>
              <div>
                <label className="block text-sm">Tipo de contrato <span className="text-red-600">*</span></label>
                <CustomSelect
                  value={instructor.contractType ? String(instructor.contractType) : ""}
                  onChange={value => setInstructor(prev => prev ? { ...prev, contractType: value } : prev)}
                  options={contractTypesOptions}
                  placeholder="Seleccionar ..."
                  classNames={{
                    trigger: "w-full border rounded-lg px-2 py-2 text-xs flex items-center justify-between bg-white",
                    label: "hidden",
                  }}
                />
              </div>
              <div>
                <label className="block text-sm">Fecha inicio contrato <span className="text-red-600">*</span></label>
                <input type="date" name="contractStartDate" value={instructor.contractStartDate} onChange={e => handleChange(e, 'instructor')} className="w-full border rounded-lg px-2 py-2 text-xs" />
              </div>
              <div>
                <label className="block text-sm">Fecha fin de contrato <span className="text-red-600">*</span></label>
                <input 
                  type="date" 
                  name="contractEndDate" 
                  value={instructor.contractEndDate} 
                  onChange={e => handleChange(e, 'instructor')} 
                  className="w-full border rounded-lg px-2 py-2 text-xs" 
                  min={instructor.contractStartDate || undefined}
                />
              </div>
              <div>
                <label className="block text-sm">Rol <span className="text-red-600">*</span></label>
                <CustomSelect
                  value={instructor.role_id ? String(instructor.role_id) : ""}
                  onChange={value => setInstructor(prev => prev ? { ...prev, role_id: Number(value) } : prev)}
                  options={roles.filter(opt => opt.active && opt.type_role?.toLowerCase() !== 'aprendiz').map(opt => ({ value: String(opt.id), label: String(opt.type_role) }))}
                  placeholder="Seleccionar ..."
                  classNames={{
                    trigger: "w-full border rounded-lg px-2 py-2 text-xs flex items-center justify-between bg-white",
                    label: "hidden",
                  }}
                />
              </div>
            </div>
          ) : null}
          {error && <div className="text-red-500 mt-2">{error}</div>}
          <div className="flex gap-4 mt-6">
            <button type="button" className="flex-1 bg-red-600 text-black py-2 rounded font-bold" onClick={onClose}>Cancelar</button>
            <button type="submit" className={`flex-1 ${tab === 'aprendiz' ? 'bg-green-600' : 'bg-green-700'} text-black py-2 rounded font-bold`} disabled={loading}>
              {loading ? 'Actualizando...' : tab === 'aprendiz' ? 'Actualizar aprendiz' : 'Actualizar instructor'}
            </button>
          </div>
        </form>
        <ConfirmModal
          isOpen={showConfirm}
          title="¿Confirmar actualización?"
          message={`¿Estás seguro de que deseas actualizar este ${pendingSubmit === 'aprendiz' ? 'aprendiz' : 'instructor'}?`}
          confirmText="Sí, actualizar"
          cancelText="Cancelar"
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      </div>
    </div>
  );
};

export default ModalEditUser;



