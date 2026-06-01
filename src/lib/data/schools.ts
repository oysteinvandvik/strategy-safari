import { error } from '@sveltejs/kit';
import type { EnhancedSchoolData } from '$lib/types';

export async function fetchSchools(fetch: typeof globalThis.fetch): Promise<EnhancedSchoolData[]> {
	const res = await fetch('/data/schools.json');
	if (!res.ok) throw error(500, 'Could not load schools data');
	const data = await res.json();
	if (!data.schools || !Array.isArray(data.schools)) {
		throw error(500, 'Invalid schools data format');
	}
	return data.schools as EnhancedSchoolData[];
}

export async function fetchSchool(
	fetch: typeof globalThis.fetch,
	slug: string
): Promise<EnhancedSchoolData> {
	const schools = await fetchSchools(fetch);
	const school = schools.find((s) => s.id === slug);
	if (!school) throw error(404, `Strategy school "${slug}" not found`);
	return school;
}
