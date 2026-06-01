import { error } from '@sveltejs/kit';
import type { StrategicParadox } from '$lib/types';

export async function fetchParadoxes(
	fetch: typeof globalThis.fetch
): Promise<StrategicParadox[]> {
	const res = await fetch('/data/landscapes.json');
	if (!res.ok) throw error(500, 'Could not load landscapes data');
	return (await res.json()) as StrategicParadox[];
}

export async function fetchParadox(
	fetch: typeof globalThis.fetch,
	slug: string
): Promise<StrategicParadox> {
	const paradoxes = await fetchParadoxes(fetch);
	const paradox = paradoxes.find((p) => p.id === slug);
	if (!paradox) throw error(404, `Strategic paradox "${slug}" not found`);
	return paradox;
}
