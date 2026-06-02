import type { PageLoad } from './$types';
import { fetchParadoxes } from '$lib/data/landscapes';
import { fetchSchools } from '$lib/data/schools';
import { fetchBooks } from '$lib/data/books';

export const load: PageLoad = async ({ fetch }) => {
	const [paradoxes, schools, { books }] = await Promise.all([
		fetchParadoxes(fetch),
		fetchSchools(fetch),
		fetchBooks(fetch)
	]);
	const schoolNames = Object.fromEntries(schools.map((s) => [s.id, s.name]));
	return { paradoxes, schoolNames, books };
};
