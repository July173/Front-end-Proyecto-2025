import React from 'react'
import { useEffect, useState } from 'react';
import SummarySecurity from '../components/SummarySecurity';
import Users from '../components/Users';
import Roles from '../components/Roles';
import Modules from '../components/Modules';
import { User, Shield, Layout, FileText } from 'lucide-react';
import { getUsers } from '../Api/Services/User';
import { getRoles } from '../Api/Services/Rol';
import { getModules } from '../Api/Services/Module';
import { getForms } from '../Api/Services/Form';

export const Admin = () => {
  // Estados para los conteos
  const [userCount, setUserCount] = useState<number>(0);
  const [roleCount, setRoleCount] = useState<number>(0);
  const [moduleCount, setModuleCount] = useState<number>(0);
  const [formCount, setFormCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'resumen' | 'usuarios' | 'roles' | 'modulos'>('resumen');

  useEffect(() => {
    async function fetchCounts() {
      setLoading(true);
      setError(null);
      try {
        const [users, roles, modules, forms] = await Promise.all([
          getUsers(),
          getRoles(),
          getModules(),
          getForms()
        ]);
        setUserCount(users.length);
        setRoleCount(roles.length);
        setModuleCount(modules.length);
        setFormCount(forms.length);
      } catch (err) {
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    }
    fetchCounts();
  }, []);

  return (
    <div className="p-8">
      <div className='text-center justify-center '>
        <h1 className='text-3xl font-semibold '>Administración de Permisos </h1>
        <p className='text-gray-600'>Gestiona usuarios, roles, módulos y permisos desde una sola pantalla</p>
      </div>
      <div className="mt-8 flex gap-8 justify-center items-center">
        <div className="bg-white rounded-xl shadow p-4 flex flex-col  w-60">
          <div className="flex items-center gap-3 mb-2">
            <User className="w-8 h-8 text-blue-600" />
            <div className="flex flex-col  mb-2">
              <span className="text-2xl font-bold text-black">{userCount}</span>
              <span className="text-gray-600 mt-1">Usuarios</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-4 flex flex-col w-60">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-green-600" />
            <div className="flex flex-col items-start mb-2">
              <span className="text-2xl font-bold text-black">{roleCount}</span>
              <span className="text-gray-600 mt-1">Roles</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-4 flex flex-col w-60">
          <div className="flex items-center gap-3 mb-2">
            <Layout className="w-8 h-8 text-purple-600" />
            <div className="flex flex-col  mb-2">
              <span className="text-2xl font-bold text-black">{moduleCount}</span>
              <span className="text-gray-600 mt-1">Módulos</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-4 flex flex-col  w-60">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-8 h-8 text-orange-600" />
            <div className="flex flex-col  mb-2">
              <span className="text-2xl font-bold text-black">{formCount}</span>
              <span className="text-gray-600 mt-1">Formularios</span>
            </div>
          </div>
        </div>
      </div>
      {loading && <div className="text-gray-500 text-center mt-6">Cargando...</div>}
      {error && <div className="text-red-500 text-center mt-6">{error}</div>}

      {/* Barra de navegación */}
      <div className="mt-10 bg-[#E9EBF5] rounded-xl flex items-center justify-between px-2 py-2 gap-20 w-full max-w-4xl mx-auto">
        <button
          className={`flex flex-col items-center justify-center w-1/4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'resumen' ? 'bg-white shadow text-black' : 'text-gray-500'}`}
          onClick={() => setActiveTab('resumen')}
        >
          <span className="flex items-center justify-center gap-2">
            <FileText className="w-5 h-5" />
            <span>Resumen</span>
          </span>
        </button>
        <button
          className={`flex flex-col items-center justify-center w-1/4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'usuarios' ? 'bg-white shadow text-black' : 'text-gray-500'}`}
          onClick={() => setActiveTab('usuarios')}
        >
          <span className="flex items-center justify-center gap-2">
            <User className="w-5 h-5" />
            <span>Usuarios</span>
          </span>
        </button>
        <button
          className={`flex flex-col items-center justify-center w-1/4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'roles' ? 'bg-white shadow text-black' : 'text-gray-500'}`}
          onClick={() => setActiveTab('roles')}
        >
          <span className="flex items-center justify-center gap-2">
            <Shield className="w-5 h-5" />
            <span>Roles</span>
          </span>
        </button>
        <button
          className={`flex flex-col items-center justify-center w-1/4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'modulos' ? 'bg-white shadow text-black' : 'text-gray-500'}`}
          onClick={() => setActiveTab('modulos')}
        >
          <span className="flex items-center justify-center gap-2">
            <Layout className="w-5 h-5" />
            <span>Módulos</span>
          </span>
        </button>
      </div>

      {/* Contenido dinámico debajo de la barra de navegación */}
      <div className="mt-6">
        {activeTab === 'resumen' && <SummarySecurity />}
        {activeTab === 'usuarios' && <Users />}
        {activeTab === 'roles' && <Roles />}
        {activeTab === 'modulos' && <Modules />}
      </div>
    </div>
  );
}

