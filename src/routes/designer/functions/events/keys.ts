import { get } from 'svelte/store';

import {
	isShifted,
	setIsShifted,
	isCtrl,
	setIsCtrl,
	setMode,
	isSelectMode,
	isMac
} from '../../store';

export const handleKeyDown = (e: any) => {
	if (e.keyCode === 16 && !get(isShifted)) {
		setIsShifted(true);
	}

	if (e.keyCode === 16 && get(isShifted) && get(isSelectMode)) {
		const body = document.getElementById('canvas-wrapper');
		if (!body) return;
		body.style.cursor = 'crosshair';
	}

	// if ctrl is pressed, set isCtrl to true
	if (e.keyCode === 17 && !get(isCtrl) && !get(isMac) && get(isSelectMode)) {
		setIsCtrl(true);
	}
	// if command on mac is pressed
	if (e.keyCode === 91 && get(isMac) && get(isSelectMode)) {
		setIsCtrl(true);
	}

	if (e.keyCode === 68 && get(isShifted)) {
		setMode('draw');
	}
	if (e.keyCode === 83 && get(isShifted)) {
		setMode('select');
	}
};

export const handleKeyUp = (e: any) => {
	if (e.keyCode === 16) {
		setIsShifted(false);
		const body = document.getElementById('canvas-wrapper');
		if (!body) return;
		body.style.cursor = 'default';
	}
	if (e.keyCode === 17 && get(isCtrl) && !get(isMac)) {
		setIsCtrl(false);
	}
	if (e.keyCode === 91 && get(isMac)) {
		setIsCtrl(false);
	}
};
