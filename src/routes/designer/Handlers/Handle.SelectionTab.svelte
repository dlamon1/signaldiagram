<script lang="ts">
	import { isDrawMode, selection, currentScreen } from '$lib/store.designer';

	$: {
		$selection && $currentScreen && deSelect();
	}

	const deSelect = () => {
		if ($selection != 'panels') {
			$currentScreen?.panels?.deSelect();
		}
		if ($selection != 'signallines') {
			$currentScreen?.signalLines?.deSelect();
		}
		if ($selection != 'snappoints') {
			$currentScreen?.snapPoints?.deSelect();
		}
	};

	$: {
		if ($isDrawMode) {
			$selection = 'signallines';
		}
	}
</script>
