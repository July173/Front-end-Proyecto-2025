/**
 * Servicio para operaciones relacionadas con la entidad Área de Conocimiento.
 * Incluye obtención de áreas de conocimiento.
 */
import { ENDPOINTS } from '../config/ConfigApi';


/**
 * Obtiene la lista de áreas de conocimiento disponibles.
 * @returns Promesa con el array de áreas de conocimiento
 */
export async function getKnowledgeAreas() {
  const response = await fetch(ENDPOINTS.KnowledgeArea.allKnowledgeAreas);
  if (!response.ok) throw new Error('Error al obtener áreas de conocimiento');
  return response.json();
}

/**
 * Crea una nueva área de conocimiento.
 * @param data - Datos del área
 * @returns Promesa con el área creada
 */
export async function createKnowledgeArea(data) {
  const response = await fetch(ENDPOINTS.KnowledgeArea.allKnowledgeAreas, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al crear área de conocimiento');
  return response.json();
}