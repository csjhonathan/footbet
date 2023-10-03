import { gameFactories } from './../factories/game.factories';
import supertest from 'supertest';
import app, { init } from '../../src/app';
import httpStatus from 'http-status';
import { cleanDb } from '../helpers';
import { Game } from '@prisma/client';
import { GameUpdate } from '../../src/protocols';

beforeAll(async ()=>{
	await init();
});

beforeEach(async()=>{
	await cleanDb();
});

const api = supertest(app);


describe('GAMES', () => {

	describe('POST /games',()=>{

		it('Should respond with status 422 when body is invalid', async () => {
			const invalidBody = gameFactories.insertGameObject({ valid:false });
			const {statusCode} = await api.post('/games').send(invalidBody);

			expect(statusCode).toBe(httpStatus.UNPROCESSABLE_ENTITY);
		});

		it('should respond with status 201 and game data when body is valid', async () => {
			const validBody = gameFactories.insertGameObject({ valid:true });
			const {statusCode, body} = await api.post('/games').send(validBody);

			expect(statusCode).toBe(httpStatus.CREATED);
			expect(body).toEqual<Game>({
				id: expect.any(Number),
				awayTeamName: validBody.awayTeamName,
				homeTeamName: validBody.homeTeamName,
				awayTeamScore: 0,
				homeTeamScore: 0,
				isFinished: false,
				createdAt: expect.any(String),
				updatedAt: expect.any(String)
			});
		});

	});

	describe('POST /games/:id/finish',()=>{

		it('Should respond with status 422 when body is invalid', async () => {
			const indvalidBody = gameFactories.insertGameScoreObject({valid:false});
			const {statusCode} = await api.post('/games/0/finish').send(indvalidBody);

			expect(statusCode).toBe(httpStatus.UNPROCESSABLE_ENTITY);
		});

		it('Should respond with status 400 when game id is invalid', async () => {
			const indvalidBody = gameFactories.insertGameScoreObject({valid:true});
			const {statusCode, body} = await api.post('/games/b/finish').send(indvalidBody);

			expect(statusCode).toBe(httpStatus.BAD_REQUEST);
			expect(body).toEqual({
				message: 'Id para busca do jogo é invalido!',
				status: httpStatus.BAD_REQUEST
			});

		});

		it('Should respond with status 400 when game does\'nt exists', async () => {
			const indvalidBody = gameFactories.insertGameScoreObject({valid:true});
			const {statusCode, body} = await api.post('/games/1/finish').send(indvalidBody);

			expect(statusCode).toBe(httpStatus.NOT_FOUND);
			expect(body).toEqual({
				message: 'Este jogo não existe!',
				status: httpStatus.NOT_FOUND
			});

		});

		it('Should respond with status 400 when game must be finished', async () => {
			const game = await gameFactories.insertGameInDb({ many: 1 });
			const bodyUpdate = gameFactories.insertGameScoreObject({valid:true}) as GameUpdate;
			await gameFactories.updateGameInDb( game.id, bodyUpdate );

			const indvalidBody = gameFactories.insertGameScoreObject({valid:true});
			const {statusCode, body} = await api.post(`/games/${game.id}/finish`).send(indvalidBody);

			expect(statusCode).toBe(httpStatus.BAD_REQUEST);
			expect(body).toEqual({
				message: 'Este jogo já foi finalizado!',
				status: httpStatus.BAD_REQUEST
			});

		});

		it('should respond with status 200 and updated game data', async () => {
			const game = await gameFactories.insertGameInDb({ many: 1 });
			const bodyUpdate = gameFactories.insertGameScoreObject({valid:true}) as GameUpdate;
			const {statusCode, body} = await api.post(`/games/${game.id}/finish`).send(bodyUpdate);

			expect(statusCode).toBe(httpStatus.OK);
			expect(body).toEqual({
				id: game.id,
				awayTeamName: game.awayTeamName,
				homeTeamName: game.homeTeamName,
				awayTeamScore: bodyUpdate.awayTeamScore,
				homeTeamScore: bodyUpdate.homeTeamScore,
				isFinished: true,
				createdAt: game.createdAt.toISOString(),
				updatedAt: expect.any(String)
			});
		});

	});

	describe('GET /games',()=>{

		it('Should respond with status 200 and empty array when have no games in db', async () => {
			const gamesInDb = await gameFactories.findManyGames();
			const {statusCode, body} = await api.get('/games');

			expect(statusCode).toBe(httpStatus.OK);
			expect(body).toEqual([]);
			expect(gamesInDb).toEqual([]);

		});

		it('Should respond with status 200 and array with 10 games', async () => {
			const many = 10;
			await gameFactories.insertGameInDb({many});
			const {statusCode, body} = await api.get('/games');

			expect(statusCode).toBe(httpStatus.OK);
			expect(body).toEqual(
				expect.arrayContaining([
					expect.objectContaining<Game>({
						id: expect.any(Number),
						homeTeamName: expect.any(String),
						awayTeamName:expect.any(String),
						homeTeamScore: expect.any(Number),
						awayTeamScore:expect.any(Number),
						isFinished: expect.any(Boolean),
						createdAt: expect.any(String),
						updatedAt:expect.any(String)
					})
				])
			);
			expect(body).toHaveLength(many);

			console.log(body);
		});
	});
});