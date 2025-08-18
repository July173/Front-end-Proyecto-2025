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
