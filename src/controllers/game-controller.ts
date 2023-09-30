import { Request, Response } from 'express';
import { GameInput, GameUpdate } from '../protocols';
import httpStatus from 'http-status';
import { gameServices } from '../services';

export async function createGame(req:Request, res:Response) {
	const body = req.body as GameInput;
	const game = await gameServices.create(body);
	res.status(httpStatus.CREATED).send(game);
}

export async function updateGame(req:Request, res:Response) {
	const body = req.body as GameUpdate;
	const id = Number(req.params.id);
	const game = await gameServices.update(id,body);
	res.status(httpStatus.OK).send(game);
}

export async function findManyGames(req:Request, res:Response) {
	const games = await gameServices.findMany();
	res.status(httpStatus.OK).send(games);
}

export async function findOneGame(req:Request, res:Response) {
	const id = Number(req.params.id);
	const {Bet:bets, ...rest} = await gameServices.findOne(id);
	res.status(httpStatus.OK).send({...rest, bets});
}