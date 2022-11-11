import * as dotenv from 'dotenv';
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
	default: async ({ cookies, request, fetch }) => {
		let uri;

		const data = await request.formData();

		const dataObj = Object.fromEntries(data);

		let keyIsValid = checkKey(data.get('key'));

		if (!keyIsValid) {
			uri = '../api/requested-tiles';
		} else {
			uri = '../api/tiles';
		}

		const res = await fetch(uri, {
			method: 'POST',
			body: JSON.stringify(dataObj),
			headers: {
				'content-type': 'application/json'
			}
		});

		return { success: true, body: JSON.parse(JSON.stringify(res)) };
	}
};
