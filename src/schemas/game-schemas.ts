import Joi from 'joi';
import { GameInput, GameUpdate } from '../protocols';

export const inputGameSchema = Joi.object<GameInput>({
	awayTeamName: Joi.string().required(),
	homeTeamName: Joi.string().required()
});

export const updateGameSchema = Joi.object<GameUpdate>({
	awayTeamScore:Joi.number().required(),
	homeTeamScore:Joi.number().required()
});