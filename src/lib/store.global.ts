import { writable } from 'svelte/store';

import type { Writable } from 'svelte/store';

export const tileTypes: Writable<any> = writable([]);

export const requestedTileTypes: Writable<any> = writable([]);

export const approvedTileTypes: Writable<any> = writable([]);
