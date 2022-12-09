<script lang="ts">
	import { tooltip } from '../Tooltips/tooltip';

	const REPO_URL = 'https://github.com/dlamon1/signaldiagram-fullstack/';

	const REPO_ISSUES_URL = 'https://github.com/dlamon1/signaldiagram-fullstack/issues';

	import { isExportDialogOpen } from '$lib/store.designer';

	import { toast, SvelteToast } from '@zerodevx/svelte-toast';

	import { onMount } from 'svelte';

	let dbHTML = `
    <div>
      Signal Diagram now has a database of Tile Types.
    </div>
    <br>
    <div>
      If you would like a Tile Type added please click the button below.
    </div>
    `;

	onMount(() => {
		setTimeout(() => {
			toast.push(dbHTML, {
				target: 'new',
				theme: {
					'--toastColor': 'mintcream',
					'--toastBackground': 'rgba(72,187,120,0.9)',
					'--toastBarBackground': '#2F855A',
					'--toastBarHeight': 0
				},
				duration: 10000
			});
		}, 1000);
	});
</script>

<div class="toast-wrapper">
	<SvelteToast target="new" />
</div>

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
	.toast-wrapper {
		--toastMinHeight: 5rem;
		--toastPadding: 0 0.5rem;
		--toastContainerTop: auto;
		--toastContainerRight: auto;
		--toastContainerBottom: calc(50vw - 8rem);
		--toastContainerLeft: calc(50vw - 8rem);
	}

	.dialog {
		height: 40px;
	}

	a {
		color: #fff;
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
