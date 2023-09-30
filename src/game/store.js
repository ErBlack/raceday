import { writable } from 'svelte/store';

export const speedStore = writable(0);
export const rpmStore = writable(0);
export const gearStore = writable(0);
