//obtener todos los roles con fetch-get
import { ENDPOINTS } from '../config/ConfigApi';

export async function getRoles() {
	const response = await fetch(ENDPOINTS.rol.getRoles);
	if (!response.ok) throw new Error('Error al obtener roles');
	return response.json();
}