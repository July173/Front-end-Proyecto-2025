import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser, getUserStatus } from '../Api/Services/User';
import { getPersonById } from '../Api/Services/Person';
import { User, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import ModalCreateUser from './ModalCreateUser';
import ConfirmModal from './ConfirmModal';
import ModalEditUser from './ModalEditUser';
import type { UsuarioRegistrado } from '../Api/types/entities/misc.types';

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
  const [roles, setRoles] = useState<any[]>([]); // Cambia el tipo a any[] para aceptar cualquier estructura
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [pendingUser, setPendingUser] = useState<UsuarioRegistrado | null>(null);
  const [editUser, setEditUser] = useState<UsuarioRegistrado | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [modalEditUserProps, setModalEditUserProps] = useState<{ userId?: number, userRole?: string }>({});
  
  // Estados para secciones desplegables
  const [sectionsOpen, setSectionsOpen] = useState({
    habilitados: true,
    registrados: true,
    inhabilitados: true
  });

  // Estados para aprendices e instructores
  const [aprendices, setAprendices] = useState([]);
  const [instructores, setInstructores] = useState([]);

  // Obtener todos los roles para mostrar el nombre
  const fetchRoles = async () => {
    try {
      const rolesApi = await import('../Api/Services/Rol');
      const rolesData = await rolesApi.getRoles();
      setRoles(rolesData);
    } catch (err) {
      console.warn('No se pudieron obtener los roles', err);
    }
  };

  useEffect(() => {
    fetchAll();
    fetchRoles();
    // Carga aprendices e instructores aquí
    import('../Api/Services/Aprendiz').then(api => api.getAprendices().then(setAprendices));
    import('../Api/Services/Instructor').then(api => api.getInstructores().then(setInstructores));
  }, []);

  const fetchAll = async () => {
    try {
      const reg = await getUsers();
      // Si el campo person es un id, obtener los datos completos de la persona
      const usuariosConPersona = await Promise.all(
        reg.map(async (u: UsuarioRegistrado) => {
          let personaObj = null;
          if (u.person && typeof u.person === 'string') {
            try {
              personaObj = await getPersonById(u.person);
            } catch (err) {
              console.warn('No se pudo obtener la persona para el usuario', u, err);
            }
          } else if (u.person && typeof u.person === 'number') {
            try {
              personaObj = await getPersonById(String(u.person));
            } catch (err) {
              console.warn('No se pudo obtener la persona para el usuario', u, err);
            }
          } else if (u.person && typeof u.person === 'object') {
            personaObj = u.person;
          }
          return { ...u, person: personaObj };
        })
      );
      setRegistrados(usuariosConPersona);
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
      // Refrescar la lista de usuarios después del cambio
      await fetchAll();
    } catch (e) {
      alert('No se pudo cambiar el estado del usuario');
    }
    setPendingUser(null);
  };

  // Función para alternar secciones
  const toggleSection = (section: keyof typeof sectionsOpen) => {
    setSectionsOpen(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };


  // Obtén el ID del usuario actual desde localStorage, contexto, props, etc.
  // Aquí se asume que el ID está guardado en localStorage bajo la clave 'currentUserId'
  const userData = localStorage.getItem('user_data');
  const currentUserId = userData ? JSON.parse(userData).id : null;

  function RegistradoCard({ user }: { user: UsuarioRegistrado }) {
    const estado = getUserStatus(user);
    const color = estadoColor[estado];
    const label = estadoLabel[estado];
    let nombre = '';
    if (user.person && typeof user.person === 'object') {
      nombre = [
        user.person.first_name,
        user.person.second_name ? user.person.second_name : '',
        user.person.first_last_name,
        user.person.second_last_name ? user.person.second_last_name : ''
      ].filter(Boolean).join(' ');
    }
    if (!nombre) {
      nombre = 'Sin nombre';
    }
    let rol = 'Sin rol';
    if (user.role && roles.length > 0) {
      const foundRol = roles.find(r => r.id === user.role);
      if (foundRol && foundRol.type_role) rol = foundRol.type_role;
    }

    const getEditUserProps = (user: UsuarioRegistrado) => {
      const personId = user.person?.id;
      if (user.role && roles.length > 0) {
        const foundRol = roles.find(r => r.id === user.role);
        if (foundRol && foundRol.type_role && foundRol.type_role.toLowerCase() === 'aprendiz') {
          const aprendiz = aprendices.find(a => a.person === personId);
          return { userId: aprendiz?.id || null, userRole: 'aprendiz' };
        } else {
          const instructor = instructores.find(i => i.person === personId);
          return { userId: instructor?.id || null, userRole: foundRol.type_role?.toLowerCase() || 'instructor' };
        }
      }
      return { userId: null, userRole: '' };
    };

    return (
      <div className={`border ${color} rounded-lg p-6 m-3 w-[390px] min-h-[120px] flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow duration-200`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <User className="text-blue-600" />
            <span className="font-semibold">{nombre}</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${estado === 'activo' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>{label}</span>
        </div>
        <div className="text-sm text-gray-700 mb-1">
          <div>{user.email}</div>
          <div>Documento: <span className="font-bold text-gray-800">{user.person?.number_identification || 'Sin documento'}</span></div>
          <div>Rol : <span className="font-bold text-indigo-700">{rol}</span></div>
        </div>
        <div className="flex gap-2 mt-2">
          {Number(user.id) !== Number(currentUserId) && (
            <button
              className={`flex-1 flex items-center justify-center gap-2 ${estado === 'activo' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white py-1 rounded-3xl text-base font-semibold`}
              onClick={() => handleToggleEstado(user)}
            >
              <User className="w-5 h-5" />
              {estado === 'activo' ? 'Inhabilitar' : 'Habilitar'}
            </button>
          )}
          <button
            className="flex-1 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 rounded-3xl text-base font-semibold border border-gray-400"
            onClick={() => {
              const props = getEditUserProps(user);
              if (!props.userId) {
                alert('No se encontró el id de aprendiz/instructor para este usuario.');
                return;
              }
              setModalEditUserProps(props);
              setShowEditModal(true);
            }}
          >
            <span className="material-icons text-base"></span>
            Editar
          </button>
        </div>
      </div>
    );
  }

  // Separar usuarios por estado y registro
  const registradosUsers = registrados.filter(u => u.registered === true);
  const habilitados = registrados.filter(u => !u.registered && getUserStatus(u) === 'activo');
  const inhabilitados = registrados.filter(u => !u.registered && getUserStatus(u) === 'inhabilitado');


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
      <h2 className="text-2xl font-bold mb-6">Gestión De Usuarios-Sena</h2>
      {loading && <div className="text-gray-500">Cargando...</div>}
      {error && <div className="text-red-500">{error}</div>}
      
      <div className="space-y-6">
        {/* Sección Usuarios Habilitados */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('habilitados')}
            className="w-full px-6 py-4 bg-green-50 hover:bg-green-100 flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-green-700">Usuarios Habilitados</h3>
              <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
                {habilitados.length} usuarios
              </span>
            </div>
            {sectionsOpen.habilitados ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          {sectionsOpen.habilitados && (
            <div className="p-6">
              <div className="flex flex-wrap">
                {habilitados.map((u, i) => <RegistradoCard key={`hab-${i}`} user={u} />)}
                {habilitados.length === 0 && (
                  <p className="text-gray-500 italic">No hay usuarios habilitados</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sección Usuarios Registrados */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('registrados')}
            className="w-full px-6 py-4 bg-yellow-50 hover:bg-yellow-100 flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-yellow-700">Usuarios Registrados</h3>
              <span className="bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded-full">
                {registradosUsers.length} usuarios
              </span>
            </div>
            {sectionsOpen.registrados ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          {sectionsOpen.registrados && (
            <div className="p-6">
              <div className="flex flex-wrap">
                {registradosUsers.map((u, i) => <RegistradoCard key={`reg-${i}`} user={u} />)}
                {registradosUsers.length === 0 && (
                  <p className="text-gray-500 italic">No hay usuarios registrados</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sección Usuarios Inhabilitados */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('inhabilitados')}
            className="w-full px-6 py-4 bg-red-50 hover:bg-red-100 flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-red-700">Usuarios Inhabilitados</h3>
              <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full">
                {inhabilitados.length} usuarios
              </span>
            </div>
            {sectionsOpen.inhabilitados ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          {sectionsOpen.inhabilitados && (
            <div className="p-6">
              <div className="flex flex-wrap">
                {inhabilitados.map((u, i) => <RegistradoCard key={`inh-${i}`} user={u} />)}
                {inhabilitados.length === 0 && (
                  <p className="text-gray-500 italic">No hay usuarios inhabilitados</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Modal de crear usuario */}
      {showModal && (
        <ModalCreateUser
          onClose={() => setShowModal(false)}
          onSuccess={fetchAll}
        />
      )}
      {/* Modal de edición de usuario */}
      {showEditModal && (
        <ModalEditUser
          userId={modalEditUserProps.userId}
          userRole={modalEditUserProps.userRole}
          onClose={() => setShowEditModal(false)}
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


    </div>
  );
};

export default Users;
