import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('/data/schools.json');
	if (!res.ok) throw error(500, 'Could not load schools data');

	const { schools } = await res.json();
	return {
		radarData: schools.map((s: { name: string; group: string; values: number[] }) => ({
			school: s.name,
			group: s.group,
			values: s.values
		}))
	};
};
