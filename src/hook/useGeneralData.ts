import { useEffect, useState } from "react";
import { getFichas, deleteFicha, createFicha, updateFicha } from "../Api/Services/Ficha";
import { getPrograms, deleteProgram, createProgram, updateProgram } from "../Api/Services/Program";
import { getKnowledgeAreas, deleteKnowledgeArea, createKnowledgeArea, updateKnowledgeArea } from "../Api/Services/KnowledgeArea";
import type { Ficha, Program, KnowledgeArea } from "../Api/types/Modules/general.types";

export function useGeneralData() {
  const [fichas, setFichas] = useState<Ficha[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [knowledgeAreas, setKnowledgeAreas] = useState<KnowledgeArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [fichasData, programsData, areasData] = await Promise.all([
          getFichas(),
          getPrograms(),
          getKnowledgeAreas(),
        ]);
        setFichas(fichasData);
        setPrograms(programsData);
        setKnowledgeAreas(areasData);
      } catch (err) {
        setError("Error al cargar los datos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // CRUD handlers para cada entidad
  const refreshFichas = async () => setFichas(await getFichas());
  const refreshPrograms = async () => setPrograms(await getPrograms());
  const refreshAreas = async () => setKnowledgeAreas(await getKnowledgeAreas());

  return {
    fichas,
    setFichas,
    programs,
    setPrograms,
    knowledgeAreas,
    setKnowledgeAreas,
    loading,
    error,
    refreshFichas,
    refreshPrograms,
    refreshAreas,
    // Fichas
    createFicha,
    updateFicha,
    deleteFicha,
    // Programas
    createProgram,
    updateProgram,
    deleteProgram,
    // Áreas
    createKnowledgeArea,
    updateKnowledgeArea,
    deleteKnowledgeArea,
  };
}
