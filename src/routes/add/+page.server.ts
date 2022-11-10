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

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();

		let keyIsValid = checkKey(data.get('key'));
		console.log('key is: ', keyIsValid);

		if (!keyIsValid) {
			return invalid(401);
		}

		let newTile = {
			make: data.get('make'),
			model: data.get('model'),
			pixelWidth: +data.get('pixelWidth'),
			pixelHeight: +data.get('pixelHeight'),
			mmWidth: +data.get('mmWidth'),
			mmHeight: +data.get('mmHeight')
		};
		// const make = data.get('make');
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

		const collection = db.collection('tile-types');

		const res = await collection.insertOne(newTile);

		return JSON.parse(JSON.stringify(res));
	}
};
