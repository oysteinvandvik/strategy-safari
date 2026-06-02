import type { PageLoad } from './$types';
import { fetchP, fetchPs } from '$lib/data/ps';
import { fetchBooks } from '$lib/data/books';

export const load: PageLoad = async ({ params, fetch }) => {
	const [pItem, psData, { books }] = await Promise.all([
		fetchP(fetch, params.slug),
		fetchPs(fetch),
		fetchBooks(fetch)
	]);
	return { pItem, allPs: psData.ps, framework: psData.framework, interactions: psData.interactions, books };
};
