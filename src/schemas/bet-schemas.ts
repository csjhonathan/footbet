import Joi from 'joi';
import { BetInput } from '../protocols';

export const inputBetSchema = Joi.object<BetInput>({
	amountBet: Joi.number().required(),
	awayTeamScore: Joi.number().required(),
	homeTeamScore: Joi.number().required(),
	gameId: Joi.number().required(),
	participantId: Joi.number().required(),
});