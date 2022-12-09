<script lang="ts">
	import { onMount } from 'svelte';
	import { isAddScreenDialogOpen } from '$lib/store.designer';
	import { scale } from 'svelte/transition';
	import FileButtons from './ExportComponents/Export.Save.svelte';
	import ExportPNG from './ExportComponents/Export.PNG.svelte';
	import Load from './ExportComponents/Export.LoadFile.svelte';
	import ScreenSize from './AddScreenComponents/ScreenSize.svelte';

	const toggleDialog = () => {
		$isAddScreenDialogOpen = !$isAddScreenDialogOpen;
		console.log('toggling');
	};
</script>

{#if $isAddScreenDialogOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="container"
		on:click|self={toggleDialog}
		transition:scale={{
			duration: 130
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
		border-width: 1.5px;
		border-style: solid;
		padding: 30px;
	}
</style>
