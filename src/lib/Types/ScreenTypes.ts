import type { PanelsType, SnapPointsType, SignalLinesType, SnapPointDirection } from '$lib/types';

export interface ScreenObj {
	panels: PanelsType;
	snapPoints: SnapPointsType;
	signalLines: SignalLinesType;
	width: number;
	height: number;
	isRearView: boolean;
	columns: number;
	rows: number;
	name: string;
	isSelected: boolean;
	widthMM: number;
	heightMM: number;
	snapPointQuantity: number;
	snapPointDirection: SnapPointDirection;
	showCoordinates: boolean;
	showDirectionArrows: boolean;
	opacity: number;
	make: string;
	model: string;
	load: (obj: any) => void;
}
