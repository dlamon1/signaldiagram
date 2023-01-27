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
			indicator = Math.max(0, --indicator);
			if (indicator === 0) console.log('no more undo');
			const h = cloneDeep(history[indicator]);
			update(() => {
				return h;
			});
			return h;
		},
		redo: () => {
			indicator = Math.min(history.length - 1, ++indicator);
			if (indicator === history.length - 1) console.log('no more redo');
			const h = cloneDeep(history[indicator]);
			update(() => {
				return h;
			});
			return h;
		},
		save: (data: any) => {
			if (indicator !== history.length - 1) {
				history.splice(indicator + 1);
			}
			console.log('historyBefore', cloneDeep(history));
			history.push(cloneDeep(data));
			indicator = history.length - 1;
			console.log('historyAfter', cloneDeep(history), indicator);
			const v = cloneDeep(history[indicator]);
			update(() => {
				return v;
			});
			return v;
		},
		indicator: () => indicator,
		history: () => [...history],
		set
	};
};
