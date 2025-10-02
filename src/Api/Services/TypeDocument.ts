/**
 * Obtiene los tipos de contrato con una opción vacía por defecto para selects
 * @returns Promise<{ id: number | ""; name: string }[]> - Lista de tipos de contrato con opción vacía
 */
export async function getContractTypesWithEmpty(): Promise<{ id: number | ""; name: string }[]> {
  try {
    // Suponiendo que existe un endpoint para tipos de contrato
    const response = await fetch(ENDPOINTS.contractType.list, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error al obtener los tipos de contrato");
    }
    const contractTypes = await response.json();
    return [
      { id: "", name: "Seleccione tipo de contrato" },
      ...contractTypes
    ];
  } catch (error) {
    console.error('Error obteniendo tipos de contrato:', error);
    // En caso de error, devolver una opción vacía
    return [
      { id: "", name: "Seleccione tipo de contrato" }
    ];
  }
}
import { ENDPOINTS } from "../config/ConfigApi";

import { DocumentType } from "../types/entities/document.type";

/**
 * Obtiene todos los tipos de documento disponibles desde el backend
 * @returns Promise<DocumentType[]> - Lista de tipos de documento
 */
export async function getDocumentTypes(): Promise<DocumentType[]> {
  const response = await fetch(ENDPOINTS.documentType.list, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Error al obtener los tipos de documento");
  }
  return response.json();
}

/**
 * Obtiene un tipo de documento por su id
 * @param id number - id del tipo de documento
 * @returns Promise<DocumentType>
 */
export async function getDocumentTypeById(id: number): Promise<DocumentType> {
  const response = await fetch(ENDPOINTS.documentType.read.replace(":id", String(id)), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Error al obtener el tipo de documento");
  }
  return response.json();
}

/**
 * Crea un nuevo tipo de documento
 * @param data { name: string }
 * @returns Promise<DocumentType>
 */
export async function createDocumentType(data: { name: string }): Promise<DocumentType> {
  const response = await fetch(ENDPOINTS.documentType.create, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Error al crear el tipo de documento");
  }
  return response.json();
}

/**
 * Actualiza un tipo de documento existente
 * @param id number
 * @param data { name: string }
 * @returns Promise<DocumentType>
 */
export async function updateDocumentType(id: number, data: { name: string }): Promise<DocumentType> {
  const response = await fetch(ENDPOINTS.documentType.update.replace(":id", String(id)), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Error al actualizar el tipo de documento");
  }
  return response.json();
}

/**
 * Elimina un tipo de documento
 * @param id number
 * @returns Promise<void>
 */
export async function deleteDocumentType(id: number): Promise<void> {
  const response = await fetch(ENDPOINTS.documentType.delete.replace(":id", String(id)), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Error al eliminar el tipo de documento");
  }
}

/**
 * Obtiene los tipos de documento con una opción vacía por defecto para selects
 * @returns Promise<{ id: number | ""; name: string }[]> - Lista de tipos de documento con opción vacía
 */
export async function getDocumentTypesWithEmpty(): Promise<{ id: number | ""; name: string }[]> {
  try {
    const documentTypes = await getDocumentTypes();
    return [
      { id: "", name: "Seleccione tipo de documento" },
      ...documentTypes
    ];
  } catch (error) {
    console.error('Error obteniendo tipos de documento:', error);
    // En caso de error, devolver una opción vacía
    return [
      { id: "", name: "Seleccione tipo de documento" }
    ];
  }
}