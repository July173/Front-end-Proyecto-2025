import React, { useEffect, useState } from 'react';
import { getAprendices } from '../Api/Services/Aprendiz';
import { getInstructores } from '../Api/Services/Instructor';
import { getUsers, deleteUser, getUserStatus } from '../Api/Services/User';
import { User, GraduationCap } from 'lucide-react';
import type { Aprendiz, Instructor, UsuarioRegistrado } from '../Api/types';

const estadoColor = {
  activo: 'bg-green-100 border-green-400',
  inhabilitado: 'bg-red-100 border-red-400',
  registrado: 'bg-yellow-100 border-yellow-400',
};

const estadoLabel = {
  activo: 'Activo',
  inhabilitado: 'Inhabilitado',
  registrado: 'Registrado',
};

const Users = () => {
  const [aprendices, setAprendices] = useState<Aprendiz[]>([]);
  const [instructores, setInstructores] = useState<Instructor[]>([]);
  const [registrados, setRegistrados] = useState<UsuarioRegistrado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError('');
      try {
        const [apr, inst, reg] = await Promise.all([
          getAprendices(),
          getInstructores(),
          getUsers()
        ]);
        setAprendices(apr);
        setInstructores(inst);
        setRegistrados(reg);
      } catch (err) {
        setError('Error al cargar los usuarios');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Cambia el estado del usuario usando deleteUser (habilita o inhabilita)
  const handleToggleEstado = async (userId: string) => {
    try {
      await deleteUser(userId);
      // Refresca los datos después de cambiar el estado
      const [apr, inst, reg] = await Promise.all([
        getAprendices(),
        getInstructores(),
        getUsers()
      ]);
      setAprendices(apr);
      setInstructores(inst);
      setRegistrados(reg);
    } catch {
      alert('No se pudo cambiar el estado del usuario');
    }
  };

  // Tarjeta para aprendices/instructores
  function UserCard({ user, tipo }: { user: Aprendiz | Instructor, tipo: 'aprendiz' | 'instructor' }) {
    const isAprendiz = tipo === 'aprendiz';
    const Icon = isAprendiz ? GraduationCap : User;
    const estado = getUserStatus(user); // <-- usa la función importada
    const color = estadoColor[estado] || 'bg-gray-100 border-gray-300';
    const label = estadoLabel[estado] || '';
    return (
      <div className={`border ${color} rounded-lg p-4 m-2 w-[320px] min-h-[180px] flex flex-col justify-between shadow-sm`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Icon className={isAprendiz ? 'text-purple-500' : 'text-blue-600'} />
            <span className="font-semibold">{user.nombre}</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            estado === 'activo' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {label}
          </span>
        </div>
        <div className="text-sm text-gray-700 mb-1">
          <div>{user.email}</div>
          {isAprendiz ? (
            <>
              <div>Programa : <span className="font-medium">{(user as Aprendiz).programa || '-'}</span></div>
              <div>Rol : <span className="font-bold">Aprendiz</span></div>
              <div>Ficha : <span className="font-mono">{(user as Aprendiz).ficha || '-'}</span></div>
            </>
          ) : (
            <>
              <div>Área : <span className="font-medium">{(user as Instructor).area || '-'}</span></div>
              <div>Rol : <span className="font-bold">{(user as Instructor).rol || 'Administrador'}</span></div>
            </>
          )}
        </div>
        <div className="flex gap-2 mt-2">
          <button
            className={`flex-1 flex items-center justify-center gap-2 ${estado === 'activo' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white py-1 rounded-full text-sm font-semibold`}
            onClick={() => handleToggleEstado(user.id)}
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

  // Tarjeta para usuarios registrados
  function RegistradoCard({ user }: { user: UsuarioRegistrado }) {
    const estado = getUserStatus(user); // <-- usa solo esta función
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
            onClick={() => handleToggleEstado(user.id)}
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">Gestión De Usuarios-Sena</h2>
      {loading && <div className="text-gray-500">Cargando...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {/* Aprendices */}
      <div className="mt-4">
        <h3 className="text-green-700 text-xl font-bold mb-2">Aprendices</h3>
        <div className="flex flex-wrap">
          {aprendices.map((u, i) => <UserCard key={`apr-${i}`} user={u} tipo="aprendiz" />)}
        </div>
      </div>
      {/* Instructores */}
      <div className="mt-6">
        <h3 className="text-blue-700 text-xl font-bold mb-2">Instructores</h3>
        <div className="flex flex-wrap">
          {instructores.map((u, i) => <UserCard key={`inst-${i}`} user={u} tipo="instructor" />)}
        </div>
      </div>
      {/* Registrados */}
      <div className="mt-6">
        <h3 className="text-yellow-600 text-xl font-bold mb-2">Usuarios Registrados</h3>
        <div className="flex flex-wrap">
          {registrados.map((u, i) => <RegistradoCard key={`reg-${i}`} user={u} />)}
        </div>
      </div>
    </div>
  );
};

export default Users;
