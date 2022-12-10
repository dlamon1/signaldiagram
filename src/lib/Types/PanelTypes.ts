import type { ColorObj, ColorObjKey } from '$lib/types';

export interface PanelObj {
	i: number;
	row: number;
	column: number;
	thisPanelsSnapPoints: number[];
	color: ColorObj;
	isSelected: boolean;
	isHovered: boolean;
	lineWidth: number;
	lineWidthMultiplier: number;
	x: number;
	y: number;
	width: number;
	height: number;
	reverseIndex: number;
	isHidden: boolean;
	colorIndex: number;
	getDimensions: () => { x: number; y: number; width: number; height: number };
	setColor: (key: ColorObjKey, color: string) => void;
	setIsSelected: (isSelected: boolean) => void;
	setIsHovered: (isHovered: boolean) => void;
	setLineWidth: (lineWidth: number) => void;
	toggleIsSelected: () => void;
	setDimensions: () => void;
	setIndex: (i: number) => void;
	setColorIndex: (i: number, j: number) => void;
	setLineWidthMultiplier: (multiplier: number) => void;
	getCoordinateText: () => string;
	setIsHidden: (isHidden: boolean) => void;
}

export type PanelsType = {
	array: PanelObj[];
	selectedIndexes: number[];
	deSelect: () => void;
	updatePanelArray: () => void;
	initArray: (columns: number, rows: number) => void;
	addPanel: (
		row: number,
		column: number,
		index: number,
		thisPanelsSnapPoints: number[],
		colorObj: ColorObj,
		reverseIndex: number
	) => void;
	selectPanels: (arrayOfIndexes: number[]) => void;
	togglePanels: (arrayOfIndexes: number[]) => void;
	toggleHidePanels: (arrayOfIndexes: number[]) => void;
	load: (panel: any) => void;
	selectAll: () => void;
};

export interface LoadPanelObj {
	row: number;
	column: number;
	i: number;
	thisPanelsSnapPoints: number[];
	color: ColorObj;
	reverseIndex: number;
}
