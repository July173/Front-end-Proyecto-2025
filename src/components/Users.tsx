import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser, getUserStatus } from '../Api/Services/User';
import { getPersonById } from '../Api/Services/Person';
import { User, Plus } from 'lucide-react';
import ModalCreateUser from './ModalCreateUser';
import ConfirmModal from './ConfirmModal';
import ModalEditGeneric from './ModalEditGeneric';
import { putAprendiz } from '../Api/Services/Aprendiz';
import { putInstructor } from '../Api/Services/Instructor';
import { getPrograms } from '../Api/Services/Program';
import { getFichas } from '../Api/Services/Ficha';
import { getCenters } from '../Api/Services/Center';
import { getSedes } from '../Api/Services/Sede';
import { getRegionales } from '../Api/Services/Regional';
import { getRoles } from '../Api/Services/Rol';
import { getKnowledgeAreas } from '../Api/Services/KnowledgeArea';
import type { UsuarioRegistrado, Person, CreateAprendiz, CreateInstructor } from '../Api/types';
import { tiposDocumento } from '../constants/selectOptions';
import type { FieldDef } from '../Api/types';

const estadoColor = {
  activo: 'bg-green-100 border-green-400',
  inhabilitado: 'bg-red-100 border-red-400',
};

const estadoLabel = {
  activo: 'Activo',
  inhabilitado: 'Inhabilitado',
};

const Users = () => {
  const [registrados, setRegistrados] = useState<UsuarioRegistrado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editUser, setEditUser] = useState<UsuarioRegistrado | null>(null);
  const [editInitialValues, setEditInitialValues] = useState<Partial<UsuarioRegistrado & Person> | null>(null);
  const [editLoading, setEditLoading] = useState(false);

  // Estado para confirmación
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingUser, setPendingUser] = useState<UsuarioRegistrado | null>(null);

  const [programas, setProgramas] = useState([]);
  const [fichas, setFichas] = useState([]);
  const [centros, setCentros] = useState([]);
  const [sedes, setSedes] = useState([]);
  const [regionales, setRegionales] = useState([]);
  const [roles, setRoles] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    fetchAll();
    getPrograms().then(setProgramas);
    getFichas().then(setFichas);
    getCenters().then(setCentros);
    getSedes().then(setSedes);
    getRegionales().then(setRegionales);
    getRoles().then(setRoles);
    getKnowledgeAreas().then(setAreas);
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    setError('');
    try {
      const reg = await getUsers();
      setRegistrados(reg);
    } catch (err) {
      setError('Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleEstado = (user: UsuarioRegistrado) => {
    setPendingUser(user);
    setShowConfirm(true);
  };

  const handleConfirmToggle = async () => {
    if (!pendingUser) return;
    setShowConfirm(false);
    try {
      await deleteUser(pendingUser.id);
      window.location.reload(); // Solo si no hay error
    } catch (e) {
      alert('No se pudo cambiar el estado del usuario');
    }
    setPendingUser(null);
  };

  // Función para manejar la edición de usuario
  const handleEditUser = async (user: UsuarioRegistrado) => {
    setEditUser(user);
    setEditLoading(true);
    try {
      // Si necesitas obtener datos adicionales de la persona, puedes hacerlo aquí
      // const personData = await getPersonById(user.person_id);
      // setEditInitialValues({ ...user, ...personData });

      // Por ahora, solo usamos los datos actuales del usuario
      setEditInitialValues({
        ...user,
        ...user.person,
      });
      setShowEdit(true);
    } catch (error) {
      alert('No se pudo cargar la información del usuario para editar');
    } finally {
      setEditLoading(false);
    }
  };

  function RegistradoCard({ user }: { user: UsuarioRegistrado }) {
    const estado = getUserStatus(user);
    const color = estadoColor[estado];
    const label = estadoLabel[estado];
    return (
      <div className={`border ${color} rounded-lg p-4 m-2 w-[320px] min-h-[180px] flex flex-col justify-between shadow-sm`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <User className="text-blue-600" />
            <span className="font-semibold">
              {user.person.first_name} {user.person.second_name || ''} {user.person.first_last_name}
            </span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            estado === 'activo' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {label}
          </span>
        </div>
        <div className="text-sm text-gray-700 mb-1">
          <div>{user.email}</div>
          <div>Tipo ID: <span className="font-medium">{user.person.type_identification}</span></div>
          <div>N° ID: <span className="font-mono">{user.person.number_identification}</span></div>
        </div>
        <div className="flex gap-2 mt-2">
          <button
            className={`flex-1 flex items-center justify-center gap-2 ${estado === 'activo' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white py-1 rounded-full text-sm font-semibold`}
            onClick={() => handleToggleEstado(user)}
          >
            <User className="w-4 h-4" />
            {estado === 'activo' ? 'Inhabilitar' : 'Habilitar'}
          </button>
          <button
            className="flex-1 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 rounded-full text-sm font-semibold"
            onClick={() => handleEditUser(user)}
          >
            {/* ...icono... */}
            Editar
          </button>
        </div>
      </div>
    );
  }

  // Separar usuarios por estado
  const habilitados = registrados.filter(u => getUserStatus(u) === 'activo');
  const inhabilitados = registrados.filter(u => getUserStatus(u) === 'inhabilitado');

  // Define los fields aquí, después de tener los arrays
  const fieldsAprendiz: FieldDef[] = [
    { name: 'type_identification', label: 'Tipo de documento', type: 'select', options: tiposDocumento },
    { name: 'number_identification', label: 'Número de documento', type: 'text', placeholder: 'ej: 12324224' },
    { name: 'first_name', label: 'Nombres', type: 'text', placeholder: 'Nombres completos' },
    { name: 'second_name', label: 'Segundo nombre', type: 'text', placeholder: 'Segundo nombre' },
    { name: 'first_last_name', label: 'Primer apellido', type: 'text', placeholder: 'Primer apellido' },
    { name: 'second_last_name', label: 'Segundo apellido', type: 'text', placeholder: 'Segundo apellido' },
    { name: 'phone_number', label: 'Teléfono', type: 'text', placeholder: 'ej: 3102936537' },
    { name: 'email', label: 'Correo Electrónico', type: 'email', placeholder: 'ej: user@example.com' },
    { name: 'program_id', label: 'Programa de formación', type: 'select', options: programas.map(p => ({ value: p.id, label: p.name })) },
    { name: 'ficha_id', label: 'Ficha', type: 'select', options: fichas.map(f => ({ value: f.id, label: f.numeroFicha?.toString() || f.id.toString() })) },
    { name: 'role_id', label: 'Rol', type: 'select', options: roles.map(r => ({ value: r.id, label: r.type_role })) },
  ];

  const fieldsInstructor: FieldDef[] = [
    { name: 'first_name', label: 'Nombres', type: 'text', placeholder: 'Nombres completos' },
    { name: 'second_name', label: 'Segundo nombre', type: 'text', placeholder: 'Segundo nombre' },
    { name: 'first_last_name', label: 'Primer apellido', type: 'text', placeholder: 'Primer apellido' },
    { name: 'second_last_name', label: 'Segundo apellido', type: 'text', placeholder: 'Segundo apellido' },
    { name: 'phone_number', label: 'Teléfono', type: 'text', placeholder: 'ej: 3102936537' },
    { name: 'type_identification', label: 'Tipo de documento', type: 'select', options: tiposDocumento },
    { name: 'number_identification', label: 'Número de documento', type: 'text', placeholder: 'ej: 12324224' },
    { name: 'email', label: 'Correo Electrónico', type: 'email', placeholder: 'ej: user@example.com' },
    { name: 'role_id', label: 'Rol', type: 'select', options: roles.map(r => ({ value: r.id, label: r.type_role })) },
    { name: 'contractType', label: 'Tipo de contrato', type: 'text', placeholder: 'Tipo de contrato' },
    { name: 'contractStartDate', label: 'Fecha inicio contrato', type: 'date' },
    { name: 'contractEndDate', label: 'Fecha fin de contrato', type: 'date' },
    { name: 'knowledgeArea', label: 'Área de conocimiento', type: 'select', options: areas.map(a => ({ value: a.id, label: a.name })) },
    { name: 'center_id', label: 'Centro', type: 'select', options: centros.map(c => ({ value: c.id, label: c.name })) },
    { name: 'sede_id', label: 'Sede', type: 'select', options: sedes.map(s => ({ value: s.id, label: s.name })) },
    { name: 'regional_id', label: 'Regional', type: 'select', options: regionales.map(r => ({ value: r.id, label: r.name })) },
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow relative">
      {/* Botón azul en la esquina superior derecha */}
      <button
        className="absolute right-8 top-8 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold shadow"
        onClick={() => setShowModal(true)}
      >
        <Plus className="w-5 h-5" />
        Registro usuario
      </button>
      <h2 className="text-2xl font-bold mb-2">Gestión De Usuarios-Sena</h2>
      {loading && <div className="text-gray-500">Cargando...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {/* Usuarios habilitados */}
      <div className="mt-6">
        <h3 className="text-green-700 text-xl font-bold mb-2">Usuarios Habilitados</h3>
        <div className="flex flex-wrap">
          {habilitados.map((u, i) => <RegistradoCard key={`hab-${i}`} user={u} />)}
        </div>
      </div>
      {/* Usuarios inhabilitados */}
      <div className="mt-6">
        <h3 className="text-red-600 text-xl font-bold mb-2">Usuarios Inhabilitados</h3>
        <div className="flex flex-wrap">
          {inhabilitados.map((u, i) => <RegistradoCard key={`inh-${i}`} user={u} />)}
        </div>
      </div>
      {/* Modal de crear usuario */}
      {showModal && (
        <ModalCreateUser
          onClose={() => setShowModal(false)}
          onSuccess={fetchAll}
        />
      )}
      {/* Modal de confirmación */}
      <ConfirmModal
        isOpen={showConfirm}
        title={
          pendingUser && getUserStatus(pendingUser) === 'activo'
            ? "¿Inhabilitar usuario?"
            : "¿Habilitar usuario?"
        }
        message={
          pendingUser && getUserStatus(pendingUser) === 'activo'
            ? "¿Quieres inhabilitar este usuario?"
            : "¿Quieres habilitar este usuario?"
        }
        confirmText="Sí, confirmar"
        cancelText="Cancelar"
        onConfirm={handleConfirmToggle}
        onCancel={() => setShowConfirm(false)}
      />

      
      {/* Modal de editar usuario */}
      {showEdit && editUser && editInitialValues && (
        <ModalEditGeneric
          isOpen={showEdit}
          title={`Actualizar ${editUser.role === 2 ? 'Aprendiz' : 'Instructor'}`}
          initialValues={editInitialValues}
          fields={editUser.role === 2 ? fieldsAprendiz : fieldsInstructor}
          onSubmit={async (values) => {
            if (editUser.role === 2) {
              await putAprendiz(editUser.id, values);
            } else {
              await putInstructor(editUser.id, values);
            }
            await fetchAll();
          }}
          onClose={() => {
            setShowEdit(false);
            setEditInitialValues(null);
            setEditUser(null);
          }}
          submitText="Actualizar"
        />
      )}
    </div>
  );
};

export default Users;
