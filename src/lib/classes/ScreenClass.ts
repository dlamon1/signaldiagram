import { get } from 'svelte/store';

import type { ScreenObj } from '$lib/types';

import { Panels, SignalLines, SnapPoints } from '$lib/classes';

import { board } from '$lib/store.designer';

export class Screen implements ScreenObj {
	panels: Panels;
	snapPoints: SnapPoints;
	signalLines: SignalLines;
	width = 0;
	height = 0;
	isRearView = false;
	columns: number;
	rows: number;
	name: string;
	isSelected: boolean = false;
	index: number = 0;
	widthMM: number;
	heightMM: number;
	snapPointDirection: string | null = null;
	snapPointQuantity = 2;
	showCoordinates = true;
	showDirectionArrows = true;
	opacity = 0.25;
	make: string | undefined = '';
	model: string | undefined = '';
	rearViewLabelFontSize = 100;

	constructor(
		columns: number,
		rows: number,
		width: number,
		height: number,
		widthMM: number,
		heightMM: number,
		name: string,
		make?: string,
		model?: string
	) {
		this.make = make;
		this.model = model;
		this.name = name;
		this.columns = columns;
		this.rows = rows;
		this.width = width;
		this.height = height;
		this.widthMM = widthMM;
		this.heightMM = heightMM;
		this.snapPointDirection = 'vertical';
		this.index = get(board).screens.length;
		this.panels = new Panels(this.index);
		this.snapPoints = new SnapPoints(this.index);
		this.signalLines = new SignalLines(this.index);
	}

	load(saveObj: ScreenObj) {
		this.isRearView = saveObj.isRearView;
		this.opacity = saveObj.opacity;
		this.snapPointQuantity = saveObj.snapPointQuantity;
		this.snapPointDirection = saveObj.snapPointDirection;
		this.showCoordinates = saveObj.showCoordinates;

		this.panels.load(saveObj.panels);
		this.snapPoints.load(saveObj.snapPoints);
		this.signalLines.load(saveObj.signalLines.array);
	}

	getRearViewLabelFontSize() {
		return `${this.rearViewLabelFontSize}px`;
	}
}
