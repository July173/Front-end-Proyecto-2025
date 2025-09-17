import { ENDPOINTS } from '../config/ConfigApi';


/**
 * Crea un nuevo formulario en el sistema.
 * @param data - Datos del formulario a crear
 * @returns Promesa con la respuesta de la API
 */
export async function postForm(data) {
	const response = await fetch(ENDPOINTS.form.post, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	if (!response.ok) throw new Error('Error al crear el formulario');
	return response.json();
}


/**
 * Obtiene la lista de todos los formularios.
 * @returns Promesa con el array de formularios
 */
export async function getForms() {
	const response = await fetch(ENDPOINTS.form.getForm);
	if (!response.ok) throw new Error('Error al obtener formularios');
	return response.json();
}
