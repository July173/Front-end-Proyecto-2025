import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser, getUserStatus } from '../Api/Services/User';
import { getPersonById } from '../Api/Services/Person';
import { User, Plus } from 'lucide-react';
import ModalCreateUser from './ModalCreateUser';
import ConfirmModal from './ConfirmModal';
import type { UsuarioRegistrado, Person } from '../Api/types';

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

  // Estado para confirmación
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingUser, setPendingUser] = useState<UsuarioRegistrado | null>(null);

  useEffect(() => {
    fetchAll();
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
          <button className="flex-1 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 rounded-full text-sm font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.862 3.487a2.25 2.25 0 013.182 3.182l-9.75 9.75a4.5 4.5 0 01-1.897 1.13l-3.1.886.886-3.1a4.5 4.5 0 011.13-1.897l9.75-9.75z" /></svg>
            Editar
          </button>
        </div>
      </div>
    );
  }

  // Separar usuarios por estado
  const habilitados = registrados.filter(u => getUserStatus(u) === 'activo');
  const inhabilitados = registrados.filter(u => getUserStatus(u) === 'inhabilitado');

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
    </div>
  );
};

export default Users;
