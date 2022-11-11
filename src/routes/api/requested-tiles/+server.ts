// @ts-ignore
import clientPromise from '../../../lib/mongodb-client';

export const GET = async () => {
	// @ts-ignore
	const dbConnection = await clientPromise;

	const env = process.env['ENVIRONMENT'];

	const db = dbConnection.db(env);

	let resArray: any = [];

	const collection = db.collection('requested-tile-types').find();

	await collection.forEach((c: any) => {
		resArray.push(c);
	});

	return new Response(JSON.stringify(resArray), { status: 200 });
};
