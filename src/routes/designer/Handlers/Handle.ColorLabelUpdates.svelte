<script lang="ts">
	import {
		colorState,
		snapPointLabel,
		lineWidthState,
		currentScreen,
		board
	} from '$lib/store.designer';

	const updateSelectedSnapPointsLabel = (label: string) => {
		const screen = $currentScreen;
		screen?.snapPoints.array.forEach((snapPoint, i) => {
			if (snapPoint.isSelected) {
				snapPoint.label = label;
			}
		});
		// board.save($board);
	};

	$: {
		updateSelectedSnapPointsLabel($snapPointLabel);
	}

	const updatePanelColorState = () => {
		const screen = $currentScreen;

		screen?.panels.array.forEach((panel) => {
			if (panel.isSelected) {
				$colorState.panel = panel.color;
				$lineWidthState = panel.lineWidth;
			}
		});
		// board.save($board);
	};

	$: {
		let t = [$board.screens];

		updatePanelColorState();
	}

	const updateSnapPointColorState = () => {
		const screen = $currentScreen;

		screen?.snapPoints.array.forEach((snapPoint, i) => {
			if (snapPoint.isSelected) {
				$colorState.snapPoint = snapPoint.color;
			}
		});
		// board.save($board);
	};

	// $: {
	//   let t = [$snapPointsClass];
	//   $snapPointsClass && updateSnapPointColorState();
	// }

	const updateSignalLineColorState = () => {
		const screen = $currentScreen;

		screen?.signalLines.array.forEach((signalLine, i) => {
			if (signalLine.isSelected) {
				$colorState.signalLine = signalLine.color;
			}
		});
		// board.save($board);
	};

	// $: {
	//   let t = [$signalLinesClass];

	//   updateSignalLineColorState();
	// }
</script>
