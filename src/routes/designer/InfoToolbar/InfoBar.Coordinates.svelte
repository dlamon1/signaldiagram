<script lang="ts">
	import { screens, currentScreenIndex } from '$lib/store.designer';
</script>

<div class="general">
	<label class="hovered">
		<input type="checkbox" bind:checked={$screens[$currentScreenIndex].showCoordinates} />
		Show Coordinates
	</label>

	<div class="divider" />

	<div id="input-wrapper" class="rear-view-options">
		<label class="hovered">
			<input type="checkbox" bind:checked={$screens[$currentScreenIndex].isRearView} />
			Rear View
		</label>
		<div class="input-row">
			<div class="label">Opacity</div>
			<input
				disabled={!$screens[$currentScreenIndex].isRearView}
				type="range"
				min="0"
				max=".5"
				step=".01"
				bind:value={$screens[$currentScreenIndex].opacity}
				class="range"
			/>
		</div>
		<div class="input-row">
			<div class="label">Font Size</div>
			<input
				disabled={!$screens[$currentScreenIndex].isRearView}
				type="range"
				min="0"
				max="1000"
				step="1"
				bind:value={$screens[$currentScreenIndex].rearViewLabelFontSize}
				class="range"
			/>
		</div>
	</div>
</div>

<style>
	.input-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.general {
		margin-top: 5px;
	}
	label {
		padding-right: 10px;
	}
	label:hover {
		outline: 1.5px solid rgba(0, 0, 0, 0.445);
	}
	.rear-view-options {
		display: flex;
		margin-top: 10px;
		flex-direction: column;
		width: 100%;
	}
	.range {
		margin-top: 5px;
		flex: 0.8;
	}
</style>
