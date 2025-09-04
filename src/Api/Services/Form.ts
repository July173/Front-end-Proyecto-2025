import { ENDPOINTS } from '../config/ConfigApi';

export async function getForms() {
	const response = await fetch(ENDPOINTS.form.getForm);
	if (!response.ok) throw new Error('Error al obtener formularios');
	return response.json();
}
//obtener todos los formularios con fetch-get