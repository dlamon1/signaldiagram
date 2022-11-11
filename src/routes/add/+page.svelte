<script>
	// @ts-nocheck
	import { toast, SvelteToast } from '@zerodevx/svelte-toast';

	import { enhance } from '$app/forms';

	import { requestedTileTypes, approvedTileTypes } from '../store.global';

	const toggleKey = () => {
		key = !key;
	};

	let key = false;

	const fillForm = (tile) => {
		if (!key) {
			return;
		}

		// get element by name
		let make = document.getElementsByName('make')[0];
		make.setAttribute('value', tile.make);

		let model = document.getElementsByName('model')[0];
		model.setAttribute('value', tile.model);

		let pixelWidth = document.getElementsByName('pixelWidth')[0];
		pixelWidth.setAttribute('value', tile.pixelWidth);

		let pixelHeight = document.getElementsByName('pixelHeight')[0];
		pixelHeight.setAttribute('value', tile.pixelHeight);

		let tileWidth = document.getElementsByName('mmWidth')[0];
		tileWidth.setAttribute('value', tile.mmWidth);

		let tileHeight = document.getElementsByName('mmHeight')[0];
		tileHeight.setAttribute('value', tile.mmHeight);
	};

	const sortAndStoreTiles = (tiles) => {
		tiles.sort((a, b) => {
			if (a.make < b.make) {
				return -1;
			}
			if (a.make > b.make) {
				return 1;
			}
			if (a.model < b.model) {
				return -1;
			}
			if (a.model > b.model) {
				return 1;
			}
			return 0;
		});

		return tiles;
	};
</script>

<div on:click={toggleKey} class="key" />

<div class="page">
	<div class="container">
		<div class="title">Current Tile Types</div>
		<br />
		<div class="list-container">
			{#each $approvedTileTypes as tile}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="list-item" on:click={(e) => fillForm(tile)}>
					<div>
						{tile.make} - {tile.model}
					</div>
					<div class="pixels">
						{tile.pixelWidth}px x {tile.pixelHeight}px
					</div>
					<div class="mm">
						{tile.mmWidth}mm x {tile.mmHeight}mm
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="container">
		<div class="title">Request New Tile Type</div>
		<br />
		<form
			method="POST"
			use:enhance={() => {
				return async ({ result, update }) => {
					const res = await fetch('../api/requested-tiles');

					const tiles = await res.json();

					toast.push('Tile Added', {
						theme: {
							'--toastColor': 'mintcream',
							'--toastBackground': 'rgba(72,187,120,0.9)',
							'--toastBarBackground': '#2F855A',
							'--toastBarHeight': 0
						}
					});

					$requestedTileTypes = sortAndStoreTiles(tiles);
					$requestedTileTypes = $requestedTileTypes;

					update();
				};
			}}
		>
			{#if key}
				<input placeholder="Key" name="key" />
			{/if}
			<input placeholder="Make" name="make" type="string" />
			<input placeholder="Model" name="model" type="string" />
			<input placeholder="Pixel Width" name="pixelWidth" type="number" />
			<input placeholder="Pixel Height" name="pixelHeight" type="number" />
			<input placeholder="MM Width" name="mmWidth" type="number" />
			<input placeholder="MM Height" name="mmHeight" type="number" />
			<br />
			<button> Submit</button>
		</form>
	</div>
	<div class="container">
		<div class="title">Requested Tile Types</div>
		<br />
		<div class="list-container">
			{#each $requestedTileTypes as tile}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="list-item" on:click={(e) => fillForm(tile)}>
					<div>
						{tile.make} - {tile.model}
					</div>
					<div class="pixels">
						{tile.pixelWidth}px x {tile.pixelHeight}px
					</div>
					<div class="mm">
						{tile.mmWidth}mm x {tile.mmHeight}mm
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.key {
		position: absolute;
		width: 50px;
		height: 50px;
	}
	.list-container {
		overflow: scroll;
	}
	.pixels {
		font-size: 12px;
		font-weight: 600;
	}
	.mm {
		font-size: 12px;
		font-weight: 600;
	}
	.list-item {
		font-weight: 600;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
		color: rgb(227, 206, 181);
	}

	.title {
		font-weight: 600;
		color: bisque;
	}
	button {
		padding: 5px;
		padding-inline: 50px;
	}
	input {
		margin: 10px;
	}
	form {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.page {
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.container {
		margin: 50px;
		background-color: rgb(20, 20, 20);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 30px;
		border-radius: 4px;
		max-height: 50vh;
	}
</style>
