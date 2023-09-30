import { Request, Response } from 'express';
import { BetInput } from '../protocols';
import { betServices } from '../services';
import httpStatus from 'http-status';

export async function createBet(req:Request, res:Response) {
	const body = req.body as BetInput;
	const bet = await betServices.create(body);
	res.status(httpStatus.OK).send(bet);
}