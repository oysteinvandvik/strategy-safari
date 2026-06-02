import type { PageLoad } from './$types';
import { fetchParadox, fetchParadoxes } from '$lib/data/landscapes';
import { fetchSchools } from '$lib/data/schools';
import { fetchBooks } from '$lib/data/books';

export const load: PageLoad = async ({ params, fetch }) => {
	const [paradox, allParadoxes, schools, { books }] = await Promise.all([
		fetchParadox(fetch, params.slug),
		fetchParadoxes(fetch),
		fetchSchools(fetch),
		fetchBooks(fetch)
	]);
	const schoolNames = Object.fromEntries(schools.map((s) => [s.id, s.name]));
	return { paradox, allParadoxes, schoolNames, books };
};
