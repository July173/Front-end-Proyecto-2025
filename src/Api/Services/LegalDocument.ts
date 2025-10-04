// Obtiene el documento legal activo de tipo "privacy"
export async function fetchActivePrivacyDocument(): Promise<LegalDocument | null> {
	try {
		const res = await fetch(ENDPOINTS.legalDocument.allLegalDocument);
		const docs: LegalDocument[] = await res.json();
		return docs.find(doc => doc.type === "privacy" && doc.active) || null;
	} catch (e) {
		return null;
	}
}
import { ENDPOINTS } from "../config/ConfigApi";
import type { LegalDocument, LegalSection } from "../types/entities/legalDocument.types";

// Obtiene el documento legal activo de tipo "terms"
export async function fetchActiveTermsDocument(): Promise<LegalDocument | null> {
	try {
		const res = await fetch(ENDPOINTS.legalDocument.allLegalDocument);
		const docs: LegalDocument[] = await res.json();
		return docs.find(doc => doc.type === "terms" && doc.active) || null;
	} catch (e) {
		return null;
	}
}

// Obtiene las secciones activas de un documento legal por id
export async function fetchSectionsByDocumentId(documentId: number): Promise<LegalSection[]> {
	try {
		const res = await fetch(ENDPOINTS.legalSection.allLegalSection);
		const sections: LegalSection[] = await res.json();
		// Filtra por documentId y activa
		return sections.filter(section => section.active && section.documentId === documentId).sort((a, b) => a.order - b.order);
	} catch (e) {
		return [];
	}
}
