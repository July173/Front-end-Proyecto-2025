import type { SupportSchedule } from "../types/entities/support.types";

export async function getAllSupportSchedules(): Promise<SupportSchedule[]> {
	const res = await fetch(ENDPOINTS.SupportSchedule.allSupportSchedule);
	const data = await res.json();
	return Array.isArray(data) ? data : [];
}
import { ENDPOINTS } from "../config/ConfigApi";
import type { SupportContact } from "../types/entities/support.types";

export async function getAllSupportContacts(): Promise<SupportContact[]> {
	const res = await fetch(ENDPOINTS.SupportContact.allSupportContact);
	const data = await res.json();
	return Array.isArray(data) ? data.filter(c => c.active) : [];
}
