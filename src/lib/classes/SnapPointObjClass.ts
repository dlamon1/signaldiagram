import { get } from 'svelte/store';
import type { ColorObj, SnapPointObj, ColorObjKey } from '$lib/types';

import {
	snapPointDirection,
	snapPointsQuantity,
	updateScreens,
	isDrawMode,
	currentScreen,
	board
} from '$lib/store.designer';

export class SnapPoint implements SnapPointObj {
	isSquare = false;

	isCircle = false;

	isTriangle = false;

	label = 'A1';

	isSelected = false;

	isHovered = false;

	color = {
		background: '#777777',
		font: '#ffffff',
		border: '#000000'
	};
	translateString: string;

	radius: number;

	x: number;

	y: number;

	row: number;

	column: number;

	// Each panel has an array of points. This is the index of the point within the panel.
	pointIndexWithinPanel: number;

	// This is the index of the containing panel within the full array of panels.
	panelIndex: number;

	// This is the index of the point within the full array of points.
	pointIndexFullArray: number;

	strokeWidth: number;

	isHidden: boolean;

	xOffset = 0;

	yOffset = 0;

	screenIndex: number;

	scale = 1;

	constructor(
		row: number,
		column: number,
		pointIndexWithinPanel: number,
		panelIndex: number,
		pointIndexFullArray: number,
		screenIndex: number
	) {
		this.screenIndex = screenIndex;
		this.row = row;
		this.column = column;
		this.pointIndexWithinPanel = pointIndexWithinPanel;
		this.panelIndex = panelIndex;
		this.pointIndexFullArray = pointIndexFullArray;
		this.createDimensions(row, column, pointIndexWithinPanel);
	}

	getSnapPointsParentClass() {
		return get(board).screens[this.screenIndex].snapPoints;
	}

	setIsHidden(isHidden: boolean) {
		this.isHidden = isHidden;
	}

	getX() {
		const parentPanel = get(currentScreen)?.panels.array[this.panelIndex];

		const screen = get(currentScreen);

		let x = screen.width / 2;

		if (screen.snapPointDirection === 'horizontal') {
			x = (screen.width / 3) * this.pointIndexWithinPanel;
		}

		if (screen.snapPointQuantity === 1) {
			x = screen.width / 2;
		}
		return x + parentPanel.getDimensions().x + this.xOffset;
	}

	getY() {
		const parentPanel = get(currentScreen)?.panels.array[this.panelIndex];

		const screen = get(currentScreen);

		let y = (screen.height / 3) * this.pointIndexWithinPanel;

		if (screen.snapPointDirection === 'horizontal') {
			y = screen.height / 2;
		}

		if (screen.snapPointQuantity === 1) {
			y = screen.height / 2;
		}

		return y + parentPanel.getDimensions().y + this.yOffset;
	}

	setXOffset(value: number) {
		this.xOffset = value;
	}

	setYOffset(value: number) {
		this.yOffset = value;
	}

	setScale(value: number) {
		this.scale = value;
	}

	getScaleString() {
		return `scale(${this.scale})`;
	}

	getTranslateString() {
		const x = this.getX();
		const y = this.getY();

		this.translateString = `translate(${x}, ${y})`;

		return this.translateString;
	}

	removeLabel = () => {
		this.label = '';
	};

	setLabel(label: string) {
		this.label = label;
	}

	setColor(key: ColorObjKey, color: string) {
		this.color[key] = color;
	}

	setColorObj(colorObj: ColorObj) {
		this.color = colorObj;
	}

	setBackgroundColor(color: string) {
		this.color.background = color;
	}

	setBorderColor(color: string) {
		this.color.border = color;
	}

	setFontColor(color: string) {
		this.color.font = color;
	}

	setIsSquare(boolean: boolean) {
		this.isTriangle = false;
		this.isSquare = boolean;
		// updateScreens();
	}

	setIsTriangle(boolean: boolean) {
		this.isSquare = false;
		this.isTriangle = boolean;
		// updateScreens();
	}

	createDimensions(row: number, column: number, pointIndexWithinPanel: number) {
		const screen = get(board).screens[this.screenIndex];

		const panelX = screen.width * column;
		const panelY = screen.height * row;

		let x = screen.width / 2;
		let y = (screen.height / 3) * pointIndexWithinPanel;

		if (get(snapPointDirection) === 'horizontal') {
			x = (screen.width / 3) * pointIndexWithinPanel;
			y = screen.height / 2;
		}

		if (get(snapPointsQuantity) === 1) {
			x = screen.width / 2;
			y = screen.height / 2;
		}

		this.radius = screen.height / 10;

		if (screen.width < screen.height) {
			this.radius = screen.width / 10;
		}

		this.x = x + panelX;
		this.y = y + panelY;
		this.strokeWidth = this.radius / 2;
		this.translateString = `translate(${this.x}, ${this.y})`;
	}

	getRadius() {
		let smallBound = get(currentScreen)?.width;

		if (get(currentScreen)?.height < smallBound) {
			smallBound = get(currentScreen)?.height;
		}

		this.radius = (smallBound / 8) * this.getSnapPointsParentClass().radiusMultiplier;

		if (get(isDrawMode)) {
			return this.radius * 1.5;
		}

		return this.radius;
	}

	toggleIsSelected() {
		this.isSelected = !this.isSelected;
	}

	setIsSelected(boolean: boolean) {
		this.isSelected = boolean;
	}

	setIsHovered(boolean: boolean) {
		this.isHovered = boolean;
	}

	getLabelString() {
		if (this.isHidden) return '';
		return this.label;
	}
}
