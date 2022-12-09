export interface ColorObj {
	background: string;
	border: string;
	font: string;
}

export type ColorObjKey = 'background' | 'border' | 'font';

export type XYCoordinates = {
	x: number;
	y: number;
};

export type XYandIndex = {
	i: number[];
	x: number;
	y: number;
};

export type DirectionObj = {
	initialDirection: 'vertical' | 'horizontal';
	transform: string;
	points: XYandIndex[];
	pointOne: PointCorner;
	pointTwo: PointCorner;
	pointThree: PointCorner;
	snapPointIndex: number;
};

export type PointCorner = 'topleft' | 'topright' | 'bottomleft' | 'bottomright';
