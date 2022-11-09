import { ConnectionPoolClosedEvent, MongoClient } from 'mongodb';

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();

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
