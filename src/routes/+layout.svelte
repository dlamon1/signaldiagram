<script lang="ts">
	import './global.css';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { requestedTileTypes, approvedTileTypes } from './store.global';

	export let data;

	$requestedTileTypes = data.requestedTiles;
	$approvedTileTypes = data.approvedTileTypes;

	$requestedTileTypes = $requestedTileTypes;
	$approvedTileTypes = $approvedTileTypes;
</script>

<slot />

<SvelteToast />
