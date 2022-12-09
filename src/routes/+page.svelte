<script>
	import { onMount } from 'svelte';

	import { isMac } from '$lib/store.designer';

	onMount(() => {
		let os = navigator.userAgent.slice(13).split(';');

		if (os[0] === 'Macintosh') {
			$isMac = true;
		}
	});
</script>
