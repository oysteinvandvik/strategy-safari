import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => ({
	plugins: [tailwindcss(), sveltekit()],
	...(mode === 'test' ? { resolve: { conditions: ['browser'] } } : {}),
	test: {
		name: 'client',
		environment: 'jsdom',
		clearMocks: true,
		include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
		exclude: ['src/lib/server/**'],
		setupFiles: ['./vitest-setup-client.ts']
	}
}));