// File: src/routes/radar/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('/data/radarData.json');

	if (!res.ok) {
		throw new Error('Kunne ikke hente radarData.json');
	}

	const radarData = await res.json();
	return { radarData };
};
