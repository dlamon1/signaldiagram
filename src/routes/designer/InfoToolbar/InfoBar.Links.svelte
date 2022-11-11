<script lang="ts">
	import { tooltip } from '../Tooltips/tooltip';

	import { isExportDialogOpen } from '../store';

	import { toast, SvelteToast } from '@zerodevx/svelte-toast';

	import { onMount } from 'svelte';

	let dbHTML = `
    <div>
      Signal Diagram now has a database of Tile Types.
    </div>
    <br>
    <div>
      If you would like to see a Tile Type added please send your request to support@leadled.io
    </div>
    <br>
    <div>
      Alternatively, you can request a key code to add them yourself. 
    </div>
    `;

	let dbText =
		'Signal Diagram now has a database. If you would like to have a Tile Type added please send your request to support@leadled.io. Alternatively, you can request a key and then add your own Tile Types by clicking the "Add Tile Type" button.';

	onMount(() => {
		setTimeout(() => {
			toast.push(dbHTML, {
				target: 'new',
				theme: {
					'--toastColor': 'mintcream',
					'--toastBackground': 'rgba(72,187,120,0.9)',
					'--toastBarBackground': '#2F855A',
					'--toastBarHeight': 0
				}
			});
		}, 1000);
	});
</script>

<div class="toast-wrapper">
	<SvelteToast target="new" options={{ initial: 0 }} />
</div>

<button class="dialog" on:click={() => ($isExportDialogOpen = true)}>Import / Export</button>

<div class="link-wrapper">
	<a href="/add" target="_blank"> Add a Tile Type</a>
</div>

<div class="link-wrapper">
	<!-- svelte-ignore security-anchor-rel-noreferrer -->
	<a
		title="Thank you for the help!"
		use:tooltip
		href="https://github.com/dlamon1/signaldiagram/issues"
		target="_blank"
		value="noreferrer"
	>
		Report a Bug</a
	>
</div>

<div class="link-wrapper">
	<a href="mailto: support@leadled.io">Feedback</a>
</div>

<style>
	.toast-wrapper {
		--toastMinHeight: 5rem;
		--toastPadding: 0 0.5rem;
		--toastContainerTop: auto;
		--toastContainerRight: auto;
		--toastContainerBottom: calc(50vw - 8rem);
		--toastContainerLeft: calc(50vw - 8rem);
	}
	.version {
		margin-top: 10px;
		align-self: center;
		color: aqua;
	}

	.dialog {
		height: 40px;
	}

	a {
		color: #fff;
		text-decoration: none;
	}
	.link-wrapper {
		margin-top: 10px;
		align-self: center;
	}
</style>
