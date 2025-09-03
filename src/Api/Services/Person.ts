// Obtener datos de una persona por ID
import { Persona } from "../types";

export async function getPersonById(id: string): Promise<Persona> {
  const url = ENDPOINTS.person.getPerson.replace('{id}', id);
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
//configuracion o validaciones por separado del servicio
import { RegisterPayload, RegisterResponse } from "../types";
import { ENDPOINTS } from "../config/ConfigApi";

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
