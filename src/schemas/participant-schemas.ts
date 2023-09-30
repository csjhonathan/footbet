import Joi from 'joi';
import { ParticipantInput } from '../protocols';

export const inputParticipantSchema = Joi.object<ParticipantInput>({
	balance: Joi.number().min(1000).message('Balance deve ser, pelo menos, R$10,00').required(),
	name: Joi.string().required()
});