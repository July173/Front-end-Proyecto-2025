import { useState, useEffect } from 'react';
import { requestAsignation } from '../Api/types/Modules/assign.types';
import { 
  Regional,
  Sede,
  Center,
  Program,
  Ficha,
} from '../Api/types/Modules/general.types';
import { getRegionales } from '../Api/Services/Regional';
import { getSedes } from '../Api/Services/Sede';
import { getCenters } from '../Api/Services/Center';
import { getPrograms, getProgramFichas } from '../Api/Services/Program';
import { postRequestAssignation, postPdfRequest } from '../Api/Services/RequestAssignaton';
import { getModalityProductiveStages, ModalityProductiveStage } from '../Api/Services/ModalityProductiveStage';

export const useRequestAssignation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  
  // Estados para los selects
  const [regionales, setRegionales] = useState<Regional[]>([]);
  const [centros, setCentros] = useState<Center[]>([]);
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [programas, setProgramas] = useState<Program[]>([]);
  const [fichas, setFichas] = useState<Ficha[]>([]);
  const [modalidades, setModalidades] = useState<ModalityProductiveStage[]>([]);

  // Estados para el formulario
  const [formData, setFormData] = useState<Partial<requestAsignation>>({
    aprendizId: 0,
    fichaId: 0,
    dateEndContract: 0,
    dateStartContract: 0,
    enterpriseName: '',
    enterpriseNit: 0,
    enterpriseLocation: '',
    enterpriseEmail: '',
    bossName: '',
    bossPhone: 0,
    bossEmail: '',
    bossPosition: '',
    humanTalentName: '',
    humanTalentEmail: '',
    humanTalentPhone: '',
    sede: 0,
    modalityProductiveStage: 0,
  });

  // Estados auxiliares para selección en cascada
  const [selectedRegional, setSelectedRegional] = useState<number>(0);
  const [selectedCenter, setSelectedCenter] = useState<number>(0);
  const [selectedProgram, setSelectedProgram] = useState<number>(0);

  // Cargar datos iniciales
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [regionalesData, centrosData, sedesData, programasData, modalidadesData] = await Promise.all([
          getRegionales(),
          getCenters(),
          getSedes(),
          getPrograms(),
          getModalityProductiveStages(),
        ]);
        
        setRegionales(regionalesData);
        setCentros(centrosData);
        setSedes(sedesData);
        setProgramas(programasData);
        setModalidades(modalidadesData);
      } catch (err) {
        console.error('Error cargando datos iniciales:', err);
        setError('Error al cargar los datos iniciales');
      }
    };

    loadInitialData();
  }, []);

  // Actualizar fichas cuando cambia el programa
  useEffect(() => {
    if (selectedProgram) {
      getProgramFichas(selectedProgram)
        .then(setFichas)
        .catch(() => {
          setFichas([]);
          setError('Error al cargar las fichas del programa');
        });
    } else {
      setFichas([]);
    }
    // Limpiar ficha seleccionada
    setFormData(prev => ({ ...prev, fichaId: 0 }));
  }, [selectedProgram]);

  // Filtros para selección en cascada
  const centrosFiltrados = centros.filter(c => c.regional === selectedRegional);
  const sedesFiltradas = sedes.filter(s => s.center === selectedCenter);

  // Funciones para actualizar el formulario
  const updateFormData = (field: keyof requestAsignation, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateSelectedRegional = (regionalId: number) => {
    setSelectedRegional(regionalId);
    setSelectedCenter(0);
    setFormData(prev => ({ ...prev, sede: 0 }));
  };

  const updateSelectedCenter = (centerId: number) => {
    setSelectedCenter(centerId);
    setFormData(prev => ({ ...prev, sede: 0 }));
  };

  const updateSelectedProgram = (programId: number) => {
    setSelectedProgram(programId);
  };

  // Función para enviar la solicitud - MODIFICAR PARA RECIBIR DATOS
  const submitRequest = async (dataToSubmit?: Partial<requestAsignation>): Promise<number | null> => {
    setLoading(true);
    setError('');
    
    // Usar los datos pasados como parámetro o los del estado
    const finalData = dataToSubmit || formData;
    try {
      console.log('=== ENVIANDO AL BACKEND ===');
      console.log('Datos finales a enviar:', finalData);


      // Validar datos requeridos básicos en ambos formatos
      const aprendizId = (finalData as any).aprendiz_id ?? finalData.aprendizId;
      const fichaId = (finalData as any).ficha_id ?? finalData.fichaId;
      const sede = (finalData as any).sede ?? finalData.sede;
      if (!aprendizId || !fichaId || !sede) {
        throw new Error(`Faltan datos requeridos: aprendiz_id(${(finalData as any).aprendiz_id ?? finalData.aprendizId}), ficha_id(${(finalData as any).ficha_id ?? finalData.fichaId}), sede(${(finalData as any).sede ?? finalData.sede})`);
      }

      const response = await postRequestAssignation(finalData as requestAsignation);
      console.log('✅ Respuesta exitosa:', response);
      return response.id || null;
    } catch (err: any) {
      console.error('❌ Error al enviar:', err);
      setError(err.message || 'Error al enviar la solicitud');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Función para subir PDF
  const uploadPdf = async (file: File, requestId?: number): Promise<boolean> => {
    setLoading(true);
    setError('');
    
    try {
      await postPdfRequest(file, requestId);
      return true;
    } catch (err: any) {
      setError(err.message || 'Error al subir el archivo PDF');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    // Estados
    loading,
    error,
    formData,
    
    // Datos para selects
    regionales,
    centrosFiltrados,
    sedesFiltradas,
    programas: programas.filter(p => p.active),
    fichas: fichas.filter(f => f.active),
    modalidades: modalidades.filter(m => m.active === true),
    
    // Estados auxiliares
    selectedRegional,
    selectedCenter,
    selectedProgram,
    
    // Funciones - ACTUALIZAR SIGNATURE DE SUBMITREQUEST
    updateFormData,
    updateSelectedRegional,
    updateSelectedCenter,
    updateSelectedProgram,
    submitRequest, // Ahora puede recibir datos como parámetro
    uploadPdf,
    
    // Función para limpiar errores
    clearError: () => setError(''),
  };
};