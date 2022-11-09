<script>
	import { onMount } from 'svelte';

	import { isMac } from './designer/store';

	onMount(() => {
		console.log('this mounted');
		let os = navigator.userAgent.slice(13).split(';');

		if (os[0] === 'Macintosh') {
			$isMac = true;
		}
	});
</script>
