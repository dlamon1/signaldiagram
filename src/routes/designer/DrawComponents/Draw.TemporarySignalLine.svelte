<script lang="ts">
	import * as d3 from 'd3';
	import { get } from 'svelte/store';
	import {
		isDrawingSignalLine,
		transform,
		topLevelSvgRef,
		colorState,
		snapPointsGroupEnterRef,
		mousePosition,
		currentScreen,
		board
	} from '$lib/store.designer';

	$: if ($currentScreen && $board.screens && $mousePosition) {
		drawTemporarySignalLine();
	}

	const drawTemporarySignalLine = () => {
		if (!$topLevelSvgRef) return;
		if (!$isDrawingSignalLine) return;

		const signalLines = $currentScreen?.signalLines;

		let origin = signalLines.origin;
		let mouse = get(mousePosition);
		if (origin.snapPointIndex >= 0 && mouse.x && mouse.y) {
			theAcutualDrawing();
		}
	};

	const theAcutualDrawing = () => {
		const snapPoints = $currentScreen?.snapPoints;
		const signalLines = $currentScreen?.signalLines;

		let destinationI = signalLines.destination.snapPointIndex;

		let snapPoint = snapPoints.array[signalLines.origin.snapPointIndex];

		let x1 = snapPoint.getX();
		let y1 = snapPoint.getY();

		// [tx + k * xo, ty + k * yo]

		let x2 = get(mousePosition).x / $transform.k - $transform.x / $transform.k;
		let y2 = get(mousePosition).y / $transform.k - $transform.y / $transform.k;

		if (destinationI) {
			let destinationSnapPoint = snapPoints.array[signalLines.destination.snapPointIndex];

			x2 = destinationSnapPoint.getX();
			y2 = destinationSnapPoint.getY();
		}

		let lineWidth =
			$currentScreen?.width < $currentScreen?.height
				? $currentScreen?.width / 20
				: $currentScreen?.height;

		d3.select('#temp-signal-line')
			.attr('pointer-events', 'none')
			.attr('x1', x1)
			.attr('y1', y1)
			.attr('x2', x2)
			.attr('y2', y2)
			.attr('stroke', $colorState.signalLine.background);

		if ($snapPointsGroupEnterRef) {
			d3.selectAll('g.snap-point-wrapper').raise();
		}
	};
</script>
