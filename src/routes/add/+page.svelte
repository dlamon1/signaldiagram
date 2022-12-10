<script>
	// @ts-nocheck
	import { toast } from '@zerodevx/svelte-toast';

	import { enhance } from '$app/forms';

	import { requestedTileTypes, approvedTileTypes, tileTypes } from '$lib/store.global';

	const toggleKey = () => {
		key = !key;
	};

	let key = false;

	export let form;

	const fillForm = (tile) => {
		if (!key) {
			return;
		}
		if (!form) {
			form = {};
			form.data = {};
		}
		form.data._id = tile._id;
		form.data.make = tile.make;
		form.data.model = tile.model;
		form.data.pixelWidth = tile.pixelWidth;
		form.data.pixelHeight = tile.pixelHeight;
		form.data.mmWidth = tile.mmWidth;
		form.data.mmHeight = tile.mmHeight;
	};

	const toastError = () => {
		toast.push('Errors in form', {
			theme: {
				'--toastColor': 'mintcream',
				'--toastBackground': 'rgba(172,2,50,0.9)',
				'--toastBarHeight': 0
			}
		});
	};

	const toastSuccess = () => {
		toast.push('Tile Added', {
			theme: {
				'--toastColor': 'mintcream',
				'--toastBackground': 'rgba(72,187,120,0.9)',

				'--toastBarHeight': 0
			}
		});
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={toggleKey} class="key" />

<!-- Approved Tile Types -->
<!-- Approved Tile Types -->
<!-- Approved Tile Types -->
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

	<!-- Form -->
	<!-- Form -->
	<!-- Form -->
	<div class="container">
		<div class="title">Request New Tile Type</div>
		<br />
		<form
			method="POST"
			use:enhance={({ data }) => {
				return async ({ result, update }) => {
					form = result.data;

					if (result.status == 401) {
						toastError();
					} else {
						toastSuccess();
						const res = await fetch('../api/tiles');
						const tiles = await res.json();
						$tileTypes = tiles;
					}
				};
			}}
		>
			<input hidden name="_id" value={form?.data?._id ? form?.data?._id : ''} />

			{#if key}
				<input placeholder="Key" name="key" />
			{/if}

			<input
				placeholder="Make"
				name="make"
				type="string"
				class={form?.errors?.make ? 'input-error' : ''}
				value={form?.data?.make ? form?.data?.make : ''}
			/>
			<label for="make" class="label">
				{#if form?.errors?.make}
					<span class="label-text-alt text-error">{form?.errors?.make[0]}</span>
				{/if}
			</label>

			<input
				placeholder="Model"
				name="model"
				type="string"
				class={form?.errors?.model ? 'input-error' : ''}
				value={form?.data?.model ?? ''}
			/>
			<label for="model" class="label">
				{#if form?.errors?.model}
					<span class="label-text-alt text-error">{form?.errors?.model[0]}</span>
				{/if}
			</label>

			<input
				placeholder="Pixel Width"
				name="pixelWidth"
				type="number"
				class={form?.errors?.pixelWidth ? 'input-error' : ''}
				value={form?.data?.pixelWidth ? form?.data?.pixelWidth : ''}
			/>
			<label for="make" class="label">
				{#if form?.errors?.pixelWidth}
					<span class="label-text-alt text-error">{form?.errors?.pixelWidth[0]}</span>
				{/if}
			</label>

			<input
				placeholder="Pixel Height"
				name="pixelHeight"
				type="number"
				class={form?.errors?.pixelHeight ? 'input-error' : ''}
				value={form?.data?.pixelHeight ? form?.data?.pixelHeight : ''}
			/>
			<label for="make" class="label">
				{#if form?.errors?.pixelHeight}
					<span class="label-text-alt text-error">{form?.errors?.pixelHeight[0]}</span>
				{/if}
			</label>

			<input
				placeholder="MM Width"
				name="mmWidth"
				type="number"
				class={form?.errors?.mmWidth ? 'input-error' : ''}
				value={form?.data?.mmWidth ? form?.data?.mmWidth : ''}
			/>
			<label for="make" class="label">
				{#if form?.errors?.mmWidth}
					<span class="label-text-alt text-error">{form?.errors?.mmWidth[0]}</span>
				{/if}
			</label>

			<input
				placeholder="MM Height"
				name="mmHeight"
				type="number"
				class={form?.errors?.mmHeight ? 'input-error' : ''}
				value={form?.data?.mmHeight ? form?.data?.mmHeight : ''}
			/>
			{#if form?.errors?.mmHeight}
				<span class="label-text-alt text-error">{form?.errors?.mmHeight[0]}</span>
			{/if}

			<br />

			<button> Submit</button>
		</form>
	</div>

	<!-- Requested Tile Type List -->
	<!-- Requested Tile Type List -->
	<!-- Requested Tile Type List -->
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
	.input-error {
		border: 1px solid red;
	}
	span {
		color: var(--color-text-error);
	}
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
		font-size: 1.1em;
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
		background-color: var(--color-bg-1);
	}
	.container {
		margin: 50px;
		background-color: var(--color-bg-0);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 30px;
		border-radius: 4px;
		max-height: 50vh;
	}
</style>
