<script lang="ts">
	import { onMount } from 'svelte';

	import { Screen } from '../../classes/ScreenClass';

	import { isAddScreenDialogOpen, screens, currentScreenIndex, tileTypes } from '../../store';

	import Select from 'svelte-select';

	let selectedModel;

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
		if (
			columns > 0 &&
			rows > 0 &&
			selectedModel.pixelWidth > 0 &&
			selectedModel.pixelHeight > 0 &&
			selectedModel.mmWidth > 0 &&
			selectedModel.mmHeight > 0
		) {
			let newScreen = new Screen(
				columns,
				rows,
				selectedModel.pixelWidth,
				selectedModel.pixelHeight,
				selectedModel.mmWidth,
				selectedModel.mmHeight,
				title
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

	const getArrayOfMakes = () => {
		let makesSet = new Set(
			$tileTypes.map((tileType: any) => {
				return tileType.make;
			})
		);
		let res = Array.from(makesSet);
		return res;
	};

	const getArrayOfModels = (make: any) => {
		let modelsSet = new Set(
			$tileTypes
				.filter((tileType: any) => {
					return tileType.make === make;
				})
				.map((tileType: any) => {
					console.log(tileType);
					let label = tileType.model + ' - ' + tileType.pixelWidth + ' x ' + tileType.pixelHeight;

					return {
						label,
						value: tileType._id
					};
				})
		);
		let res = Array.from(modelsSet);

		return res;
	};

	let makes = getArrayOfMakes();

	let models = getArrayOfModels(make);

	$: models = getArrayOfModels(make);

	const handleSelectMake = (e: any) => {
		make = e.detail.value;
	};

	const handleSelectModel = (e: any) => {
		let model = $tileTypes.filter((tileType: any) => {
			return tileType._id === e.detail.value;
		});

		selectedModel = model[0];
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

	<div class="select">
		<Select class="asdf" items={makes} {value} placeholder="Make" on:select={handleSelectMake} />
	</div>

	<div class="select">
		<Select class="asdf" items={models} {value} placeholder="Make" on:select={handleSelectModel} />
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
	<div class="submit-wrapper">
		<button on:click={addScreen}>Submit</button>
	</div>
</div>

<style>
	.select {
		margin-top: 15px;
	}

	.loose {
		font-size: 1.3rem;
		font-weight: 600;
		margin-bottom: 1rem;
		color: #ffffff;
		align-self: center;
		width: 100%;
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
		margin-top: 5px;
	}

	#dimensions-container input {
		width: 100px;
	}
</style>
