import { writable } from 'svelte/store';
import { persisted } from 'svelte-local-storage-store';

export const gameStarted = writable(false);

export const speedStore = writable(0);
export const rpmStore = writable(0);
export const gearStore = writable(0);

export const resultsStore = writable();

export const countdown = writable();

export const stats = persisted('stats', {
    time: Infinity,
});
