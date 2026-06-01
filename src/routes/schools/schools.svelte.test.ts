import { describe, it, expect, vi, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/svelte';
import { tick } from 'svelte';
import type { EnhancedSchoolData } from '$lib/types';

afterEach(cleanup);

import { load } from './+page.js';
import Page from './+page.svelte';

type LoadResult = { schools: EnhancedSchoolData[]; initialState: { selectedGroup: string; searchQuery: string; selectedForComparison: string[] } };

// --- Fixtures ---
// pApproaches omitted — not rendered by the page component under test.
const mockSchools = [
	{
		id: 'design',
		name: 'Design School',
		shortName: 'Design',
		group: 'Prescriptive' as const,
		description: 'Strategy as deliberate design.',
		longDescription: 'Long description.',
		keyFigures: ['Kenneth Andrews'],
		originPeriod: '1960s',
		coreBeliefs: ['Strategy should be explicit'],
		strengths: ['Clear thinking'],
		weaknesses: ['May oversimplify'],
		values: [5, 2, 3, 2, 1]
	},
	{
		id: 'learning',
		name: 'Learning School',
		shortName: 'Learning',
		group: 'Descriptive' as const,
		description: 'Strategy as emergent process.',
		longDescription: 'Long description.',
		keyFigures: ['James Quinn'],
		originPeriod: '1990s',
		coreBeliefs: ['Strategy emerges through learning'],
		strengths: ['Adapts to change'],
		weaknesses: ['Can lack direction'],
		values: [2, 5, 3, 4, 2]
	},
	{
		id: 'positioning',
		name: 'Positioning School',
		shortName: 'Positioning',
		group: 'Prescriptive' as const,
		description: 'Strategy as analytical positioning.',
		longDescription: 'Long description.',
		keyFigures: ['Michael Porter'],
		originPeriod: '1980s',
		coreBeliefs: ['Industry analysis is key'],
		strengths: ['Rigorous analysis'],
		weaknesses: ['Ignores internal capabilities'],
		values: [4, 2, 5, 2, 4]
	}
] as unknown as EnhancedSchoolData[];

function makeFetch(body: unknown, ok = true) {
	return vi.fn().mockResolvedValue({
		ok,
		json: () => Promise.resolve(body)
	});
}

function makeUrl(params: Record<string, string> = {}) {
	const url = new URL('http://localhost/schools');
	Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
	return url;
}

const defaultData = {
	schools: mockSchools,
	initialState: { selectedGroup: 'All', searchQuery: '', selectedForComparison: [] }
};

// --- load() tests ---

describe('schools/+page.ts load()', () => {
	function callLoad(fetchBody: unknown, ok = true, urlParams: Record<string, string> = {}) {
		return load({ fetch: makeFetch(fetchBody, ok), url: makeUrl(urlParams) } as unknown as Parameters<typeof load>[0]) as Promise<LoadResult>;
	}

	it('returns schools array and default initialState', async () => {
		const result = await callLoad({ schools: mockSchools });

		expect(result.schools).toHaveLength(3);
		expect(result.schools[0].id).toBe('design');
		expect(result.initialState.selectedGroup).toBe('All');
		expect(result.initialState.searchQuery).toBe('');
		expect(result.initialState.selectedForComparison).toEqual([]);
	});

	it('reads group filter from URL params', async () => {
		const result = await callLoad({ schools: mockSchools }, true, { group: 'Prescriptive' });
		expect(result.initialState.selectedGroup).toBe('Prescriptive');
	});

	it('reads compare param and splits into array', async () => {
		const result = await callLoad({ schools: mockSchools }, true, { compare: 'design,learning' });
		expect(result.initialState.selectedForComparison).toEqual(['design', 'learning']);
	});

	it('throws when fetch response is not ok', async () => {
		await expect(callLoad(null, false)).rejects.toThrow();
	});

	it('throws when schools property is missing from response', async () => {
		await expect(callLoad({ wrong: 'shape' })).rejects.toThrow();
	});

	it('throws when schools is not an array', async () => {
		await expect(callLoad({ schools: 'not-an-array' })).rejects.toThrow();
	});
});

// --- Page component tests ---
// Content is gated behind pageVisible (set in onMount + setTimeout(100ms)),
// so we use findBy* queries which poll until the element appears.

describe('schools/+page.svelte', () => {
	it('renders a card for each school', async () => {
		render(Page, { props: { data: defaultData } });

		expect(await screen.findByText('Design School')).toBeInTheDocument();
		expect(await screen.findByText('Learning School')).toBeInTheDocument();
		expect(await screen.findByText('Positioning School')).toBeInTheDocument();
	});

	it('shows the correct total count in the All filter button', async () => {
		render(Page, { props: { data: defaultData } });

		expect(await screen.findByText('All Schools (3)')).toBeInTheDocument();
	});

	it('shows correct Prescriptive and Descriptive counts', async () => {
		render(Page, { props: { data: defaultData } });

		expect(await screen.findByText('Prescriptive (2)')).toBeInTheDocument();
		expect(await screen.findByText('Descriptive (1)')).toBeInTheDocument();
	});

	it('renders school descriptions', async () => {
		render(Page, { props: { data: defaultData } });

		expect(await screen.findByText('Strategy as deliberate design.')).toBeInTheDocument();
	});

	it('filters to only Prescriptive schools when filter is clicked', async () => {
		render(Page, { props: { data: defaultData } });

		const prescriptiveBtn = await screen.findByText('Prescriptive (2)');
		await fireEvent.click(prescriptiveBtn);
		await tick();

		expect(await screen.findByText('Design School')).toBeInTheDocument();
		expect(await screen.findByText('Positioning School')).toBeInTheDocument();
		await waitFor(() =>
			expect(screen.queryByText('Learning School')).not.toBeInTheDocument()
		);
	});

	it('filters to only Descriptive schools when filter is clicked', async () => {
		render(Page, { props: { data: defaultData } });

		const descriptiveBtn = await screen.findByText('Descriptive (1)');
		await fireEvent.click(descriptiveBtn);
		await tick();

		expect(await screen.findByText('Learning School')).toBeInTheDocument();
		await waitFor(() =>
			expect(screen.queryByText('Design School')).not.toBeInTheDocument()
		);
	});

	it('restores all schools when All filter is clicked after filtering', async () => {
		render(Page, { props: { data: defaultData } });

		await fireEvent.click(await screen.findByText('Prescriptive (2)'));
		await tick();
		await fireEvent.click(await screen.findByText('All Schools (3)'));
		await tick();

		expect(await screen.findByText('Learning School')).toBeInTheDocument();
		expect(await screen.findByText('Design School')).toBeInTheDocument();
	});

	it('respects initialState.selectedGroup from page data', async () => {
		render(Page, {
			props: {
				data: {
					schools: mockSchools,
					initialState: { selectedGroup: 'Descriptive', searchQuery: '', selectedForComparison: [] }
				}
			}
		});

		expect(await screen.findByText('Learning School')).toBeInTheDocument();
		await waitFor(() =>
			expect(screen.queryByText('Design School')).not.toBeInTheDocument()
		);
	});
});
