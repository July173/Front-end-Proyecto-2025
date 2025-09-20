import React, { useEffect, useState } from 'react';
import ConfirmModal from './ConfirmModal';
import ModalFormGeneric from './ModalFormGeneric';
import { getAprendizById, putAprendiz, getAprendices } from '../Api/Services/Aprendiz';
import { getInstructorById, putInstructor, getInstructores } from '../Api/Services/Instructor';
import { getPrograms, getProgramFichas } from '../Api/Services/Program';
import { getRoles } from '../Api/Services/Rol';
import { getCenters } from '../Api/Services/Center';
import { getSedes } from '../Api/Services/Sede';
import { getRegionales } from '../Api/Services/Regional';
import { getKnowledgeAreas } from '../Api/Services/KnowledgeArea';
import { tiposDocumento } from '@/constants/selectOptions';
import type { UsuarioRegistrado  } from '../Api/types/entities/misc.types';

// Helper para obtener el id de aprendiz/instructor por id de person
import type {
  Regional,
  Sede,
  Center,
  Program,
  KnowledgeArea,
  Ficha,
} from '../Api/types/Modules/general.types';
import type {Role} from '../Api/types/entities/role.types';
import type {CreateAprendiz, Aprendiz} from '../Api/types/entities/aprendiz.types';
import type {CreateInstructor, Instructor} from '../Api/types/entities/instructor.types';


async function getAprendizIdByPerson(personId: string | number): Promise<string | number | null> {
  const aprendices: Aprendiz[] = await getAprendices();
  const encontrado = aprendices.find((a) => Number(a.person) === Number(personId));
  return encontrado ? encontrado.id : null;
}

async function getInstructorIdByPerson(personId: string | number) {
  const instructores: Instructor[] = await getInstructores();
  const encontrado = instructores.find((i) => Number(i.person) === Number(personId));
  return encontrado ? encontrado.id : null;
}

const ModalEditUser = ({ isOpen, user, onClose, onSuccess }: {
  isOpen: boolean;
  user: UsuarioRegistrado;
  onClose: () => void;
  onSuccess?: () => void;
}) => {
  // Manejador para cambio de programa en el select
  const handleProgramChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      const fichasProg = await getProgramFichas(Number(value));
      setFichas(fichasProg);
      setInitialValues((prev) => ({ ...prev, program_id: Number(value), ficha_id: '' }));
    } else {
      setFichas([]);
      setInitialValues((prev) => ({ ...prev, program_id: 0, ficha_id: '' }));
    }
  };
    const [showConfirm, setShowConfirm] = useState(false);
    const [pendingValues, setPendingValues] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [initialValues, setInitialValues] = useState<CreateAprendiz | CreateInstructor | null>(null);
  const [fields, setFields] = useState<Array<{ name: string; label: string; type: string; options?: Array<{ value: string | number; label: string }>; disabled?: boolean }>>([]);
  const [programas, setProgramas] = useState<Program[]>([]);
  const [fichas, setFichas] = useState<Ficha[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [centros, setCentros] = useState<Center[]>([]);
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [regionales, setRegionales] = useState<Regional[]>([]);
  const [areas, setAreas] = useState<KnowledgeArea[]>([]);

  // Cargar selects
  useEffect(() => {
    getPrograms().then(setProgramas);
    getRoles().then(setRoles);
    getCenters().then(setCentros);
    getSedes().then(setSedes);
    getRegionales().then(setRegionales);
    getKnowledgeAreas().then(setAreas);
  }, []);

  // Cargar datos del usuario
  useEffect(() => {
    if (!isOpen || !user) return;
    setLoading(true);
    setError('');
    const fetchData = async () => {
      try {
        if (user.role === 2) { // Aprendiz
          const aprendizId = await getAprendizIdByPerson(user.person.id);
          console.log('AprendizId usado:', aprendizId);
          if (!aprendizId) throw new Error('No se encontró aprendiz vinculado');
          const aprendiz = await getAprendizById(String(aprendizId));
          console.log('Datos recibidos de aprendiz:', aprendiz);
          // Buscar el ID del programa por nombre
          let programaId: number | undefined = undefined;
          if (aprendiz.program) {
            const foundPrograma = programas.find(p => p.name === aprendiz.program);
            programaId = foundPrograma ? foundPrograma.id : undefined;
          }
          // Buscar el ID de la ficha por número
          let fichaId: number | undefined = undefined;
          if (aprendiz.ficha) {
            const foundFicha = fichas.find(f => String(f.file_number) === String(aprendiz.ficha));
            fichaId = foundFicha ? foundFicha.id : undefined;
          }
          // Mapeo para campos esperados por el formulario
          const mappedAprendiz: CreateAprendiz & { role: string } = {
            type_identification: aprendiz.type_identification || '',
            number_identification: aprendiz.number_identification  || '',
            first_name: aprendiz.first_name || (aprendiz.full_name ? aprendiz.full_name.split(' ')[0] : ''),
            second_name: aprendiz.second_name || 'Ninguno',
            first_last_name: aprendiz.first_last_name || (aprendiz.full_name ? aprendiz.full_name.split(' ')[1] : ''),
            second_last_name: aprendiz.second_last_name || 'Ninguno',
            phone_number: aprendiz.phone_number ||  '',
            email: aprendiz.email || '',
            program_id: programaId ?? 0,
            ficha_id: fichaId !== undefined ? String(fichaId) : '',
            role: aprendiz.role || '',
          };
          setInitialValues(mappedAprendiz);
          setFields([
            { name: 'type_identification', label: 'Tipo de documento', type: 'select', options: tiposDocumento, disabled: false },
            { name: 'number_identification', label: 'Número de documento', type: 'text', disabled: false },
            { name: 'first_name', label: 'Nombres', type: 'text' },
            { name: 'second_name', label: 'Segundo nombre', type: 'text' },
            { name: 'first_last_name', label: 'Primer apellido', type: 'text' },
            { name: 'second_last_name', label: 'Segundo apellido', type: 'text' },
            { name: 'phone_number', label: 'Teléfono', type: 'text' },
            { name: 'email', label: 'Correo electrónico', type: 'email', disabled: false },
            { name: 'program_id', label: 'Programa de formación', type: 'select', options: programas.map(p => ({ value: p.id, label: p.name })), disabled: false },
            { name: 'ficha_id', label: 'Ficha', type: 'select', options: fichas.map(f => ({ value: f.id, label: String(f.file_number || f.id) })), disabled: false },
            { name: 'role', label: 'Rol', type: 'text', disabled: true },
          ]);
          // Cargar fichas del programa actual
          if (aprendiz.program_id) {
            const fichasProg = await getProgramFichas(aprendiz.program_id);
            setFichas(fichasProg);
          }
        } else { // Instructor u otro
          const instructorId = await getInstructorIdByPerson(user.person.id);
          console.log('InstructorId usado:', instructorId);
          if (!instructorId) throw new Error('No se encontró instructor vinculado');
          const instructor = await getInstructorById(String(instructorId));
          console.log('Datos recibidos de instructor:', instructor);
          // Mapeo para campos esperados por el formulario
          const mappedInstructor = {
            type_identification: instructor.type_identification || '',
            number_identification: instructor.number_identification ||'',
            first_name: instructor.first_name || (instructor.full_name ? instructor.full_name.split(' ')[0] : ''),
            second_name: instructor.second_name || 'Ninguno',
            first_last_name: instructor.first_last_name || (instructor.full_name ? instructor.full_name.split(' ')[1] : ''),
            second_last_name: instructor.second_last_name || 'Ninguno',
            phone_number: instructor.phone_number ||  '',
            email: instructor.email || '',
            role_id:  instructor.role || '',
            contractType: instructor.contractType ||'',
            contractStartDate: instructor.contractStartDate ||'',
            contractEndDate: instructor.contractEndDate ||  '',
            knowledgeArea: instructor.knowledgeArea ||'',
            center_id: instructor.center_id ||  '',
            sede_id: instructor.sede_id ||  '',
            regional_id: instructor.regional_id ||  '',
          };
          setInitialValues(mappedInstructor);
          setFields([
            { name: 'type_identification', label: 'Tipo de documento', type: 'select', options: tiposDocumento.map(opt => ({ value: opt.value, label: opt.label })), disabled: false },
            { name: 'number_identification', label: 'Número de documento', type: 'text', disabled: true },
            { name: 'first_name', label: 'Nombres', type: 'text' },
            { name: 'second_name', label: 'Segundo nombre', type: 'text' },
            { name: 'first_last_name', label: 'Primer apellido', type: 'text' },
            { name: 'second_last_name', label: 'Segundo apellido', type: 'text' },
            { name: 'phone_number', label: 'Teléfono', type: 'text' },
            { name: 'email', label: 'Correo electrónico', type: 'email', disabled: true },
            { name: 'role_id', label: 'Rol', type: 'select', options: roles.map(r => ({ value: r.id, label: r.type_role })) },
            { name: 'contractType', label: 'Tipo de contrato', type: 'text' },
            { name: 'contractStartDate', label: 'Fecha inicio contrato', type: 'date' },
            { name: 'contractEndDate', label: 'Fecha fin contrato', type: 'date' },
            { name: 'knowledgeArea', label: 'Área de conocimiento', type: 'select', options: areas.map(a => ({ value: a.id, label: a.name })) },
            { name: 'center_id', label: 'Centro', type: 'select', options: centros.map(c => ({ value: c.id, label: c.name })) },
            { name: 'sede_id', label: 'Sede', type: 'select', options: sedes.map(s => ({ value: s.id, label: s.name })) },
            { name: 'regional_id', label: 'Regional', type: 'select', options: regionales.map(r => ({ value: r.id, label: r.name })) },
          ]);
        }
      } catch (err) {
        setError('Error al cargar datos');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isOpen, user, programas, roles, centros, sedes, regionales, areas, fichas]);

  // Actualizar fichas cuando cambia el programa en edición de aprendiz
  const aprendizProgramId = initialValues && user.role === 2 && typeof (initialValues as CreateAprendiz).program_id === 'number'
    ? (initialValues as CreateAprendiz).program_id
    : undefined;
  useEffect(() => {
    if (user.role !== 2 || !aprendizProgramId) return;
    getProgramFichas(aprendizProgramId)
      .then(setFichas)
      .catch(() => setFichas([]));
  }, [user.role, aprendizProgramId]);

  const handleSubmit = async (values) => {
    // Mostrar modal de confirmación antes de guardar
    setPendingValues(values);
    setShowConfirm(true);
  };
  
    // Confirmar y guardar cambios
    const handleConfirmSave = async () => {
    setShowConfirm(false);
    setLoading(true);
    setError('');
    try {
      if (user.role === 2) {
        const aprendizId = await getAprendizIdByPerson(user.person.id);
        if (!aprendizId) throw new Error('No se encontró aprendiz vinculado');
        // Limpiar payload para aprendiz
        const cleanPayload = {
          type_identification: pendingValues.type_identification,
          number_identification: pendingValues.number_identification,
          first_name: pendingValues.first_name,
          second_name: pendingValues.second_name,
          first_last_name: pendingValues.first_last_name,
          second_last_name: pendingValues.second_last_name,
          phone_number: pendingValues.phone_number,
          email: pendingValues.email,
          program_id: Number(pendingValues.program_id),
          ficha_id: String(pendingValues.ficha_id),
          role_id: Number(pendingValues.role_id ?? user.role),
        };
        await putAprendiz(String(aprendizId), cleanPayload);
      } else {
        const instructorId = await getInstructorIdByPerson(user.person.id);
        if (!instructorId) throw new Error('No se encontró instructor vinculado');
        // Limpiar payload para instructor
        const cleanPayload = {
          type_identification: pendingValues.type_identification,
          number_identification: pendingValues.number_identification,
          first_name: pendingValues.first_name,
          second_name: pendingValues.second_name,
          first_last_name: pendingValues.first_last_name,
          second_last_name: pendingValues.second_last_name,
          phone_number: pendingValues.phone_number,
          email: pendingValues.email,
          role_id: Number(pendingValues.role_id ?? user.role),
          contractType: pendingValues.contractType,
          contractStartDate: pendingValues.contractStartDate,
          contractEndDate: pendingValues.contractEndDate,
          knowledgeArea: Number(pendingValues.knowledgeArea),
          center_id: Number(pendingValues.center_id),
          sede_id: Number(pendingValues.sede_id),
          regional_id: Number(pendingValues.regional_id),
        };
        await putInstructor(String(instructorId), cleanPayload);
      }
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setError('Error al actualizar');
      console.error('Error en PUT:', err);
    } finally {
      setLoading(false);
    }
    };


  return (
    <>
      <ModalFormGeneric
        isOpen={isOpen}
        title={user.role === 2 ? 'Editar Aprendiz' : 'Editar Instructor'}
        fields={fields}
        initialValues={initialValues || {}}
        onClose={onClose}
        onSubmit={handleSubmit}
        submitText={loading ? 'Guardando...' : 'Guardar cambios'}
        cancelText="Cancelar"
        onProgramChange={handleProgramChange}
        customRender={null}
      />
      <ConfirmModal
        isOpen={showConfirm}
        title="¿Confirmar cambios?"
        message="¿Estás seguro de que deseas guardar los cambios?"
        confirmText="Sí, guardar"
        cancelText="Cancelar"
        onConfirm={handleConfirmSave}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
};

export default ModalEditUser;
