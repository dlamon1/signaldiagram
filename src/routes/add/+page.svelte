<script>
	// const addTile = async (e) => {
	// 	e.preventDefault();
	// 	let res = await fetch('../api/tiles', {
	// 		method: 'post',
	// 		headers: {
	// 			'content-type': 'application/json'
	// 		},
	// 		body: JSON.stringify(newTile)
	// 	});
	// };

	import { enhance } from '$app/forms';

	let newTile = {
		make: 'Roe',
		model: 'CB3',
		pixelWidth: 50,
		pixelHeight: 10,
		mmWidth: 20,
		mmHeight: 30
	};
</script>

<div class="page">
	<div class="container">
		<form method="POST" use:enhance>
			<input placeholder="Make" name="make" />
			<input placeholder="Model" name="model" />
			<input placeholder="Pixel Width" name="pixelWidth" />
			<input placeholder="Pixel Height" name="pixelHeight" />
			<input placeholder="MM Width" name="mmWidth" />
			<input placeholder="MM Height" name="mmHeight" />
			<button> Submit</button>
		</form>
	</div>
</div>

<style>
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
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.container {
		background-color: aqua;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 30px;
		border-radius: 4px;
	}
</style>
