// @ts-ignore
export const load = ({ fetch }) => {
	const fetchTiles = async () => {
		const tiles = await fetch('../api/tiles');
		const data = await tiles.json();

		return data;
	};

	return {
		tiles: fetchTiles()
	};
};
