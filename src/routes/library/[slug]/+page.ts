import type { PageLoad } from './$types';
import { fetchBook, fetchBooks } from '$lib/data/books';
import { fetchSchools } from '$lib/data/schools';
import { fetchParadoxes } from '$lib/data/landscapes';

export const load: PageLoad = async ({ params, fetch }) => {
	const [book, { books: allBooks, categories }, schools, paradoxes] = await Promise.all([
		fetchBook(fetch, params.slug),
		fetchBooks(fetch),
		fetchSchools(fetch),
		fetchParadoxes(fetch)
	]);
	const schoolNames = Object.fromEntries(schools.map((s) => [s.id, s.name]));
	const paradoxNames = Object.fromEntries(paradoxes.map((p) => [p.id, p.name]));
	return { book, allBooks, categories, schoolNames, paradoxNames };
};
