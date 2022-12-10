<script lang="ts">
	import { isAddScreenDialogOpen } from '$lib/store.designer';
	import { scale } from 'svelte/transition';
	import ScreenSize from './AddScreenComponents/ScreenSize.svelte';

	const toggleDialog = () => {
		$isAddScreenDialogOpen = !$isAddScreenDialogOpen;
	};
</script>

{#if $isAddScreenDialogOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="container"
		on:click|self={toggleDialog}
		transition:scale={{
			duration: 100
		}}
	>
		<div class="dialog-container">
			<ScreenSize />
		</div>
	</div>
{/if}

<style>
	.container {
		width: 100vw;
		height: 100vh;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		backdrop-filter: blur(4px);
		z-index: 2;
	}

	.dialog-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: var(--color-bg-1);
		border-radius: 4px;
		border-color: var(--color-secondary);
		border-width: 4.5px;
		border-style: solid;
		padding: 30px;
		box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px,
			rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px,
			rgba(0, 0, 0, 0.09) 0px -3px 5px;
	}
</style>
