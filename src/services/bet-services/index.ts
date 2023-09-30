import { BetInput } from '@/protocols';
import { betRepository } from '@/repositories';
import { participantServices } from '../participant-services';
import { gameServices } from '../game-services';
import { errorHandler } from '../../errors';

async function create(body:BetInput){
	const {participantId, gameId} = body;

	const [participant, game] = await Promise.all([
		participantServices.findOne(participantId),
		gameServices.findOne(gameId)
	]);

	if(game.isFinished){
		throw errorHandler({
			message:'Este jogo já foi finalizado!',
			name:'BadRequestError'
		});
	}

	if(body.amountBet > participant.balance){
		throw errorHandler({
			message:'Você não tem dinheiro suficiente para fazer esta aposta! Tente apostar um valor menor!',
			name:'BadRequestError'
		});
	}


	return betRepository.create(body);
}

export const betServices = {
	create
};