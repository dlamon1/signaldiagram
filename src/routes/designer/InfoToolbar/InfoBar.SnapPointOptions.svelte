<script lang="ts">
	import { currentScreen } from '$lib/store.designer';
</script>

{#if $currentScreen}
	<div class="component-container">
		<div>Snap Point Quantity</div>
		<label>
			<input
				type="radio"
				bind:group={$currentScreen.snapPointQuantity}
				name="snapPointsQuantity"
				value={1}
			/>
			One
		</label>
		<label>
			<input
				type="radio"
				bind:group={$currentScreen.snapPointQuantity}
				name="snapPointsQuantity"
				value={2}
			/>
			Two
		</label>
	</div>

	<div class={$currentScreen?.snapPointQuantity == 2 ? 'twoPoints' : 'onePoint'}>
		<div>Snap Point Layout</div>

		<label>
			<input
				type="radio"
				bind:group={$currentScreen.snapPointDirection}
				name="snapPointDirection"
				value="horizontal"
				disabled={$currentScreen?.snapPointQuantity != 2}
			/>
			Horizontal
		</label>
		<label>
			<input
				type="radio"
				bind:group={$currentScreen.snapPointDirection}
				name="snapPointDirection"
				value="vertical"
				disabled={$currentScreen?.snapPointQuantity != 2}
			/>
			Vertical
		</label>
	</div>
{/if}

<style>
	.component-container {
		margin-top: 5px;
	}
	.twoPoints {
		opacity: 1;
		margin-top: 10px;
	}
	.onePoint {
		opacity: 0.3;
		margin-top: 10px;
	}
</style>
