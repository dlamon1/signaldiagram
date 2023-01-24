import { writable } from 'svelte/store';
import cloneDeep from 'lodash.clonedeep';

export const storeWithHistory = (value: any) => {
	const { subscribe, set, update } = writable(value);

	const history: any[] = [cloneDeep(value)];
	let indicator = 0;

	return {
		subscribe,
		update,
		undo: () => {
			update((n) => {
				indicator = Math.max(0, --indicator);
				if (indicator === 0) console.log('no more undo');
				return cloneDeep(history[indicator]);
			});
		},
		redo: () => {
			update((n) => {
				indicator = Math.min(history.length - 1, ++indicator);
				if (indicator === history.length - 1) console.log('no more redo');
				return cloneDeep(history[indicator]);
			});
		},
		save: (data: any) => {
			update((n) => {
				if (indicator !== history.length - 1) {
					history.splice(indicator + 1);
				}
				console.log('n', n);
				console.log('historyBefore', history);
				history.push(cloneDeep(data));
				indicator = history.length - 1;
				console.log('historyAfter', history, indicator);
				return cloneDeep(history[indicator]);
			});
			return cloneDeep(history[indicator]);
		},
		indicator: () => indicator,
		history: () => [...history],
		set
	};
};
