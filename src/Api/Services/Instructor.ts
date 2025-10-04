/**
 * Servicio para operaciones relacionadas con la entidad Instructor.
 * Incluye obtención, registro, actualización y consulta por ID.
 */
import { ENDPOINTS } from '../config/ConfigApi';
import { CreateInstructor, InstructorCustomList, InstructorBackendResponse } from '../types/entities/instructor.types';
import { KnowledgeArea } from '../types/Modules/general.types';
import { getKnowledgeAreas } from './KnowledgeArea';

/**
 * Obtiene la lista de todos los instructores.
 * @returns Promesa con el array de instructores
 */
export async function getInstructores() {
  const response = await fetch(ENDPOINTS.instructor.getAllInstructores);
  if (!response.ok) throw new Error('Error al obtener instructores');
  return response.json();
}

/**
 * Registra un nuevo instructor en el sistema.
 * @param data - Datos del instructor a registrar
 * @returns Promesa con la respuesta de la API
 */
export async function postInstructor(data: CreateInstructor) {
  const response = await fetch(ENDPOINTS.instructor.allInstructores, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Error al registrar instructor');
  return response.json();
}

/**
 * Actualiza los datos de un instructor existente.
 * @param id - ID del instructor
 * @param data - Datos actualizados del instructor
 * @returns Promesa con la respuesta de la API
 */
export async function putInstructor(id: string, data: CreateInstructor) {
  const url = ENDPOINTS.instructor.putIdInstructor.replace('{id}', id);
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Error al actualizar instructor');
  return response.json();
}

// src/Api/Services/Instructor.ts
/**
 * Obtiene los datos de un instructor por su ID.
 * @param id - ID del instructor
 * @returns Promesa con el objeto instructor
 */
export async function getInstructorById(id: string) {
  const url = ENDPOINTS.instructor.getIdInstructor.replace('{id}', id);
  const response = await fetch(url);
  if (!response.ok) throw new Error('Error al obtener instructor');
  return response.json();
}

/**
 * Obtiene la lista personalizada de instructores para asignación.
 * Transforma los datos del backend al formato esperado por el frontend.
 * Incluye el nombre del área de conocimiento.
 * @returns Promesa con el array de instructores personalizados
 */
export async function getInstructoresCustomList(): Promise<InstructorCustomList[]> {
  try {
    // Obtener instructores y áreas de conocimiento en paralelo
    const [instructoresResponse, knowledgeAreasData] = await Promise.all([
      fetch(ENDPOINTS.instructor.getCustomList),
      getKnowledgeAreas()
    ]);

    if (!instructoresResponse.ok) {
      throw new Error('Error al obtener lista de instructores');
    }

    const instructores: InstructorBackendResponse[] = await instructoresResponse.json();
    
    // Crear un mapa de ID -> Nombre del área de conocimiento
    const areasMap = new Map<number, string>();
    if (Array.isArray(knowledgeAreasData)) {
      knowledgeAreasData.forEach((area: KnowledgeArea) => {
        areasMap.set(area.id, area.name || area.description || `Área ${area.id}`);
      });
    }
    
    // Transformar los datos del backend al formato esperado por el frontend
    if (Array.isArray(instructores)) {
      return instructores.map((instructor: InstructorBackendResponse): InstructorCustomList => {
        // Construir el nombre completo del instructor
        const nombreCompleto = [
          instructor.first_name,
          instructor.second_name,
          instructor.first_last_name,
          instructor.second_last_name
        ].filter(Boolean).join(' ');
        
        // Obtener el nombre del área de conocimiento
        const areaName = instructor.knowledgeArea 
          ? areasMap.get(instructor.knowledgeArea) || `Área ${instructor.knowledgeArea}`
          : undefined;
        
        return {
          id: instructor.id,
          nombre: nombreCompleto,
          especialidad: areaName,
          email: instructor.email,
          asignados: 0, // TODO: el backend debe retornar esto en el endpoint custom-list
          maxAsignados: 80 // TODO: el backend debe retornar esto en el endpoint custom-list
        };
      });
    }
    
    return [];
  } catch (error) {
    console.error('Error en getInstructoresCustomList:', error);
    throw error;
  }
}