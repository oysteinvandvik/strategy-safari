import type { PageLoad } from './$types';
import { fetchSchools } from '$lib/data/schools';

export const load: PageLoad = async ({ fetch }) => {
	const schools = await fetchSchools(fetch);
	return {
		radarData: schools.map((s) => ({ school: s.name, group: s.group, values: s.values }))
	};
};
