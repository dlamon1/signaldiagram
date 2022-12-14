<script lang="ts">
	import { onMount } from 'svelte';

	import { Screen } from '$lib/classes';

	import { isAddScreenDialogOpen, screens, currentScreenIndex } from '$lib/store.designer';

	import { approvedTileTypes } from '$lib/store.global';

	import Select from 'svelte-select';

	let inputRef: HTMLInputElement;

	const selectAll = (event: Event) => {
		const target = event.target as HTMLInputElement;
		target.select();
	};

	onMount(() => inputRef?.focus());

	let columns = 16;
	let rows = 9;
	let width = 160;
	let height = 160;
	let widthMM = 500;
	let heightMM = 500;
	let title = '';

	const addScreen = () => {
		if (columns > 0 && rows > 0 && width > 0 && height > 0 && widthMM > 0 && heightMM > 0) {
			let newScreen = new Screen(
				columns,
				rows,
				width,
				height,
				widthMM,
				heightMM,
				title,
				make,
				model
			);

			$screens.push(newScreen);

			newScreen.panels.initArray(rows, columns);

			$screens = $screens;

			$currentScreenIndex = newScreen.index;

			$isAddScreenDialogOpen = false;
		} else {
			// TODO: Show error message
		}
	};

	let value: any;

	let items = [];

	let make = '';

	let model = '';

	const getArrayOfMakes = () => {
		let makesSet = new Set(
			$approvedTileTypes.map((tileType: any) => {
				return tileType.make;
			})
		);
		let res = Array.from(makesSet);

		res.sort((a, b) => {
			if (a < b) {
				return -1;
			}
			if (a > b) {
				return 1;
			}
			return 0;
		});

		return res;
	};

	const getArrayOfModels = (make: any) => {
		let modelsSet = new Set(
			$approvedTileTypes
				.filter((tileType: any) => {
					return tileType.make === make;
				})
				.map((tileType: any) => {
					let label = tileType.model + ' - ' + tileType.pixelWidth + ' x ' + tileType.pixelHeight;

					return {
						label,
						value: tileType._id
					};
				})
		);
		let res = Array.from(modelsSet);

		res.sort((a: any, b: any) => {
			if (a.label < b.label) {
				return -1;
			}
			if (a.label > b.label) {
				return 1;
			}
			return 0;
		});

		return res;
	};

	let makes = getArrayOfMakes();

	let models = getArrayOfModels(make);

	$: models = getArrayOfModels(make);

	const handleSelectMake = (e: any) => {
		make = e.detail.value;
	};

	const handleSelectModel = (e: any) => {
		let modelObj = $approvedTileTypes.filter((tileType: any) => {
			return tileType._id === e.detail.value;
		});

		model = modelObj[0].model;
		width = modelObj[0].pixelWidth;
		height = modelObj[0].pixelHeight;
		widthMM = modelObj[0].mmWidth;
		heightMM = modelObj[0].mmHeight;
	};
</script>

<div id="general">
	<div class="loose">Add Screen</div>

	<div class="title">
		<input
			type="text"
			bind:value={title}
			bind:this={inputRef}
			placeholder="Screen Name"
			on:focus={(event) => selectAll(event)}
		/>
	</div>

	<div class="input-wrapper" style="margin-top: 15px; color: black">
		<Select items={makes} {value} placeholder="Make" on:select={handleSelectMake} />
	</div>

	<div class="input-wrapper" style="margin-top: 15px; color: black">
		<Select items={models} {value} placeholder="Make" on:select={handleSelectModel} />
	</div>

	<div id="dimensions-container">
		<div class="input-wrapper">
			Columns:
			<input type="number" bind:value={columns} min="1" on:focus={(event) => selectAll(event)} />
		</div>

		<div class="input-wrapper">
			Rows:
			<input type="number" bind:value={rows} min="1" on:focus={(event) => selectAll(event)} />
		</div>
	</div>

	<div id="dimensions-container">
		<div class="input-wrapper">
			Width(px):
			<input type="number" bind:value={width} min="1" on:focus={(event) => selectAll(event)} />
		</div>

		<div class="input-wrapper">
			Height(px):
			<input type="number" bind:value={height} min="1" on:focus={(event) => selectAll(event)} />
		</div>
	</div>

	<div id="dimensions-container">
		<div class="input-wrapper">
			Width(mm):
			<input type="number" bind:value={widthMM} min="1" on:focus={(event) => selectAll(event)} />
		</div>

		<div class="input-wrapper">
			Height(mm):
			<input type="number" bind:value={heightMM} min="1" on:focus={(event) => selectAll(event)} />
		</div>
	</div>
	<div class="submit-wrapper">
		<button on:click={addScreen}>Submit</button>
	</div>
</div>

<style>
	.loose {
		font-size: 1.3rem;
		font-weight: 600;
		margin-bottom: 1rem;
		color: #ffffff;
		width: 100%;
		align-content: center;
		justify-content: center;
		display: flex;
	}
	.title {
		display: flex;
		justify-content: center;
	}
	input {
		font-size: 1.2em;
	}

	.submit-wrapper {
		width: 100%;
		margin-top: 20px;
		display: flex;
		justify-content: center;
	}
	.submit-wrapper > button {
		padding: 10px;
		padding-inline: 40px;
	}
	button {
		margin-inline: auto;
	}
	.input-wrapper {
		color: white;
		display: flex;
		margin: 10px;
		flex-direction: column;
	}

	#dimensions-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin-block: -14px;
	}

	#dimensions-container input {
		width: 100px;
	}
</style>
