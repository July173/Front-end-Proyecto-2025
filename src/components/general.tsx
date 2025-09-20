

import React, { useEffect, useState } from 'react';
import { getFichas } from '../Api/Services/Ficha';
import { getPrograms } from '../Api/Services/Program';
import { getKnowledgeAreas } from '../Api/Services/KnowledgeArea';
import type { Ficha, Program, KnowledgeArea } from '../Api/types/Modules/general.types';
import { ChevronDown, ChevronUp, Plus, Settings, Power } from 'lucide-react';

const General = () => {
  // Estados para los datos
  const [fichas, setFichas] = useState<Ficha[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [knowledgeAreas, setKnowledgeAreas] = useState<KnowledgeArea[]>([]);
  
  // Estados de carga
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Estados para secciones desplegables
  const [sectionsOpen, setSectionsOpen] = useState({
    fichas: true,
    programs: true,
    knowledgeAreas: true
  });

  // Cargar datos al montar el componente
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [fichasData, programsData, areasData] = await Promise.all([
          getFichas(),
          getPrograms(),
          getKnowledgeAreas()
        ]);
        setFichas(fichasData);
        setPrograms(programsData);
        setKnowledgeAreas(areasData);
      } catch (err) {
        setError('Error al cargar los datos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Función para alternar secciones
  const toggleSection = (section: keyof typeof sectionsOpen) => {
    setSectionsOpen(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Componente Card reutilizable
  const InfoCard = ({ title, subtitle, isActive, onToggle, onEdit }: {
    title: string;
    subtitle?: string;
    isActive: boolean;
    onToggle: () => void;
    onEdit: () => void;
  }) => (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {isActive ? 'Activo' : 'Inactivo'}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
        >
          <Settings className="w-3 h-3" />
          Ajustar
        </button>
        <button
          onClick={onToggle}
          className={`flex items-center gap-1 px-3 py-1 text-sm rounded transition-colors ${
            isActive 
              ? 'bg-red-600 text-white hover:bg-red-700' 
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          <Power className="w-3 h-3" />
          {isActive ? 'Deshabilitar' : 'Habilitar'}
        </button>
      </div>
    </div>
  );

  // Función placeholder para toggle
  const handleToggle = (type: string, id: number) => {
    console.log(`Toggle ${type} with ID: ${id}`);
    // Aquí implementarías la lógica de habilitar/deshabilitar
  };

  // Función placeholder para editar
  const handleEdit = (type: string, id: number) => {
    console.log(`Edit ${type} with ID: ${id}`);
    // Aquí implementarías la lógica de editar
  };

  if (loading) return <div className="p-8">Cargando...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="bg-white p-8 rounded-lg shadow">
      <div className="flex items-center gap-4 mb-6 justify-between">
        <h2 className="text-2xl font-bold">Gestión General - Sena</h2>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold shadow transition-colors">
            <Plus className="w-4 h-4" />
            Agregar Ficha
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold shadow transition-colors">
            <Plus className="w-4 h-4" />
            Agregar Programa
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold shadow transition-colors">
            <Plus className="w-4 h-4" />
            Agregar Área
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Sección Fichas */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('fichas')}
            className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-gray-900">Fichas</h3>
              <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                {fichas.length} registros
              </span>
            </div>
            {sectionsOpen.fichas ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          {sectionsOpen.fichas && (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fichas.map((ficha) => (
                <InfoCard
                  key={ficha.id}
                  title={`Ficha #${ficha.file_number || ficha.id}`}
                  subtitle={`Programa: ${ficha.programa || 'N/A'}`}
                  isActive={ficha.active}
                  onToggle={() => handleToggle('ficha', ficha.id)}
                  onEdit={() => handleEdit('ficha', ficha.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sección Programas */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('programs')}
            className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-gray-900">Programas</h3>
              <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
                {programs.length} registros
              </span>
            </div>
            {sectionsOpen.programs ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          {sectionsOpen.programs && (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {programs.map((program) => (
                <InfoCard
                  key={program.id}
                  title={program.name || `Programa ${program.codeProgram}`}
                  subtitle={program.description || program.typeProgram}
                  isActive={program.active}
                  onToggle={() => handleToggle('program', program.id)}
                  onEdit={() => handleEdit('program', program.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sección Áreas de Conocimiento */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('knowledgeAreas')}
            className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-gray-900">Áreas de Conocimiento</h3>
              <span className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded-full">
                {knowledgeAreas.length} registros
              </span>
            </div>
            {sectionsOpen.knowledgeAreas ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          {sectionsOpen.knowledgeAreas && (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {knowledgeAreas.map((area) => (
                <InfoCard
                  key={area.id}
                  title={area.name || `Área ${area.id}`}
                  subtitle={area.description}
                  isActive={area.active}
                  onToggle={() => handleToggle('knowledgeArea', area.id)}
                  onEdit={() => handleEdit('knowledgeArea', area.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default General;
