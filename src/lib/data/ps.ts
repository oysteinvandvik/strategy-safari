import { error } from '@sveltejs/kit';

export interface PsFramework {
	title: string;
	subtitle: string;
	description: string;
	author: string;
	source: string;
	year: string;
}

export interface PsItem {
	id: string;
	label: string;
	icon: string;
	color: string;
	order: number;
	shortDescription: string;
	fullDescription: string;
	characteristics: unknown[];
	examples: unknown[];
	questions: unknown[];
}

export interface PsInteraction {
	from: string;
	to: string;
	relationship: string;
}

export interface PsInteractions {
	description: string;
	matrix: PsInteraction[];
}

export interface PsData {
	framework: PsFramework;
	ps: PsItem[];
	interactions: PsInteractions;
}

export async function fetchPs(fetch: typeof globalThis.fetch): Promise<PsData> {
	const res = await fetch('/data/ps.json');
	if (!res.ok) throw error(500, 'Could not load strategy P data');
	return (await res.json()) as PsData;
}

export async function fetchP(fetch: typeof globalThis.fetch, slug: string): Promise<PsItem> {
	const data = await fetchPs(fetch);
	const item = data.ps.find((p) => p.id === slug);
	if (!item) throw error(404, `Strategy perspective "${slug}" not found`);
	return item;
}
