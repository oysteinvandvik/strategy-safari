import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';

// Importerer etter vi har satt opp miljøet
// landscapeStore er en singleton — vi bruker unike nøkler per test for å unngå tilstandslekkasje

describe('landscapeStore', () => {
	let landscapeStore: Awaited<typeof import('./landscape')>['landscapeStore'];

	beforeEach(async () => {
		// Re-import for å unngå caching av singleton-tilstand mellom tests
		vi.resetModules();
		({ landscapeStore } = await import('./landscape'));
	});

	it('returnerer null for ukjent paradoxId', () => {
		expect(landscapeStore.getPosition('finnes-ikke')).toBeNull();
	});

	it('lagrer og henter tilbake en posisjon', () => {
		landscapeStore.setPosition('paradox-a', 3);
		expect(landscapeStore.getPosition('paradox-a')).toBe(3);
	});

	it('oppdaterer eksisterende posisjon', () => {
		landscapeStore.setPosition('paradox-b', 2);
		landscapeStore.setPosition('paradox-b', 5);
		expect(landscapeStore.getPosition('paradox-b')).toBe(5);
	});

	it('lagrer flere posisjoner uavhengig av hverandre', () => {
		landscapeStore.setPosition('p1', 1);
		landscapeStore.setPosition('p2', 4);
		expect(landscapeStore.getPosition('p1')).toBe(1);
		expect(landscapeStore.getPosition('p2')).toBe(4);
	});

	it('positionList inneholder alle satte posisjoner', () => {
		landscapeStore.setPosition('x', 3);
		landscapeStore.setPosition('y', 7);
		const list = get(landscapeStore.positionList);
		expect(list.find((p) => p.paradoxId === 'x')?.position).toBe(3);
		expect(list.find((p) => p.paradoxId === 'y')?.position).toBe(7);
	});

	it('positionList er tom ved oppstart (ingen localStorage i testmiljø)', () => {
		const list = get(landscapeStore.positionList);
		expect(list).toEqual([]);
	});
});
