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
  const response = await fetch(ENDPOINTS.KnowledgeArea.getKnowledgeAreas);
  if (!response.ok) throw new Error('Error al obtener áreas de conocimiento');
  return response.json();
}