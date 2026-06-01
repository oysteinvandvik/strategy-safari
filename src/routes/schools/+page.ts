import type { PageLoad } from './$types';
import { fetchSchools } from '$lib/data/schools';

export const load: PageLoad = async ({ fetch, url }) => {
	const schools = await fetchSchools(fetch);

	return {
		schools,
		initialState: {
			selectedGroup: url.searchParams.get('group') || 'All',
			searchQuery: url.searchParams.get('search') || '',
			selectedForComparison: url.searchParams.get('compare')?.split(',') ?? []
		}
	};
};
