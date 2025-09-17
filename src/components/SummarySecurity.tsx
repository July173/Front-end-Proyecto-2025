import React, { useEffect, useState } from 'react';
import { getRolesFormsPerms, getRolesUser } from '../Api/Services/Rol';
import type { Permiso, RolUserCount } from '../Api/types/entities/role.types';
const roleColors: Record<string, string> = {
  Administrador: 'bg-green-50 border-green-400 text-green-700',
  Usuarios: 'bg-red-50 border-red-400 text-red-700',
  Aprendices: 'bg-blue-50 border-blue-400 text-blue-700',
  Instructores: 'bg-yellow-50 border-yellow-400 text-yellow-700',
  Coordinadores: 'bg-pink-50 border-pink-400 text-pink-700',
};


const iconCheck = <span className="text-green-600 text-lg">✓</span>;
const iconCross = <span className="text-red-600 text-lg">✗</span>;

const SummarySecurity = () => {
  const [permisos, setPermisos] = useState<Permiso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [rolesUser, setRolesUser] = useState<RolUserCount[]>([]);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [errorRoles, setErrorRoles] = useState('');

  useEffect(() => {
    getRolesFormsPerms()
      .then(setPermisos)
      .catch(() => setError('Error al cargar permisos'))
      .finally(() => setLoading(false));

    getRolesUser()
      .then(setRolesUser)
      .catch(() => setErrorRoles('Error al cargar roles'))
      .finally(() => setLoadingRoles(false));
  }, []);

  if (loading) return <div className="p-8">Cargando...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-lg shadow overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4">Resumen del modelo de seguridad</h2>
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-3 py-2 border">Rol</th>
              <th className="px-3 py-2 border">Formulario</th>
              <th className="px-3 py-2 border">Visualizar</th>
              <th className="px-3 py-2 border">Editar</th>
              <th className="px-3 py-2 border">Registrar</th>
              <th className="px-3 py-2 border">Eliminar</th>
              <th className="px-3 py-2 border">Inhabilitar / Habilitar</th>
            </tr>
          </thead>
          <tbody>
            {permisos
              .filter(perm => perm.Ver || perm.Editar || perm.Registrar || perm.Eliminar || perm.Activar)
              .map((perm, i) => (
                <tr key={i} className="text-center">
                  <td className="px-3 py-2 border">
                    <span className="inline-block bg-gray-100 border border-gray-300 rounded-full px-2 py-1 text-xs font-semibold">
                      {perm.rol}
                    </span>
                  </td>
                  <td className="px-3 py-2 border">{perm.formulario}</td>
                  <td className="px-3 py-2 border">{perm.Ver ? iconCheck : iconCross}</td>
                  <td className="px-3 py-2 border">{perm.Editar ? iconCheck : iconCross}</td>
                  <td className="px-3 py-2 border">{perm.Registrar ? iconCheck : iconCross}</td>
                  <td className="px-3 py-2 border">{perm.Eliminar ? iconCheck : iconCross}</td>
                  <td className="px-3 py-2 border">{perm.Activar ? iconCheck : iconCross}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white p-8 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-1">Distribución por Roles</h3>
        <p className="mb-4 text-gray-700">Usuarios asignados por rol</p>
        {loadingRoles ? (
          <div className="text-gray-500">Cargando...</div>
        ) : errorRoles ? (
          <div className="text-red-500">{errorRoles}</div>
        ) : (
          <div className="flex flex-col gap-3">
            {rolesUser.map((rol) => {
              // Elige color según el nombre del rol, por defecto azul
              const color = roleColors[rol.nombre] || 'bg-blue-50 border-blue-400 text-blue-700';
              const label =
                rol.nombre === 'Administrador' ? 'Administradores' :
                rol.nombre === 'Usuarios' ? 'usuarios' :
                rol.nombre === 'Aprendices' ? 'Aprendices' :
                rol.nombre === 'Instructores' ? 'instructores' :
                rol.nombre === 'Coordinadores' ? 'Coordinadores' : rol.nombre;
              return (
                <div
                  key={rol.id}
                  className={`flex items-center justify-between border-2 rounded-xl px-4 py-3 ${color}`}
                >
                  <div>
                    <div className="font-semibold text-lg">{rol.nombre}</div>
                    <div className="text-gray-500 text-sm">{rol.descripcion}</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-2xl font-bold">{rol.cantidad_usuarios}</span>
                    <span className="text-xs font-semibold mt-1">{label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SummarySecurity;
