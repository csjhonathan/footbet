import { ParticipantInput } from '../../protocols';
import { participantRepository } from '../../repositories';

function create(body:ParticipantInput){
	return participantRepository.create(body);
}

function findMany(){
	return participantRepository.findMany();
}

function findOne(id:number){
	return participantRepository.findOne(id);
}

export const participantServices = {
	create,
	findMany,
	findOne
};