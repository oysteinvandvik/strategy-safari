import type { PageLoad } from './$types';
import { fetchSchool, fetchSchools } from '$lib/data/schools';

export const load: PageLoad = async ({ params, fetch }) => {
	const [school, allSchools] = await Promise.all([
		fetchSchool(fetch, params.slug),
		fetchSchools(fetch)
	]);
	return { school, allSchools };
};
