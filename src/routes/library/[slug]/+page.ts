import type { PageLoad } from './$types';
import { fetchBook, fetchBooks } from '$lib/data/books';

export const load: PageLoad = async ({ params, fetch }) => {
	const [book, { books: allBooks, categories }] = await Promise.all([
		fetchBook(fetch, params.slug),
		fetchBooks(fetch)
	]);
	return { book, allBooks, categories };
};
