import type { ColorObj } from '$lib/types';

export type SnapPointCoordinatesKey = 'origin' | 'destination';

export type SnapPointDirection = 'vertical' | 'horizontal';

export interface LoadSnapPointObj {
	row: number;
	column: number;
	pointIndexWithinPanel: number;
	panelIndex: number;
	pointIndexFullArray: number;
	isTriangle: boolean;
	isSquare: boolean;
	color: ColorObj;
	label: string;
}

export type SnapPointOffsets = {
	xOffset: number;
	yOffset: number;
	radiusMultiplier: number;
};

export type SnapPointCoordinates = {
	snapPointIndex: number;
	panelIndex: number;
	pointIndexWithinPanel: number;
};

export type SnapPointsType = {
	array: SnapPointObj[];
	selectedSnapPointIndexes: number[];
	radiusMultiplier: number;
	radius: number;
	setArrayFromLoad: (array: LoadSnapPointObj[]) => void;
	deSelect: () => void;
	addSnapPoint: (
		row: number,
		column: number,
		pointIndexWithinPanel: number,
		panelIndex: number,
		pointIndexFullArray: number
	) => void;
	resetArray: () => void;
	getXCoordinate: (snapPoint: SnapPointObj) => number;
	getYCoordinate: (snapPoint: SnapPointObj) => number;
	selectSnapPoints: (arrayOfIndexes: number[]) => void;
	toggleSnapPoints: (arrayOfIndexes: number[]) => void;
	selectSnapPoint: (d3Object: any) => void;
	removeLabel: () => void;
	setIsSquares: (isSquare: boolean) => void;
	setIsTriangles: (isTriangle: boolean) => void;
	setXOffsets: (value: number) => void;
	setYOffsets: (value: number) => void;
	setRadiusMultiplier: (value: number) => void;
	setRadius: (value: number) => void;
	selectEvenOrOdd: (evenOrOdd: number) => void;
};

export interface SnapPointObj {
	isSquare: boolean;
	isCircle: boolean;
	isTriangle: boolean;
	label: string;
	isSelected: boolean;
	isHovered: boolean;
	color: ColorObj;
	translateString: string;
	radius: number;
	x: number;
	y: number;
	row: number;
	column: number;
	pointIndexWithinPanel: number;
	panelIndex: number;
	pointIndexFullArray: number;
	strokeWidth: number;
	isHidden: boolean;
	xOffset: number;
	yOffset: number;
	getX: () => number;
	getY: () => number;
	getRadius: () => number;
	getTranslateString: () => string;
	setLabel: (label: string) => void;
	setColorObj: (colorObj: ColorObj) => void;
	setBackgroundColor: (color: string) => void;
	setBorderColor: (color: string) => void;
	setFontColor: (color: string) => void;
	setIsSquare: (isSquare: boolean) => void;
	setIsTriangle: (isTriangle: boolean) => void;
	createDimensions: (row: number, column: number, pointIndexWithinPanel: number) => void;
	toggleIsSelected: () => void;
	setIsSelected: (isSelected: boolean) => void;
	setIsHovered: (isHovered: boolean) => void;
	setIsHidden: (isHidden: boolean) => void;
	getLabelString: () => string;
}
