import { gameRepository } from '../../repositories';
import { errorHandler } from '../../errors';
import { GameInput, GameUpdate } from '../../protocols';

function create(body:GameInput){
	return gameRepository.create(body);
}

async function update(id:number,body:GameUpdate){
	const game = await findOne(id);

	if(game.isFinished){
		throw errorHandler({
			message:'Este jogo já foi finalizado!',
			name:'BadRequestError'
		});
	}

	return gameRepository.update(id, body);
}

function findMany(){
	return gameRepository.findMany();
}

async function findOne(id:number){
	if(!id || isNaN(id)){
		throw errorHandler({
			message:'Id para busca do jogo é invalido!',
			name:'BadRequestError'
		});
	}

	const game = await gameRepository.findOne(id);

	if(!game){
		throw errorHandler({
			message:'Este jogo não existe!',
			name:'NotFoundError'
		});
	}

	return game;
}

export const gameServices = {
	create,
	update,
	findMany,
	findOne
};