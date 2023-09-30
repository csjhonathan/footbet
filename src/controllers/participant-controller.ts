import { Request, Response } from 'express';
import { participantServices } from '../services';
import { ParticipantInput } from '../protocols';
import httpStatus from 'http-status';

export async function createParticipant(req:Request, res:Response) {
	const body = req.body as ParticipantInput;
	const participant = await participantServices.create(body);
	res.status(httpStatus.CREATED).send(participant);
}

export async function findManyParticipants(_req:Request, res:Response) {
	const participants = await participantServices.findMany();
	res.status(httpStatus.OK).send(participants);
}