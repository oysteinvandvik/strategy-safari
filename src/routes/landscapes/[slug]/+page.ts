import type { PageLoad } from './$types';
import { fetchParadox, fetchParadoxes } from '$lib/data/landscapes';

export const load: PageLoad = async ({ params, fetch }) => {
	const [paradox, allParadoxes] = await Promise.all([
		fetchParadox(fetch, params.slug),
		fetchParadoxes(fetch)
	]);
	return { paradox, allParadoxes };
};
