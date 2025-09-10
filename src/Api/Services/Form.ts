// Crear formulario
export async function postForm(data) {
	const response = await fetch(ENDPOINTS.form.post, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	if (!response.ok) throw new Error('Error al crear el formulario');
	return response.json();
}
import { ENDPOINTS } from '../config/ConfigApi';

export async function getForms() {
	const response = await fetch(ENDPOINTS.form.getForm);
	if (!response.ok) throw new Error('Error al obtener formularios');
	return response.json();
}
//obtener todos los formularios con fetch-get