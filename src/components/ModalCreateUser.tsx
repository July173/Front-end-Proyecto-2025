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
import React, { useState, useEffect } from 'react';
import { postAprendiz } from '../Api/Services/Aprendiz';
import { postInstructor } from '../Api/Services/Instructor';
import { getRegionales } from '../Api/Services/Regional';
import { getSedes } from '../Api/Services/Sede';
import { getCenters } from '../Api/Services/Center';
import { getPrograms, getProgramFichas } from '../Api/Services/Program';
import { getRoles } from '../Api/Services/Rol';
import { getKnowledgeAreas } from '../Api/Services/KnowledgeArea';
import ConfirmModal from './ConfirmModal';
import { tiposDocumento } from '@/constants/selectOptions';
import type {
  Regional,
  Sede,
  Center,
  Program,
  KnowledgeArea,
  Ficha,
} from '../Api/types/Modules/general.types';
import type {Role} from '../Api/types/entities/role.types';
import type {CreateAprendiz} from '../Api/types/entities/aprendiz.types';
import type {CreateInstructor} from '../Api/types/entities/instructor.types';



const ModalCreateUser = ({ onClose, onSuccess }: { onClose?: () => void; onSuccess?: () => void }) => {
  const [tab, setTab] = useState<'aprendiz' | 'instructor'>('aprendiz');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    if (pendingSubmit === 'aprendiz') {
      errorMsg = validateAprendiz(aprendiz);
      if (errorMsg) {
        setError(errorMsg);
        setLoading(false);
        setPendingSubmit(null);
        return;
      }
      await postAprendiz(aprendiz);
    } else if (pendingSubmit === 'instructor') {
      errorMsg = validateInstructor(instructor);
      if (errorMsg) {
        setError(errorMsg);
        setLoading(false);
        setPendingSubmit(null);
        return;
      }
      await postInstructor(instructor);
    }
    if (onSuccess) onSuccess();
    if (onClose) onClose();
    setLoading(false);
    setPendingSubmit(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg relative">
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
                <select name="type_identification" value={aprendiz.type_identification} onChange={e => handleChange(e, 'aprendiz')} className="w-full border rounded-lg px-2 py-2 text-xs">
                  <option value="" className='text-xs'>Seleccionar ...</option>
                  {tiposDocumento.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
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
                <input name="phone_number" value={aprendiz.phone_number} onChange={e => handleChange(e, 'aprendiz')} className="w-full border rounded-lg px-2 py-1 placeholder:text-xs" placeholder="ej: 3102936537" />
              </div>
              <div>
                <label className="block text-sm">Programa de formación <span className="text-red-600">*</span></label>
                <select name="program_id" value={aprendiz.program_id} onChange={e => handleChange(e, 'aprendiz')} className="w-full border rounded-lg px-2 py-2 text-xs">
                  <option value="" className='text-xs'>Seleccionar ...</option>
                  {programas.map((opt: Program) => (
                    <option key={opt.id} value={opt.id}>{ opt.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm">Ficha <span className="text-red-600">*</span></label>
                <select
                  name="ficha_id"
                  value={aprendiz.ficha_id}
                  onChange={e => handleChange(e, 'aprendiz')}
                  className="w-full border rounded-lg px-2 py-2 text-xs"
                >
                  <option value="" className='text-xs'>Seleccionar ...</option>
                  {fichas.map((opt: Ficha) => (
                    <option key={opt.id} value={opt.id}>
                      { opt.file_number || opt.id}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm">Tipo de documento <span className="text-red-600">*</span></label>
                <select name="type_identification" value={instructor.type_identification} onChange={e => handleChange(e, 'instructor')} className="w-full border rounded-lg px-2 py-2 text-xs">
                  <option value="" className='text-xs'>Seleccionar ...</option>
                  {tiposDocumento.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
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
                <input name="email" value={instructor.email} onChange={e => handleChange(e, 'instructor')} className="w-full border rounded px-2 py-1 placeholder:text-xs" placeholder="ej: user@example.com" />
              </div>
              <div>
                <label className="block text-sm">Teléfono <span className="text-red-600">*</span></label>
                <input name="phone_number" value={instructor.phone_number} onChange={e => handleChange(e, 'instructor')} className="w-full border rounded px-2 py-1 placeholder:text-xs" placeholder="ej: 3102936537" />
              </div>
              <div>
                <label className="block text-sm">Regional <span className="text-red-600">*</span></label>
                <select name="regional_id" value={instructor.regional_id} onChange={e => handleChange(e, 'instructor')} className="w-full border rounded-lg px-2 py-2 text-xs">
                  <option value="">Seleccionar ...</option>
                  {regionales.map((opt: Regional) => (
                    <option key={opt.id} value={opt.id}>{ opt.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm">Sede <span className="text-red-600">*</span></label>
                <select name="sede_id" value={instructor.sede_id} onChange={e => handleChange(e, 'instructor')} className="w-full border rounded-lg px-2 py-2 text-xs">
                  <option value="">Seleccionar ...</option>
                  {sedes.map((opt: Sede) => (
                    <option key={opt.id} value={opt.id}>{ opt.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm">Centro <span className="text-red-600">*</span></label>
                <select name="center_id" value={instructor.center_id} onChange={e => handleChange(e, 'instructor')} className="w-full border rounded-lg px-2 py-2 text-xs">
                  <option value="">Seleccionar ...</option>
                  {centros.map((opt: Center) => (
                    <option key={opt.id} value={opt.id}>{opt.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm">Área de conocimiento <span className="text-red-600">*</span></label>
                <select name="knowledgeArea" value={instructor.knowledgeArea} onChange={e => handleChange(e, 'instructor')} className="w-full border rounded-lg px-2 py-2 text-xs">
                  <option value="">Seleccionar ...</option>
                  {areas.map((opt: KnowledgeArea) => (
                    <option key={opt.id} value={opt.id}>{opt.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm">Tipo de contrato <span className="text-red-600">*</span></label>
                <input name="contractType" value={instructor.contractType} onChange={e => handleChange(e, 'instructor')} className="w-full border rounded-lg px-2 py-2 text-xs" placeholder="Tipo de contrato" />
              </div>
              <div>
                <label className="block text-sm">Fecha inicio contrato <span className="text-red-600">*</span></label>
                <input type="date" name="contractStartDate" value={instructor.contractStartDate} onChange={e => handleChange(e, 'instructor')} className="w-full border rounded-lg px-2 py-2 text-xs" />
              </div>
              <div>
                <label className="block text-sm">Fecha fin de contrato <span className="text-red-600">*</span></label>
                <input type="date" name="contractEndDate" value={instructor.contractEndDate} onChange={e => handleChange(e, 'instructor')} className="w-full border rounded-lg px-2 py-2 text-xs" />
              </div>
              <div>
                <label className="block text-sm">Rol <span className="text-red-600">*</span></label>
                <select name="role_id" value={instructor.role_id} onChange={e => handleChange(e, 'instructor')} className="w-full border rounded-lg px-2 py-2 text-xs">
                  <option value="">Seleccionar ...</option>
                  {roles.map((opt: Role) => (
                    <option key={opt.id} value={opt.id}>{opt.type_role}</option>
                  ))}
                </select>
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
