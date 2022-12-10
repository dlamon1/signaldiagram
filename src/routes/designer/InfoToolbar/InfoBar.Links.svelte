<script lang="ts">
	const REPO_URL = 'https://github.com/dlamon1/signaldiagram/';

	const REPO_ISSUES_URL = 'https://github.com/dlamon1/signaldiagram/issues';

	import { isExportDialogOpen } from '$lib/store.designer';
</script>

<button class="dialog" on:click={() => ($isExportDialogOpen = true)}>Import / Export</button>

<div class="link-wrapper">
	<a href="/add" target="_blank" class="tile-type"> Add a Tile Type</a>
</div>

<div class="link-wrapper">
	<!-- svelte-ignore security-anchor-rel-noreferrer -->
	<a title="Thank you for the help!" href={REPO_URL} target="_blank" value="noreferrer">
		Contribute
	</a>
</div>

<div class="link-wrapper">
	<!-- svelte-ignore security-anchor-rel-noreferrer -->
	<a title="Thank you for the help!" href={REPO_ISSUES_URL} target="_blank" value="noreferrer">
		Report a Bug
	</a>
</div>

<div class="link-wrapper">
	<a href="mailto: support@leadled.io">Feedback</a>
</div>

<style>
	.tile-type {
		color: var(--color-primary);
		font-weight: 800;
	}

	.dialog {
		height: 40px;
	}

	a {
		color: var(--color-text-primary);
		text-decoration: none;
	}

	a:hover {
		color: var(--color-hover);
	}
	.link-wrapper {
		margin-top: 10px;
		align-self: center;
	}
</style>
