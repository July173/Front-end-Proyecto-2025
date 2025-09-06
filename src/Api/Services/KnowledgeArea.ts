import { ENDPOINTS } from '../config/ConfigApi';

export async function getKnowledgeAreas() {
  const response = await fetch(ENDPOINTS.KnowledgeArea.getKnowledgeAreas);
  if (!response.ok) throw new Error('Error al obtener áreas de conocimiento');
  return response.json();
}