import { invalid, redirect } from '@sveltejs/kit';

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const checkKey = (key: string) => {
	const keyString = process.env['ADD_PANEL_KEYS'];
	const keyArray = keyString?.split(',');

	if (keyArray?.includes(key)) {
		return true;
	} else {
		return false;
	}
};

// @ts-ignore
export const load = ({ fetch }) => {
	const fetchTiles = async () => {
		const tiles = await fetch('../api/requested-tiles');
		const data = await tiles.json();

		return data;
	};

	return {
		tiles: fetchTiles()
	};
};

export const actions = {
	default: async ({ cookies, request }) => {
		let res;
		// @ts-ignore
		const uri = process.env['DB_URI'];
		const options = {
			useUnifiedTopology: true,
			useNewUrlParser: true
		};

		let client = new MongoClient(uri, options);
		let dbConnection = await client.connect();

		const env = process.env['ENVIRONMENT'];

		const db = dbConnection.db(env);

		const data = await request.formData();

		let keyIsValid = checkKey(data.get('key'));

		if (!keyIsValid) {
			res = await addRequestedTile(data, db);

			return JSON.parse(JSON.stringify(res));
		} else {
			res = await addNewTile(data, db);
		}

		return { success: true, body: JSON.parse(JSON.stringify(res)) };
	}
};

const addRequestedTile = async (data, db) => {
	let newTile = {
		make: data.get('make'),
		model: data.get('model'),
		pixelWidth: +data.get('pixelWidth'),
		pixelHeight: +data.get('pixelHeight'),
		mmWidth: +data.get('mmWidth'),
		mmHeight: +data.get('mmHeight'),
		key: +data.get('key')
	};

	const collection = db.collection('requested-tile-types');

	const res = await collection.insertOne(newTile);

	return res;
};

const addNewTile = async (data, db) => {
	let newTile = {
		make: data.get('make'),
		model: data.get('model'),
		pixelWidth: +data.get('pixelWidth'),
		pixelHeight: +data.get('pixelHeight'),
		mmWidth: +data.get('mmWidth'),
		mmHeight: +data.get('mmHeight'),
		key: +data.get('key')
	};

	const collection = db.collection('tile-types');

	const res = await collection.insertOne(newTile);

	return res;
};
