import { get } from 'svelte/store';

import {
	isShifted,
	setIsShifted,
	isCtrl,
	setIsCtrl,
	setMode,
	isSelectMode,
	isMac,
	isAddScreenDialogOpen,
	currentScreen
} from '$lib/store.designer';

import { handleSelectAll } from '../HandleSelect';

export const handleKeyDown = (e: any) => {
	if (get(isAddScreenDialogOpen)) return;

	// if ctrl is pressed, set isCtrl to true
	if (e.keyCode === 17 && !get(isCtrl) && !get(isMac) && get(isSelectMode)) {
		setIsCtrl(true);
	}
	// if command on mac is pressed
	if (e.keyCode === 91 && get(isMac) && get(isSelectMode)) {
		setIsCtrl(true);
	}

	// if shift is pressed, set isShifted to true
	if (e.keyCode === 16 && !get(isShifted)) {
		setIsShifted(true);
	}

	// if a is pressed on mac, select all
	if (get(isMac) && e.keyCode === 65 && get(isSelectMode) && get(isCtrl)) {
		handleSelectAll();
	}

	if (e.keyCode === 16 && get(isShifted) && get(isSelectMode)) {
		const body = document.getElementById('canvas-wrapper');
		if (!body) return;
		body.style.cursor = 'crosshair';
	}

	if (e.keyCode === 68 && get(isShifted)) {
		setMode('draw');
	}
	if (e.keyCode === 83 && get(isShifted)) {
		setMode('select');
	}

	//if key is delete on mac
	if (get(isMac) && e.keyCode === 8 && get(isSelectMode)) {
		removeLine();
	}

	if (!get(isMac) && e.keyCode === 46 && get(isSelectMode)) {
		removeLine();
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

const removeLine = () => {
	const screen = get(currentScreen);
	screen.signalLines.array.forEach((line, i) => {
		if (line.isSelected) {
			screen.signalLines.removeSignalLine(line);
		}
	});

	// updateScreens();
	// need to call panels update here to
	// trigger redraw, can not use signal lines
	// because of the way the draw updates
	// $panelsClass = $panelsClass;
};
