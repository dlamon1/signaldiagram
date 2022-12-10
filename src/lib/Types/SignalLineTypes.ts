import type {
	ColorObj,
	ColorObjKey,
	XYCoordinates,
	SnapPointCoordinates,
	SnapPointCoordinatesKey,
	SnapPointObj
} from '$lib/types';

export interface SignalLineObj {
	i: number;
	origin: SnapPointCoordinates;
	destination: SnapPointCoordinates;
	color: ColorObj;
	lineWidth: number;
	isSelected: boolean;
	setIsSelected: (isSelected: boolean) => void;
	setEndCoordinates: (event) => void;
	updateColor: (color: string) => void;
	updateLineWidth: (lineWidth: number) => void;
	getLengthInMM: () => number;
	getLineWidth: () => number;
}

export type SignalLinesType = {
	array: SignalLineObj[];
	origin: SnapPointCoordinates;
	destination: SnapPointCoordinates;
	mouse: XYCoordinates;
	setArrayFromLoad: (array: LoadSignalLineObj[]) => void;
	getSnapPointCoordinates: (signalLineIndex: number, key: SnapPointCoordinatesKey) => XYCoordinates;
	getPanelIndex: (row: number, column: number) => number;
	nullDestinationSnapPointIndex: () => void;
	setOriginSnapPointIndex: (snapPoint: SnapPointObj) => void;
	nullOriginAndDestinationValues: () => void;
	setDestinationSnapPointIndex: (snapPoint: SnapPointObj) => void;
	setMousePosition: (event: XYCoordinates) => void;
	addSignalLine: () => void;
	removeSignalLine: (line: SignalLineObj) => void;
	selectSignalLine: (index: number) => void;
	selectSignalLines: (arrayOfIndexes: number[]) => void;
	deSelect: () => void;
	toggleSignalLine: (index: number) => void;
	selectAll: () => void;
};

export interface LoadSignalLineObj {
	origin: SnapPointCoordinates;
	destination: SnapPointCoordinates;
	color: ColorObj;
}
