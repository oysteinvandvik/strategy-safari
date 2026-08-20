import { browser } from '$app/environment';
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
	let positions = $state<Record<string, number>>(loadPositions());

	function persist() {
		if (browser) localStorage.setItem(POSITIONS_KEY, JSON.stringify(positions));
	}

	function setPosition(paradoxId: string, position: number) {
		positions = { ...positions, [paradoxId]: position };
		persist();
	}

	function getPosition(paradoxId: string): number | null {
		return positions[paradoxId] ?? null;
	}

	const positionList = $derived(
		Object.entries(positions).map(
			([paradoxId, position]): ParadoxPosition => ({ paradoxId, position })
		)
	);

	return {
		setPosition,
		getPosition,
		get positionList() {
			return positionList;
		}
	};
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
