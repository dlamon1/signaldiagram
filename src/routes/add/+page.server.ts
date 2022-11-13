import { invalid } from '@sveltejs/kit';

import * as dotenv from 'dotenv';
dotenv.config();

const checkKey = (key: string) => {
	const keyString = process.env['ADD_PANEL_KEYS'];
	const keyArray = keyString?.split(',');

	if (key === '') {
		return false;
	}

	if (keyArray?.includes(key)) {
		return true;
	} else {
		return false;
	}
};

const updateTile = async (dataObj, fetch) => {
	dataObj.isApproved = true;
	let res = await fetch('../api/tiles', {
		method: 'PATCH',
		body: JSON.stringify(dataObj),
		headers: {
			'content-type': 'application/json'
		}
	});

	return res;
};

const createNewTile = async (dataObj, fetch) => {
	let res = await fetch('../api/tiles', {
		method: 'POST',
		body: JSON.stringify(dataObj),
		headers: {
			'content-type': 'application/json'
		}
	});

	return res;
};

export const actions = {
	default: async ({ cookies, request, fetch }) => {
		let res;

		const data = await request.formData();

		let dataObj = Object.fromEntries(data);

		let keyIsValid = checkKey(data.get('key'));

		if (dataObj._id) {
			// Update Existing Tile

			if (!keyIsValid) {
				return invalid(401);
			}

			dataObj = { ...dataObj, isApproved: true };

			res = await updateTile(dataObj, fetch);
		} else {
			// Create New Tile
			delete dataObj._id;

			dataObj.isApproved = false;

			res = await createNewTile(dataObj, fetch);
		}

		return JSON.stringify(res);
	}
};
