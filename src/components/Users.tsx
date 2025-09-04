import React, { useEffect, useState } from 'react';
import { getAprendices } from '../Api/Services/Aprendiz';
import { getInstructores } from '../Api/Services/Instructor';
import { User, GraduationCap } from 'lucide-react';

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
  const [aprendices, setAprendices] = useState([]);
  const [instructores, setInstructores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError('');
      try {
        const [apr, inst] = await Promise.all([
          getAprendices(),
          getInstructores()
        ]);
        setAprendices(apr);
        setInstructores(inst);
      } catch (err) {
        setError('Error al cargar los usuarios');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Agrupa por estado para mostrar como en el ejemplo
  const groupByEstado = (arr, tipo) => {
    const grupos = {
      activo: [],
      registrado: [],
      inhabilitado: [],
    };
    arr.forEach(u => {
      // Ajusta el campo de estado según tu API
      const estado = (u.estado || u.status || 'activo').toLowerCase();
      if (estado.includes('habilitado') || estado === 'activo') grupos.activo.push(u);
      else if (estado.includes('registrado')) grupos.registrado.push(u);
      else grupos.inhabilitado.push(u);
    });
    return grupos;
  };

  const aprendicesGrupos = groupByEstado(aprendices, 'aprendiz');
  const instructoresGrupos = groupByEstado(instructores, 'instructor');

  // Renderiza una tarjeta según tipo y estado
  function UserCard({ user, tipo, estado }) {
    const isAprendiz = tipo === 'aprendiz';
    const Icon = isAprendiz ? GraduationCap : User;
    const color = estadoColor[estado] || 'bg-gray-100 border-gray-300';
    const label = estadoLabel[estado] || '';
    return (
      <div className={`border ${color} rounded-lg p-4 m-2 w-[320px] min-h-[180px] flex flex-col justify-between shadow-sm`}> 
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Icon className={isAprendiz ? 'text-purple-500' : 'text-blue-600'} />
            <span className="font-semibold">{user.nombre || user.name}</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            estado === 'activo' ? 'bg-green-500 text-white' : estado === 'registrado' ? 'bg-yellow-400 text-white' : 'bg-red-500 text-white'
          }`}>
            {label}
          </span>
        </div>
        <div className="text-sm text-gray-700 mb-1">
          <div>{user.email}</div>
          {isAprendiz ? (
            <>
              <div>Programa : <span className="font-medium">{user.programa || user.program || '-'}</span></div>
              <div>Rol : <span className="font-bold">Aprendiz</span></div>
              <div>Ficha : <span className="font-mono">{user.ficha || '-'}</span></div>
            </>
          ) : (
            <>
              <div>Área : <span className="font-medium">{user.area || '-'}</span></div>
              <div>Rol : <span className="font-bold">{user.rol || 'Administrador'}</span></div>
            </>
          )}
        </div>
        <div className="flex gap-2 mt-2">
          {estado === 'activo' ? (
            <button className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-1 rounded-full text-sm font-semibold"><User className="w-4 h-4" />Inhabilitar</button>
          ) : (
            <button className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-1 rounded-full text-sm font-semibold"><User className="w-4 h-4" />Habilitar</button>
          )}
          <button className="flex-1 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 rounded-full text-sm font-semibold"><svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.862 3.487a2.25 2.25 0 013.182 3.182l-9.75 9.75a4.5 4.5 0 01-1.897 1.13l-3.1.886.886-3.1a4.5 4.5 0 011.13-1.897l9.75-9.75z" /></svg>Editar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">Gestion De Usuarios-Sena</h2>
      {loading && <div className="text-gray-500">Cargando...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {/* Habilitados */}
      <div className="mt-4">
        <h3 className="text-green-700 text-xl font-bold mb-2">Usuarios habilitados ({instructoresGrupos.activo.length})</h3>
        <div className="flex flex-wrap">
          {instructoresGrupos.activo.map((u, i) => <UserCard key={i} user={u} tipo="instructor" estado="activo" />)}
        </div>
      </div>
      {/* Registrados */}
      <div className="mt-6">
        <h3 className="text-yellow-600 text-xl font-bold mb-2">Usuarios Registrados ({aprendicesGrupos.registrado.length})</h3>
        <div className="flex flex-wrap">
          {aprendicesGrupos.registrado.map((u, i) => <UserCard key={i} user={u} tipo="aprendiz" estado="registrado" />)}
        </div>
      </div>
      {/* Inhabilitados */}
      <div className="mt-6">
        <h3 className="text-red-600 text-xl font-bold mb-2">Usuarios Inhabilitados ({instructoresGrupos.inhabilitado.length})</h3>
        <div className="flex flex-wrap">
          {instructoresGrupos.inhabilitado.map((u, i) => <UserCard key={i} user={u} tipo="instructor" estado="inhabilitado" />)}
        </div>
      </div>
    </div>
  );
}

export default Users
