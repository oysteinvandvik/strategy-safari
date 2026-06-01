import type { PageLoad } from './$types';
import { fetchP, fetchPs } from '$lib/data/ps';

export const load: PageLoad = async ({ params, fetch }) => {
	const [pItem, psData] = await Promise.all([fetchP(fetch, params.slug), fetchPs(fetch)]);
	return { pItem, allPs: psData.ps, framework: psData.framework };
};
