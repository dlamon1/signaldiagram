// import clientPromise from '../../lib/mongodb-client';
// @ts-ignore
// import dotenv from 'dotenv';
// dotenv.config();

import { ConnectionPoolClosedEvent, MongoClient } from 'mongodb';


// let client;
// let clientPromise;

// console.log('here');

// if (!uri) {
// 	throw new Error('Please add your Mongo URI to .env.local');
// }

// if (process.env['NODE_ENV'] === 'development') {
// 	// In development mode, use a global variable
// 	// so that the value is preserved across module reloads
// 	// caused by HMR (Hot Module Replacement).
// 	if (!global._mongoClientPromise) {
// 		client = new MongoClient(uri, options);
// 		global._mongoClientPromise = client.connect();
// 	}
// 	clientPromise = global._mongoClientPromise;
// } else {
// 	// In production mode, it's best to
// 	// not use a global variable.
// 	client = new MongoClient(uri, options);
// 	clientPromise = client.connect();
// }


export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();

    let newTile =  {
      make: data.get('make'),
      model: data.get('model'),
      pixelWidth: +data.get('pixelWidth'),
      pixelHeight: +data.get('pixelHeight'),
      mmWidth: +data.get('mmWidth'),
      mmHeight: +data.get('mmHeight'),
    }
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

  const db =  dbConnection.db(env);

	const collection = db.collection('tile-types');

	const res = await collection.insertOne(newTile);

	return  JSON.parse(JSON.stringify(res))
},
};
