import type { PageLoad } from './$types';
import { fetchSchool, fetchSchools } from '$lib/data/schools';
import { fetchParadoxes } from '$lib/data/landscapes';
import { fetchBooks } from '$lib/data/books';

export const load: PageLoad = async ({ params, fetch }) => {
	const [school, allSchools, paradoxes, { books }] = await Promise.all([
		fetchSchool(fetch, params.slug),
		fetchSchools(fetch),
		fetchParadoxes(fetch),
		fetchBooks(fetch)
	]);
	return { school, allSchools, paradoxes, books };
};
