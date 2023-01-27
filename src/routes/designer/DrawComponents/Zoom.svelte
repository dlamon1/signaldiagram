<script lang="ts">
	import * as d3 from 'd3';

	import {
		topLevelSvgRef,
		canvasWrapperHeight,
		canvasWrapperWidth,
		transform as transformStore,
		currentScreen,
		board
	} from '$lib/store.designer';

	$: if ($board.currentScreenIndex) {
		centerScreen();
	}

	$: {
		$topLevelSvgRef && initZoom();
	}

	let zoom = d3
		.zoom()
		.scaleExtent([0.1, $canvasWrapperHeight / $currentScreen?.width])
		// .translateExtent([
		//   [-$width * $columns, -$rows * $height * 0.95],
		//   [$width * $columns * 2, $rows * $height * 1.95],
		// ])
		.on('zoom', handleZoom);

	const centerScreen = () => {
		let k = $canvasWrapperWidth / $currentScreen?.columns / $currentScreen?.width;
		if ($canvasWrapperHeight < $currentScreen?.rows * $currentScreen?.height * k) {
			k = $canvasWrapperHeight / $currentScreen?.rows / $currentScreen?.height;
		}

		let x = $canvasWrapperWidth - $currentScreen?.columns * $currentScreen?.width * k;

		let y = $canvasWrapperHeight - $currentScreen?.rows * $currentScreen?.height * k;

		d3.select('svg').call(zoom.transform as any, d3.zoomIdentity.scale(k).translate(x, y));
	};

	function handleZoom(e) {
		$transformStore = e.transform;
		d3.select('g.g-zoom-wrapper').attr('transform', e.transform);
	}

	function initZoom() {
		d3.select('svg').call(zoom);
	}
</script>
