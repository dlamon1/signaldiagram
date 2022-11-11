// @ts-ignore

export const load = ({ fetch }) => {
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

	const fetchRequestedTiles = async () => {
		const tiles = await fetch('./api/requested-tiles');
		const data = await tiles.json();

		return sortAndStoreTiles(data);
	};

	const fetchApprovedTileTypes = async () => {
		const tiles = await fetch('./api/tiles');
		const data = await tiles.json();

		return sortAndStoreTiles(data);
	};

	return {
		requestedTiles: fetchRequestedTiles(),
		approvedTileTypes: fetchApprovedTileTypes()
	};
};
