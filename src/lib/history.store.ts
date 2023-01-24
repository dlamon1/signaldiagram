import { writable } from 'svelte/store';

export const storeWithHistory = (value: any) => {
	const { subscribe, set, update } = writable(value);

	const history: any[] = [Object.assign([], value)];
	let indicator = 0;

	return {
		subscribe,
		update,
		undo: () => {
			update((n) => {
				// console.log('undo');
				indicator = Math.max(0, --indicator);
				if (indicator === 0) console.log('no more undo');
				// console.log('getfromhistory', history[indicator]);
				return history[indicator];
			});
		},
		redo: () => {
			update((n) => {
				// console.log('redo');
				indicator = Math.min(history.length - 1, ++indicator);
				if (indicator === history.length - 1) console.log('no more redo');
				// console.log('getfromhistory', history[indicator]);
				return history[indicator];
			});
		},
		save: (data: any) => {
			update(() => {
				if (indicator !== history.length - 1) {
					// console.log('remove redo history');
					history.splice(indicator + 1);
				}
				history.push(Object.assign([], data));
				indicator = history.length - 1;
				// console.log('save', history, indicator);
				console.log('getfromhistory', history[indicator]);
				return history[indicator];
			});
			return history[indicator];
		},
		indicator: () => indicator,
		history: () => [...history],
		set
	};
};
