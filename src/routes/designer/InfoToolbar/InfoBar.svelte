<script lang="ts">
	import LineCounter from './InfoBar.LineCounter.svelte';
	import Links from './InfoBar.Links.svelte';

	import { isAddScreenDialogOpen, screens, currentScreenIndex } from '$lib/store.designer';

	const selectPanel = (i: number) => {
		$currentScreenIndex = i;
	};
</script>

<div class="container">
	<button class="dialog" on:click={() => ($isAddScreenDialogOpen = true)}> Add Screen </button>

	<div class="divider" />

	{#each $screens as screen, i}
		<button
			class="screen-button"
			on:click={() => selectPanel(i)}
			class:selected={i == $currentScreenIndex}
		>
			<div class="title">
				{screen.name}
			</div>
			<div class="subtitle">
				{screen.make} -
				{screen.model}
			</div>
		</button>
	{/each}

	{#if $screens.length > 0}
		<LineCounter />
	{/if}

	<div class="spacer" />

	<Links />
</div>

<style>
	.title {
		font-size: 0.9rem;
		font-weight: 800;
	}
	.subtitle {
		margin-top: 3px;
		font-size: 0.6rem;
		font-weight: 500;
	}
	.selected {
		background-color: var(--color-secondary);
		color: var(--color-text-primary);
		border-color: var(--color-primary);
		border-width: 1px;
		border-style: solid;
	}
	.screen-button {
		height: 40px;
		margin-top: 5px;
	}

	.dialog {
		height: 40px;
	}

	.spacer {
		flex: 1;
	}

	.container {
		width: calc(100% - 10px);
		height: calc(100vh - 10px);
		color: var(--color-text-primary);
		font-size: 1em;
		font-weight: 500;
		display: flex;
		flex-direction: column;
		user-select: none;
		margin: 5px;
	}
</style>
