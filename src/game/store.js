import { writable } from 'svelte/store';
import { persisted } from 'svelte-local-storage-store';

export const gameStarted = writable(false);
export const gameOpen = writable(false);

/**
 * @type {import('svelte/store').Writable<boolean | undefined>}
 */
export const dashboard = writable(undefined);

export const speedStore = writable(0);
export const rpmStore = writable(0);
export const gearStore = writable(0);

export const resultsStore = writable();

export const countdown = writable();

export const stats = persisted('stats', {
    time: Infinity,
});

export const winner = persisted('racedayWinner', '');

export const gameActivated = persisted('racedayGameActivated', true);
