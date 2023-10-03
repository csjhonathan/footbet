import supertest from 'supertest';
import app, { init } from '../../src/app';
import httpStatus from 'http-status';

beforeAll(async ()=>{
	await init();
});


const api = supertest(app);

describe('HEALTH',()=>{
	it('Check api health', async()=>{
		const {body, statusCode} = await api.get('/health');

		expect(statusCode).toBe(httpStatus.OK);
		expect(body).toEqual({
			message:'I\'m okay!',
			status:httpStatus.OK
		});
	});
});