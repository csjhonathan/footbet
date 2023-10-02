import { errorHandler } from '../../errors';
import { ParticipantInput } from '../../protocols';
import { participantRepository } from '../../repositories';

function create(body:ParticipantInput){
	return participantRepository.create(body);
}

function findMany(){
	return participantRepository.findMany();
}

async function findOne(id:number){
	const participant = await participantRepository.findOne(id);

	if(!participant){
		throw errorHandler({
			message: 'Este participante não está registrado!',
			name:'BadRequestError'
		});
	}

	return participant;
}

export const participantServices = {
	create,
	findMany,
	findOne
};