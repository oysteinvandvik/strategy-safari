import { browser } from '$app/environment';
import { writable, derived } from 'svelte/store';
import type { ParadoxPosition } from '$lib/types';

const POSITIONS_KEY = 'landscape-positions';
const REFLECTION_PREFIX = 'reflection-';

function loadPositions(): Record<string, number> {
	if (!browser) return {};
	try {
		return JSON.parse(localStorage.getItem(POSITIONS_KEY) || '{}');
	} catch {
		return {};
	}
}

function createLandscapeStore() {
	const positions = writable<Record<string, number>>(loadPositions());

	if (browser) {
		positions.subscribe((value) => {
			localStorage.setItem(POSITIONS_KEY, JSON.stringify(value));
		});
	}

	function setPosition(paradoxId: string, position: number) {
		positions.update((p) => ({ ...p, [paradoxId]: position }));
	}

	function getPosition(paradoxId: string): number | null {
		let result: number | null = null;
		positions.subscribe((p) => {
			result = p[paradoxId] ?? null;
		})();
		return result;
	}

	const positionList = derived(positions, ($positions) =>
		Object.entries($positions).map(
			([paradoxId, position]): ParadoxPosition => ({ paradoxId, position })
		)
	);

	return { subscribe: positions.subscribe, setPosition, getPosition, positionList };
}

export const landscapeStore = createLandscapeStore();

export function loadReflection(paradoxId: string): string {
	if (!browser) return '';
	return localStorage.getItem(`${REFLECTION_PREFIX}${paradoxId}`) ?? '';
}

export function saveReflection(paradoxId: string, text: string): void {
	if (!browser) return;
	localStorage.setItem(`${REFLECTION_PREFIX}${paradoxId}`, text);
}
