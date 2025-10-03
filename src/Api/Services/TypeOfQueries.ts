import { ENDPOINTS } from "../config/ConfigApi";

// Obtener todos los tipos de consulta
export async function getAllTypeOfQueries() {
	const response = await fetch(ENDPOINTS.TypeOfQueries.allTypeOfQueries);
	return response.json();
}

// Obtener tipo de consulta por ID
export async function getTypeOfQueriesById(id: string | number) {
	const url = ENDPOINTS.TypeOfQueries.idTypeOfQueries.replace("{id}", String(id));
	const response = await fetch(url);
	return response.json();
}

// Crear tipo de consulta
export async function createTypeOfQueries(data: any) {
	const response = await fetch(ENDPOINTS.TypeOfQueries.createTypeOfQueries, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	return response.json();
}

// Actualizar tipo de consulta (PUT)
export async function updateTypeOfQueries(id: string | number, data: any) {
	const url = ENDPOINTS.TypeOfQueries.updateTypeOfQueries.replace("{id}", String(id));
	const response = await fetch(url, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	return response.json();
}

// Actualización parcial (PATCH)
export async function patchTypeOfQueries(id: string | number, data: any) {
	const url = ENDPOINTS.TypeOfQueries.patchTypeOfQueries.replace("{id}", String(id));
	const response = await fetch(url, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	return response.json();
}

// Eliminar tipo de consulta (DELETE)
export async function deleteTypeOfQueries(id: string | number) {
	const url = ENDPOINTS.TypeOfQueries.deleteTypeOfQueries.replace("{id}", String(id));
	const response = await fetch(url, { method: "DELETE" });
	return response.ok;
}

// Eliminación lógica (soft delete)
export async function softDeleteTypeOfQueries(id: string | number) {
	const url = ENDPOINTS.TypeOfQueries.softDeleteTypeOfQueries.replace("{id}", String(id));
	const response = await fetch(url, { method: "PATCH" });
	return response.json();
}
