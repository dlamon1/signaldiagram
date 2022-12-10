<script lang="ts">
	import { isExportDialogOpen } from '$lib/store.designer';
	import { scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import FileButtons from './ExportComponents/Export.Save.svelte';
	import ExportPNG from './ExportComponents/Export.PNG.svelte';
	import Load from './ExportComponents/Export.LoadFile.svelte';

	const toggleDialog = () => {
		$isExportDialogOpen = !$isExportDialogOpen;
	};
</script>

{#if $isExportDialogOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="container"
		on:click|self={toggleDialog}
		transition:scale={{
			duration: 100,
			easing: cubicOut
		}}
	>
		<div class="dialog-container">
			<ExportPNG />
			<FileButtons />
			<Load />
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
		border-color: var(--color-secondary);
		border-width: 4.5px;
		border-style: solid;
		border-radius: 3px;
		padding: 30px;
		box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px,
			rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px,
			rgba(0, 0, 0, 0.09) 0px -3px 5px;
	}
</style>
