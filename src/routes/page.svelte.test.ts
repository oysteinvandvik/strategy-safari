import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	test('should render h1', async () => {
		render(Page);
		// Hero content is gated behind a pageVisible flag set in onMount + setTimeout,
		// so the heading appears asynchronously — poll for it with findBy*.
		expect(await screen.findByRole('heading', { level: 1 })).toBeInTheDocument();
	});
});
