<script>
	import { onMount } from 'svelte';

	import { isMac } from './designer/store';

	onMount(() => {
		let os = navigator.userAgent.slice(13).split(';');

		if (os[0] === 'Macintosh') {
			$isMac = true;
		}
	});
</script>
