//configuracion o validaciones por separado del servicio
import { RegisterPayload, RegisterResponse } from "../types";
import { ENDPOINTS } from "../config/ConfigApi";

// Actualizar imagen de perfil de persona
export async function patchPersonImage(id: string, imageFile: File): Promise<Person> {
  const url = ENDPOINTS.person.IdPerson.replace('{id}', id);
  const formData = new FormData();
  formData.append('image', imageFile);
  const response = await fetch(url, {
    method: 'PATCH',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Error al actualizar la imagen');
  }
  return response.json();
}
// Obtener datos de una persona por ID
import { Person } from "../types";

export async function getPersonById(id: string): Promise<Person> {
  const url = ENDPOINTS.person.IdPerson.replace('{id}', id);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Error al obtener los datos de la persona");
  }
  return response.json();
}


export async function registerAprendiz(payload: RegisterPayload): Promise<RegisterResponse> {
  const response = await fetch(ENDPOINTS.person.registerAprendiz, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Error en el registro");
  }
  return response.json();
}
