// @ts-ignore
import clientPromise from '../../../lib/mongodb-client';

const COLLECTION = 'tile-types';

export const GET = async () => {
	// @ts-ignore
	const dbConnection = await clientPromise;

	const env = process.env['ENVIRONMENT'];

	const db = dbConnection.db(env);

	let resArray: any = [];

	const collection = db.collection(COLLECTION).find();

	await collection.forEach((c: any) => {
		resArray.push(c);
	});

	return new Response(JSON.stringify(resArray), { status: 200 });
};

export const POST = async ({ request }) => {
	const obj = await request.json();

	const dbConnection = await clientPromise;

	const env = process.env['ENVIRONMENT'];

	const db = dbConnection.db(env);

	const collection = db.collection(COLLECTION);

	const res = await collection.insertOne(obj);

	return new Response(JSON.stringify(res), { status: 200 });
};
