<script lang="ts">
	import { fade } from 'svelte/transition';

	import { currentScreen, board } from '$lib/store.designer';
	import type { PanelObj } from '$lib/types';

	import ColorPicker from './components/ColorPicker.svelte';
	import SignalButtons from './components/SignalButtons.svelte';
	import CoordinateOptions from '../InfoToolbar/InfoBar.Coordinates.svelte';

	const selectCriss = () => {
		let panels = $currentScreen?.panels;
		panels.array.forEach((p) => {
			p.setIsSelected(false);
			if (p.colorIndex == 0) {
				p.setIsSelected(true);
			}
			// updateScreens();
		});
	};

	const selectCross = () => {
		let panels = $currentScreen?.panels;
		panels.array.forEach((p) => {
			p.setIsSelected(false);
			if (p.colorIndex == 1) {
				p.setIsSelected(true);
			}
			// updateScreens();
		});
	};

	const updateLineWidth = (e: Event) => {
		// let panels = $currentScreen?.panels;
		// const target = e.target as HTMLInputElement;
		// panels.array.forEach((panel) => {
		//   if (panel.isSelected) {
		//     panel.setLineWidthMultiplier(target.value);
		//   }
		// });
	};

	const hideSnapPoints = (snapPointArray: number[], isHidden: boolean) => {
		const screen = $currentScreen;
		snapPointArray.forEach((snapPointIndex) => {
			screen.snapPoints.array[snapPointIndex].setIsHidden(isHidden);
		});
		// board.save($board);
	};

	const hide = (isHidden: boolean) => {
		const screen = $currentScreen;
		screen?.panels.array.forEach((p: PanelObj) => {
			if (p.isSelected) {
				hideSnapPoints(p.thisPanelsSnapPoints, isHidden);
				p.setIsHidden(isHidden);
			}
		});
		// board.save($board);
	};

	$: hide(!isVisible);

	let isVisible = true;

	const setIsVisible = () => {
		if (!$currentScreen) {
			return;
		}

		isVisible = true;

		let panels = $currentScreen?.panels;

		panels.array.forEach((p) => {
			if (p.isSelected) {
				isVisible = !p.isHidden;
			}
		});
	};

	$: {
		let t = [$board.screens];

		setIsVisible();
	}
</script>

<div id="panels" in:fade={{ duration: 150 }} out:fade={{ duration: 0 }}>
	{#if $currentScreen}
		<div class="crisscross">
			<button class="criss-cross" on:click={selectCriss}>Select [0]</button>
			<button class="criss-cross" on:click={selectCross}>select [1]</button>
		</div>

		<!-- <input
    type="range"
    min="0"
    max="10"
    step=".01"
    bind:value={$lineWidthState}
    on:input={(e) => updateLineWidth(e)}
    class="range"
    /> -->
		<SignalButtons />

		<div class="divider" />

		<ColorPicker
			key={'panel'}
			layer="background"
			element={'Background'}
			isOpen={false}
			classObj={$currentScreen?.panels}
		/>

		<div class="divider" />

		<ColorPicker
			key={'panel'}
			layer="border"
			element={'Border'}
			isOpen={false}
			classObj={$currentScreen?.panels}
		/>

		<div class="divider" />

		<ColorPicker
			key={'panel'}
			layer={'font'}
			element={'Font'}
			isOpen={false}
			classObj={$currentScreen?.panels}
		/>

		<div class="divider" />

		<div id="general">
			<CoordinateOptions />
		</div>

		<div class="divider" />

		<div class="hide">
			<label>
				<input type="checkbox" bind:checked={isVisible} name="mode" value="draw" />
				Visible
			</label>
		</div>
	{/if}
</div>

<div class="margin" />

<style>
	.margin {
		height: 20px;
	}
	.hide {
		width: 100%;
		display: flex;
		margin-top: 10px;
	}
	.criss-cross {
		padding: 5px;
		padding-inline: 15px;
	}

	.crisscross {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 10px;
	}

	#panels {
		/* position: absolute; */
		flex: 1;
		/* width: 100%; */
	}
</style>
