import React, { useState, useEffect } from 'react';
import { postAprendiz } from '../../Api/Services/Aprendiz';
import { postInstructor } from '../../Api/Services/Instructor';
import { getRegionales } from '../../Api/Services/Regional';
import { getSedes } from '../../Api/Services/Sede';
import { getCenters } from '../../Api/Services/Center';
import { getPrograms, getProgramFichas } from '../../Api/Services/Program';
import { getRoles } from '../../Api/Services/Rol';
import { getKnowledgeAreas } from '../../Api/Services/KnowledgeArea';
import ConfirmModal from '../ConfirmModal';
import { useDocumentTypes } from '../../hook/useDocumentTypes';
import { useContractTypes } from '../../hook/useContractTypes';
import type {
  Regional,
  Sede,
  Center,
  Program,
  KnowledgeArea,
  Ficha,
} from '../../Api/types/Modules/general.types';
import type {Role} from '../../Api/types/entities/role.types';
import type {CreateAprendiz} from '../../Api/types/entities/aprendiz.types';
import type {CreateInstructor} from '../../Api/types/entities/instructor.types';
import CustomSelect from '../CustomSelect';
 
 // Validaciones para aprendiz
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

  // Validaciones para instructor
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



const ModalCreateUser = ({ onClose, onSuccess }: { onClose?: () => void; onSuccess?: () => void }) => {
  const [tab, setTab] = useState<'aprendiz' | 'instructor'>('aprendiz');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Hook para obtener tipos de documento dinámicamente
  const { documentTypes } = useDocumentTypes();
  const { contractTypes } = useContractTypes();
  const documentTypesOptions = documentTypes
    .filter(opt => opt.value !== '')
    .map(opt => ({ value: String(opt.value), label: String(opt.label) }));

  const contractTypesOptions = contractTypes
    .filter(opt => opt.value !== '') // <-- filtra la opción vacía
    .map(opt => ({ value: String(opt.value), label: String(opt.label) }));

  // Estado para selects dinámicos
  const [regionales, setRegionales] = useState<Regional[]>([]);
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [centros, setCentros] = useState<Center[]>([]);
  const [programas, setProgramas] = useState<Program[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [areas, setAreas] = useState<KnowledgeArea[]>([]);
  const [fichas, setFichas] = useState<Ficha[]>([]);

  // Estado para aprendiz
  const [aprendiz, setAprendiz] = useState<CreateAprendiz>({
    type_identification: '',
    number_identification: '',
    first_name: '',
    second_name: '',
    first_last_name: '',
    second_last_name: '',
    phone_number: '',
    email: '',
    program_id: 0,
    ficha_id: '',
  });

  // Estado para instructor
  const [instructor, setInstructor] = useState<CreateInstructor>({
    first_name: '',
    second_name: '',
    first_last_name: '',
    second_last_name: '',
    phone_number: '',
    type_identification: '',
    number_identification: '',
    email: '',
    role_id: 0,
    contractType: '',
    contractStartDate: '',
    contractEndDate: '',
    knowledgeArea: 0,
    center_id: 0,
    sede_id: 0,
    regional_id: 0,
  });

  // Filtrar centros y sedes según selección (después de inicializar los estados)
  const centrosFiltrados = centros.filter(c => c.regional === instructor.regional_id);
  const sedesFiltradas = sedes.filter(s => s.center === instructor.center_id);

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
    // Al inicio no se cargan fichas hasta que se seleccione programa
    setFichas([]);
  }, []);

  // Actualizar fichas cuando cambia el programa seleccionado
  useEffect(() => {
    if (aprendiz.program_id) {
      getProgramFichas(aprendiz.program_id)
        .then(setFichas)
        .catch(() => setFichas([]));
    } else {
      setFichas([]);
    }
    // Limpiar ficha seleccionada si cambia el programa
    setAprendiz(prev => ({ ...prev, ficha_id: '' }));
  }, [aprendiz.program_id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, tipo: 'aprendiz' | 'instructor') => {
    const { name, value } = e.target;
    if (tipo === 'aprendiz') {
      // Si cambia el programa, el useEffect se encarga de actualizar fichas y limpiar ficha_id
      setAprendiz(prev => ({ ...prev, [name]: value }));
    } else {
      setInstructor(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPendingSubmit(tab);
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setShowConfirm(false);
    setLoading(true);
    setError('');
    let errorMsg = null;
    // Función para extraer el mensaje del backend
    const getBackendErrorMsg = (err) => {
      if (err?.response?.data) {
        if (typeof err.response.data === 'string') {
          return err.response.data;
        } else if (err.response.data.detalle) {
          return err.response.data.detalle;
        } else if (err.response.data.error) {
          return err.response.data.error;
        } else if (err.response.data.message) {
          return err.response.data.message;
        } else {
          return Object.values(err.response.data).join(' ');
        }
      }
      return err?.message || 'Error al registrar usuario';
    };

    if (pendingSubmit === 'aprendiz') {
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
        await postAprendiz(payload);
      } catch (err) {
        setError(getBackendErrorMsg(err));
        setLoading(false);
        setPendingSubmit(null);
        return;
      }
    } else if (pendingSubmit === 'instructor') {
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
        first_name: nombres[0] || '',
        second_name: nombres.slice(1).join(' '),
        first_last_name: apellidos[0] || '',
        second_last_name: apellidos.slice(1).join(' '),
        phone_number: instructor.phone_number,
        type_identification: instructor.type_identification,
        number_identification: instructor.number_identification,
        email: instructor.email,
        role_id: instructor.role_id,
        contractType: instructor.contractType,
        contractStartDate: instructor.contractStartDate,
        contractEndDate: instructor.contractEndDate,
        knowledgeArea: instructor.knowledgeArea,
        sede_id: instructor.sede_id,
        // NO enviar regional_id ni center_id
      };
      try {
        await postInstructor(payload);
      } catch (err) {
        setError(getBackendErrorMsg(err));
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
        <h2 className="text-xl font-bold mb-4">Registrar Nuevo Usuario-Sena</h2>
        {/* Barra de tabs */}
        <div className="flex mb-4 bg-gray-300 rounded-lg overflow-hidden p-2">
          <button
            className={`flex-1 py-2 font-semibold ${tab === 'aprendiz' ? 'bg-white rounded-xl shadow text-black' : 'text-gray-500'}`}
            onClick={() => setTab('aprendiz')}
          >
            Aprendiz
          </button>
          <button
            className={`flex-1 py-2 font-semibold ${tab === 'instructor' ? 'bg-white  rounded-xl shadow text-black' : 'text-gray-500'}`}
            onClick={() => setTab('instructor')}
          >
            Instructor
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {tab === 'aprendiz' ? (
            <div className="grid grid-cols-2 gap-5">

              <div>
                <label className="block text-sm">Tipo de documento <span className="text-red-600">*</span></label>
                <CustomSelect
                  value={aprendiz.type_identification}
                  onChange={value => setAprendiz(prev => ({ ...prev, type_identification: value }))}
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
                    setAprendiz(prev => ({ ...prev, phone_number: onlyNumbers }));
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
                  onChange={value => setAprendiz(prev => ({ ...prev, program_id: Number(value) }))}
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
                  onChange={value => setAprendiz(prev => ({ ...prev, ficha_id: value }))}
                  options={fichas.filter(opt => opt.active).map(opt => ({ value: String(opt.id), label: String(opt.file_number || opt.id) }))}
                  placeholder="Seleccionar ..."
                  classNames={{
                    trigger: "w-full border rounded-lg px-2 py-2 text-xs flex items-center justify-between bg-white",
                    label: "hidden",
                  }}
                />
              </div>
            </div>

            
          ) : (
            <div className="grid grid-cols-2 gap-3">
              
              <div>
                <label className="block text-sm">Tipo de documento <span className="text-red-600">*</span></label>
                <CustomSelect
                  value={instructor.type_identification}
                  onChange={value => setInstructor(prev => ({ ...prev, type_identification: value }))}
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
                    setInstructor(prev => ({ ...prev, phone_number: onlyNumbers }));
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
                  onChange={value => setInstructor(prev => ({ ...prev, regional_id: Number(value), center_id: 0, sede_id: 0 }))}
                  options={regionales.filter(opt => opt.id != null).map(opt => ({ value: String(opt.id), label: String(opt.name) }))}
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
                  onChange={value => setInstructor(prev => ({ ...prev, center_id: Number(value), sede_id: 0 }))}
                  options={centrosFiltrados.map(opt => ({ value: String(opt.id), label: String(opt.name) }))}
                  placeholder="Seleccionar ..."
                  classNames={{
                    trigger: "w-full border rounded-lg px-2 py-2 text-xs flex items-center justify-between bg-white",
                    label: "hidden",
                  }}
                />
              </div>
              <div>
                <label className="block text-sm">Sede <span className="text-red-600">*</span></label>
                <CustomSelect
                  value={instructor.sede_id ? String(instructor.sede_id) : ""}
                  onChange={value => setInstructor(prev => ({ ...prev, sede_id: Number(value) }))}
                  options={sedesFiltradas.map(opt => ({ value: String(opt.id), label: String(opt.name) }))}
                  placeholder="Seleccionar ..."
                  classNames={{
                    trigger: "w-full border rounded-lg px-2 py-2 text-xs flex items-center justify-between bg-white",
                    label: "hidden",
                  }}
                />
              </div>
              <div>
                <label className="block text-sm">Área de conocimiento <span className="text-red-600">*</span></label>
                <CustomSelect
                  value={instructor.knowledgeArea ? String(instructor.knowledgeArea) : ""}
                  onChange={value => setInstructor(prev => ({ ...prev, knowledgeArea: Number(value) }))}
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
                  value={instructor.contractType}
                  onChange={value => setInstructor(prev => ({ ...prev, contractType: value }))}
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
                  onChange={value => setInstructor(prev => ({ ...prev, role_id: Number(value) }))}
                  options={roles.filter(opt => opt.active && opt.type_role?.toLowerCase() !== 'aprendiz').map(opt => ({ value: String(opt.id), label: String(opt.type_role) }))}
                  placeholder="Seleccionar ..."
                  classNames={{
                    trigger: "w-full border rounded-lg px-2 py-2 text-xs flex items-center justify-between bg-white",
                    label: "hidden",
                  }}
                />
              </div>
            </div>
          )}
          {error && <div className="text-red-500 mt-2">{error}</div>}
          <div className="flex gap-4 mt-6">
            <button type="button" className="flex-1 bg-red-600 text-black py-2 rounded font-bold" onClick={onClose}>Cancelar</button>
            <button type="submit" className={`flex-1 ${tab === 'aprendiz' ? 'bg-green-600' : 'bg-green-700'} text-black py-2 rounded font-bold`} disabled={loading}>
              {loading ? 'Registrando...' : tab === 'aprendiz' ? 'Registrar aprendiz' : 'Registrar instructor'}
            </button>
          </div>
        </form>
        <ConfirmModal
          isOpen={showConfirm}
          title="¿Confirmar registro?"
          message={`¿Estás seguro de que deseas registrar este ${pendingSubmit === 'aprendiz' ? 'aprendiz' : 'instructor'}?`}
          confirmText="Sí, registrar"
          cancelText="Cancelar"
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      </div>
    </div>
  );
};

export default ModalCreateUser;
